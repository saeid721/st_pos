import React, { useEffect, useMemo, useState } from "react";
import CustomPaginationTable from "../../Shared/Tables/CustomPaginationTable";
import useDelete from "../../Shared/Constant/hooks/useDelete";
import { Loader } from "lucide-react";
import { useSelector } from "react-redux";
import { useGetInvoicesByPaginationQuery } from "../../../store/api/app/InvoiceList/invoiceListApiSlice";
import { useGetStoreTransactionHistoryByPaginationQuery } from "../../../store/api/app/TransactionHistory/transactionHistoryApiSlice";
import TransactionHistoryPrint from "./TransactionHistoryPrint";
import TransactionHistoryPdf from "./TransactionHistoryPdf";

const TransactionHistory = () => {
  const [selectedData, setSelectedData] = useState(null);
  const [paginationPage, setPaginationPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [limit, setLimit] = useState(10);
  const [order, setOrder] = useState("desc");
  const [search, setSearch] = useState("");
  const [branchId, setBranchId] = useState(null);
  const [pdfButtonClick, setPdfButtonClick] = useState(false);
  const [printButtonClick, setPrintButtonClick] = useState(false);

  const { isAuth, auth } = useSelector((state) => state.auth);
  const { store_id } = auth.user;


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

  const { data, isLoading, isError, error } = useGetStoreTransactionHistoryByPaginationQuery({
    page: paginationPage,
    limit: limit,
    order: order,
    branch_id: branchId,
    // search: search,
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
        Header: "Store Name",
        accessor: "store.store",
      },
      {
        Header: "Plan Name",
        accessor: "plan.name",
      },
      {
        Header: "Plan Duration",
        accessor: "duration_type",
        Cell: ({ row }) => {
          const { duration_value, duration_type } = row.original.plan;
          console.log("row.original", row.original);
          console.log("duration_value", duration_value);
          console.log("duration_type", duration_type);
          return (
            <span>{duration_value} {duration_type}</span>
          );
        },
      },
      {
        Header: "Transaction ID",
        accessor: "transaction_id",
      },
      {
        Header: "Amount",
        accessor: "amount",
      },
      {
        Header: "Transaction Date",
        accessor: "transaction_at",

        Cell: ({ value }) => {
          if (!value) return "N/A";
          return new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
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
          addNewButton={false}
          showViewAction={false}
          showEditAction={false}
          showDeleteAction={false}
          handleView={handleView}
          handleEdit={() => { }}
          handleDelete={handleDelete}
          editPath="/store/dashboard/invoices-list"
          paginationPage={paginationPage}
          pageCount={pageCount}
          onPageChange={(newPage) => setPaginationPage(newPage)}
          onSearch={handleSearch}
          path={"STORE"}
          showStatus={false}
          printButton={true}
          exportButton={true}
          setPrintButtonClick={setPrintButtonClick}
          setPdfButtonClick={setPdfButtonClick}
          heading="Transaction History"
        />
      )}

      {
        printButtonClick && <TransactionHistoryPrint setPrintButtonClick={setPrintButtonClick} newColumns={columns} />
      }
      {
        pdfButtonClick && <TransactionHistoryPdf setPdfButtonClick={setPdfButtonClick} newColumns={columns} />
      }

      {/* <InvoiceListView isOpen={isModalOpen} onClose={handleCloseModal} data={selectedData} title="INVOICE" /> */}
    </div>
  );
};

export default TransactionHistory;
