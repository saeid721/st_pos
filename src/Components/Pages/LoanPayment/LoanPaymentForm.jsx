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
import { useGetAccountsQuery, useGetAccountTransactionByTransactionIdQuery, useGetAvailableBalanceByAccountQuery } from "../../../store/api/app/Account/accountApiSlice";
import { useGetLoanAuthoritiesQuery } from "../../../store/api/app/LoanAuthoritiesApi/loanAuthoritiesApiSlice";
import { useCreateLoansMutation, useGetLoansByIdQuery, useGetLoansQuery, useUpdateLoansMutation } from "../../../store/api/app/LoansApi/loansApiSlice";
import { useCreateLoanPaymentsMutation, useGetAllPaymentsByLoanIdQuery, useUpdateLoanPaymentsMutation } from "../../../store/api/app/paymentsApi/paymentsApiSlice";

const LoanPaymentForm = ({ id, data }) => {
  const [dueAmount, setDueAmount] = useState(0);
  const [interest, setInterest] = useState(0);
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
    onSubmit,
    watch,
    isLoading,
  } = useSubmit(
    id,
    id ? useUpdateLoanPaymentsMutation : useCreateLoanPaymentsMutation
  );

  const account_id = watch('account_id')
  const loan_id = watch('loan_id')
  const { data: accounts, isFetching, isLoading: accountsIsLoading, isError, error } =
    useGetAccountsQuery({
      store_id: store_id
    });
  const { data: loans, isFetching: loansIsFetching, isLoading: loansIsLoading } =
    useGetLoansQuery();
  const { data: availableBalance } = useGetAvailableBalanceByAccountQuery({
    account_id: account_id
  });
  const { data: allLoanPayments } = useGetAllPaymentsByLoanIdQuery({
    loan_id: loan_id
  });
  const { data: loan } = useGetLoansByIdQuery(loan_id);

  const { data: accountTransaction } = useGetAccountTransactionByTransactionIdQuery(loan?.data?.transaction_id);
  console.log("accountTransaction", accountTransaction);



  useEffect(() => {
    if (loan_id) {
      const totalAmountPaid = allLoanPayments?.data?.reduce((total, payment) => total + payment.amount, 0);
      const dueAmount = loan?.data?.payable - totalAmountPaid;
      setDueAmount(dueAmount);


      const loanTotalInterest = loan?.data?.payable - accountTransaction?.data?.amount;
      const perInstallmentInterest = loanTotalInterest / loan?.data?.duration
      setInterest(perInstallmentInterest);
    }
  }, [loan_id, loan, accountTransaction])

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
    const { payable_amount, per_day, ...formDataValues } = formDataValue;

    formDataValues.branch_id = branchId;

    formDataValues.loan_payment = JSON.stringify({
      account_id: formDataValues.account_id,
      amount: formDataValues.amount,
    });
    const formData = new FormData();

    console.log("formDataValues", formDataValue);

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
      label: "TERM_LOAN",
    },
    {
      value: 0,
      label: "CASH",
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

  useEffect(() => {
    if (data) {
      console.log("data:::", data);
      // Extract and transform data for resetting the form
      const { photo, ...rest } = data;

      // Prepare transformed fields
      const transformedData = {
        ...rest,
      };

      reset(transformedData);
    }
  }, [data, reset]);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Card className="mt-[40px] py-[30px] px-[20px]">
        <div className="grid grid-cols-1 gap-5">
          <div className="grid grid-cols-2 gap-5">
            <CustomReactSelect
              control={control}
              name={"loan_id"}
              label={"Loan"}
              placeholder={"Select Loan Authority"}
              required={true}
              options={
                loans?.data?.map((item) => ({
                  value: item.id,
                  label: item.reference_no,
                })) || []
              }
              error={errors?.loan_id}
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
          </div>
          <div className="grid grid-cols-2 gap-5">
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
              defaultValue={availableBalance?.data?.available_balance}
              value={availableBalance?.data?.available_balance}
              readonly={true}
            />
          </div>


          {
            loan_id && (
              <>
                <div className="grid grid-cols-2 gap-5">
                  <TextInput
                    name="payable_balance"
                    label="Payable Balance"
                    type="text"
                    register={register}
                    defaultValue={loan?.data?.payable?.toFixed(2)}
                  // value={loan?.data?.payable?.toFixed(2)}
                  // readonly={true}
                  />
                  <TextInput
                    name="due"
                    label="Due"
                    type="text"
                    register={register}
                    // readonly={true}
                    defaultValue={dueAmount?.toFixed(2)}
                  // value={dueAmount?.toFixed(2)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <TextInput
                    name="amount"
                    label="Amount"
                    type="text"
                    register={register}
                    defaultValue={loan?.data?.per_installment?.toFixed(2)}
                  // value={loan?.data?.per_installment?.toFixed(2)}
                  // readonly={true}
                  />
                  <TextInput
                    name="interest"
                    label="Interest"
                    type="text"
                    register={register}
                    defaultValue={interest.toFixed(2)}
                    value={interest.toFixed(2)}
                    readonly={true}
                  />
                </div>
              </>
            )
          }


          <div className="grid grid-cols-2 gap-5">
            <TextInput
              name="date"
              label="Date"
              type="datetime-local"
              register={register}
              error={errors.date}
              required={true}
              placeholder="Enter Date"
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
          </div>
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

export default LoanPaymentForm;
