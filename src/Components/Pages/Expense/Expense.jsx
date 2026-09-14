import React, { useEffect, useMemo, useState } from "react";
import CustomPaginationTable from "../../Shared/Tables/CustomPaginationTable";
import useDelete from "../../Shared/Constant/hooks/useDelete";
import { Loader } from "lucide-react";
import { useSelector } from "react-redux";
import { useGetExpenseSubCategoryByPaginationQuery } from "../../../store/api/app/ExpenseSubCategory/expenseSubCategoriesApiSlice";
import ExpenseView from "./ExpenseView";
import { useGetExpenseByPaginationQuery } from "../../../store/api/app/Expense/expenseApiSlice";
import ExpensePrint from "./ExpensePrint";
import ExpensePdf from "./ExpensePdf";

const Expense = () => {
  const [selectedData, setSelectedData] = useState(null);
  const [paginationPage, setPaginationPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [limit, setLimit] = useState(10);
  const [order, setOrder] = useState("desc");
  const [search, setSearch] = useState("");
  const [branchId, setBranchId] = useState(null);
  const [printButtonClick, setPrintButtonClick] = useState(false);
  const [pdfButtonClick, setPdfButtonClick] = useState(false);

  const { isAuth, auth } = useSelector((state) => state.auth);

  console.log("auth", auth);

  const branch = localStorage.getItem("branch_id");

  useEffect(() => {
    if (branch) {
      const parsedData = JSON.parse(branch);
      setBranchId(parsedData);
    } else {
      console.log("No data found in localStorage.");
    }
  }, [branch]);
  console.log("branchId", branchId);

  const { data, isLoading, isError, error } = useGetExpenseByPaginationQuery({
    page: paginationPage,
    limit: limit,
    order: order,
    branch_id: branchId,
    search: search,
  });
  const { handleDelete } = useDelete();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleView = (rowData) => {
    setSelectedData(rowData);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const columns = useMemo(
    () => [
      {
        Header: "Image",
        accessor: "image_path",
      },
      {
        Header: "Expense Reason",
        accessor: "reason",
      },
      {
        Header: "Category",
        accessor: "expense_category.name",
      },
      {
        Header: "Sub Category",
        accessor: "expense_sub_category.name",
      },
      {
        Header: "Amount",
        accessor: "amount",
      },
      {
        Header: "Account",
        accessor: "account_transaction.account.bank_name",
      },
      {
        Header: "Date",
        accessor: "date",
        Cell: ({ value }) => {
          // Format the date
          return new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }).format(new Date(value));
        },
      },
    ],
    []
  );

  useEffect(() => {
    if (data?.data?.pagination) {
      setPageCount(data?.data?.pagination?.total_page);
    }
  }, [data]);

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
  };

  const handleSearch = (value) => {
    setSearch(value);
  };

  return (
    <div>
      {isLoading && <Loader />}
      {isError && <p>Error: {error.message}</p>}
      {!isLoading && !isError && data && (
        <CustomPaginationTable
          limit={limit}
          onLimitChange={handleLimitChange}
          columns={columns}
          data={data?.data?.result}
          sortDirection={order}
          setSortDirection={setOrder}
          addNewButton={{
            label: "Add Expense",
          }}
          showViewAction={true}
          showEditAction={true}
          showDeleteAction={true}
          handleView={handleView}
          handleEdit={() => { }}
          handleDelete={handleDelete}
          editPath="/store/dashboard/expenses"
          paginationPage={paginationPage}
          pageCount={pageCount}
          onPageChange={(newPage) => setPaginationPage(newPage)}
          onSearch={handleSearch}
          path={"EXPENSE"}
          printButton={true}
          exportButton={true}
          setPrintButtonClick={setPrintButtonClick}
          setPdfButtonClick={setPdfButtonClick}
        />
      )}

      {
        printButtonClick && <ExpensePrint setPrintButtonClick={setPrintButtonClick} newColumns={columns} />
      }
      {
        pdfButtonClick && <ExpensePdf setPdfButtonClick={setPdfButtonClick} newColumns={columns} />
      }

      {/* <ExpenseView isOpen={isModalOpen} onClose={handleCloseModal} data={selectedData} title="Feature" /> */}
    </div>
  );
};

export default Expense;
