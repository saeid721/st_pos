import React, { useEffect } from "react";
import LoginFormStore from "./LoginFormStore";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginStore = () => {
  const { isAuth, auth } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuth && auth?.user?.user_type === "store" && auth?.user?.store_role_name !== 'admin') {
      navigate("/store/dashboard");
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
          alt={`Movie poster`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Login form */}
      <div className="relative z-10 flex justify-center items-center h-screen ">
        {/* Form container */}
        <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-gray-900 bg-opacity-90 text-white">
          <div className="flex justify-center items-center mb-8">
            <img
              src="/logo.png"
              alt=""
              className="max-w-[150px] h-auto"
            />
          </div>
          <h3 className="text-2xl font-bold text-center mb-5">Sign in</h3>
          <p className="text-center mb-8">
            Sign in to your account to start using ST POS
          </p>
          <LoginFormStore />
        </div>
      </div>
    </div>
  );
};

export default LoginStore;
