import React from "react";
import { useParams } from "react-router-dom";
import { Loader } from "lucide-react";
import Error from "../../Shared/Error/Error";
import { useGetPlansByIdQuery } from "../../../store/api/app/Plans/plansApiSlice";
import EmployeesForm from "./EmployeesForm";
import { useGetEmployeesByIdQuery } from "../../../store/api/app/Employees/employeesApiSlice";

const EmployeesEdit = () => {
  const { id } = useParams();

  const { data, isFetching, isLoading, isError, error } =
    useGetEmployeesByIdQuery(id);

    console.log("editemployee: ", data);

  if (isLoading || isFetching) return <Loader />;

  if (!id) return <Error />;
  return (
    <div>
      <EmployeesForm id={id} data={data?.data} />
    </div>
  );
};

export default EmployeesEdit;
