import { useState, useEffect } from "react";

import { ToastContainer } from "react-toastify";

// components ...
import ListeningCurrenciesTable from "./components/ListeningCurrenciesTable";
import SelectCurrencyModal from "./components/SelectCurrencyModal";
import FinalSumbitCurrencyModal from "./components/FinalSumbitCurrencyModal";
import SelectedCurrenciesTable from "./components/ShowSelectdedCurrencies/SelectedCurrenciesTable";
import AutoModal from "./components/AutoModal/AutoModal";
import HistoryModal from "./components/History/HistoryModal";
import TestComponent from "./components/TestComponent/TestComponent";

// utils :
//import calculateDifferenceAndPercentage from "./utils/priceChange";
import fixedItemValues from './utils/priceChange'
import { computeNotifedTime } from "./utils/dateConverter";
import makeNotif from "./utils/makeNotif";

let socket = "";
const WS_BASE_URL = import.meta.env.VITE_WS_BASE_URL;

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [showAutoModal, setShowAutoModal] = useState(false);
  const [selectedCurrencies, setSelectedCurrencies] = useState([]);
  const [ioSocket, setIoSocket] = useState(null);
  const [disableStartButton, setDisableStartButton] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isStarted, setIsStarted] = useState(false);
  const [targetCurrencies, setTargetCurrencies] = useState([]);
  const [notifedHistory, setNotifedHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [SLPercent, setSLPercent] = useState(null);
  // test states 
  const [testCurrency, setTestCurrency] = useState(null);

  // Get History
  useEffect(() => {
    const history = localStorage.getItem("appHistory");
    if (history) {
      setNotifedHistory(JSON.parse(history));
    }
  }, []);

  const handleStartButton = async () => {
    try {
      setIsStarted(true);
      setDisableStartButton((prev) => !prev);
      socket = new WebSocket(`${WS_BASE_URL}`);

      socket.onopen = function (e) {
        setIoSocket(socket);
        console.log("connected ...");
        socket.send(
          JSON.stringify({
            symbols: selectedCurrencies,
          })
        );
      };

      socket.onmessage = function (e) {
        const data = JSON.parse(e.data);
        // console.log("recieve data: ", data);
        if (data.code === 3) {
          throw new Error("خطا در دریافت اطلاعات");
        } else if (data.code === 4) {
          // console.log(ioSocket);
          alert("هیچ داده ای برای ارزها با مشخصات داده شده یافت نشد.");
          setIsStarted(false);
          setDisableStartButton(false);
          setTargetCurrencies([]);
        } else {
          setTargetCurrencies((prevState) => {
            if (data.code === 1) {
              return data.results;
            } else {
              const { symbol: name, price } = data.results;
              const filteredCurrencies = prevState.map((item) => {
                if (item.name === name) {
                  item.change = item.currentPrice < price;
                  item.currentPrice = price;
                  const {targetChange, targetPercentage, decimalPlaces} = fixedItemValues(item);
                  item.targetChange = targetChange
                  item.targetPercentage = targetPercentage
                  item.decimalPlaces = decimalPlaces
                  if (Math.abs(item.targetPercentage) <= 0.01) {
                    if (!item.isNotifed) {
                      console.log("Notifed First Time ...")
                      item.isNotifed = true;
                      item.lastNotifedDate = Date.now();
                      // implement notification
                      makeNotif(item);
                      // save Notif in localhost and state
                      setNotifedHistory((prevState) => {
                        const newHistory = [item, ...prevState];
                        localStorage.setItem(
                          "appHistory",
                          JSON.stringify(newHistory)
                        );
                        return newHistory;
                      });

                    } else if (
                      item.isNotifed &&
                      computeNotifedTime(item.lastNotifedDate)
                    ) {
                      // implement notification after 1 day if it reach to base_line again
                      item.lastNotifedDate = date.now();
                      makeNotif(item);
                      setNotifedHistory((prevState) => {
                        const newHistory = [item, ...prevState];
                        localStorage.setItem(
                          "appHistory",
                          JSON.stringify(newHistory)
                        );
                        return newHistory;
                      });
                    }
                  }
                  item.active = true
                }
                return item;
              });
              return filteredCurrencies;
            }
          });
        }
      };
      socket.onerror = function (error) {
        setTargetCurrencies([]);
        setIsStarted(false);
        alert("خطا در وب سوکت ");
      };
    } catch (error) {
      setTargetCurrencies([]);
      console.log("error is :", error);
      setIsStarted(false);
      alert("مشکلی در دریافت داده ها رخ داد، مجددا تلاش نمایید");
      ioSocket.close();
    }
  };

  const handleStopButton = () => {
    setDisableStartButton(false);
    ioSocket.close();
    socket = "";
    setIsStarted(false);
    setTargetCurrencies([]);
  };

  return (
    <>
      <ToastContainer rtl={true} position="bottom-right" theme="colored" />
      {showModal && (
        <SelectCurrencyModal
          setSelectedItem={setSelectedItem}
          isOpen={showModal}
          onClose={() => setShowModal((prev) => !prev)}
        />
      )}

      {showAutoModal && (
        <AutoModal
          isOpen={showAutoModal}
          onClose={() => setShowAutoModal((prev) => !prev)}
          setSelectedCurrencies={setSelectedCurrencies}
          setSLPercent={setSLPercent}
        />
      )}

      {showHistory && (
        <HistoryModal
          isOpen={showHistory}
          onClose={() => setShowHistory(false)}
          history={notifedHistory}
        />
      )}

      {selectedItem && (
        <FinalSumbitCurrencyModal
          isOpen={selectedItem !== null}
          onClose={() => setSelectedItem(null)}
          selectedItem={selectedItem}
          selectedCurrencies={selectedCurrencies}
          setSelectedCurrencies={setSelectedCurrencies}
          setSLPercent={setSLPercent}
        />
      )}

      <div className="container mx-auto mt-8 flex flex-col justify-center items-center">
        <div className="flex flex-row justify-between items-center w-full lg:w-4/5">
          {/*  Start/Stop Buttons || See Symbols */}
          <div className="flex flex-row justify-start gap-3">
            <button
              className={`${
                disableStartButton ? "bg-gray-400" : "bg-blue-700"
              }  text-white px-auto w-40 h-10 md:w-50 rounded-md`}
              onClick={() => setShowModal((prev) => !prev)}
              disabled={disableStartButton}
            >
              انتخاب دستی
            </button>
            <button
              className={`${
                disableStartButton ? "bg-gray-400" : "bg-pink-500"
              }  text-white px-auto w-40 h-10 md:w-50 rounded-md`}
              onClick={() => setShowAutoModal((prev) => !prev)}
              disabled={disableStartButton}
            >
              انتخاب اتوماتیک
            </button>
          </div>
          {selectedCurrencies.length > 0 && (
            <div className="my-4 w-full lg:w-4/5">
              {!isStarted ? (
                <button
                  className={`bg-blue-700 text-white w-40 h-10 md:w-50 rounded-md mr-3`}
                  onClick={handleStartButton}
                  disabled={disableStartButton || testCurrency}
                >
                  شروع{" "}
                </button>
              ) : (
                <button
                  className={`bg-red-700 text-white  mr-3 w-40 h-10 md:w-50 rounded-md`}
                  disabled={!disableStartButton}
                  onClick={handleStopButton}
                >
                  توقف
                </button>
              )}
            </div>
          )}

          {/* see history */}
          <div>
            <button
              className={`text-white w-40 h-10 md:w-50 rounded-md bg-green-400`}
              onClick={() => setShowHistory(!showHistory)}
            >
              تاریخچه
            </button>
          </div>
        </div>
        {!isStarted && selectedCurrencies.length > 0 ? (
          <hr className="w-full h-2 mt-3" />
        ) : null}
        {/*  Selected Currencies Table */}
        {!isStarted && !testCurrency && (
          <SelectedCurrenciesTable
            selectedCurrencies={selectedCurrencies}
            setSelectedCurrencies={setSelectedCurrencies}
            setTestCurrency={setTestCurrency}
          />
        )}
        {testCurrency && (
          <TestComponent testItem={testCurrency} setTestItem={setTestCurrency} />
        )}

        {/* Listening Table */}
        {isStarted && (
          <ListeningCurrenciesTable
            items={targetCurrencies}
            SLPercent={SLPercent}
          />
        )}
      </div>
    </>
  );
};

export default App;
