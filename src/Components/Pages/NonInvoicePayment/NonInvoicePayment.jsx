import React, { useEffect, useMemo, useState } from "react";

import CustomPaginationTable from "../../Shared/Tables/CustomPaginationTable";
import useDelete from "../../Shared/Constant/hooks/useDelete";
import { Loader } from "lucide-react";
import { useSelector } from "react-redux";
import NonInvoicePaymentView from "./NonInvoicePaymentView";
import { useGetAccountsByPaginationQuery } from "../../../store/api/app/Account/accountApiSlice";
import { useGetInvoicesByPaginationQuery } from "../../../store/api/app/InvoiceList/invoiceListApiSlice";
import { useGetInvoicePaymentsByPaginationQuery } from "../../../store/api/app/Invoice/invoiceApiSlice";
import { useGetNonInvoicePaymentsByPaginationQuery } from "../../../store/api/app/NonInvoice/nonInvoiceApiSlice";
import NonInvoicePaymentPrint from "./NonInvoicePaymentPrint";
import NonInvoicePaymentPdf from "./NonInvoicePaymentPdf";

const NonInvoicePayment = () => {
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

  const { data, isLoading, isError, error } = useGetNonInvoicePaymentsByPaginationQuery({
    page: paginationPage,
    limit: limit,
    order: order,
    search: search,
  });
  console.log("data:::", data);
  const { handleDelete } = useDelete();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleView = (rowData) => {
    setSelectedData(rowData);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  console.log("data:::", data);

  const columns = useMemo(
    () => [
      {
        Header: "Client",
        accessor: "client.name",
      },
      {
        Header: "Payment Type",
        accessor: "type",
        Cell: ({ value }) => {
          return value === 0 ? (
            <div className="flex justify-center">
              <p className="text-white bg-red-400 p-1 w-fit">Due</p>
            </div>
          ) : (
            <div className="flex justify-center">
              <p className="text-white bg-green-500 p-1 w-fit">Payment</p>
            </div>
          )
        },
      },
      {
        Header: "Paid Amount",
        accessor: "amount",
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
          showViewAction={false}
          showEditAction={true}
          showDeleteAction={true}
          handleView={handleView}
          handleEdit={() => { }}
          handleDelete={handleDelete}
          editPath="/store/dashboard/non-invoice"
          paginationPage={paginationPage}
          pageCount={pageCount}
          onPageChange={(newPage) => setPaginationPage(newPage)}
          onSearch={handleSearch}
          path={"NON_INVOICE_PAYMENT"}
          printButton={true}
          exportButton={true}
          setPrintButtonClick={setPrintButtonClick}
          setPdfButtonClick={setPdfButtonClick}
        />
      )}

      {
        printButtonClick && <NonInvoicePaymentPrint setPrintButtonClick={setPrintButtonClick} newColumns={columns} />
      }
      {
        pdfButtonClick && <NonInvoicePaymentPdf setPdfButtonClick={setPdfButtonClick} newColumns={columns} />
      }

      {/* <NonInvoicePaymentView isOpen={isModalOpen} onClose={handleCloseModal} data={selectedData} title="Invoice" /> */}
    </div>
  );
};

export default NonInvoicePayment;
