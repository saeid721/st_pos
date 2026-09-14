import React, { useEffect, useMemo, useState } from "react";
import CustomPaginationTable from "../../Shared/Tables/CustomPaginationTable";
import useDelete from "../../Shared/Constant/hooks/useDelete";
import { Loader } from "lucide-react";
import { useSelector } from "react-redux";
import { useGetLoansByPaginationQuery } from "../../../store/api/app/LoansApi/loansApiSlice";
import LoanView from "./LoanView";
import LoanPrint from "./LoanPrint";
import LoanPdf from "./LoanPdf";

const Loan = () => {
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

  const { data, isLoading, isError, error } = useGetLoansByPaginationQuery({
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
        Header: "Reference No",
        accessor: "reference_no",
      },
      {
        Header: "Authority",
        accessor: "authority.name",
      },
      {
        Header: "Account",
        accessor: "transaction.account.bank_name",
      },
      {
        Header: "Amount",
        accessor: "transaction.amount",
      },
      {
        Header: "Interest",
        accessor: "interest",
      },
      {
        Header: "Payable",
        accessor: "payable",
        Cell: ({ value }) => {
          return value?.toFixed(2);
        },
      },
      // {
      //   Header: "Due",
      //   accessor: "note",
      // },
      {
        Header: "Installment",
        accessor: "per_installment",
        Cell: ({ value }) => {
          return value?.toFixed(2);
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
            label: "Add Loan",
          }}
          showViewAction={true}
          showEditAction={true}
          showDeleteAction={true}
          handleView={handleView}
          handleEdit={() => { }}
          handleDelete={handleDelete}
          editPath="/store/dashboard/loans"
          paginationPage={paginationPage}
          pageCount={pageCount}
          onPageChange={(newPage) => setPaginationPage(newPage)}
          onSearch={handleSearch}
          path={"LOAN"}

          printButton={true}
          exportButton={true}
          setPrintButtonClick={setPrintButtonClick}
          setPdfButtonClick={setPdfButtonClick}
        />
      )}

      {
        printButtonClick && <LoanPrint setPrintButtonClick={setPrintButtonClick} newColumns={columns} />
      }
      {pdfButtonClick && <LoanPdf setPdfButtonClick={setPdfButtonClick} newColumns={columns} />}
    </div>
  );
};

export default Loan;
