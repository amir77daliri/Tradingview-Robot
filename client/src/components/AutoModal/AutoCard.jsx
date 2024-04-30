import React from "react";

const AutoCard = ({ currency, index, autoItems, setAutoItems }) => {
  const handleAddOrRemoveItem = (item) => {
    setAutoItems(autoItems.filter((s) => s !== item));
  };

  return (
    <>
      <div
        className="p-2 hover:rounded hover:shadow hover:shadow-gray-500 hover:bg-gray-50"
        key={index}
      >
        <div
          className="flex flex-row justify-start items-center border-b-2"
          style={{ userSelect: "none" }}
        >
          <button
            onClick={() => handleAddOrRemoveItem(currency)}
            className="text-red-500 mr-3 hover:bg-blue-200 hover:rounded-md hover:cursor-pointer w-4 text-center text-lg"
          >
            X
          </button>
          <div className="grid grid-cols-7 mt-2 pb-2   flex-grow items-center ">
            <div className="col-span-1 flex flex-row items-center">
              <div className="text-center w-10">
                <img
                  className="w-7 h-7 rounded-full lg:w-8 lg:h-8"
                  src={currency.cLogo}
                  alt="loading..."
                />
              </div>
            </div>

            <div
              className="col-span-3 md:col-span-4 ml-3 flex flex-col justify-start items-center md:flex-row"
              style={{ alignItems: "flex-start" }}
            >
              <div className="text-center mr-2">
                <span>{currency.symbol}</span>
              </div>
              <div className="text-gray-400">
                {currency.description.slice(0, 40)}
                {currency.description.length > 40 ? "..." : ""}
              </div>
            </div>

            <div className="col-span-3 md:col-span-2 flex flex-row justify-between items-center">
              <div className="w-3/4 mr-4 flex flex-col justify-normal items-center lg:flex-row">
                <div className="text-gray-400">{`${currency["type"]}`}</div>
                <div className="ml-2">{currency.exchange}</div>
              </div>
              <div className="w-1/4">
                <img
                  className="w-6 h-6 lg:w-8 lg:h-8 rounded-full"
                  src={currency.bLogo}
                  alt="fail"
                  onError={(e) => (e.target.src = currency.cLogo)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AutoCard;
