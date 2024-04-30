import { useState } from "react";
import { testPeriods } from "../../utils/testPeriods";
import Spinner from "../Spinner/Spinner";
import axios from "axios";

import styles from "./TestComponent.module.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const SERVE_PORT = import.meta.env.VITE_SERVER_HOST_PORT
const TEST_URL = `${API_BASE_URL}:${SERVE_PORT}/testStrategy`;

const options = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  timeZone: 'Asia/Tehran',
};


const TestComponent = ({ testItem, setTestItem }) => {
  const [periodTime, setPeriodTime] = useState(testPeriods[0]);
  const [testTimeframe, setTestTimeframe] = useState(
    periodTime.timeframes[0].timeframe
  );
  const [candleRange, setCandleRange] = useState(50);
  const [testResults, setTestResults] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const handleStartTest = async () => {
    console.log(periodTime.period, "-", testTimeframe, "-", candleRange);
    if (!periodTime || !candleRange || !testTimeframe) {
      alert("اطلاعات را کامل کنید.");
      return;
    }
    const testBody = {
      name: testItem.name,
      exchange: testItem.symbolId.split(":")[0],
      timeframe: testTimeframe,
      startDate: periodTime.period,
      candleRange,
    };
    console.log(testItem);
    console.log(testBody);
    try {
      setLoading(true);
      const { data } = await axios.post(TEST_URL, testBody);
      if (data && data.msg) {
        alert(data.msg);
        return;
      }
      console.log(data)
      const { testResults } = data;
      setTestResults(testResults);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert("خطا در تست اتفاق افتاد، لطفا دوباره تلاش کنید.")
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col w-4/5 justify-center">
        {/* Container  */}
        <div className="container mx-auto mt-2">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-2">
            {/* Side */}
            <div
              className="xl:col-span-3 lg:col-span-4 p-2 pr-0 lg:mt-2 bg-white border-2 rounded-md shadow-md"
              style={{ height: '350px' }}
            >
              <div className="p-1 flex flex-col">
                <div
                  className="flex flex-row justify-start p-2 items-center mr-2"
                  dir="ltr"
                >
                  <div className="flex items-center w-10 h-10 border-1 rounded-full border-gray-300 text-center">
                    <img
                      src={testItem.bLogo}
                      alt=""
                      className="rounded-full w-full h-full"
                    />
                  </div>
                  <span className="ml-3 text-lg">
                    <span
                      variant="h6"
                      style={{
                        fontFamily: "inherit",
                      }}
                    >
                      {testItem.name}
                    </span>
                  </span>
                </div>
              </div>

              <div className="flex flex-col">
                {/* choose test period  */}
                <div className="pr-4 my-2">
                  <div className="flex flex-row gap-8 justify-between">
                    <label className="py-2 font-semibold ">بازه زمانی :</label>
                    <select
                      className="py-2 pl-1 flex-1 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      dir="ltr"
                      value={periodTime ? JSON.stringify(periodTime) : ""}
                      onChange={(e) => {
                        setPeriodTime(JSON.parse(e.target.value));
                        setTestTimeframe(
                          JSON.parse(e.target.value).timeframes[0].timeframe
                        );
                      }}
                      style={{ maxWidth: "150px" }}
                    >
                      {testPeriods.map((item, index) => (
                        <option key={index} value={JSON.stringify(item)}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* choose timeframe */}
                <div className="pr-4 my-2">
                  <div className="flex flex-row gap-8 justify-between w-full">
                    <label className="py-2 font-semibold ">تایم فریم :</label>
                    <select
                      className="py-2 pl-1 flex-1 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      dir="ltr"
                      style={{ maxWidth: "150px" }}
                      value={testTimeframe}
                      onChange={(e) => setTestTimeframe(e.target.value)}
                    >
                      {periodTime &&
                        periodTime.timeframes.map(
                          ({ timeframe, name }, index) => (
                            <option key={index} value={timeframe}>
                              {name}
                            </option>
                          )
                        )}
                    </select>
                  </div>
                </div>

                {/* choose Candle Range */}
                <div className="pr-4 my-2">
                  <div className="flex flex-row justify-between gap-8">
                    <label className="py-2 font-semibold">رنج کندل ها :</label>
                    <input
                      className="border rounded-md flex-1 pl-2 max-h-10"
                      dir="ltr"
                      value={candleRange}
                      style={{ maxWidth: "150px" }}
                      onChange={(e) => setCandleRange(+e.target.value)}
                      required
                      type="number"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 px-10 mb-6 w-full">
                <div className="flex flex-row justify-center gap-4">
                  <button
                    onClick={handleStartTest}
                    className="w-full rounded-md bg-green-500 p-2 text-white hover:bg-green-600"
                  >
                    شروع
                  </button>
                  <button
                    onClick={() => setTestItem(null)}
                    className="w-full rounded-md bg-red-500 p-2 text-white hover:bg-red-600"
                  >
                    کنسل
                  </button>
                </div>
              </div>
            </div>

            {/* Test Results */}
            <div className="xl:col-span-9 lg:col-span-8 lg:mt-2 rounded-md shadow-md pb-2">
              <div className="grid grid-cols-1">
                {isLoading ? (
                  <div className="mt-32">
                    <Spinner />
                  </div>
                ) : testResults.length > 0 ? (
                  <>
                    <div className="flex flex-row justify-center bg-white p-3 pt-0 rounded-md items-center">
                      <span className="text-blue-500 text-lg underline">
                        نتایج تست
                      </span>
                    </div>

                    <div className="lg:mx-2">
                      <table
                        className="w-full  bg-white divide-y divide-gray-200 border rounded-md"
                        style={{ direction: "rtl" }}
                      >
                        <thead>
                          <tr>
                            <th className="border border-gray-300 p-2">#</th>
                            <th className="border border-gray-300 p-2">
                              نوع معامله
                            </th>
                            <th className="border border-gray-300 p-2">
                              قیمت خرید / فروش
                            </th>
                            <th className="border border-gray-300 p-2">
                              قیمت فروش
                            </th>
                            <th className="border border-gray-300 p-2">
                              تاریخ معامله
                            </th>
                          </tr>
                        </thead>
                        <tbody className="">
                          {testResults.map((result, index) => (
                            <tr
                              className={`${
                                result.type === "Buy"
                                  ? "bg-green-100"
                                  : "bg-pink-100"
                              }`}
                              key={index}
                            >
                              <th className="py-2">{index + 1}</th>
                              <th>{result.type}</th>
                              <th>{result.price}</th>
                              <th>{result.tpPrice || "-"}</th>
                              <th>
                                {new Date(result.time).toLocaleString('en-us', options)}
                              </th>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                ) : null}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default TestComponent;
