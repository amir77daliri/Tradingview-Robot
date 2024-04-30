import React from "react";

const CurrencyCard = ({ currency, index, setSelectedItem, onClose }) => {
  return (
    <div
      className="p-2 hover:bg-blue-200 hover:cursor-pointer hover:border-4 hover:border-gray-300 hover:rounded hover:shadow hover:shadow-gray-500"
      key={index}
      onClick={() => {
        setSelectedItem(currency);
        onClose();
      }}
    >
      <div className="grid grid-cols-7 mt-2 pb-2  border-b-2 ">
        <div className="col-span-1 flex flex-row items-center">
          <div className="text-center w-10">
            <img
              className="w-7 h-7 rounded-full"
              src={currency.cLogo}
              alt="loading..."
            />
          </div>
        </div>

        <div
          className="col-span-3 md:col-span-4 ml-3 flex flex-col justify-start items-center xl:flex-row"
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
          <div className="w-3/4 mr-4 flex flex-col justify-normal items-center 2xl:flex-row">
            <div className="text-gray-400">{`${currency["type"]}`}</div>
            <div className="ml-2">{currency.exchange}</div>
          </div>
          <div className="w-1/4">
            <img
              className="w-6 h-6 rounded-full"
              src={currency.bLogo}
              alt="loading..."
              onError={(e) => (e.target.src = currency.cLogo)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyCard;
