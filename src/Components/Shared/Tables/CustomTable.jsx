import React from "react";
import { AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import { BsTrashFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useGlobalFilter, useSortBy, useTable } from "react-table";
import hasPermission from "../../../utils/hasPermission";
import { Card } from "../../ui/card";
import Status from "../Status/Status";
import { AiOutlinePlus } from "react-icons/ai";
import ActionIconButton from "../ui/ActionIconButton";

const CustomTable = ({
  columns,
  data,
  onAddNew,
  showViewAction = false,
  showEditAction = false,
  showDeleteAction = false,
  showAddNewButton = true,
  handleView,
  handleDelete,
  editPath,
  showStatus = false,
  sectionId = false,
  path,
  permissions = true,
}) => {
  const tableColumns = React.useMemo(() => {
    const serialColumn = {
      Header: "#",
      id: "serial",
      Cell: ({ row }) => {
        return <span>{row.index + 1}</span>;
      },
    };
    const baseColumns = [serialColumn, ...columns];

    if (showStatus) {
      baseColumns.push({
        Header: "Status",
        accessor: "status",
        Cell: ({ value, row }) => {
          console.log(row.original.id);
          return <Status status={value} id={row.original.id} />;
        },
      });
    }

    if (showViewAction || showEditAction || showDeleteAction) {
      baseColumns.push({
        Header: "Actions",
        Cell: ({ row }) => {
          return (
            <div className="flex space-x-2">
              {showViewAction && (permissions ? hasPermission(`READ_${path}`) : true) && (
                <button
                  onClick={() => {
                    handleView(row.original);
                  }}
                  className="bg-[#6366F1] text-gray-200 hover:text-white  font-bold py-1 px-2 rounded text-lg"
                >
                  <AiOutlineEye />
                </button>
              )}
              {showEditAction && (permissions ? hasPermission(`UPDATE_${path}`) : true) && (
                <Link to={`${editPath}/${row.original.id}/edit`}>
                  <button className=" bg-[#17A2B8] text-gray-200 hover:text-white font-bold py-1 px-2 rounded text-lg">
                    <AiOutlineEdit />
                  </button>
                </Link>
              )}
              {showDeleteAction && (permissions ? hasPermission(`DELETE_${path}`) : true) && (
                <button
                  onClick={() => {
                    handleDelete(row.original.id);
                  }}
                  className="bg-[#DC3545] text-gray-200 hover:text-white font-bold py-1 px-2 rounded text-lg"
                >
                  <BsTrashFill />
                </button>
              )}
            </div>
          );
        },
      });
    }

    return baseColumns;
  }, [columns, showViewAction, showEditAction, showDeleteAction, showStatus, handleView, handleDelete, editPath]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state, setGlobalFilter } = useTable(
    {
      columns: tableColumns,
      data,
    },
    useGlobalFilter,
    useSortBy
  );

  const { globalFilter } = state;

  const handleImageError = (e) => {
    e.target.src = "/fallBack_Image.jpg"; // Replace with your fallback image URL
  };
  const backendUrl = import.meta.env.VITE_LOCAL_API_URL;
  return (
    <Card className="p-6 mt-10">
      <div className="lg:flex justify-between items-center">
        <div className="flex items-center justify-center">
          <div className="relative w-full max-w-lg">
            <input
              value={globalFilter || ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search..."
              className="w-full pl-12 pr-4 py-1 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="md:flex gap-1 lg:gap-3 justify-center items-center">
          <div className="text-center">
            {onAddNew && showAddNewButton && (
              <ActionIconButton
                tooltip="Add New"
                onClick={onAddNew}
                className="bg-black hover:bg-green-700"
                icon={<AiOutlinePlus size={20} />}
              />
            )}
          </div>
        </div>
      </div>
      <div className="overflow-x-auto py-2 sm:rounded-lg">
        <table {...getTableProps()} className="min-w-full">
          <thead className="bg-[#EDF2F7] text-black ">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="px-3 py-2 text-left text-sm font-bold uppercase tracking-wider border border-1 border-grey-500"
                    key={column.id}
                  >
                    {column.render("Header")}
                    <span>{column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}</span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={row.id} className="">
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className="px-3 py-2 whitespace-nowrap border border-1 border-grey-500"
                      key={cell.column.id}
                    >
                      {(() => {
                        if (cell.column.Header === "Thumbnail" || cell.column.Header === "Cover") {
                          return (
                            <img
                              src={`${backendUrl}${cell.value}`}
                              alt="Cast"
                              className="w-16 h-16 object-cover rounded-full"
                              onError={handleImageError}
                            />
                          );
                        } else {
                          return cell.render("Cell");
                        }
                      })()}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default CustomTable;
