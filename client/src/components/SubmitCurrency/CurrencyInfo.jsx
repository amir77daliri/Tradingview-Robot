const CurrencyInfo = ({selectedItem}) => {
  return (
    <>
      {/* Currency Section */}
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-gray-300 rounded-full mr-4">
          <img
            className="rounded-full w-full"
            src={selectedItem.cLogo}
            alt="loading ..."
          />
        </div>{" "}
        {/* Replace with actual currency logo */}
        <div>
          <p className="text-lg font-semibold text-red-500">
            {selectedItem.symbol}
            <span className="ml-3 text-gray-500">
              {selectedItem.description}
            </span>
          </p>{" "}
          {/* Replace with actual currency name */}
        </div>
      </div>
    </>
  );
};

export default CurrencyInfo;
