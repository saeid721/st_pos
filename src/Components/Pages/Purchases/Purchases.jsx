import React, { useEffect, useMemo, useState } from "react";
import CustomPaginationTable from "../../Shared/Tables/CustomPaginationTable";
import useDelete from "../../Shared/Constant/hooks/useDelete";
import { Loader } from "lucide-react";
import { useSelector } from "react-redux";
import PurchasesView from "./PurchasesView";
import { useGetPurchasesByPaginationQuery } from "../../../store/api/app/Purchases/purchasesApiSlice";
import PurchasesPdf from "./PurchasesPdf";
import PurchasesPrint from "./PurchasesPrint";

const Purchases = () => {
  const [selectedData, setSelectedData] = useState(null);
  const [paginationPage, setPaginationPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [limit, setLimit] = useState(10);
  const [order, setOrder] = useState("desc");
  const [search, setSearch] = useState("");
  const [branchId, setBranchId] = useState(null);
  const { isAuth, auth } = useSelector((state) => state.auth);
  const { store_id } = auth.user;
  const [pdfButtonClick, setPdfButtonClick] = useState(false);
  const [printButtonClick, setPrintButtonClick] = useState(false);


  const branch = localStorage.getItem("branch_id");

  useEffect(() => {
    if (branch) {
      const parsedData = JSON.parse(branch);
      setBranchId(parsedData);
    } else {
      console.log("No data found in localStorage.");
    }
  }, [branch]);

  const { data, isLoading, isError, error } = useGetPurchasesByPaginationQuery({
    page: paginationPage,
    limit: limit,
    order: order,
    search: search,
    store_id: store_id,
    branch_id: branchId,
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
        Header: "Purchase No",
        accessor: "purchase_no",
      },
      {
        Header: "Date",
        accessor: "purchase_date",
        Cell: ({ value }) => {
          // Check if value is valid
          if (!value) {
            return "N/A";
          }

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
      {
        Header: "Supplier",
        accessor: "supplier.name",
      },
      {
        Header: "Sub Total",
        accessor: "store_id",
        Cell: ({ row }) => {
          const subTotal = Number(row.original.sub_total ?? 0);
          const transport = Number(row.original.transport ?? 0);
          const totalTax = Number(row.original.total_tax ?? 0);
          const discountedAmount = Number(row.original.discounted_amount ?? 0);

          const netTotal = (subTotal - transport - totalTax) + discountedAmount;

          return netTotal.toFixed(2);
        },
      },
      {
        Header: "Transport",
        accessor: "transport",
        Cell: ({ row }) => {
          return Number(row.original.transport ?? 0).toFixed(2);
        },
      },
      {
        Header: "Discount",
        accessor: "discounted_amount",
        Cell: ({ row }) => {
          return Number(row.original.discounted_amount ?? 0).toFixed(2);
        },
      },

      {
        Header: "Net Total",
        accessor: "sub_total",
        // Cell: ({ row }) => {
        //   const { sub_total = 0, transport = 0, total_tax = 0, discounted_amount = 0 } = row.original;

        //   const netTotal = (sub_total + transport + total_tax) - discounted_amount;

        //   return netTotal.toFixed(2);
        // },
      },

      {
        Header: "Total Paid",
        accessor: "purchase_payments",
        Cell: ({ row }) => {
          const payments = row.original.purchase_payments || [];

          const totalPaid = payments.reduce((sum, payment) => sum + Number(payment.amount ?? 0), 0);

          return totalPaid.toFixed(2); // Formats to 2 decimal places
        },
      },
      {
        Header: "Total Due",
        accessor: "is_paid",
        Cell: ({ row }) => {
          const subTotal = row.original.sub_total || 0;
          const payments = row.original.purchase_payments || [];

          const totalPaid = payments.reduce((sum, payment) => sum + Number(payment.amount ?? 0), 0);
          const totalDue = subTotal - totalPaid;

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
            label: "Add Purchases",
          }}
          showViewAction={true}
          showEditAction={true}
          showDeleteAction={true}
          handleView={handleView}
          handleEdit={() => { }}
          handleDelete={handleDelete}
          editPath="/store/dashboard/purchases"
          paginationPage={paginationPage}
          pageCount={pageCount}
          onPageChange={(newPage) => setPaginationPage(newPage)}
          onSearch={handleSearch}
          path={"PURCHASE"}
          printButton={true}
          exportButton={true}
          setPrintButtonClick={setPrintButtonClick}
          setPdfButtonClick={setPdfButtonClick}
        />
      )}

      {
        printButtonClick && <PurchasesPrint setPrintButtonClick={setPrintButtonClick} newColumns={columns} />
      }
      {
        pdfButtonClick && <PurchasesPdf setPdfButtonClick={setPdfButtonClick} newColumns={columns} />
      }
    </div>
  );
};

export default Purchases;
