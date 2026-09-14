import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PaginationBar = ({
  gotoPage,
  previousPage,
  nextPage,
  canPreviousPage,
  canNextPage,
  pageCount,
  pageIndex,
  pageSize,
  handleChangePagePerView,
}) => {
  const [gotoPageInput, setGotoPageInput] = useState("");
  const renderPageButtons = () => {
    const buttons = [];
    const currentPage = pageIndex + 1 || 1;

    for (let i = 1; i <= pageCount; i++) {
      if (
        i === 1 ||
        i === pageCount ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        buttons.push(
          <button
            key={i}
            onClick={() => gotoPage(i - 1)}
            className={`w-8 h-8 flex items-center justify-center rounded-full ${
              i === currentPage
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {i}
          </button>
        );
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        buttons.push(
          <span key={i} className="text-gray-400">
            ...
          </span>
        );
      }
    }
    return buttons;
  };

  const handleGotoPage = (e) => {
    e.preventDefault();
    const page = parseInt(gotoPageInput, 10);
    if (page >= 1 && page <= pageCount) {
      gotoPage(page - 1);
      setGotoPageInput("");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 mt-4">
      <div className="flex items-center space-x-2">
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className={`p-2 rounded-full flex items-center justify-center ${
            canPreviousPage
              ? "text-gray-600 hover:bg-gray-100"
              : "text-gray-300 cursor-not-allowed"
          }`}
        >
          <ChevronLeft size={20} /> <span className="mb-1">Previous</span>
        </button>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600">Go:</span>
        <form onSubmit={handleGotoPage} className="flex items-center space-x-2">
          <input
            type="number"
            min="1"
            max={pageCount}
            value={gotoPageInput}
            onChange={(e) => setGotoPageInput(e.target.value)}
            className="w-16 px-2 py-1 border border-gray-500 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </form>
      </div>
      <div className="flex items-center space-x-2">{renderPageButtons()}</div>
      <div className="flex items-center space-x-2">
        <select
          value={pageSize}
          onChange={(e) => handleChangePagePerView(e)}
          className="px-2 py-1 rounded-md border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {[10, 20, 30, 40, 50]?.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className={`p-2 rounded-full flex items-center justify-center ${
            canNextPage
              ? "text-gray-600 hover:bg-gray-100"
              : "text-gray-300 cursor-not-allowed"
          }`}
        >
          <span className="mb-1">Next</span> <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default PaginationBar;
