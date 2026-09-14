import { AiFillFileExcel } from "react-icons/ai";

import Pagination from "../ui/Pagination";
import { Icon } from "@iconify/react";
// import { Tooltip } from 'chart.js';
import Loading from "../Loading/Loading";
import Button from "../ui/Button";
import Tooltip from "../ui/Tooltip";
import useDelete from "../Constant/hooks/useDelete";
import React, { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";

import Status from "../Status/Status";

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input
          type="checkbox"
          ref={resolvedRef}
          {...rest}
          className="table-checkbox"
        />
      </>
    );
  }
);

const CustomPaginationTable = ({
  title,
  COLUMNS,
  data,
  paginationPage = 1,
  setPaginationPage = () => {},
  limit = 10,
  setLimit = () => {},
  order = "desc",
  setOrder = () => {},
  search = "",
  setSearch = () => {},

  rowSelect = false,
  defaultSL = true,
  defaultStatus = true,
  defaultAction = true,
  addNew = true,
  isSearch = true,
  isView = true,
  isEdit = true,
  isDelete = true,

  isLogin = false,

  setSelectedIds = () => {},
  create,

  control,

  fromDate,
  setFromDate,
  toDate,
  setToDate,
  isPaginationShow = true,
  isDateShow = false,

  isFetching,

  watch,
}) => {
  const navigate = useNavigate();
  const { handleDelete } = useDelete();

  const { isAuth, auth } = useSelector((state) => state.auth);

  const columns = useMemo(
    () => [
      ...(defaultSL
        ? [
            {
              Header: "SL",
              accessor: "#",
              Cell: ({ row }) => {
                return <span>{row.index + 1}</span>;
              },
            },
          ]
        : []),

      ...COLUMNS,

      ...(defaultStatus
        ? [
            {
              Header: "Status",
              accessor: "status",
              Cell: (row) => (
                <Status
                  id={row?.cell?.row?.original?.id}
                  status={row?.cell?.value}
                />
              ),
            },
          ]
        : []),

      ...(defaultAction
        ? [
            {
              Header: "Actions",
              accessor: "id",
              Cell: (row) => {
                return (
                  <div className="flex space-x-3 rtl:space-x-reverse">
                    {isView && (
                      <Tooltip
                        content="View"
                        placement="top"
                        arrow
                        animation="shift-away"
                      >
                        <button
                          onClick={() => navigate(`${row?.cell?.value}`)}
                          className="action-btn"
                          type="button"
                        >
                          <Icon icon="heroicons:eye" />
                        </button>
                      </Tooltip>
                    )}

                    {isLogin && (
                      <Tooltip
                        content="Login"
                        placement="top"
                        arrow
                        animation="shift-away"
                      >
                        <button
                          onClick={() => navigate(`${row?.cell?.value}`)}
                          className="action-btn"
                          type="button"
                        >
                          <Icon icon="ic:round-login" />
                        </button>
                      </Tooltip>
                    )}

                    {isEdit && (
                      <Tooltip
                        content="Edit"
                        placement="top"
                        arrow
                        animation="shift-away"
                      >
                        <button
                          onClick={() => navigate(`${row?.cell?.value}/edit`)}
                          className="action-btn"
                          type="button"
                        >
                          <Icon icon="heroicons:pencil-square" />
                        </button>
                      </Tooltip>
                    )}

                    {isDelete ? (
                      <Tooltip
                        content="Delete"
                        placement="top"
                        arrow
                        animation="shift-away"
                        theme="danger"
                      >
                        <button
                          onClick={() => handleDelete(row?.cell?.value)}
                          className="action-btn"
                          type="button"
                        >
                          <Icon icon="heroicons:trash" />
                        </button>
                      </Tooltip>
                    ) : null}
                  </div>
                );
              },
            },
          ]
        : []),
    ],
    []
  );

  const tableInstance = useTable(
    {
      columns,
      data: data?.result || [],
    },

    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,

    (hooks) => {
      if (rowSelect) {
        hooks.visibleColumns.push((columns) => [
          {
            id: "selection",
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <div>
                <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
              </div>
            ),
            Cell: ({ row }) => (
              <div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            ),
          },
          ...columns,
        ]);
      }
    }
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    page,

    state,

    setPageSize,
    setGlobalFilter,
    prepareRow,
    selectedFlatRows,
  } = tableInstance;

  // useEffect to update selectedIds when selectedFlatRows changes
  useEffect(() => {
    setSelectedIds(selectedFlatRows?.map((row) => row?.original));
  }, [selectedFlatRows, setSelectedIds]);

  const { pageIndex, pageSize } = state;
  const {
    currentPage,
    currentPageLimit,
    total,
    totalPage,
    prevPage,
    nextPage,
    prevPageLimit,
    nextPageLimit,
  } = data?.pagination || {
    currentPage: 1,
    currentPageLimit: 10,
    total: 0,
    totalPage: 1,
    prevPage: 1,
    nextPage: 1,
    prevPageLimit: 10,
    nextPageLimit: 10,
  };

  useEffect(() => {
    if (data?.pagination?.currentPageLimit) {
      setPageSize(limit);
    }
  }, []);

  return (
    <>
      <div className="md:flex justify-between items-center mb-6">
        <div className="md:flex md:w-[60%] gap-10 items-center">
          <h4 className="card-title">{title}</h4>
        </div>

        <div className="flex items-center justify-between gap-4">
          {addNew && (
            <div>
              <Button
                icon="heroicons-outline:plus"
                text={create ? create : "Add New Entry"}
                className="btn-dark bg-slate-800 dark:[#0F172A]  h-min text-sm font-normal"
                iconClass=" text-lg"
                onClick={() => navigate("new")}
              />
            </div>
          )}
        </div>
      </div>
      <div className="md:flex flex-wrap md:items-center mb-6 gap-4">
        {/* {isDateShow && (
                        <div className="md:w-[255px] mb-2">
                            <label htmlFor="" className="form-label">
                                From Date
                            </label>
                            <FlatpickerPage
                                fromDate={fromDate}
                                setFromDate={setFromDate}
                                fromDateShow={true}
                            />
                        </div>
                    )} */}

        {/* {isDateShow && (
                        <div className="md:w-[255px] mb-2">
                            <label htmlFor="" className="form-label">
                                To Date
                            </label>
                            <FlatpickerPage
                                toDate={toDate}
                                setToDate={setToDate}
                                toDateShow={true}
                            />
                        </div>
                    )} */}
      </div>
      <div className="overflow-x-auto -mx-6">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden ">
            <table
              className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700"
              {...getTableProps}
            >
              {isFetching && (
                <div className="w-screen flex justify-center mt-5">
                  <Loading />
                </div>
              )}
              <thead className="bg-slate-200 dark:bg-slate-700">
                {headerGroups?.map((headerGroup, idx) => (
                  <tr
                    {...headerGroup.getHeaderGroupProps()}
                    key={`parcel-table-head-row-${idx}`}
                  >
                    {headerGroup.headers?.map((column, idx) => (
                      <th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                        key={`parcel-table-head-col-${idx}`}
                        scope="col"
                        className=" table-th "
                      >
                        {column.render("Header")}
                        <span>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? " 🔽"
                              : " 🔼"
                            : ""}
                        </span>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>

              <tbody
                className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700"
                {...getTableBodyProps}
              >
                {page?.map((row, rowIndex) => {
                  prepareRow(row);
                  return (
                    <tr
                      {...row.getRowProps()}
                      key={`parcel-table-body-row-${rowIndex}`}
                    >
                      {row.cells?.map((cell, cellIndex) => {
                        return (
                          <>
                            {isFetching ? (
                              <span></span>
                            ) : (
                              <td
                                {...cell.getCellProps()}
                                className="table-td normal-case"
                              >
                                {(
                                  rowSelect && defaultSL
                                    ? cellIndex === 1
                                    : !rowSelect && defaultSL
                                    ? cellIndex === 0
                                    : false
                                )
                                  ? // count
                                    rowIndex + 1 + limit * (paginationPage - 1)
                                  : cell.render("Cell")}
                              </td>
                            )}
                          </>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {isPaginationShow && (
        <div className="md:flex md:space-y-0 space-y-5 justify-between mt-6 items-center">
          <div className=" flex items-center space-x-3 rtl:space-x-reverse">
            <select
              className="form-control py-2 w-max"
              value={limit}
              onChange={(e) => {
                setLimit(Number(e.target.value));
                setPageSize(Number(e.target.value));
              }}
            >
              {[1, 10, 25, 50, 100]?.map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Page{" "}
              <span>
                {currentPage} of {totalPage}
              </span>
            </span>

            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Total: <span>{total}</span>
            </span>
          </div>

          <Pagination
            currentPage={currentPage}
            handlePageChange={setPaginationPage}
            totalPages={totalPage}
            text={false}
          />
        </div>
      )}
    </>
  );
};

export default CustomPaginationTable;
