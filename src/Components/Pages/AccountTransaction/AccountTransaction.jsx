import React, { useEffect, useMemo, useState } from "react";

import CustomPaginationTable from "../../Shared/Tables/CustomPaginationTable";
import useDelete from "../../Shared/Constant/hooks/useDelete";
import { Loader } from "lucide-react";
import { useSelector } from "react-redux";
// import AccountView from "./AccountView";
import { useGetAccountsByPaginationQuery } from "../../../store/api/app/Account/accountApiSlice";
import { useGetAccountTransactionsByPaginationQuery } from "../../../store/api/app/AccountTransaction/accountTransactionApiSlice";
import AccountTransactionPrint from "./AccountTransactionPrint";
import AccountTransactionPdf from "./AccountTransactionPdf";

const AccountTransaction = () => {
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

  const { data, isLoading, isError, error } = useGetAccountTransactionsByPaginationQuery({
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

  console.log("data:::", data);

  const columns = useMemo(
    () => [
      {
        Header: "Reason",
        accessor: "reason",
      },
      {
        Header: "Date",
        accessor: "transaction_date",
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
        Header: "Type",
        accessor: "type",
        Cell: ({ value }) => {
          return value === 0 ? (
            <div className="flex justify-center">
              <p className="text-white bg-red-400 p-1 w-fit">Debit</p>
            </div>
          ) : (
            <div className="flex justify-center">
              <p className="text-white bg-green-500 p-1 w-fit">Credit</p>
            </div>
          )
        },
      },
      {
        Header: "Account",
        accessor: "account",  
        Cell: ({ value }) => `${value.bank_name} (${value.account_number})`,
      },
      {
        Header: "Amount",
        accessor: "amount",
      },
      {
        Header: "Created By",
        accessor: "created_user.storeRole.name",
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
            label: "Add Account",
          }}
          showViewAction={false}
          showEditAction={false}
          showDeleteAction={false}
          handleView={handleView}
          handleEdit={() => { }}
          handleDelete={handleDelete}
          editPath="/store/dashboard/account"
          paginationPage={paginationPage}
          pageCount={pageCount}
          onPageChange={(newPage) => setPaginationPage(newPage)}
          onSearch={handleSearch}
          path={"Transaction History"}
          printButton={true}
          exportButton={true}
          setPrintButtonClick={setPrintButtonClick}
          setPdfButtonClick={setPdfButtonClick}
        />
      )}

      {
        printButtonClick && <AccountTransactionPrint setPrintButtonClick={setPrintButtonClick} newColumns={columns} />
      }
      {
        pdfButtonClick && <AccountTransactionPdf setPdfButtonClick={setPdfButtonClick} newColumns={columns} />
      }

      {/* <AccountView isOpen={isModalOpen} onClose={handleCloseModal} data={selectedData} title="Account" /> */}
    </div>
  );
};

export default AccountTransaction;
