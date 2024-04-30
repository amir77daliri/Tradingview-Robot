import CurrencyCard from "./CurrencyCard";

const CurrencyConatiner = ({data, onClose, setSelectedItem}) => {
  return (
    <>
      {/* Symbols List */}
      <div>
        <div className="w-full grid grid-cols-1 gap-1">
          {data.length > 0 ? data.map((currency, index) => (
            <CurrencyCard onClose={onClose} setSelectedItem={setSelectedItem} currency={currency} index={index} key={index}/>
          )) : (
            <div className="text-center mt-20 text-red-500">
            <h3 className="text-red-500">
              ارزی با مشخصات مورد نظر یافت نشد! 🤷‍♂️
            </h3>
          </div>
          )}
        </div>
      </div>

    </>
  );
};

export default CurrencyConatiner;