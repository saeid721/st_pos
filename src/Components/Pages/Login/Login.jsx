import React, { useEffect } from "react";
import Cookies from "js-cookie";
import LoginForm from "./LoginForm";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Login = () => {
  const { isAuth, auth } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuth && auth?.user?.user_type === "super_admin") {
      navigate("/admin/dashboard");
    }
  }, [isAuth, navigate]);

  return (
    <div className="relative overflow-hidden h-screen">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          width={500}
          height={300}
          src={`/SignInImage.jpg`}
          alt={`POS poster`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Login form */}
      <div className="relative z-10 flex justify-center items-center h-screen ">
        {/* Form container */}
        <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-gray-900 bg-opacity-90 text-white">
          <div className="flex justify-center items-center mb-8">
            <img
              src="/ST_POS_LOGO.png"
              alt=""
              className="max-w-[150px] h-auto"
            />
          </div>
          <h3 className="text-2xl font-bold text-center mb-5">Sign in</h3>
          <p className="text-center mb-8">
            Sign in to your account to start using ST POS
          </p>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
