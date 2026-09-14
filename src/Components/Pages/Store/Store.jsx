import React, { useEffect, useMemo, useState } from "react";
import CustomPaginationTable from "../../Shared/Tables/CustomPaginationTable";
import useDelete from "../../Shared/Constant/hooks/useDelete";
import { Loader } from "lucide-react";
import StoreView from "./Storeview";
import { useGetStoresByPaginationQuery } from "../../../store/api/app/store/storeApiSlice";
import { IoMdLogIn } from "react-icons/io";
import { toast } from "react-toastify";
import { useLoginUserMutation } from "../../../store/api/auth/authApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../store/api/auth/authSlice";
import { useNavigate } from "react-router-dom";
const Store = () => {
  const [selectedData, setSelectedData] = useState(null);
  const [paginationPage, setPaginationPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [limit, setLimit] = useState(10);
  const [order, setOrder] = useState("desc");
  const [search, setSearch] = useState("");

  const { isAuth, auth } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginUserMutation();
  const {
    data,
    isLoading: storeLoading,
    isError,
    error,
  } = useGetStoresByPaginationQuery({
    page: paginationPage,
    limit: limit,
    order: order,
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

  // Function to handle quick login button click
  const handleQuickLogin = async (rowData) => {
    try {
      const loginData = {
        email: rowData.email,
        password: rowData.password,
      };

      const response = await login(loginData);
      console.log("response", response);

      if (response?.data?.status !== "success") {
        throw new Error("Invalid Credentials");
      }

      const loggedInUser = {
        accessToken: response?.data?.data?.token?.access,
        refreshToken: response?.data?.data?.token?.refresh,
        user: {
          ...response?.data?.data?.storeUser,
          user_type: "store",
        },
      };

      dispatch(setUser(loggedInUser));
      // navigate(`/admin/${response?.data?.data?.user?.role_id}`);
      navigate(`/store/dashboard`);
      toast.success("Login Successful");
    } catch (error) {
      toast.error(error.message);
    }
    // Add logic for quick login here
  };
  const columns = useMemo(
    () => [
      {
        Header: "Store Name",
        accessor: "store",
      },
      {
        Header: "Owner Name",
        accessor: "owner_name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      // {
      //   Header: "Trial ends",
      //   accessor: "trial_ends_at",
      //   Cell: ({ value }) => {
      //     // Format the date
      //     return new Intl.DateTimeFormat("en-US", {
      //       year: "numeric",
      //       month: "long",
      //       day: "numeric",
      //       hour: "2-digit",
      //       minute: "2-digit",
      //       second: "2-digit",
      //     }).format(new Date(value));
      //   },
      // },
      {
        Header: "Plan Ends",
        accessor: "plan_ends_at",
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
        Header: "Quick Login",
        Cell: ({ row }) => (
          <button
            onClick={() => handleQuickLogin(row.original)}
            className="bg-[#3c9a35] text-gray-200 hover:text-white font-bold py-1 px-2 rounded text-xs"
          >
            <IoMdLogIn className="text-lg" />
          </button>
        ),
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
      {storeLoading && <Loader />}
      {isError && <p>Error: {error.message}</p>}
      {!storeLoading && !isError && data && (
        <CustomPaginationTable
          limit={limit}
          onLimitChange={handleLimitChange}
          columns={columns}
          data={data?.data?.result}
          sortDirection={order}
          setSortDirection={setOrder}
          addNewButton={{
            label: "Add Store",
          }}
          showViewAction={true}
          showEditAction={true}
          showDeleteAction={true}
          handleView={handleView}
          handleEdit={() => {}}
          handleDelete={handleDelete}
          editPath="/admin/dashboard/store"
          paginationPage={paginationPage}
          pageCount={pageCount}
          onPageChange={(newPage) => setPaginationPage(newPage)}
          onSearch={handleSearch}
          path={"STORE"}
        />
      )}

      {/* <StoreView isOpen={isModalOpen} onClose={handleCloseModal} data={selectedData} title="Store" /> */}
    </div>
  );
};

export default Store;
