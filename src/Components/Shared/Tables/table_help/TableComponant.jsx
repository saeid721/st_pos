import React from "react";

const TableComponent = ({
  getTableProps = () => ({}),
  getTableBodyProps = () => ({}),
  headerGroups = [],
  page = [],
  prepareRow = () => {},
  handleSort = () => {},
}) => {
  const handleImageError = (e) => {
    e.target.src = "/fallBack_Image.jpg"; // Replace with your fallback image URL
  };
  const backendUrl = import.meta.env.VITE_LOCAL_API_URL;
  return (
    <div className="flex flex-col w-full max-w-full">
      <div className="overflow-hidden shadow-md sm:rounded-lg">
        <div className="overflow-x-auto w-full bg-white scrollbar-custom">
          <div className="py-1 inline-block min-w-full">
            <table className="min-w-full" {...getTableProps()}>
              <thead className="bg-[#EDF2F7] text-black ">
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps()}
                        onClick={() => handleSort(column)}
                        scope="col"
                        className="text-sm font-bold  px-3 py-2 text-left border border-1 border-grey-500"
                        key={column.id}
                      >
                        {column.render("Header")}
                        <span>{column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}</span>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.map((row) => {
                  prepareRow(row);
                  return (
                    <tr className="" {...row.getRowProps()} key={row.id}>
                      {row.cells?.map((cell) => (
                        <td
                          className="text-base text-gray-900 px-3 py-2 whitespace-nowrap border border-1 border-grey-500"
                          {...cell.getCellProps()}
                          key={cell.column.id}
                        >
                          {cell.column.Header === "Image" ||
                          cell.column.Header === "Banner" ||
                          cell.column.Header === "Cover" ||
                          cell.column.Header === "Thumbnail" ||
                          cell.column.Header === "Profile" ||
                          cell.column.Header === "Icon" ? (
                            <img
                              src={`${backendUrl}${cell.value}`}
                              alt="Cast"
                              className="w-16 h-16 object-cover rounded-full"
                              onError={handleImageError}
                            />
                          ) : (
                            cell.render("Cell")
                          )}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableComponent;
