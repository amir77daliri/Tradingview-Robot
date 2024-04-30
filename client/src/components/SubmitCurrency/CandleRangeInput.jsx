const CandleRangeInput = ({quantity, setQuantity}) => {
  return (
    <>
      {/* Number Input */}
      <div className="mb-4">
        <label className="block mb-2 text-blue-500 hover:underline focus:outline-none">
          Candles Range
        </label>
        <input
          min={1}
          type="number"
          className="px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>
    </>
  );
};

export default CandleRangeInput;
