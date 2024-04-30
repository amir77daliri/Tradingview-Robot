const SlCountInput = ({ slCount, setSlCount }) => {
  { /* Number Input */ }
  return (
    <div className="mb-4">
      <label className="block mb-2 text-blue-500 hover:underline focus:outline-none">
        Sl Percent
      </label>
      <input
        type="number"
        className="px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        value={slCount}
        onChange={(e) => setSlCount(e.target.value)}
      />
    </div>
  );
};

export default SlCountInput;
