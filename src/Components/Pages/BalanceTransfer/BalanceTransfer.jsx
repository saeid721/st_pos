import React, { useEffect, useMemo, useState } from "react";

import CustomPaginationTable from "../../Shared/Tables/CustomPaginationTable";
import useDelete from "../../Shared/Constant/hooks/useDelete";
import { Loader } from "lucide-react";
import { useSelector } from "react-redux";
import BalanceTransferView from "./BalanceTransferView";
import { useGetBalanceTransfersByPaginationQuery } from "../../../store/api/app/BalanceTransfer/BalanceTransferApiSlice";
import BalanceTransferPrint from "./BalanceTransferPrint";
import BalanceTransferPdf from "./BalanceTransferPdf";

const BalanceTransfer = () => {
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

  const { data, isLoading, isError, error } = useGetBalanceTransfersByPaginationQuery({
    page: paginationPage,
    limit: limit,
    order: order,
    search: search,
  });

  console.log("data:::::::", data);
  const { handleDelete } = useDelete();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleView = (rowData) => {
    setSelectedData(rowData);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  console.log("dataa: ", data);

  const columns = useMemo(
    () => [
      {
        Header: "	Reason",
        accessor: "reason",
      },
      {
        Header: "From Account",
        accessor: "debit.account.bank_name",
      },
      {
        Header: "To Account",
        accessor: "credit.account.bank_name",
      },
      {
        Header: "	Amount",
        accessor: "amount",
      },
      {
        Header: "Date",
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
            label: "Add Balance Transfers",
          }}
          showViewAction={true}
          showEditAction={true}
          showDeleteAction={true}
          handleView={handleView}
          handleEdit={() => { }}
          handleDelete={handleDelete}
          editPath="/store/dashboard/balance-transfers"
          paginationPage={paginationPage}
          pageCount={pageCount}
          onPageChange={(newPage) => setPaginationPage(newPage)}
          onSearch={handleSearch}
          path={"BALANCE_TRANSFER"}
          printButton={true}
          exportButton={true}
          setPrintButtonClick={setPrintButtonClick}
          setPdfButtonClick={setPdfButtonClick}
        />
      )}

      {
        printButtonClick && <BalanceTransferPrint setPrintButtonClick={setPrintButtonClick} newColumns={columns} />
      }
      {
        pdfButtonClick && <BalanceTransferPdf setPdfButtonClick={setPdfButtonClick} newColumns={columns} />
      }

      {/* <BalanceTransferView isOpen={isModalOpen} onClose={handleCloseModal} data={selectedData} title="Account" /> */}
    </div>
  );
};

export default BalanceTransfer;
