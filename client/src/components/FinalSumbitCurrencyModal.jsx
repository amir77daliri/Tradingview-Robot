import { useState } from "react";

// components :
import CurrencyInfo from "./SubmitCurrency/CurrencyInfo";
import TimeframesAccordion from "./SubmitCurrency/TimeframsAccordion";
import CandleRangeInput from "./SubmitCurrency/CandleRangeInput";
import SlCountInput from "./SubmitCurrency/SlCountInput";

const FinalSumbitCurrencyModal = ({
  isOpen,
  onClose,
  selectedItem,
  selectedCurrencies,
  setSelectedCurrencies,
  setSLPercent
}) => {
  const [quantity, setQuantity] = useState(0);
  const [selectedTime, setSelectedTime] = useState("");
  const [slCount, setSlCount] = useState(10);

  const handleAddClick = () => {
    // Add logic for handling the 'Add' button click
    if (quantity < 1 || !selectedItem) {
      alert("لطفا بازه زمانی و رنج کندل ها را مشخص کنید");
      return;
    } else if (slCount < 1 || slCount > 100) {
      alert('sl باید عددی بین یک تا صد باشد')
      return;
    } else {
      setSLPercent(slCount);
      const existSymbol = selectedCurrencies.find(
        (c) =>
          c.name === selectedItem.symbol &&
          c.timeframe === selectedTime &&
          c.candleRange === quantity
      );
      if (!existSymbol) {
        setSelectedCurrencies((prev) => [
          ...prev,
          {
            symbolId: `${selectedItem.exchange}:${selectedItem.symbol}`,
            name: selectedItem.symbol,
            cLogo: selectedItem.cLogo,
            bLogo: selectedTime.bLogo,
            timeframe: selectedTime,
            candleRange: quantity,
            slCount: slCount
          },
        ]);
      }
      onClose();
    }
  };

  const handleCancelClick = () => {
    // Add logic for handling the 'Cancel' button click
    setSelectedTime("");
    setSlCount(1);
    setQuantity(0);
    onClose(); // Close the modal
  };

  const handleTimeFrameChange = (e) => {
    setSelectedTime(e.target.value);
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      style={{ direction: "ltr" }}
    >
      <div className="fixed inset-0 bg-gray-800 opacity-75"></div>
      <div className="relative w-1/2 bg-white p-8 rounded-md shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold ">Final Submit</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            &#10006;
          </button>
        </div>
        <div className="mb-4">
          <CurrencyInfo selectedItem={selectedItem} />
          <TimeframesAccordion handleTimeFrameChange={handleTimeFrameChange} />
          <div className="flex flex-row justify-start gap-2">
            <CandleRangeInput quantity={quantity} setQuantity={setQuantity} />
            <SlCountInput slCount={slCount} setSlCount={setSlCount} />
          </div>

          {/* Buttons */}
          <div className="flex justify-end">
            <button
              onClick={handleCancelClick}
              className="px-4 py-2 mr-2 bg-gray-500 text-white rounded hover:bg-gray-700 focus:outline-none"
            >
              Cancel
            </button>
            <button
              onClick={handleAddClick}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalSumbitCurrencyModal;
