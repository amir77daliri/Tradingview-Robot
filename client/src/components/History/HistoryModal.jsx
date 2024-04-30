
import { timeConverter } from "../../utils/dateConverter";
import { timeframeFinder } from "../../utils/timeframes";

const HistoryModal = ({ isOpen, onClose, history = [] }) => {

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div className="fixed inset-0 bg-gray-800 opacity-75"></div>
      <div className="relative w-3/4 bg-white p-8 rounded-md shadow-md overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold ">تاریخچه ارزیابی</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            &#10006;
          </button>
        </div>
        <div className="mb-4">
          <hr className="bg-red-400 h-1" />

          {history.length < 1 ? (
            <div className="flex m-auto text-center mt-8">
              <p className="text-red-500">لیست تاریخچه خالی است</p>
            </div>
          ) : (
            <table className="w-full mt-8" style={{ direction: "rtl" }}>
              <thead>
                <tr>
                  <th className="px-2 py-2"></th>
                  <th className="px-4 py-2 ">نام ارز</th>
                  <th className="px-4 py-2 ">صرافی</th>
                  <th className="px-4 py-2 ">بازه زمانی</th>
                  <th className="px-4 py-2">زمان رسیدن به قیمت هدف</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 text-center">
                {history.map((item, index) => (
                  <tr key={index}>
                    <td className="px-2 py-2 mr-2">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2 text-green-500">{item.name.split(':')[1]}</td>
                    <td className="px-4 py-2 text-red-500">{item.name.split(':')[0]}</td>
                    <td className="px-4 py-2 " style={{direction: 'ltr'}}>{timeframeFinder(item.candleTime)}</td>
                    <td className="px-4 py-2">
                      {`در ${timeConverter(
                        item.lastNotifedDate / 1000
                      )} به قیمت هدف ${item.Base_Line} رسید.`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryModal;
