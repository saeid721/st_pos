import React, { useEffect, useMemo, useState } from "react";
import CustomPaginationTable from "../../Shared/Tables/CustomPaginationTable";
import useDelete from "../../Shared/Constant/hooks/useDelete";
import { Loader } from "lucide-react";
import { useSelector } from "react-redux";
import { useGetLoansByPaginationQuery } from "../../../store/api/app/LoansApi/loansApiSlice";
import LoanPaymentView from "./LoanPaymentView";
import { useGetLoanPaymentsByPaginationQuery } from "../../../store/api/app/paymentsApi/paymentsApiSlice";
import LoanPaymentPrint from "./LoanPaymentPrint";
import LoanPaymentPdf from "./LoanPaymentPdf";

const LoanPayment = () => {
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

  const { data, isLoading, isError, error } = useGetLoanPaymentsByPaginationQuery({
    page: paginationPage,
    limit: limit,
    order: order,
    search: search,
  });

  console.log("data", data);
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
        Header: "Payment Ref.",
        accessor: "reference_no",
      },
      {
        Header: "Loan Ref.",
        accessor: "loan.reference_no",
      },
      {
        Header: "Authority",
        accessor: "loan.authority.name",
      },
      {
        Header: "Payable",
        accessor: "loan.payable",
        Cell: ({ value }) => {
          return value.toFixed(2);
        },
      },
      {
        Header: "Amount Paid",
        accessor: "amount",
        Cell: ({ value }) => {
          return value.toFixed(2);
        },
      },
      {
        Header: "Interest",
        accessor: "interest",
        Cell: ({ value }) => {
          return value.toFixed(2);
        },
      },
      {
        Header: "Account",
        accessor: "account_transaction.account.bank_name",
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
            label: "Add Loan Payment",
          }}
          showViewAction={true}
          showEditAction={true}
          showDeleteAction={true}
          handleView={handleView}
          handleEdit={() => { }}
          handleDelete={handleDelete}
          editPath="/store/dashboard/loan-payments"
          paginationPage={paginationPage}
          pageCount={pageCount}
          onPageChange={(newPage) => setPaginationPage(newPage)}
          onSearch={handleSearch}
          path={"LOAN_PAYMENT"}

          printButton={true}
          exportButton={true}
          setPrintButtonClick={setPrintButtonClick}
          setPdfButtonClick={setPdfButtonClick}
        />
      )}

      {
        printButtonClick && <LoanPaymentPrint setPrintButtonClick={setPrintButtonClick} newColumns={columns} />
      }
      {pdfButtonClick && <LoanPaymentPdf setPdfButtonClick={setPdfButtonClick} newColumns={columns} />}
    </div>
  );
};

export default LoanPayment;
