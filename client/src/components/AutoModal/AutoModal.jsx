import { useState } from "react";
import getAutoSymbols from "../../Hooks/useAuto";

// components :
import Spinner from "../Spinner/Spinner";
import AutoSelectContainer from "./AutoSelectContainer";
import resetBtn from "../../assets/resetBtn.png";
import SearchBox from "../SearchBox/Searchbox";
import ExchangesList from "./ExchangesList";

// utils :
import { typesCategory } from "../../utils/categories";
import { autoTimeframes } from "../../utils/timeframes";

let clearTime;

const AutoModal = ({ isOpen, onClose, setSelectedCurrencies, setSLPercent }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [activeType, setActiveType] = useState(0);
  const [autoItems, setAutoItems] = useState([]);
  const [autoTimeframe, setAutoTimeframe] = useState("60");
  const [autoRange, setAutoRange] = useState(20);
  const [autoCount, setAutoCount] = useState(5);
  const [showCurrencies, setShowCurrencies] = useState(false);
  const [selectedExchange, setSelectedExchange] = useState(null);
  const [showExchangeList, setShowExchangeList] = useState(false);
  const [slCount, setSlCount] = useState(10);

  const handleSeeCurrencies = async () => {
    console.log(autoTimeframe, " - ", autoCount, " - ", autoRange);

    if (autoCount < 5 || autoCount > 300) {
      alert("تعداد ارزها نمی تواند کمتر از 5 یا بیشتر از 300 باشد");
      return;
    }
    if (autoRange < 20 || autoRange > 400) {
      alert("رنج کندل ها نباید کمتر از 20 یا بیشتر از 400 باشد. ");
      return;
    }
    if(slCount < 1 || slCount > 100) {
      alert("sl باید درصدی بین 1 تا 100 باشد.")
      return;
    }

    setSLPercent(slCount)
    setIsError(false);
    setIsPending(true);
    setShowExchangeList(false)
    
    // get symbols :
    try {
      const { data, status } = await getAutoSymbols({
        count: autoCount,
        searchType: typesCategory[activeType]?.value || "",
        query: searchTerm,
        exchange: selectedExchange?.pathName || "",
      });
      if (status === 500) {
        throw new Error("error");
      }
      setIsPending(false);
      setAutoItems(data);
      setShowCurrencies(true);
    } catch (error) {
      setIsPending(false);
      setIsError(true);
    }
  };

  const handleStartAutomatic = () => {
    const preparedData = autoItems.map((item) => {
      return {
        symbolId: `${item.exchange}:${item.symbol}`,
        name: item.symbol,
        cLogo: item.cLogo,
        bLogo: item.bLogo,
        timeframe: autoTimeframe,
        candleRange: autoRange,
        slCount
      };
    });
    onClose();
    setSelectedCurrencies(preparedData);
  };

  const symbolSearch = async (e) => {
    clearTimeout(clearTime);
    setSearchTerm(e.target.value);
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      } transition-opacity ease-in-out duration-300`}
      style={{ direction: "ltr" }}
    >
      <div className="fixed inset-0 bg-gray-800 opacity-75"></div>
      <div
        className="relative w-3/4 lg:w-3/5 overflow-y-scroll bg-white p-7 rounded-md shadow-md"
        style={{ height: "90%" }}
      >
        <div className="flex items-center justify-between mb-4 p-2">
          <h2 className="text-lg font-semibold">Automatic Start</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            X
          </button>
        </div>

        {/*  select range and timeframe */}
        <div className="flex items-center mb-3">
          <div>
            {/* Selection timeframe */}
            <label className="mr-1 ">Timeframe :</label>
            <select
              value={autoTimeframe}
              onChange={(e) => setAutoTimeframe(e.target.value)}
              className="mr-1 px-1 py-1 border border-gray-300 rounded-md focus:outline-none"
            >
              {autoTimeframes.map((timeframe, index) => (
                <option key={index} value={timeframe.value}>
                  {timeframe.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            {/* Input for Range Numbers */}
            <label className="mr-1 ml-1 ">Range :</label>
            <input
              type="number"
              value={autoRange}
              onChange={(e) => setAutoRange(e.target.value)}
              placeholder="Enter range"
              className="px-1 py-1 border mr-2 sm:mr-0 border-gray-300 rounded-md focus:outline-none"
            />
          </div>

          <div>
            {/* Input for Count Numbers */}
            <label className="ml-1 mr-1">Count :</label>
            <input
              type="number"
              value={autoCount}
              onChange={(e) => setAutoCount(e.target.value)}
              className="px-1 py-1 border border-gray-300 rounded-md focus:outline-none"
            />
          </div>
          <div>
            {/* Input for Count Numbers */}
            <label className="ml-1 mr-1">SL: % </label>
            <input
              type="number"
              value={slCount}
              onChange={(e) => setSlCount(e.target.value)}
              className="px-1 py-1 border border-gray-300 rounded-md focus:outline-none"
            />
          </div>
        </div>

        {/* Seacrh Box */}
        {!showCurrencies && <SearchBox symbolSearch={symbolSearch} />}

        {/* Types Category */}
        <div
          className="flex flex-row flex-nowrap overflow-x-auto overflow-y-hidden sm:flex-wrap mb-3 "
          style={{ scrollbarWidth: "thin" }}
        >
          {typesCategory.map((item, index) => (
            <span
              style={{ userSelect: "none" }}
              key={index}
              onClick={() => setActiveType(index)}
              className={`${
                index === activeType
                  ? "bg-black text-white"
                  : "bg-blue-100 text-black hover:bg-blue-200"
              } mt-2 mr-2 p-1  rounded-full hover:cursor-default`}
            >
              <span className="p-3">{item.label}</span>
            </span>
          ))}
        </div>
        <hr />

        {/* Select Exchange  && Start/Stop Buttons*/}
        <div
          className="flex justify-between sm:justify-start items-center mb-2 mt-2 "
          style={{ direction: "rtl" }}
        >
          {!showCurrencies && (
            <button
              onClick={handleSeeCurrencies}
              className="bg-blue-500 text-white px-auto h-11 lg:w-30 rounded-md p-2"
            >
              مشاهده ارزها
            </button>
          )}

          {/*  انتخاب صرافی */}
          <button
            onClick={() => setShowExchangeList(!showExchangeList)}
            className={`border-2 text-black px-4 py-2 mr-2   rounded-md 
            ${
              selectedExchange
                ? "bg-pink-200 ml-2 b"
                : !showCurrencies
                ? "hover:bg-blue-200"
                : ""
            } 
            ${showCurrencies ? "bg-gray-200 ml-2" : ""}`}
            disabled={showCurrencies}
          >
            {selectedExchange !== null ? (
              <div className="flex flex-row justify-start ">
                <img
                  src={selectedExchange.src}
                  alt=""
                  className="ml-3 w-7 h-7 rounded-full"
                />
                <p>{selectedExchange.name}</p>
                <p className="mr-3">{"\u2193"}</p>
              </div>
            ) : (
              <div className="flex flex-row justify-between">
                <p className="ml-3">انتخاب صرافی</p>
                <p>{showExchangeList ? "\u2191" : "\u2193"}</p>
              </div>
            )}
          </button>

          {/* شروع ارزیابی و ارسال داده ها */}
          {showCurrencies && (
            <button
              className="bg-blue-500 text-white px-auto w-36 h-10 rounded-md ml-2"
              onClick={handleStartAutomatic}
            >
              شروع ارزیابی
            </button>
          )}
          {showCurrencies && (
            <button
              className="bg-yellow-300 text-white px-auto w-36 h-10 rounded-md ml-2"
              onClick={() => {
                setShowCurrencies(false);
                setSelectedExchange(null);
              }}
            >
              تغییر ارزها
            </button>
          )}
        </div>

        {/* spinner while fetching symbols */}
        {isPending && <Spinner />}

        {/* Error if fetching failed */}
        {isError && (
          <div className="text-center flex flex-col justify-center items-center h-1/3 text-red-500">
            <h3 className="text-red-500">
              خطا در دریافت اطلاعات، مجددا تلاش نمایید.
            </h3>
            <img
              src={resetBtn}
              alt=""
              className="hover:cursor-pointer"
              onClick={async () => {
                await handleSeeCurrencies();
              }}
            />
          </div>
        )}

        {/* Show Symbols */}

        {showExchangeList && (
          <ExchangesList
            setSelectedExchange={setSelectedExchange}
            setShowExchangeList={setShowExchangeList}
          />
        )}

        {!showExchangeList && showCurrencies && autoItems && (
          <>
            <AutoSelectContainer
              autoItems={autoItems}
              setAutoItems={setAutoItems}
            />
          </>
        )}

        {/* End */}
      </div>
    </div>
  );
};

export default AutoModal;
