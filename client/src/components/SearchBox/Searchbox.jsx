const SearchBox = ({ symbolSearch }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search currencies"
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        onChange={symbolSearch}
      />
    </div>
  );
};

export default SearchBox;
