const Pagination = ({pageItem, setPageItem, remainingSymbols}) => {

  const handleNextPage = async () => {
    setPageItem(pageItem + 1);
  };

  const handlePrevPage = async () => {
    setPageItem(pageItem - 1);
  };

  return (
    <>
      {/* simple pagination */}
      <div className="flex justify-center items-center space-x-4 mt-4">
        <button
          onClick={handlePrevPage}
          disabled={pageItem + 1 === 1}
          className={`px-4 py-2 bg-blue-500 text-white rounded ${
            pageItem + 1 === 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-700"
          }`}
        >
          {"<"}
        </button>
        <span className="text-lg">{pageItem + 1}</span>
        <button
          onClick={handleNextPage}
          disabled={remainingSymbols === 0}
          className={`px-4 py-2 bg-blue-500 text-white rounded ${
            remainingSymbols === 0
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-700"
          }`}
        >
          {">"}
        </button>
      </div>
    </>
  );
};

export default Pagination;