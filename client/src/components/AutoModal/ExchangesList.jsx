import EXCHANGES from "../../utils/popularExchanges";

const ExchangesList = ({ setSelectedExchange, setShowExchangeList }) => {
  return (
    <div className="w-full">
      <div
        className="w-1/2 md:w-1/3 flex flex-row justify-start items-center bg-blue-300 text-white my-4 p-3 rounded-md hover:bg-blue-500 hover:cursor-pointer"
        onClick={() => {
          setSelectedExchange(null);
          setShowExchangeList(false);
        }}
      >
        <div className="mr-3">
          <span className="w-7 h-7">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 18 18"
              width="22"
              height="22"
              fill="none"
            >
              <path
                stroke="currentColor"
                d="M2.5 14.5c1.68-1.26 3.7-2 6.5-2s4.91.74 6.5 2m-13-11c1.68 1.26 3.7 2 6.5 2s4.91-.74 6.5-2"
              ></path>
              <circle stroke="currentColor" cx="9" cy="9" r="8.5"></circle>
              <path
                stroke="currentColor"
                d="M13.5 9c0 2.42-.55 4.58-1.4 6.12-.87 1.56-1.98 2.38-3.1 2.38s-2.23-.82-3.1-2.38c-.85-1.54-1.4-3.7-1.4-6.12s.55-4.58 1.4-6.12C6.77 1.32 7.88.5 9 .5s2.23.82 3.1 2.38c.85 1.54 1.4 3.7 1.4 6.12z"
              ></path>
            </svg>
          </span>
        </div>
        <div>
          <p className="sm:hidden">All</p>
          <p className="hidden sm:inline-block">All Exchanges</p>
        </div>
      </div>

      {/* Exchange List */}
      <div className="w-full">
        <div className="w-full">
          {/* Cryptocurrency  */}
          <div className="mb-4 ">
            <p className="text-sm text-gray-400">CRYPTOCURRENCY</p>
          </div>
          <div className="grid grid-cols-2 gap-1 ">
            {EXCHANGES["CRYPTOCURRENCY"].map((ex, index) => (
              <div
                key={index}
                className="flex flex-row justify-start items-center my-1 hover:bg-blue-200 rounded-md p-1 px-2 hover:cursor-pointer"
                onClick={() => {
                  setSelectedExchange(ex);
                  setShowExchangeList(false);
                }}
              >
                <img
                  src={ex.src}
                  className="w-7 h-7 rounded-full mr-4 ml-1"
                  alt=""
                />
                <h1 className="text-lg">{ex.name}</h1>
              </div>
            ))}
          </div>

          {/* Forex & FCD */}

          <div className="my-3">
            <p className="text-sm text-gray-400">Forex & FCD</p>
          </div>
          <div className="grid grid-cols-2 gap-1">
            {EXCHANGES["FOREX & CFD"].map((ex, index) => (
              <div
                key={index}
                className="flex flex-row justify-start items-center my-1 hover:bg-blue-200 rounded-md p-1 px-2 hover:cursor-pointer"
                onClick={() => {
                  setSelectedExchange(ex);
                  setShowExchangeList(false);
                }}
              >
                <img
                  src={ex.src}
                  className="w-7 h-7 rounded-full mr-4"
                  alt=""
                />
                <h3>{ex.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExchangesList;
