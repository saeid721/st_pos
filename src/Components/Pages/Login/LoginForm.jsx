import React from "react";
import TextInput from "../../Shared/TextInput/TextInput";
import { useForm } from "react-hook-form";
import Button from "../../Shared/ui/Button";
import { useLoginMutation } from "../../../store/api/auth/authApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setUser } from "../../../store/api/auth/authSlice";
import { Loader } from "lucide-react";

const LoginForm = () => {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const auth = useSelector((state) => state.auth);

  const handleLoginSubmit = async (data) => {
    try {
      const loginData = {
        email: data.email,
        password: data.passwod,
      };
      const response = await login(loginData);

      if (response?.data?.status !== "success") {
        throw new Error("Invalid Credentials");
      }

      const loggedInUser = {
        accessToken: response?.data?.data?.token?.access,
        refreshToken: response?.data?.data?.token?.refresh,
        user: {
          ...response?.data?.data?.admin,
          user_type: "super_admin",
        },
      };

      dispatch(setUser(loggedInUser));
      // navigate(`/admin/${response?.data?.data?.user?.role_id}`);
      navigate(`/admin/dashboard`);
      toast.success("Login Successful");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full mx-auto">
      <form
        action=""
        onSubmit={handleSubmit(handleLoginSubmit)}
        className="space-y-4 md:flex justify-center flex-col"
      >
        <TextInput
          name="email"
          label="Email or Phone number"
          type="text"
          register={register}
          error={errors.email}
          // className="h-[48px]"
          placeholder="Enter your Email or Phone number"
          className={"text-black"}
        />
        <TextInput
          name="passwod"
          label="Passwod "
          type="password"
          register={register}
          error={errors.passwod}
          // className="h-[48px]"
          placeholder="Enter your passwod"
          className={"text-black"}
        />

        <button
          type="submit"
          className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 rounded-md transition duration-200"
        >
          {isLoading ? <Loader /> : "Admin Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
