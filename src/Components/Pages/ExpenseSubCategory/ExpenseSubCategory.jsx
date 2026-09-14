import React, { useEffect, useMemo, useState } from "react";
import CustomPaginationTable from "../../Shared/Tables/CustomPaginationTable";
import useDelete from "../../Shared/Constant/hooks/useDelete";
import { Loader } from "lucide-react";
import { useSelector } from "react-redux";
import { useGetExpenseCategoryByPaginationQuery } from "../../../store/api/app/ExpenseCategory/expenseCategoriesApiSlice";
import ExpenseSubCategoryView from "./ExpenseSubCategoryView";
import { useGetExpenseSubCategoryByPaginationQuery } from "../../../store/api/app/ExpenseSubCategory/expenseSubCategoriesApiSlice";
import ExpenseSubCategoryPdf from "./ExpenseSubCategoryPdf";
import ExpenseSubCategoryPrint from "./ExpenseCategoryPrint";

const ExpenseSubCategory = () => {
  const [selectedData, setSelectedData] = useState(null);
  const [paginationPage, setPaginationPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [limit, setLimit] = useState(10);
  const [order, setOrder] = useState("desc");
  const [search, setSearch] = useState("");
  const [printButtonClick, setPrintButtonClick] = useState(false);
  const [pdfButtonClick, setPdfButtonClick] = useState(false);

  const { isAuth, auth } = useSelector((state) => state.auth);

  console.log("auth", auth);

  const { data, isLoading, isError, error, refetch } = useGetExpenseSubCategoryByPaginationQuery({
    page: paginationPage,
    limit: limit,
    order: order,
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
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Code",
        accessor: "code",
      },
      {
        Header: "Note",
        accessor: "note",
      },
      {
        Header: "Branch",
        accessor: "branch.name",
      },
      {
        Header: "Expense Category",
        accessor: "expense_category.name",
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
            label: "Add Expense Sub Category",
          }}
          showViewAction={false}
          showEditAction={true}
          showDeleteAction={true}
          handleView={handleView}
          handleEdit={() => { }}
          handleDelete={handleDelete}
          editPath="/store/dashboard/expense-sub-category"
          paginationPage={paginationPage}
          pageCount={pageCount}
          onPageChange={(newPage) => setPaginationPage(newPage)}
          onSearch={handleSearch}
          path={"EXPENSE_SUB_CATEGORY"}
          printButton={true}
          exportButton={true}
          setPrintButtonClick={setPrintButtonClick}
          setPdfButtonClick={setPdfButtonClick}
          onRefresh={refetch}
        />
      )}

      {
        printButtonClick && <ExpenseSubCategoryPrint setPrintButtonClick={setPrintButtonClick} newColumns={columns} />
      }
      {pdfButtonClick && <ExpenseSubCategoryPdf setPdfButtonClick={setPdfButtonClick} newColumns={columns} />}

      {/* <ExpenseSubCategoryView isOpen={isModalOpen} onClose={handleCloseModal} data={selectedData} title="Feature" /> */}
    </div>
  );
};

export default ExpenseSubCategory;
