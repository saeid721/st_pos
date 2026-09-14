import React, { useEffect, useState } from "react";
import { Card } from "../../ui/card";
import TextInput from "../../Shared/TextInput/TextInput";
import Button from "../../Shared/ui/Button";
import { Loader } from "lucide-react";

import { useNavigate } from "react-router-dom";
import useSubmit from "../../Shared/Constant/hooks/useSubmit";
import { useCreateLoanAuthoritiesMutation, useUpdateLoanAuthoritiesMutation } from "../../../store/api/app/LoanAuthoritiesApi/loanAuthoritiesApiSlice";
import { useGetEmployeesByIdQuery, useGetEmployeesQuery } from "../../../store/api/app/Employees/employeesApiSlice";
import { useGetAccountsQuery, useGetAvailableBalanceByAccountQuery } from "../../../store/api/app/Account/accountApiSlice";
import { useSelector } from "react-redux";
import CustomReactSelect from "../../Shared/Select/CustomReactSelect";
import { useCreatePayrollsMutation, useUpdatePayrollsMutation } from "../../../store/api/app/PayrollApi/payrollApiSlice";

const PayrollForm = ({ id, data }) => {
  const [totalSalary, setTotalSalary] = useState(0)
  const [branchId, setBranchId] = useState(null);
  const navigate = useNavigate(); // Get the navigate function
  const {
    register,
    unregister,
    control,
    errors,
    reset,
    handleSubmit,
    onSubmit,
    watch,
    isLoading,
  } = useSubmit(
    id,
    id ? useUpdatePayrollsMutation : useCreatePayrollsMutation
  );


  const employee_id = watch("employee_id");
  const account_id = watch("account_id");
  const salary_month = watch("salary_month");
  const deduction_amount = watch("deduction_amount") || 0;
  const mobile_bill = watch("mobile_bill") || 0;
  const food_bill = watch("food_bill") || 0;
  const bonus = watch("bonus") || 0;
  const commission = watch("commission") || 0;
  const advance = watch("advance") || 0;
  const festival_bonus = watch("festival_bonus") || 0;
  const travel_allowance = watch("travel_allowance") || 0;
  const others = watch("others") || 0;


  const { isAuth, auth } = useSelector((state) => state.auth);
  const { store_id } = auth.user;

  const { data: employees, isFetching: employeesIsFetching, isLoading: employeesIsLoading } =
    useGetEmployeesQuery();
  const { data: accounts } = useGetAccountsQuery({
    store_id: store_id,
  });
  const { data: employee } = useGetEmployeesByIdQuery(employee_id);

  const available_balance = useGetAvailableBalanceByAccountQuery({
    account_id: account_id,
  })

  // useEffect(() => {
  //   if (employee_id) {
  //     setTotalSalary(parseFloat(employee?.data?.salary || 0));
  //   }
  // }, [employee]);
  useEffect(() => {
    const total = calculateTotalAmount();
    setTotalSalary(total);
  }, [
    deduction_amount,
    mobile_bill,
    food_bill,
    bonus,
    commission,
    advance,
    festival_bonus,
    travel_allowance,
    others,
    employee?.data?.salary,
  ]);

  const calculateTotalAmount = () => {
    return (
      parseFloat(employee?.data?.salary || 0) -
      parseFloat(deduction_amount) +
      parseFloat(mobile_bill) +
      parseFloat(food_bill) +
      parseFloat(bonus) +
      parseFloat(commission) +
      parseFloat(advance) +
      parseFloat(festival_bonus) +
      parseFloat(travel_allowance) +
      parseFloat(others)
    );
  };

  const branch = localStorage.getItem("branch_id");

  useEffect(() => {
    if (branch) {
      const parsedData = JSON.parse(branch);
      setBranchId(parsedData);
    } else {
      console.log("No data found in localStorage.");
    }
  }, [branch]);


  const handleFormSubmit = async (formDataValue) => {

    formDataValue.deduction_amount = parseFloat(formDataValue.deduction_amount)
    formDataValue.mobile_bill = parseFloat(formDataValue.mobile_bill)
    formDataValue.food_bill = parseFloat(formDataValue.food_bill)
    formDataValue.bonus = parseFloat(formDataValue.bonus)
    formDataValue.commission = parseFloat(formDataValue.commission)
    formDataValue.advance = parseFloat(formDataValue.advance)
    formDataValue.festival_bonus = parseFloat(formDataValue.festival_bonus)
    formDataValue.travel_allowance = parseFloat(formDataValue.travel_allowance)
    formDataValue.others = parseFloat(formDataValue.others)
    formDataValue.employee_id = employee_id;
    const { available_balance, total_salary, receipt_no, account_id, ...formDataValues } = formDataValue;

    formDataValues.branch_id = branchId;
    formDataValue.salary_month = salary_month;

    formDataValues.payment = JSON.stringify({
      account_id: account_id,
      cheque_no: formDataValues.cheque_no,
      receipt_no: formDataValues.receipt_no,
    });
    const formData = new FormData();

    // Convert date fields to ISO strings
    if (formDataValues.salary_date) {
      formData.append("salary_date", new Date(formDataValues.salary_date).toISOString());
    }

    // Append remaining fields
    Object.keys(formDataValues).forEach((key) => {
      if (!["salary_date"].includes(key)) {
        if (formDataValues[key] instanceof FileList && formDataValues[key].length > 0) {
          formData.append(key, formDataValues[key][0]);
        } else {
          formData.append(key, formDataValues[key]);
        }
      }
    });

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const options = [
    { value: "january", label: "January" },
    { value: "february", label: "February" },
    { value: "march", label: "March" },
    { value: "april", label: "April" },
    { value: "may", label: "May" },
    { value: "june", label: "June" },
    { value: "july", label: "July" },
    { value: "august", label: "August" },
    { value: "september", label: "September" },
    { value: "october", label: "October" },
    { value: "november", label: "November" },
    { value: "december", label: "December" }
  ]

  useEffect(() => {
    reset({
      ...data,
    });
  }, [data, reset]);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Card className="mt-[40px] py-[30px] px-[20px]">
        <div className="grid grid-cols-1 gap-5">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
            <CustomReactSelect
              control={control}
              name={"employee_id"}
              label={"Employee"}
              placeholder={"Select Employee"}
              options={
                employees?.data?.map((item) => ({
                  value: item.id,
                  label: item.name,
                })) || []
              }
              error={errors?.employee_id}
            />
            <CustomReactSelect
              control={control}
              name={"salary_month"}
              label={"Salary Month"}
              placeholder={"Select Salary Month"}
              options={options}
              error={errors?.salary_month}
            />
          </div>
          {
            employee_id && (
              <>
                <div className="grid md:grid-cols-3 grid-cols-1 gap-2">
                  <TextInput
                    name="present_salary"
                    label="Present Salary"
                    type="number"
                    register={register}
                    value={employee?.data?.salary}
                    defaultValue={employee?.data?.salary}
                    readonly={true}
                  />
                  <TextInput
                    name="deduction_amount"
                    label="Deduction Amount"
                    type="number"
                    register={register}
                    error={errors.deduction_amount}
                    // required={true}
                    // className="h-[48px]"
                    placeholder="Enter Deduction Amount"
                  />
                  <TextInput
                    name="deduction_reason"
                    label="deduction Reason"
                    type="text"
                    register={register}
                    error={errors.deduction_reason}
                    // required={true}  
                    // className="h-[48px]"
                    placeholder="Enter deduction Reason"
                  />
                </div>
              </>
            )
          }

          <div className="grid md:grid-cols-4 grid-cols-1 gap-2">
            <TextInput
              name="mobile_bill"
              label="Mobile Bill"
              type="number"
              register={register}
              error={errors.mobile_bill}
              // required={true}
              // className="h-[48px]"
              placeholder="Enter Mobile Bill"
            />
            <TextInput
              name="food_bill"
              label="Food  Bill"
              type="number"
              register={register}
              error={errors.food_bill}
              // required={true}
              // className="h-[48px]"
              placeholder="Enter Food Bill"
            />
            <TextInput
              name="bonus"
              label="Bonus"
              type="number"
              register={register}
              error={errors.bonus}
              // required={true}
              // className="h-[48px]"
              placeholder="Enter Bonus"
            />
            <TextInput
              name="commission"
              label="Commission"
              type="number"
              register={register}
              error={errors.commission}
              // required={true}
              // className="h-[48px]"
              placeholder="Enter Commission"
            />
            <TextInput
              name="festival_bonus"
              label="Festival Bonus"
              type="number"
              register={register}
              error={errors.festival_bonus}
              // required={true}
              // className="h-[48px]"
              placeholder="Enter Festival Bonus"
            />
            <TextInput
              name="travel_allowance"
              label="Travel Allowance(TA)"
              type="number"
              register={register}
              error={errors.travel_allowance}
              // required={true}
              // className="h-[48px]"
              placeholder="Enter Travel Allowance(TA)"
            />
            <TextInput
              name="others"
              label="Others"
              type="number"
              register={register}
              error={errors.others}
              // required={true}
              // className="h-[48px]"
              placeholder="Enter Others"
            />
            <TextInput
              name="advance"
              label="Advance"
              type="number"
              register={register}
              error={errors.advance}
              // required={true}
              // className="h-[48px]"
              placeholder="Enter Advance"
            />
          </div>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-2">
            <TextInput
              name="total_salary"
              label="Total Salary"
              type="text"
              register={register}
              value={totalSalary}
              defaultValue={totalSalary}
              readonly={true}
            />
            <CustomReactSelect
              control={control}
              name={"account_id"}
              label={"Account"}
              placeholder={"Select Account"}
              required={true}
              options={
                accounts?.data?.map((item) => ({
                  value: item.id,
                  label: item.bank_name,
                })) || []
              }
              error={errors?.account_id}
            />
            <TextInput
              name="available_balance"
              label="Available Balance"
              type="text"
              register={register}
              value={available_balance?.data?.data?.available_balance}
              defaultValue={available_balance?.data?.data?.available_balance}
              readonly={true}
            />
            <TextInput
              name="cheque_no"
              label="Cheque No"
              type="text"
              register={register}
              error={errors.cheque_no}
              // required={true}
              // className="h-[48px]"
              placeholder="Enter Cheque No"
            />
            <TextInput
              name="receipt_no"
              label="receipt No"
              type="text"
              register={register}
              error={errors.receipt_no}
              // required={true}
              // className="h-[48px]"
              placeholder="Enter receipt No"
            />
            <TextInput
              name="salary_date"
              label="Salary Date"
              type="datetime-local"
              register={register}
              required={true}
              error={errors.salary_date}
              placeholder="Enter Salary Date"
              defaultValue={new Date().toISOString().slice(0, 16)}
            />
          </div>

          <TextInput
            name="note"
            label="Enter Note"
            type="text"
            register={register}
            error={errors.note}
            // required={true}
            // className="h-[48px]"
            placeholder="Enter note"
          />
          <TextInput
            name="image_path"
            label="Upload Image"
            type="file"
            register={register}
            error={errors.image_path}
            imgUrl={data?.image_path}
          />
        </div>

        <div className="ltr:text-right rtl:text-left space-x-3 rtl:space-x-reverse mt-6">
          <Button
            className="bg-[#FF5B14] text-white w-[90px] h-[38px] flex justify-center items-center"
            onClick={() => {
              navigate(-1);
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-[#2377E7] text-white w-[90px] h-[38px] flex justify-center items-center"
          >
            {isLoading ? <Loader /> : "Submit"}
          </Button>
        </div>
      </Card>
    </form>
  );
};

export default PayrollForm;
