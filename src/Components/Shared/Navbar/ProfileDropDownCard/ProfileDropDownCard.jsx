import { BiLogOut } from "react-icons/bi";
import { FiUser } from "react-icons/fi";
import { IoMdSettings } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../../../store/api/auth/authSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function ProfileDropDownCard({ dropdownOpen, onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const pathArray = pathname.split("/");
  const basePath = pathArray[1] === "store" ? "/store/dashboard" : "/admin/dashboard";
  const handleLogout = () => {
    dispatch(logOut());
    if (pathArray[1] === "admin") {
      navigate("/admin/login");
    } else if (pathArray[1] === "store") {
      navigate("/store/login");
    }
  };

  const { isAuth, auth } = useSelector((state) => state.auth);
  return (
    <div
      className={`absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-xl border border-slate-100 bg-white text-black shadow-xl transition-all duration-200 ${
        dropdownOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="p-4 flex items-center space-x-3">
        <img
          className="w-10 h-10 rounded-full"
          src="/fallBack_Image.jpg"
          alt="User avatar"
        />
        <div>
          <h2 className="font-bold">
            {auth?.user?.user_type === "store"
              ? auth?.user?.store_role_name
              : auth?.user?.user_type === "super_admin" &&
                auth?.user?.role_name}
          </h2>
          {/* <h2 className="font-bold">{auth?.user?.email}</h2> */}
          <p className="text-sm text-green-500">Online</p>
        </div>
      </div>
      <hr />

      <Link
        to={`${basePath}/profile`}
        className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-600"
        onClick={onClose}
      >
        <FiUser className="text-slate-400" size={18} /> Profile
      </Link>
      <Link
        to={`${basePath}/setup`}
        className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-600"
        onClick={onClose}
      >
        <IoMdSettings className="text-slate-400" size={18} /> Setup
      </Link>

      <hr />
      <button
        type="button"
        className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-red-500 transition hover:bg-red-50"
        onClick={() => {
          handleLogout();
          onClose();
        }}
      >
        <BiLogOut className="text-red-400" size={18} /> Logout
      </button>
    </div>
  );
}
