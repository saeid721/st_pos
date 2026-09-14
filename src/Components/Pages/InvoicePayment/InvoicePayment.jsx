import React, { useEffect, useMemo, useState } from "react";

import CustomPaginationTable from "../../Shared/Tables/CustomPaginationTable";
import useDelete from "../../Shared/Constant/hooks/useDelete";
import { Loader } from "lucide-react";
import { useSelector } from "react-redux";
import InvoicePaymentView from "./InvoicePaymentView";
import { useGetAccountsByPaginationQuery } from "../../../store/api/app/Account/accountApiSlice";
import { useGetInvoicesByPaginationQuery } from "../../../store/api/app/InvoiceList/invoiceListApiSlice";
import { useGetInvoicePaymentsByPaginationQuery } from "../../../store/api/app/Invoice/invoiceApiSlice";
import InvoicePaymentPrint from "./InvoicePaymentPrint";
import InvoicePaymentPdf from "./InvoicePaymentPdf";

const InvoicePayment = () => {
  const [selectedData, setSelectedData] = useState(null);
  const [paginationPage, setPaginationPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [limit, setLimit] = useState(10);
  const [order, setOrder] = useState("desc");
  const [search, setSearch] = useState("");
  const [pdfButtonClick, setPdfButtonClick] = useState(false);
  const [printButtonClick, setPrintButtonClick] = useState(false);

  const { isAuth, auth } = useSelector((state) => state.auth);

  console.log("auth", auth);

  const { data, isLoading, isError, error } = useGetInvoicePaymentsByPaginationQuery({
    page: paginationPage,
    limit: limit,
    order: order,
    search: search,
  });
  console.log("data:::", data?.data?.result);
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
        Header: "Invoice No.",
        accessor: "invoice.invoice_no",
      },
      {
        Header: "Client",
        accessor: "invoice.client.name",
      },
      {
        Header: "Total",
        accessor: "invoice.sub_total",
        Cell: ({ row }) => {
          const subTotal = parseFloat(row.original.invoice.sub_total) || 0;
          const totalTax = parseFloat(row.original.invoice.total_tax) || 0;
          const total = subTotal + totalTax;
          return total.toFixed(2);
        },
      },

      {
        Header: "Paid Amount",
        accessor: "amount",
        Cell: ({ value }) => {
          return parseFloat(value).toFixed(2);
        },
      },
      {
        Header: "Account",
        accessor: "account_transaction.account.bank_name",
      },
      {
        Header: "Payment Date",
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
            label: "Add Invoice Payment",
          }}
          showViewAction={true}
          showEditAction={true}
          showDeleteAction={true}
          handleView={handleView}
          handleEdit={() => { }}
          handleDelete={handleDelete}
          editPath="/store/dashboard/invoice"
          paginationPage={paginationPage}
          pageCount={pageCount}
          onPageChange={(newPage) => setPaginationPage(newPage)}
          onSearch={handleSearch}
          path={"INVOICE_PAYMENT"}
          printButton={true}
          exportButton={true}
          setPrintButtonClick={setPrintButtonClick}
          setPdfButtonClick={setPdfButtonClick}
        />
      )}

      {
        printButtonClick && <InvoicePaymentPrint setPrintButtonClick={setPrintButtonClick} newColumns={columns} />
      }
      {
        pdfButtonClick && <InvoicePaymentPdf setPdfButtonClick={setPdfButtonClick} newColumns={columns} />
      }

      {/* <InvoicePaymentView isOpen={isModalOpen} onClose={handleCloseModal} data={selectedData} title="Invoice" /> */}
    </div>
  );
};

export default InvoicePayment;
