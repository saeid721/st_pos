import { AiOutlinePlus } from "react-icons/ai";
import { CiViewList } from "react-icons/ci";
import React, { useMemo, useState } from "react";
import { useTable, useColumnOrder, useSortBy, useGlobalFilter, usePagination, useRowSelect, useFilters } from "react-table";
import { GlobalFilter } from "./table_help/GlobalFilter";
import { ColumnFilter } from "./table_help/ColumnFilter";
import SelectFilter from "./table_help/SelectFilter";
import PaginationBar from "./table_help/PaginationBar";
import TableComponent from "./table_help/TableComponant";
import { Card } from "../../ui/card";
import { Link, useLocation } from "react-router-dom";
import { BsTrashFill } from "react-icons/bs";
import { AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import Status from "../Status/Status";
import { useGetRolePermissionByRoleIdQuery } from "../../../store/api/app/Roles/rolesApiSlice";
import { useSelector } from "react-redux";
import hasPermission from "../../../utils/hasPermission";
import hasStorePermission from "../../../utils/hasStorePermission";
import { Download, Printer, RefreshCw } from "lucide-react";
import ActionIconButton from "../ui/ActionIconButton";

const CustomPaginationTable = ({
  paginationPage,
  pageCount,
  onPageChange,
  limit,
  onLimitChange,
  columns,
  data,
  sortDirection,
  setSortDirection,
  addNewButton = true,
  showViewAction = false,
  showEditAction = false,
  showDeleteAction = false,
  showDetailAction = false,
  detailActionPath = "",
  handleView,
  handleDelete,
  editPath,
  onSearch,
  path,
  showStatus = true,
  heading,
  printButton = false,
  exportButton = false,
  setPrintButtonClick,
  setPdfButtonClick,
  onRefresh,
}) => {
  const location = useLocation();
  const pathname = location.pathname;

  const defaultColumn = useMemo(
    () => ({
      Filter: ColumnFilter,
    }),
    []
  );
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (searchValue) => {
    if (searchValue !== searchTerm) {
      // Only reset page if the search term has changed
      setSearchTerm(searchValue);
      onPageChange(1);
      gotoPage(0);
    }
    onSearch(searchValue);
  };

  const handleChangePagePerView = (e) => {
    e.preventDefault();
    onLimitChange(Number(e.target.value));
    onPageChange(1);
    gotoPage(0);
  };

  const memoizedColumns = useMemo(() => {
    const serialColumn = {
      id: "serial",
      Header: "#",
      Cell: ({ row }) => {
        return <span>{row.index + 1 + (paginationPage - 1) * limit}</span>;
      },
    };
    const actionColumn = {
      id: "actions",
      Header: "Actions",
      Cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            {showViewAction &&
              (pathname.includes("/store/dashboard") || pathname.includes("/admin/dashboard")) &&
              ((pathname.includes("/store/dashboard") && hasStorePermission(`READ_${path}`)) ||
                (pathname.includes("/admin/dashboard") && hasPermission(`READ_${path}`))) && (
                <Link to={`${editPath}/${row.original.id}`}>
                  <button className="bg-[#6366F1] text-gray-200 hover:text-white font-bold py-1 px-2 rounded text-lg">
                    <AiOutlineEye />
                  </button>
                </Link>
              )}
            {showEditAction &&
              ((pathname.includes("/store/dashboard") && hasStorePermission(`UPDATE_${path}`)) ||
                (pathname.includes("/admin/dashboard") && hasPermission(`UPDATE_${path}`))) && (
                <Link to={`${editPath}/${row.original.id}/edit`}>
                  <button className="bg-[#17A2B8] text-gray-200 hover:text-white font-bold py-1 px-2 rounded text-lg">
                    <AiOutlineEdit />
                  </button>
                </Link>
              )}
            {showDeleteAction &&
              ((pathname.includes("/store/dashboard") && hasStorePermission(`DELETE_${path}`)) ||
                (pathname.includes("/admin/dashboard") && hasPermission(`DELETE_${path}`))) && (
                <button
                  onClick={() => handleDelete(row.original.id)}
                  className="bg-[#DC3545] text-gray-200 hover:text-white font-bold py-1 px-2 rounded text-lg"
                >
                  <BsTrashFill />
                </button>
              )}
            {showDetailAction &&
              [
                "genres",
                "selected_movies",
                "selected_series",
                "slider_poster",
                "favorite_personalities",
                "recent",
                "top_movies",
                "top_series",
              ].includes(row.original?.section_type) &&
              hasPermission(`UPDATE_${path}`) && (
                <Link to={`${editPath}/${row.original.id}/${detailActionPath}details`}>
                  <button className="text-black hover:text-blue-500 font-bold py-1 px-2 rounded text-lg">
                    <CiViewList />
                  </button>
                </Link>
              )}
          </div>
        );
      },
    };

    const statusColumn = showStatus
      ? {
        id: "status",
        Header: "Status",
        accessor: (row) => row?.original?.id,
        Cell: ({ row }) => <Status status={row?.original?.status} id={row?.original?.id} />,
      }
      : null;

    return [
      serialColumn,
      ...columns,
      ...(showStatus ? [statusColumn] : []), // Include statusColumn only if showStatus is true
      ...(showViewAction || showEditAction || showDeleteAction ? [actionColumn] : []),
    ].filter(Boolean); // Remove any null/undefined columns
  }, [columns, showStatus, showViewAction, showEditAction, showDeleteAction, handleView, handleDelete, editPath]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state: { globalFilter },
    gotoPage,
  } = useTable(
    {
      columns: memoizedColumns,
      data,
      initialState: {
        pageIndex: paginationPage - 1,
        pageSize: limit,
      },
      manualPagination: true,
      pageCount,
      defaultColumn,
    },
    useColumnOrder,
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination,
    useRowSelect
  );

  const handleSort = (column) => {
    setSortDirection((prevDirection) => (prevDirection === "desc" ? "asc" : "desc"));
    column.toggleSortBy(sortDirection === "desc", false);
  };

  const handlePageChange = (newPage) => {
    onPageChange(newPage);
    gotoPage(newPage - 1);
  };
  const handlePreviousPage = () => {
    if (paginationPage > 1) {
      onPageChange(paginationPage - 1);
    }
  };

  const handleNextPage = () => {
    if (paginationPage < pageCount) {
      onPageChange(paginationPage + 1);
    }
  };



  return (
    <>
      <Card className="p-6 mt-10">
        <div className="lg:flex justify-between items-center mb-5">
          <GlobalFilter onSearch={handleSearch} />
          <div className="flex flex-wrap items-center justify-center gap-1">
            {onRefresh && (
              <ActionIconButton
                tooltip="Refresh"
                onClick={onRefresh}
                className="bg-green-600 hover:bg-green-700"
                icon={<RefreshCw size={18} />}
              />
            )}
            {
              exportButton && (
                <ActionIconButton
                  tooltip="Export Table"
                  onClick={() => setPdfButtonClick(true)}
                  className="bg-slate-600 hover:bg-slate-700"
                  icon={<Download size={18} />}
                />
              )
            }
            {
              printButton && (
                <ActionIconButton
                  tooltip="Print"
                  onClick={() => setPrintButtonClick(true)}
                  className="bg-cyan-600 hover:bg-cyan-700"
                  icon={<Printer size={18} />}
                />
                /*
                  <button
                    type="button"
                    title="Print table"
                    class="flex items-center gap-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-1 px-2 rounded mt-2 ml-2 group"
                    onClick={() => setPrintButtonClick(true)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2m-6 0v4m0 0h4m-4 0H8" />
                    </svg>
                    Print
                  </button>
                  <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                    Print table
                  </div>
                </div> */
              )
            }
            <div className="text-center">
              {addNewButton &&
                ((pathname.includes("/store/dashboard") && hasStorePermission(`CREATE_${path}`)) ||
                  (pathname.includes("/admin/dashboard") && hasPermission(`CREATE_${path}`))) && (
                  <Link to={pathname.includes('store/dashboard/view-inventory') ? '/store/dashboard/product/new' : `${pathname}/new`}>
                    <ActionIconButton
                      tooltip={addNewButton.label || "Add New"}
                      className="bg-[#6366F1] hover:bg-green-700"
                      icon={<AiOutlinePlus size={20} />}
                    />
                  </Link>
                )}
            </div>
          </div>
        </div>
        <TableComponent
          getTableProps={getTableProps}
          getTableBodyProps={getTableBodyProps}
          headerGroups={headerGroups}
          page={page}
          prepareRow={prepareRow}
          handleSort={handleSort}
          sortDirection={sortDirection}
        />
        <PaginationBar
          pageCount={pageCount}
          pageIndex={paginationPage - 1}
          gotoPage={(page) => handlePageChange(page + 1)}
          previousPage={handlePreviousPage}
          nextPage={handleNextPage}
          canPreviousPage={paginationPage > 1}
          canNextPage={paginationPage < pageCount}
          pageSize={limit}
          handleChangePagePerView={handleChangePagePerView}
        />
      </Card>
    </>
  );
};

export default CustomPaginationTable;
