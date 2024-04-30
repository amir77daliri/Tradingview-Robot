import { timeframeFinder } from "../../utils/timeframes";
import styles from "./SelectedCurrenciesTable.module.css";

const SelectedCurrenciesTable = ({
  selectedCurrencies,
  setSelectedCurrencies,
  setTestCurrency
}) => {
  const handleRemoveClick = (itemToRemove) => {
    setSelectedCurrencies((prevItems) =>
      prevItems.filter((item) => !areObjectsEqual(item, itemToRemove))
    );
  };

  const areObjectsEqual = (obj1, obj2) => {
    return (
      obj1.symbolId === obj2.symbolId &&
      obj1.timeframe === obj2.timeframe &&
      obj1.candleRange === obj2.candleRange
    );
  };

  return (
    <>
      <div className="flex flex-row justify-between w-full lg:w-4/5">
        <div className={`w-full lg:w-4/5 pr-0 ${styles.rtlContainer}`}>
          <table className="w-full" style={{ direction: "rtl" }}>
            <thead>
              <tr>
                <th className="px-2 py-2">-</th>
                <th className="px-4 py-2 ">نام ارز</th>
                <th className="px-4 py-2">بازه زمانی</th>
                <th className="px-4 py-2">تعداد کندل ها</th>
                <th className="px-2 py-2">
                  <input
                    type="button"
                    disabled={selectedCurrencies.length < 1}
                    onClick={() => setSelectedCurrencies([])}
                    className="px-2 py-1  text-red-500 rounded hover:bg-red-200 focus:outline-none border-b-4"
                    value="حذف همه"
                  />
                </th>
              </tr>
            </thead>
            {selectedCurrencies.length > 0 ? (
              <tbody className="bg-white divide-y divide-gray-200 text-center">
                {selectedCurrencies.map((item, index) => (
                  <tr key={index}>
                    <td className="px-2 py-2 flex justify-center items-center">
                      <img
                        className="w-7 h-7 rounded-full"
                        src={item.bLogo || item.cLogo}
                        alt=""
                      />
                    </td>
                    <td className="px-4 py-2">{item.name}</td>
                    <td className="px-4 py-2" style={{ direction: "ltr" }}>
                      {timeframeFinder(item.timeframe)}
                    </td>
                    <td className="px-4 py-2">{item.candleRange}</td>
                    <td className="px-2 py-2">
                      <div className="flex flex-row justify-center gap-1">
                        <button
                          onClick={() => setTestCurrency(item)}
                          className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-700 focus:outline-none"
                        >
                          تست
                        </button>
                        <button
                          onClick={() => handleRemoveClick(item)}
                          className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700 focus:outline-none"
                        >
                          حذف
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody className="bg-white divide-y divide-gray-200 text-center">
                <tr>
                  <td colSpan={5}>
                    <div className="text-red-400 text-center mt-5">
                      ارزی انتخاب نشده است.
                    </div>
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default SelectedCurrenciesTable;
