import React, { useEffect, useMemo, useState } from "react";

import CustomPaginationTable from "../../Shared/Tables/CustomPaginationTable";
import useDelete from "../../Shared/Constant/hooks/useDelete";
import { Loader } from "lucide-react";
import { useSelector } from "react-redux";
import { useGetPurchasePaymentsByPaginationQuery } from "../../../store/api/app/PurchasePayment/PurchasePaymentApiSlice";
import PurchasePaymentView from "./PurchasePaymentView";
import PurchasePaymentPrint from "./PurchasePaymentPrint";
import PurchasePaymentPdf from "./PurchasePaymentPdf";

const PurchasePayment = () => {
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

  const { data, isLoading, isError, error } = useGetPurchasePaymentsByPaginationQuery({
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
        Header: "Purchase No.",
        accessor: "purchase.purchase_no",
      },
      {
        Header: "Supplier",
        accessor: "purchase.supplier.name",
      },
      {
        Header: "Total",
        accessor: "purchase.sub_total",
        Cell: ({ value }) => {
          return parseFloat(value).toFixed(2);
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
            label: "Add Purchase Payment",
          }}
          showViewAction={true}
          showEditAction={true}
          showDeleteAction={true}
          handleView={handleView}
          handleEdit={() => { }}
          handleDelete={handleDelete}
          editPath="/store/dashboard/purchase"
          paginationPage={paginationPage}
          pageCount={pageCount}
          onPageChange={(newPage) => setPaginationPage(newPage)}
          onSearch={handleSearch}
          path={"PURCHASE_PAYMENT"}
          printButton={true}
          exportButton={true}
          setPrintButtonClick={setPrintButtonClick}
          setPdfButtonClick={setPdfButtonClick}
        />
      )}

      {
        printButtonClick && <PurchasePaymentPrint setPrintButtonClick={setPrintButtonClick} newColumns={columns} />
      }
      {
        pdfButtonClick && <PurchasePaymentPdf setPdfButtonClick={setPdfButtonClick} newColumns={columns} />
      }

      {/* <PurchasePaymentView isOpen={isModalOpen} onClose={handleCloseModal} data={selectedData} title="Invoice" /> */}
    </div>
  );
};

export default PurchasePayment;
