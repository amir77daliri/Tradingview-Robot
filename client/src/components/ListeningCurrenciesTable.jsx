import { useState, useEffect, useRef } from "react";

// utils :
import { timeConverter } from "../utils/dateConverter";
import { timeframeFinder } from "../utils/timeframes";
import { orderItems, orderItemsFn } from "../utils/orderItems";

import styles from "./ListeningCurrenciesTable.module.css";

const ListeningCurrenciesTable = ({ items, SLPercent }) => {
  const spanInput = useRef(null);
  const baseInput = useRef(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [orderDropdownOpen, setOrderDropdownOpen] = useState(false);
  const [filterDropwDownOpen, setFilterDropDownOpen] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);
  const [spanBCandleCount, setSpanBCandleCount] = useState(0);
  const [baseLCandleCount, setBaseLCandleCount] = useState(0);
  const [isAsc, setIsAsc] = useState(true);

  useEffect(() => {
    const activeItems = items
      .filter((obj) => obj.active === true)
      .filter(
        (item) =>
          item.baseLineLength >= baseLCandleCount &&
          item.spanBLineLength >= spanBCandleCount
      );
    const orderedItems = orderItemsFn(
      activeItems,
      selectedOption?.value || "",
      isAsc
    );

    setFilteredItems(orderedItems);
  }, [items, selectedOption, isAsc, spanBCandleCount, baseLCandleCount]);

  const handleOptionSelect = (option) => {
    setOrderDropdownOpen(false);
    if (option.value === "") {
      setSelectedOption(null);
    } else {
      setSelectedOption(option);
    }
  };

  return (
    <>
      <div className="flex flex-row justify-between w-full lg:w-4/5">
        <div className="relative w-4/5 md:w-1/2 mb-1 flex flex-row gap-1">
          {/* Ordering Dropdown box  */}
          <div>
            {/* Dropdown Toggle */}
            <button
              onClick={() => setOrderDropdownOpen(!orderDropdownOpen)}
              className="border-2 border-yellow-400  text-black px-4 py-2  hover:bg-blue-200 border-l-0"
            >
              {selectedOption ? selectedOption.label : "مرتب سازی"}
            </button>
            <button
              onClick={() => setIsAsc(!isAsc)}
              className="border-2 border-yellow-400  text-black px-4 py-2  hover:bg-blue-200 border-r-0"
            >
              {isAsc ? "\u2191" : "\u2193"}
            </button>

            {/* Dropdown Menu */}
            {orderDropdownOpen && (
              <div className="absolute right-16 bg-white border border-gray-300 rounded-md shadow-md h-auto pb-3">
                <ul>
                  {orderItems.map((option) => (
                    <li
                      key={option.value}
                      className="cursor-pointer px-4 py-2 hover:bg-gray-200"
                      onClick={() => handleOptionSelect(option)}
                    >
                      {option.label}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Filtering Dropdown box  */}
          <div className="">
            {/* Dropdown Toggle */}
            <div className="border-2 border-cyan-400 flex flex-row justify-center items-center">
              <button
                onClick={() => setFilterDropDownOpen(!filterDropwDownOpen)}
                className=" text-black px-4 py-2"
              >
                فیلتر کندل
              </button>
              <span
                className={`${styles.ktCaret} ${
                  filterDropwDownOpen ? styles.ktCaretExpanded : null
                } ml-1 mt-1`}
              >
                <div
                  className={`${styles.ktCaretHandle} ${styles.ktCaretLeftHandle}`}
                ></div>
                <div
                  className={`${styles.ktCaretHandle} ${styles.ktCaretRigthHandle}`}
                ></div>
              </span>
            </div>

            {/* Dropdown Menu */}
            {filterDropwDownOpen && (
              <div className="absolute right-44 bg-white border border-gray-300 rounded-md shadow-md h-auto pb-3 mt-1">
                <div className="m-1 p-2">انتخاب حداقل مقدار</div>
                <hr />
                <div className="mt-4">
                  <div
                    className="p-4 flex flex-row justify-between"
                    style={{ direction: "ltr" }}
                  >
                    <label>spanB :</label>
                    <input
                      ref={spanInput}
                      type="number"
                      min={0}
                      max={50}
                      defaultValue={spanBCandleCount}
                      className="border-2 ml-1 w-28 text-center"
                    />
                  </div>
                  <hr />
                  <div
                    className="p-4 flex flex-row justify-between"
                    style={{ direction: "ltr" }}
                  >
                    <label>Base_Line :</label>
                    <input
                      ref={baseInput}
                      type="number"
                      min={0}
                      max={50}
                      defaultValue={baseLCandleCount}
                      className="border-2 ml-1 w-28 text-center"
                    />
                  </div>
                </div>
                <hr />
                <div className="flex flex-row justify-start items-center mt-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 m-2 mr-3 rounded-md hover:bg-blue-600"
                    onClick={() => {
                      setFilterDropDownOpen(false);
                      setBaseLCandleCount(baseInput.current.valueAsNumber);
                      setSpanBCandleCount(spanInput.current.valueAsNumber);
                    }}
                  >
                    فیلتر
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 mr-3 rounded-md hover:bg-red-600"
                    onClick={() => {
                      baseInput.current.value = 0;
                      spanInput.current.value = 0;
                    }}
                  >
                    حذف
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Timezone */}
        <div className="bg-lime-200 border-4 rounded-md mb-1 flex flex-row justify-center items-center w-40 h-10 md:w-50">
          <span className="p-2">Asia / Tehran</span>
        </div>
      </div>

      <div
        className="overflow-y-auto h-auto mb-6 w-full "
        style={{ maxHeight: "75vh", direction: "ltr", scrollbarWidth: "thin" }}
      >
        <table
          className="w-full  bg-white divide-y divide-gray-200 border rounded-md"
          style={{ direction: "rtl" }}
        >
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">#</th>
              <th className="border border-gray-300 p-2">نام ارز</th>
              <th className="border border-gray-300 p-2">صرافی</th>
              <th className="border border-gray-300 p-2">بازه زمانی</th>
              <th className="border border-gray-300 p-2">رنج کندل</th>
              <th className="border border-gray-300 p-2">base / span</th>
              <th className="border border-gray-300 p-2 ">تاریخ</th>
              <th className="border border-gray-300 p-2">S / R</th>
              <th className="border border-gray-300 p-2">قیمت لحظه ای</th>
              <th className="border border-gray-300 p-2">تفاوت قیمت</th>
              <th className="border border-gray-300 p-2">تفاوت قیمت (%)</th>
              <th className="border border-gray-300 p-2">next S/R</th>
              <th className="border border-gray-300 p-2">تفاوت SRها</th>
              <th className="border border-gray-300 p-2">
                {`(${SLPercent}%)`} SL / TP
              </th>
            </tr>
          </thead>
          <tbody className="">
            {filteredItems.map((item, index) => (
              <tr
                key={index}
                className={`text-center ${
                  item.isNotifed
                    ? "bg-yellow-300"
                    : item.currentPrice < item.Base_Line
                    ? "bg-red-100"
                    : "bg-cyan-100"
                } `}
              >
                <td className="border border-gray-300 p-2">{index + 1}</td>
                {/* Currency Name */}
                <td className="border border-gray-300 p-2 text-green-600">
                  {item.name.split(":")[1]}
                </td>

                {/*Exchange Name*/}
                <td className="border border-gray-300 p-2 text-pink-700">
                  {item.name.split(":")[0]}
                </td>

                {/* Timeframe */}
                <td className="border border-gray-300 p-2" dir="ltr">
                  {timeframeFinder(item.candleTime)}
                </td>

                {/* Candle Range */}
                <td className="border border-gray-300 p-2">
                  {item.candleRange}
                </td>

                {/* Line Sizes */}
                <td
                  className="border border-gray-300 p-2"
                  style={{ direction: "ltr" }}
                >
                  {item.baseLineLength}
                  {" / "}
                  {item.spanBLineLength}
                </td>

                {/* S/R Date */}
                <td className="border border-gray-300 p-2">
                  {timeConverter(item["$time"])}
                </td>

                {/* S/R Price */}
                <td className={`border border-gray-300 p-2 text-blue-600`}>
                  {Number(item.Base_Line).toFixed(item.decimalPlaces)}
                </td>

                {/* RealTime price */}
                <td
                  className={`border border-gray-300 p-2 ${
                    item.change ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {item.currentPrice}
                </td>

                {/* CurrentPrice Different */}
                <td
                  className={`border border-gray-300 p-2 ${
                    item.targetChange < 0 ? "text-red-500" : "text-green-500"
                  }`}
                  style={{ direction: "ltr" }}
                >
                  {item.targetChange}
                </td>

                {/* CurrentPrice Different (percent) */}
                <td
                  className={`border border-gray-300 p-2 ${
                    item.targetPercentage < 0
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                  style={{ direction: "ltr" }}
                >
                  {item.targetPercentage}%
                </td>

                {/* Next S/R depend on current price*/}
                <td className={`border border-gray-300 p-2`}>
                  {item.currentPrice > item.Base_Line
                    ? item.nextSR !== -1
                      ? item.nextSR.toFixed(item.decimalPlaces)
                      : item.prevSR !== -1
                      ? item.prevSR.toFixed(item.decimalPlaces)
                      : "-"
                    : item.prevSR !== -1
                    ? item.prevSR.toFixed(item.decimalPlaces)
                    : item.nextSR !== -1
                    ? item.nextSR.toFixed(item.decimalPlaces)
                    : "-"}
                </td>

                {/* S/R Different */}
                <td
                  className={`border border-gray-300 p-2 `}
                  style={{ direction: "ltr" }}
                >
                  {item.currentPrice > item.Base_Line
                    ? item.nextSR !== -1
                      ? (item.nextSR - item.Base_Line).toFixed(
                          item.decimalPlaces + 1
                        )
                      : item.prevSR !== -1
                      ? (item.Base_Line - item.prevSR).toFixed(
                          item.decimalPlaces + 1
                        )
                      : "-"
                    : item.prevSR !== -1
                    ? (item.Base_Line - item.prevSR).toFixed(
                        item.decimalPlaces + 1
                      )
                    : item.nextSR !== -1
                    ? (item.nextSR - item.Base_Line).toFixed(
                        item.decimalPlaces + 1
                      )
                    : "-"}
                </td>

                {/* SL Price & TP Price For each item */}
                <td
                  className={`border border-gray-300 p-2`}
                  style={{ direction: "ltr" }}
                >
                  {item["slPrice"]
                    ? item["slPrice"].toFixed(item.decimalPlaces)
                    : "-"}
                  {" / "}
                  {item["tpPrice"]
                    ? item["tpPrice"].toFixed(item.decimalPlaces)
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ListeningCurrenciesTable;
