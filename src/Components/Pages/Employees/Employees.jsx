import React, { useEffect, useMemo, useState } from "react";
import CustomPaginationTable from "../../Shared/Tables/CustomPaginationTable";
import useDelete from "../../Shared/Constant/hooks/useDelete";
import { Loader } from "lucide-react";
import EmployeesView from "./EmployeesView";
import { useSelector } from "react-redux";
import { useGetEmployeesByPaginationQuery } from "../../../store/api/app/Employees/employeesApiSlice";
import { formatDate } from "../../../lib/format";
import EmployeesPrint from "./EmployeesPrint";
import EmployeesPdf from "./EmployeesPdf";

const Employees = () => {
  const [selectedData, setSelectedData] = useState(null);
  const [paginationPage, setPaginationPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [limit, setLimit] = useState(10);
  const [order, setOrder] = useState("desc");
  const [search, setSearch] = useState("");
  const [printButtonClick, setPrintButtonClick] = useState(false);
  const [pdfButtonClick, setPdfButtonClick] = useState(false);

  const { isAuth, auth } = useSelector((state) => state.auth);

  const { store_id } = auth.user;

  console.log("auth", auth);

  const { data, isLoading, isError, error } = useGetEmployeesByPaginationQuery({
    page: paginationPage,
    limit: limit,
    order: order,
    search: search,
    store_id: store_id,
  });
  console.log("data", data);
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
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Department",
        accessor: "department.name",
      },
      {
        Header: "Image",
        accessor: "photo",
      },
      {
        Header: "Designation",
        accessor: "designation",
      },
      {
        Header: "Salary",
        accessor: "salary",
      },
      {
        Header: "Commission",
        accessor: "commission",
      },
      {
        Header: "Mobile number",
        accessor: "mobile_number",
      },
      {
        Header: "Birth date",
        accessor: "birth_date",
        Cell: ({ value }) => {
          // Format the date
          return formatDate(value);
        },
      },
      {
        Header: "Gender",
        accessor: "gender",
      },
      {
        Header: "Blood group",
        accessor: "blood_group",
      },
      {
        Header: "Religion",
        accessor: "religion",
      },
      {
        Header: "Appointment date",
        accessor: "appointment_date",
        Cell: ({ value }) => {
          // Format the date
          return formatDate(value);
        },
      },
      {
        Header: "Joining date",
        accessor: "joining_date",
        Cell: ({ value }) => {
          // Format the date
          return formatDate(value);
        },
      },
      {
        Header: "Address",
        accessor: "address",
      },
      {
        Header: "Note",
        accessor: "note",
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
            label: "Add Employees",
          }}
          showViewAction={true}
          showEditAction={true}
          showDeleteAction={true}
          handleView={handleView}
          handleEdit={() => { }}
          handleDelete={handleDelete}
          editPath="/store/dashboard/employees"
          paginationPage={paginationPage}
          pageCount={pageCount}
          onPageChange={(newPage) => setPaginationPage(newPage)}
          onSearch={handleSearch}
          path={"EMPLOYEE"}

          printButton={true}
          exportButton={true}
          setPrintButtonClick={setPrintButtonClick}
          setPdfButtonClick={setPdfButtonClick}
        />
      )}

      {
        printButtonClick && <EmployeesPrint setPrintButtonClick={setPrintButtonClick} newColumns={columns} store_id={store_id} />
      }
      {
        pdfButtonClick && <EmployeesPdf setPdfButtonClick={setPdfButtonClick} newColumns={columns} store_id={store_id} />

      }
    </div>
  );
};

export default Employees;
