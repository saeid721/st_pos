import React, { useEffect, useMemo, useState } from "react";
import CustomPaginationTable from "../../Shared/Tables/CustomPaginationTable";
import useDelete from "../../Shared/Constant/hooks/useDelete";
import { Loader } from "lucide-react";
import { useSelector } from "react-redux";
import QuotationListView from "./QuotationListView";
import { useGetPurchasesByPaginationQuery } from "../../../store/api/app/Purchases/purchasesApiSlice";
import { useGetQuotationsByPaginationQuery } from "../../../store/api/app/QuotationList/quotationListApiSlice";
import QuotationListPrint from "./QuotationListPrint";
import QuotationListPdf from "./QuotationListPdf";

const QuotationList = () => {
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

  const { data, isLoading, isError, error } = useGetQuotationsByPaginationQuery({
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
        Header: "Quotation No",
        accessor: "quotation_no",
      },
      {
        Header: "Reference",
        accessor: "reference",
      },
      {
        Header: "Transport",
        accessor: "transport",
      },
      {
        Header: "Discount Type",
        accessor: "discount_type",
      },
      {
        Header: "Discount",
        accessor: "discount",
      },
      {
        Header: "Total Tax",
        accessor: "total_tax",
      },
      {
        Header: "Net Total",
        accessor: "sub_total",
      },
      {
        Header: "Po Reference",
        accessor: "po_reference",
      },
      {
        Header: "Payment Terms",
        accessor: "payment_terms",
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
            label: "Add Quotation",
          }}
          showViewAction={true}
          showEditAction={true}
          showDeleteAction={true}
          handleView={handleView}
          handleEdit={() => { }}
          handleDelete={handleDelete}
          editPath="/store/dashboard/quotation-list"
          paginationPage={paginationPage}
          pageCount={pageCount}
          onPageChange={(newPage) => setPaginationPage(newPage)}
          onSearch={handleSearch}
          path={"QUOTATION"}

          printButton={true}
          exportButton={true}
          setPrintButtonClick={setPrintButtonClick}
          setPdfButtonClick={setPdfButtonClick}
        />
      )}

      {
        printButtonClick && <QuotationListPrint setPrintButtonClick={setPrintButtonClick} newColumns={columns} />
      }
      {
        pdfButtonClick && <QuotationListPdf setPdfButtonClick={setPdfButtonClick} newColumns={columns} />
      }

      {/* <QuotationListView isOpen={isModalOpen} onClose={handleCloseModal} data={selectedData} title="Purchase" /> */}
    </div>
  );
};

export default QuotationList;
