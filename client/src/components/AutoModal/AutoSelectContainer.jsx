import AutoCard from "./AutoCard";

const AutoSelectContainer = ({
  autoItems,
  setAutoItems,
}) => {
  return (
    <>
      {/* Symbols List */}
      <div>
        <div className="w-full grid grid-cols-1 gap-1">
          {autoItems.map((currency, index) => (
            <AutoCard
              key={index}
              currency={currency}
              index={index}
              autoItems={autoItems}
              setAutoItems={setAutoItems}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default AutoSelectContainer;
