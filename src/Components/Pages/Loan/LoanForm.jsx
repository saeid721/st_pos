import React, { useEffect, useState } from "react";
import { Card } from "../../ui/card";
import TextInput from "../../Shared/TextInput/TextInput";
import Button from "../../Shared/ui/Button";
import { Loader } from "lucide-react";

import { useNavigate } from "react-router-dom";
import useSubmit from "../../Shared/Constant/hooks/useSubmit";

import CustomReactSelect from "../../Shared/Select/CustomReactSelect";

import { useSelector } from "react-redux";
import { useCreateEmployeesMutation, useUpdateEmployeesMutation } from "../../../store/api/app/Employees/employeesApiSlice";
import { useGetAccountsQuery, useGetAvailableBalanceByAccountQuery } from "../../../store/api/app/Account/accountApiSlice";
import { useGetLoanAuthoritiesByIdQuery, useGetLoanAuthoritiesQuery } from "../../../store/api/app/LoanAuthoritiesApi/loanAuthoritiesApiSlice";
import { useCreateLoansMutation, useUpdateLoansMutation } from "../../../store/api/app/LoansApi/loansApiSlice";
import generateLoanCalculation from "../../../lib/loanCalculation";
import { toast } from "react-toastify";
import { useMemo } from "react";
import { formatDateForInput } from "../../../lib/format";

const LoanForm = ({ id, data }) => {
  // const [loans, setLoans] = useState({});
  const [branchId, setBranchId] = useState(null);
  const navigate = useNavigate(); // Get the navigate function
  const { isAuth, auth } = useSelector((state) => state.auth);
  const { store_id } = auth.user;

  const {
    register,
    unregister,
    control,
    errors,
    reset,
    handleSubmit,
    setValue,
    onSubmit,
    watch,
    isLoading,
  } = useSubmit(
    id,
    id ? useUpdateLoansMutation : useCreateLoansMutation
  );

  const loan_type = watch('loan_type');
  const payment_type = watch('payment_type');
  const amount = watch('amount');
  const interest = watch('interest')
  const duration = watch('duration');
  const account_id = watch('account_id');
  const authority_id = watch('authority_id');

  const { data: accounts, isFetching, isLoading: accountsIsLoading, isError, error } =
    useGetAccountsQuery({
      store_id: store_id
    });
  const { data: loanAuthorities, isFetching: loanAuthoritiesIsFetching, isLoading: loanAuthoritiesIsLoading } =
    useGetLoanAuthoritiesQuery();

  const { data: loanAuthority } = useGetLoanAuthoritiesByIdQuery(authority_id);
  const { data: availableBalance } = useGetAvailableBalanceByAccountQuery({
    account_id: account_id
  });


  const loans = useMemo(() => {
    return generateLoanCalculation(amount, interest, duration, loan_type, payment_type);
  }, [amount, interest, duration, loan_type, payment_type]);


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

    formDataValue.amount = parseFloat(formDataValue.amount)
    const { payable_amount, per_day, available_amount, cc_limit, ...formDataValues } = formDataValue;
    if (availableBalance?.data?.available_balance) {
      if (availableBalance.data.available_balance < formDataValues?.amount) {
        toast.error("Insufficient Balance")
        return
      }
    }

    formDataValues.branch_id = branchId;

    formDataValues.loan_payment = JSON.stringify({
      account_id: formDataValues.account_id,
      amount: formDataValues.amount,
    });
    const formData = new FormData();

    // Convert date fields to ISO strings
    if (formDataValues.date) {
      formData.append("date", new Date(formDataValues.date).toISOString());
    }

    // Append remaining fields
    Object.keys(formDataValues).forEach((key) => {
      if (!["date"].includes(key)) {
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
    {
      value: 1,
      label: "TERM LOAN",
    },
    {
      value: 0,
      label: "CASH CREDIT(CC) LOAN",
    },
  ];
  const options2 = [
    {
      value: 0,
      label: "Daily",
    },
    {
      value: 1,
      label: "Monthly",
    },
    {
      value: 3,
      label: "Yearly",
    },



  ];

  // Set default value after data is loaded
  useEffect(() => {
    if (data?.date) {
      setValue('date', formatDateForInput(data.date));
    }
  }, [data?.date, setValue]);

  useEffect(() => {
    if (data) {
      console.log("data:::", data);
      // Extract and transform data for resetting the form
      const { photo, date, ...rest } = data;

      const formattedDate = date
        ? new Date(date).toISOString().split("T")[0]
        : "";
      

      // Prepare transformed fields
      const transformedData = {
        account_id: data?.transaction?.account?.id,
        amount: data?.transaction?.amount,
        date: formattedDate,
        ...rest,
      };

      reset(transformedData);
    }
  }, [data, reset]);

  console.log("date::: ", formatDateForInput(data?.date));

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Card className="mt-[40px] py-[30px] px-[20px]">
        <div className="grid grid-cols-1 gap-5">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
            <CustomReactSelect
              control={control}
              name={"authority_id"}
              label={"Loan Authority"}
              placeholder={"Select Loan Authority"}
              required={true}
              options={
                loanAuthorities?.data?.map((item) => ({
                  value: item.id,
                  label: item.name,
                })) || []
              }
              error={errors?.authority_id}
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
          </div>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
            <TextInput
              name="reason"
              label="Loan Reason"
              type="text"
              register={register}
              error={errors.reason}
              required={true}
              placeholder="Enter Loan Reason"
            />
            <TextInput
              name="reference_no"
              label="Reference"
              type="text"
              register={register}
              error={errors.reference_no}
              required={true}
              placeholder="Enter Reference"
            />
            <CustomReactSelect
              control={control}
              name={"loan_type"}
              label={"Loan Type"}
              placeholder={"Select Loan Type"}
              options={options}
              required={true}
              error={errors?.loan_type}
            />
          </div>
          {
            loan_type == 1 && (
              <>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-5 ">
                  <TextInput
                    name="amount"
                    label="Amount"
                    type="number"
                    register={register}
                    error={errors.amount}
                    required={true}
                    placeholder="Enter Amount"
                  />
                  <TextInput
                    name="interest"
                    label="Interest (%)"
                    type="number"
                    register={register}
                    error={errors.interest}
                    placeholder="Enter Interest (%)"
                  />
                </div>
                <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
                  <CustomReactSelect
                    control={control}
                    name={"payment_type"}
                    label={"Payment Type"}
                    placeholder={"Select Payment Type"}
                    options={options2}
                    error={errors?.payment_type}
                  />
                  <TextInput
                    name="duration"
                    label="Duration"
                    type="number"
                    register={register}
                    required={true}
                    error={errors.duration}
                    placeholder="Enter Duration"
                  />
                  <TextInput
                    name="per_day"
                    label={`${payment_type == 0 ? "Per Day" : payment_type == 1 ? "Per Month" : "Per Year"}`}
                    type="text"
                    register={register}
                    defaultValue={loans?.payReturn.toFixed(2)}
                    value={loans?.payReturn.toFixed(2)}
                    readonly={true}
                  />
                </div>
                <TextInput
                  name="payable_amount"
                  label="Payable Amount"
                  type="text"
                  register={register}
                  defaultValue={loans?.payableAmount}
                  value={loans?.payableAmount}
                  readonly={true}
                />
              </>
            )
          }

          {
            loan_type == 0 && (
              <>
                <TextInput
                  name="amount"
                  label="Amount"
                  type="number"
                  register={register}
                  required={true}
                  error={errors.amount}
                  placeholder="Enter Amount"
                />
              </>
            )
          }

          <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
            <TextInput
              name="date"
              label="Date"
              type="datetime-local"
              register={register}
              error={errors.date}
              required={true}
              placeholder="Enter Date"
              defaultValue={formatDateForInput(data?.date)}
              // value={formatDateForInput(data?.date)}
            />
            <TextInput
              name="note"
              label="Payable Note"
              type="text"
              register={register}
              error={errors.note}
              // required={true}
              placeholder="Enter Payable Note"
            />
            <TextInput
              name="image_path"
              label="Upload Image"
              type="file"
              register={register}
              // required={!data?.thumbnail}
              error={errors.image_path}
              imgUrl={data?.image_path}
            />
          </div>

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

export default LoanForm;
