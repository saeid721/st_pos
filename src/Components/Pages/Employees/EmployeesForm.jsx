import React, { useEffect } from "react";
import { Card } from "../../ui/card";
import TextInput from "../../Shared/TextInput/TextInput";
import Button from "../../Shared/ui/Button";
import { Loader } from "lucide-react";

import { useNavigate } from "react-router-dom";
import useSubmit from "../../Shared/Constant/hooks/useSubmit";
import { useCreateFeaturesMutation, useGetFeaturesQuery, useUpdateFeaturesMutation } from "../../../store/api/app/Features/featuresApiSlice";
import CustomReactSelect from "../../Shared/Select/CustomReactSelect";
import { useCreatePlansMutation, useUpdatePlansMutation } from "../../../store/api/app/Plans/plansApiSlice";
import { useGetDepartmentsQuery } from "../../../store/api/app/Department/departmentApiSlice";
import { useSelector } from "react-redux";
import { useCreateEmployeesMutation, useUpdateEmployeesMutation } from "../../../store/api/app/Employees/employeesApiSlice";

const EmployeesForm = ({ id, data }) => {
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
    id ? useUpdateEmployeesMutation : useCreateEmployeesMutation
  );
  const { data: departments, isFetching, isLoading: featuresIsLoading, isError, error } =
    useGetDepartmentsQuery({
      store_id: store_id
    });

  const handleFormSubmit = async (formDataValues) => {
    console.log("formDataValues", formDataValues);
    const formData = new FormData();

    // Convert date fields to ISO strings
    if (formDataValues.birth_date) {
      formData.append("birth_date", new Date(formDataValues.birth_date).toISOString());
    }
    if (formDataValues.appointment_date) {
      formData.append("appointment_date", new Date(formDataValues.appointment_date).toISOString());
    }
    if (formDataValues.joining_date) {
      formData.append("joining_date", new Date(formDataValues.joining_date).toISOString());
    }

    // // Convert float fields to numbers and append
    // if (formDataValues.commission) {
    //   formData.append("commission", parseFloat(formDataValues.commission));
    // }
    // if (formDataValues.salary) {
    //   formData.append("salary", parseFloat(formDataValues.salary));
    // }

    // Append remaining fields
    Object.keys(formDataValues).forEach((key) => {
      if (!["birth_date", "appointment_date", "joining_date"].includes(key)) {
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
      value: "Male",
      label: "Male",
    },
    {
      value: "Female",
      label: "Female",
    },
  ];
  const options2 = [
    {
      value: "A+",
      label: "A+",
    },
    {
      value: "A-",
      label: "A-",
    },
    {
      value: "B+",
      label: "B+",
    },
    {
      value: "B-",
      label: "B-",
    },
    {
      value: "AB+",
      label: "AB+",
    },
    {
      value: "AB-",
      label: "AB-",
    },
    {
      value: "O+",
      label: "O+",
    },
    {
      value: "O-",
      label: "O-",
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
          <div className="grid md:grid-cols-3 grid-cols-1 gap-2">
            <TextInput
              name="name"
              label="Employee Name"
              type="text"
              register={register}
              error={errors.name}
              required={true}
              placeholder="Enter Title"
            />
            <CustomReactSelect
              control={control}
              name={"department_id"}
              label={"Department"}
              required={true}
              placeholder={"Select Department"}
              options={
                departments?.data?.map((item) => ({
                  value: item.id,
                  label: item.name,
                })) || []
              }
              error={errors?.department_id}
            />
            <TextInput
              name="designation"
              label="Designation"
              type="text"
              // register={register({ required: "designation is required", min: 1 })}
              register={register}
              error={errors.name}
              required={true}
              placeholder="Enter designation"
            />



            <TextInput
              name="mobile_number"
              label="Mobile Number"
              type="number"
              register={register}
              error={errors.mobile_number}
              required={true}
              placeholder="Enter mobile_number"
            />
            <TextInput
              name="salary"
              label="Salary"
              type="number"
              register={register}
              error={errors.salary}
              required={true}
              placeholder="Enter salary"
            />
            <TextInput
              name="commission"
              label="Commission"
              type="number"
              register={register}
              error={errors.commission}

              placeholder="Enter commission"
            />

          </div>
          <div className="grid md:grid-cols-4 grid-cols-1 gap-2">
            <TextInput
              name="birth_date"
              label="Birth Date"
              type="datetime-local"
              register={register}
              error={errors.birth_date}

              placeholder="Enter birth_date"
            />
            <CustomReactSelect
              control={control}
              name="gender"
              label="Gender"
              placeholder="Select gender"
              options={options}
              required={true}
            // error={errors.section_type}
            />
            <CustomReactSelect
              control={control}
              name="blood_group"
              label="Blood Group"
              placeholder="Select blood_group"
              options={options2}
            // required={true}
            // error={errors.section_type}
            />
            <TextInput
              name="religion"
              label="Religion"
              type="text"
              register={register}
              error={errors.religion}

              placeholder="Enter religion"
            />
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
            <TextInput
              name="appointment_date"
              label="Appointment Date"
              type="datetime-local"
              register={register}
              error={errors.appointment_date}

              placeholder="Enter appointment_date"
            />
            <TextInput
              name="joining_date"
              label="Joining Date"
              type="datetime-local"
              register={register}
              error={errors.joining_date}

              placeholder="Enter joining_date"
            />
          </div>
          <TextInput
            name="address"
            label="Address"
            type="text"
            register={register}
            error={errors.address}

            placeholder="Enter address"
          />
          <TextInput
            name="note"
            label="Note"
            type="text"
            register={register}
            error={errors.note}

            placeholder="Enter note"
          />
          <TextInput
            name="photo"
            label="Profile Picture"
            type="file"
            register={register}
            // required={!data?.thumbnail}
            error={errors.photo}
            imgUrl={data?.photo}
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

export default EmployeesForm;
