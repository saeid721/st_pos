import React, { useEffect, useMemo, useState } from "react";
import CustomPaginationTable from "../../Shared/Tables/CustomPaginationTable";
import useDelete from "../../Shared/Constant/hooks/useDelete";
import { Loader } from "lucide-react";
import { useSelector } from "react-redux";
import InvoiceListView from "./InvoiceListView";
import { useGetInvoicesByPaginationQuery } from "../../../store/api/app/InvoiceList/invoiceListApiSlice";
import InvoiceListPrint from "./InvoiceListPrint";
import InvoiceListPdf from "./InvoiceListPdf";
import { useSystemSettings } from "../../../lib/SystemSettingsProvider";

const InvoiceList = () => {
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
  const { store_id } = auth.user;

  const { settings } = useSystemSettings();


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

  const { data, isLoading, isError, error } = useGetInvoicesByPaginationQuery({
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
        Header: "Invoice No",
        accessor: "invoice_no",
      },
      {
        Header: "Invoice Date",
        accessor: "invoice_date",

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
      {
        Header: "Client",
        accessor: "client.name",
      },
      {
        Header: "Sub Total",
        accessor: "sub_total",
        Cell: ({ value }) => value?.toFixed(2),
      },
      {
        Header: "Transport",
        accessor: "transport",
        Cell: ({ value }) => value?.toFixed(2),
      },
      {
        Header: "Discount",
        accessor: "discount",
        Cell: ({ row }) => {
          const { discount_type, discount } = row.original;
          if(discount_type === null){
            return "N/A";
          }
          if (discount_type === "FLAT") {
            return `${settings?.currency || "৳"}${discount}`;
          }
          return `${settings?.currency || "৳"}${discount}%`;
        },
      },
      {
        Header: "Tax",
        accessor: "total_tax",
        Cell: ({ value }) => value?.toFixed(2),
      },
      {
        Header: "Net Total",
        accessor: "store_id",
        Cell: ({ row }) => {
          const { sub_total = 0, transport = 0, total_tax = 0, discounted_amount = 0 } = row.original;
          const netTotal = (sub_total + transport + total_tax) - discounted_amount;
          return netTotal.toFixed(2);
        },
      },
      {
        Header: "Total Paid",
        accessor: "invoice_payments",
        Cell: ({ row }) => {
          const payments = row.original.invoice_payments || [];
          const totalPaid = payments.reduce((sum, payment) => sum + payment.amount, 0);
          return totalPaid.toFixed(2);
        },
      },
      {
        Header: "Total Due",
        accessor: "is_paid",
        Cell: ({ row }) => {
          const { sub_total = 0, transport = 0, total_tax = 0, discounted_amount = 0 } = row.original;
          const payments = row.original.invoice_payments || [];

          const netTotal = (sub_total + transport + total_tax) - discounted_amount;
          const totalPaid = payments.reduce((sum, payment) => sum + payment.amount, 0);
          const totalDue = netTotal - totalPaid;

          return totalDue.toFixed(2);
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
            label: "Add Invoice",
          }}
          showViewAction={true}
          showEditAction={true}
          showDeleteAction={true}
          handleView={handleView}
          handleEdit={() => { }}
          handleDelete={handleDelete}
          editPath="/store/dashboard/invoices-list"
          paginationPage={paginationPage}
          pageCount={pageCount}
          onPageChange={(newPage) => setPaginationPage(newPage)}
          onSearch={handleSearch}
          path={"INVOICE"}

          printButton={true}
          exportButton={true}
          setPrintButtonClick={setPrintButtonClick}
          setPdfButtonClick={setPdfButtonClick}
        />
      )}

      {
        printButtonClick && <InvoiceListPrint setPrintButtonClick={setPrintButtonClick} newColumns={columns} />
      }
      {pdfButtonClick && <InvoiceListPdf setPdfButtonClick={setPdfButtonClick} newColumns={columns} />}
    </div>
  );
};

export default InvoiceList;
