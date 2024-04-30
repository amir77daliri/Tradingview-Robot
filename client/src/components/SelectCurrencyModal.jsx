import { useEffect, useState } from "react";
import useSymbols from "../Hooks/useSymbols";
import { useQueryClient } from "@tanstack/react-query";

// components :
import Spinner from "./Spinner/Spinner";
import CurrencyConatiner from "./CurrencyModal/CurrencyConatiner";
import Pagination from "./Pagination/Pagination";
import resetBtn from "../assets/resetBtn.png";
import SearchBox from "./SearchBox/Searchbox";

// utils :
import { typesCategory } from "../utils/categories";
let clearTime;

const SelectCurrencyModal = ({ setSelectedItem, isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [pageItem, setPageItem] = useState(0);
  const [activeType, setActiveType] = useState(0);
  const [pending, setPending] = useState(false);
  const queryClient = useQueryClient();

  const { data, isPending, isError, remainingSymbols } = useSymbols({
    start: pageItem,
    query: searchTerm,
    searchType: typesCategory[activeType].value,
  });

  useEffect(() => {
    setPending(isPending);
    if(data?.message) {
      setPending(false)
    }
  }, [isPending, data]);

  const symbolSearch = async (e) => {
    clearTimeout(clearTime);

    clearTime = setTimeout(() => {
      console.log(e.target.value);
      setSearchTerm(e.target.value);
      setPageItem(0);
    }, 800);
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      } transition-opacity ease-in-out duration-300`}
      style={{ direction: "ltr" }}
    >
      <div className="fixed inset-0 bg-gray-800 opacity-75"></div>
      <div className="relative w-3/4 lg:w-3/5 h-4/5 bg-white p-8 rounded-md shadow-md overflow-y-scroll">
        <div className="flex items-center justify-between mb-4 p-2">
          <h2 className="text-lg font-semibold">Symbol Search</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            X
          </button>
        </div>

        {/* Seacrh Box */}
        <SearchBox symbolSearch={symbolSearch} />

        {/* Types Category */}
        <div className="flex flex-row flex-nowrap overflow-x-auto overflow-y-hidden sm:flex-wrap mb-3">
          {typesCategory.map((item, index) => (
            <span
              style={{ userSelect: "none" }}
              key={index}
              onClick={() => setActiveType(index)}
              className={`${
                index === activeType
                  ? "bg-black text-white"
                  : "bg-blue-100 text-black hover:bg-blue-200"
              } mt-2 mr-2 p-1  rounded-full hover:cursor-default`}
            >
              <span className="p-3">{item.label}</span>
            </span>
          ))}
        </div>
        <hr />

        {/* spinner while fetching symbols */}
        {pending && <Spinner />}

        {/* Error if fetching failed */}
        {!pending && isError && (
          <div className="text-center flex flex-col justify-center items-center h-3/5 text-red-500">
            <h3 className="text-red-500">
              خطا در دریافت اطلاعات، مجددا تلاش نمایید.
            </h3>
            <img
              src={resetBtn}
              alt=""
              className="hover:cursor-pointer"
              onClick={() => {
                queryClient.refetchQueries({
                  queryKey: [
                    "symbols",
                    {
                      start: pageItem,
                      query: searchTerm,
                    },
                  ],
                });
                setPending(true);
              }}
            />
          </div>
        )}

        {/* Show Symbols */}
        {data && (
          <>
            <CurrencyConatiner
              data={data}
              onClose={onClose}
              setSelectedItem={setSelectedItem}
            />
            {data.length > 0 ? (
              <Pagination
                pageItem={pageItem}
                setPageItem={setPageItem}
                remainingSymbols={remainingSymbols}
              />
            ) : null}
          </>
        )}

        {/* End */}
      </div>
    </div>
  );
};

export default SelectCurrencyModal;
