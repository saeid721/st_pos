import { useState, useEffect, useRef } from "react";
import { FiMenu, FiSearch, FiBell, FiMoon, FiPlus, FiMaximize, FiMinimize, FiChevronDown, FiFileText, FiDollarSign, FiShoppingCart, FiClipboard } from "react-icons/fi";
import { TbLayoutSidebarLeftCollapse, TbLayoutSidebarLeftExpand } from "react-icons/tb";
import { MdFlag } from "react-icons/md";
import { AiOutlineAppstore } from "react-icons/ai";
import { IoMdHelpCircleOutline } from "react-icons/io";
import ProfileDropDownCard from "./ProfileDropDownCard/ProfileDropDownCard";
import SearchModal from "./SearchModal/SearchModal";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useGetCurrenciesQuery, useGetStoreCurrenciesQuery, useSetStoreCurrenciesMutation } from "../../../store/api/app/Currency/currenciesApiSlice";
import CustomReactSelect from "../Select/CustomReactSelect";
import { useForm } from "react-hook-form";
import { useGetStoresByIdQuery } from "../../../store/api/app/store/storeApiSlice";
import { useSelector } from "react-redux";

const Navbar = ({ isExpanded, onToggleSidebar, isPOSPage }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [quickMenuOpen, setQuickMenuOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const dropdownRef = useRef(null);
  const quickMenuRef = useRef(null);

  const { data: currencies } = useGetCurrenciesQuery();
  const [setStoreCurrencies, { isLoading: currencyLoading, isSuccess, isError }] = useSetStoreCurrenciesMutation();

  const { data: storeCurrency } = useGetStoreCurrenciesQuery();

  const { isAuth, auth } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { store_id } = auth.user;
  const { data: storeData } = useGetStoresByIdQuery(store_id);

  const {
    register,
    unregister,
    control,
    errors,
    reset,
    setValue,
    handleSubmit,
    onSubmit,
    watch,
    isLoading,
  } = useForm({});

  useEffect(() => {
    if (currencies?.data?.length > 0) {
      setValue("currency", storeCurrency?.data?.currency_id || currencies.data[0].id); // Assuming you want to set the `id` of the first currency
    }
  }, [currencies, setValue, storeCurrency]);

  const currency = watch("currency");
  useEffect(() => {
    const data = {
      currency_id: currency,
    }
    setStoreCurrencies({ data: data }) // Call the mutation function here
      .then((result) => {
        console.log("Mutation result:", result);
      })
      .catch((error) => {
        console.error("Mutation error:", error);
      });

  }, [currency]);


  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleSearchModal = () => {
    setSearchModalOpen(!searchModalOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (quickMenuRef.current && !quickMenuRef.current.contains(event.target)) {
        setQuickMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const { pathname } = useLocation();
  const pathArray = pathname.split("/");
  let route = null;
  if (pathArray.includes("store") && pathArray.includes("admin")) {
    route = "admin";
  } else if (pathArray.includes("admin")) {
    route = "admin";
  } else if (pathArray.includes("store")) {
    route = "store";
  }


  return (
    <div>
      <nav
        className={`bg-white shadow-md px-3 py-2 transition-all duration-300 ${
          isPOSPage ? "" : isExpanded ? "md:pl-[18.75rem]" : "md:pl-[5.75rem]"
        }`}
      >
        <div className="mx-auto flex justify-between items-center">
          {/* Sidebar Toggle */}
          <div className="flex items-center">
            <button
              type="button"
              onClick={onToggleSidebar}
              className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-200 ${
                isExpanded
                  ? "border-gray-200 text-gray-600 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600"
                  : "border-indigo-200 bg-indigo-50 text-indigo-600 hover:border-indigo-300 hover:bg-indigo-100"
              }`}
              title={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
              aria-label="Toggle sidebar"
            >
              <FiMenu size={19} className="md:hidden" />
              {isExpanded ? (
                <TbLayoutSidebarLeftCollapse size={20} className="hidden md:inline-flex" />
              ) : (
                <TbLayoutSidebarLeftExpand size={20} className="hidden md:inline-flex" />
              )}
            </button>
          </div>
          {/* Right Side */}
          <div className="ml-auto flex items-center gap-3">
            {/* <FiSearch
              className="text-gray-600 hover:text-gray-800 cursor-pointer"
              size={24}
              onClick={toggleSearchModal}
            />
            <ThemeToggle />
            <FiBell
              className="text-gray-600 hover:text-gray-800 cursor-pointer relative"
              size={24}
            /> */}

            {/* <CustomReactSelect
              control={control}
              name={"currency"}
              label={""}
              isClearable={false}
              options={
                currencies?.data?.map((item) => ({
                  value: item.id,
                  label: item.currency,
                })) || []
              }
              
              error={errors?.feature_ids}
            /> */}

            {route === "store" && (
              <button
                type="button"
                onClick={() => navigate("/store/dashboard/POS")}
                className="inline-flex items-center gap-1 rounded-full bg-indigo-500 px-2.5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300 sm:gap-1.5 sm:px-4"
                title="Open POS"
              >
                <span aria-hidden="true">▣</span> POS
              </button>
            )}

            {route === "store" && <div className="relative" ref={quickMenuRef}>
              <button
                type="button"
                onClick={() => setQuickMenuOpen(!quickMenuOpen)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                title="Create new"
                aria-label="Create new"
                aria-expanded={quickMenuOpen}
              >
                <FiPlus size={19} />
              </button>
              <div className={`absolute right-0 z-50 mt-2 w-52 overflow-hidden rounded-lg border border-gray-100 bg-white py-1 text-sm shadow-xl transition-all ${quickMenuOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"}`}>
                {[
                  ["New Invoice", "/store/dashboard/invoices-list/new", FiFileText],
                  ["New Expense", "/store/dashboard/expenses/new", FiDollarSign],
                  ["New Purchase", "/store/dashboard/purchases/new", FiShoppingCart],
                  ["New Quotation", "/store/dashboard/quotation-list/new", FiClipboard],
                ].map(([label, path, Icon]) => (
                  <button
                    key={path}
                    type="button"
                    onClick={() => { navigate(path); setQuickMenuOpen(false); }}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-gray-700 transition hover:bg-indigo-50 hover:text-indigo-600"
                  >
                    <Icon size={17} className="shrink-0 text-indigo-500" />
                    {label}
                  </button>
                ))}
              </div>
            </div>}

            <button
              type="button"
              onClick={toggleFullscreen}
              className="inline-flex text-gray-500 transition hover:text-indigo-600 focus:outline-none"
              title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
              aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? <FiMinimize size={19} /> : <FiMaximize size={19} />}
            </button>

            <div className="relative flex items-center" ref={dropdownRef}>
              <button
                type="button"
                onClick={toggleDropdown}
                className="flex items-center rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-200"
                aria-label="Open user profile menu"
                aria-expanded={dropdownOpen}
              >
                <img
                  className="w-8 h-8 rounded-full"
                  src="/fallBack_Image.jpg"
                  alt="User avatar"
                />
                <span className="ml-1 inline-block max-w-[58px] truncate text-xs font-medium text-gray-700 align-middle sm:ml-2 sm:max-w-none sm:text-sm">
                  {auth?.user?.name || auth?.user?.store_role_name || auth?.user?.role_name || "User"}
                </span>
                <FiChevronDown className="ml-0.5 text-gray-500 align-middle sm:ml-1" size={14} />
              </button>
              <ProfileDropDownCard
                dropdownOpen={dropdownOpen}
                onClose={closeDropdown}
              />
            </div>
          </div>
        </div>
      </nav>

      <SearchModal isOpen={searchModalOpen} onClose={toggleSearchModal} />
    </div>
  );
};

export default Navbar;
