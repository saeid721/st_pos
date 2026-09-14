import React, { useEffect, useMemo, useState } from "react";

import CustomPaginationTable from "../../Shared/Tables/CustomPaginationTable";
import useDelete from "../../Shared/Constant/hooks/useDelete";
import { Loader } from "lucide-react";
import { useSelector } from "react-redux";
import { useGetAccountsByPaginationQuery, useGetAccountsQuery } from "../../../store/api/app/Account/accountApiSlice";
import { useGetBalanceAdjustmentsByPaginationQuery } from "../../../store/api/app/BalanceAdjustments/BalanceAdjustmentsApiSlice";
import BalanceAdjustmentsView from "./BalanceAdjustmentsView";
import BalanceAdjustmentsPdf from "./BalanceAdjustmentsPdf";
import BalanceAdjustmentsPrint from "./BalanceAdjustmentsPrint";

const BalanceAdjustments = () => {
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

  const { data, isLoading, isError, error } = useGetBalanceAdjustmentsByPaginationQuery({
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

  console.log("dataa: ", data);

  const columns = useMemo(
    () => [
      {
        Header: "Bank Name",
        accessor: "account.bank_name",
      },
      {
        Header: "Account Number",
        accessor: "account.account_number",
      },
      {
        Header: "Amount",
        accessor: "amount",
      },
      {
        Header: "Type",
        accessor: "type",
        Cell: ({ value }) => {
          if (value === 1) return <span className="bg-green-500 text-white py-1 px-2 rounded-lg">Add Balance</span>;
          if (value === 0) return <span className="bg-red-400 text-white py-1 px-2 rounded-lg">Remove Balance</span>;
        },
      },
      {
        Header: "Date",
        accessor: "updated_at", 
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
      {
        Header: "Note",
        accessor: "note",
      },
    ],
    []
  );

  // pagination
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
            label: "Add Balance Adjustment",
          }}
          showViewAction={false}
          showEditAction={true}
          showDeleteAction={true}
          handleView={handleView}
          handleEdit={() => { }}
          handleDelete={handleDelete}
          editPath="/store/dashboard/balance-adjustments"
          paginationPage={paginationPage}
          pageCount={pageCount}
          onPageChange={(newPage) => setPaginationPage(newPage)}
          onSearch={handleSearch}
          path={"BALANCE_ADJUSTMENT"}
          printButton={true}
          exportButton={true}
          setPrintButtonClick={setPrintButtonClick}
          setPdfButtonClick={setPdfButtonClick}
        />
      )}

      {
        printButtonClick && <BalanceAdjustmentsPrint setPrintButtonClick={setPrintButtonClick} newColumns={columns} />
      }
      {
        pdfButtonClick && <BalanceAdjustmentsPdf setPdfButtonClick={setPdfButtonClick} newColumns={columns} />
      }

      {/* <BalanceAdjustmentsView isOpen={isModalOpen} onClose={handleCloseModal} data={selectedData} title="Account" /> */}
    </div>
  );
};

export default BalanceAdjustments;
