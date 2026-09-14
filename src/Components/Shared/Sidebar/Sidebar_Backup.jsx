import { MdAccountCircle } from "react-icons/md"; 
import { MdOutlineProductionQuantityLimits } from "react-icons/md"; 
import { HiOutlineReceiptTax } from "react-icons/hi"; 
import { FaUnity } from "react-icons/fa"; 
import { TbBrandAirtable } from "react-icons/tb"; 
import { MdLocalShipping } from "react-icons/md";
import { BsFillBuildingFill } from "react-icons/bs";
import { RiUserShared2Fill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { BiTransfer } from "react-icons/bi";
import { GiMoneyStack } from "react-icons/gi";
import { AiFillCreditCard } from "react-icons/ai";
import { BsFillJournalBookmarkFill } from "react-icons/bs";
import { BsFillPostcardFill } from "react-icons/bs";
import { FaFileInvoice } from "react-icons/fa";
import { AiOutlineBars } from "react-icons/ai";
import { BsFillHandbagFill } from "react-icons/bs";
import { BiPurchaseTag } from "react-icons/bi";
import { GiExpense } from "react-icons/gi";
import { DiGitBranch } from "react-icons/di";
import { BiCategoryAlt } from "react-icons/bi";
import { BsBagCheck } from "react-icons/bs";
import { BsCalculatorFill } from "react-icons/bs";
import { FaStore } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";
import { MdInventory } from "react-icons/md";
import { MdPayments } from "react-icons/md";
import { TbFileInvoice } from "react-icons/tb";
import { GiReturnArrow } from "react-icons/gi";
import { BsFillCartCheckFill } from "react-icons/bs";
import { FaUsersCog } from "react-icons/fa";
import { MdProductionQuantityLimits } from "react-icons/md";
import { BsFillEnvelopeOpenFill } from "react-icons/bs";
import { AiOutlineIdcard } from "react-icons/ai";
import { BiCoinStack } from "react-icons/bi";
import { AiTwotoneSetting } from "react-icons/ai";
import { FaViacoin } from "react-icons/fa";
import { MdOutlineFeaturedPlayList, MdSubscriptions } from "react-icons/md";
import { SiRelianceindustrieslimited } from "react-icons/si";

import {
  BiChevronDown,
  BiChevronUp,
  BiLockOpen,
  BiLogInCircle,
} from "react-icons/bi";

import {
  BsCreditCard2FrontFill,
  BsFillGearFill,
  BsPersonHeart,
  BsPersonRolodex,
  BsSpeedometer2,
  BsTools,
} from "react-icons/bs";
import { FaBloggerB, FaSignInAlt, FaTelegramPlane } from "react-icons/fa";
import { GiSettingsKnobs } from "react-icons/gi";
import { IoIosPeople } from "react-icons/io";
import { MdOutlineHighQuality } from "react-icons/md";
import { TbLanguage } from "react-icons/tb";

import { TagIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import hasPermission from "../../../utils/hasPermission";

const Sidebar = ({ isExpanded, setIsExpanded }) => {
  const SidebarAdminRoute = [
    {
      icon: <BsSpeedometer2 />,
      title: "Dashboard",
      path: "/",
      access: true,
    },

    {
      icon: <TbLanguage />,
      title: "Role Management",
      path: "/role-management",
      access: true,
      // access: hasPermission('READ_ROLE_PERMISSION'),
    },

    {
      icon: <GiSettingsKnobs />,
      title: "Home",
      path: "",
      content: true,
      access: hasPermission(["READ_HOME_SECTION", "READ_SLIDER"]),
      subCategory: [
        {
          icon: <GiSettingsKnobs />,
          title: "Home Section",
          path: "/homesection",
          access: hasPermission("READ_HOME_SECTION"),
        },
        {
          icon: <GiSettingsKnobs />,
          title: "Slider",
          path: "/slider",
          access: hasPermission("READ_SLIDER"),
        },
      ],
    },

    {
      icon: <FaStore />,
      title: "Store",
      path: "/store",
      access: hasPermission("READ_PLAN"),
    },
    {
      icon: <MdOutlineFeaturedPlayList />,
      title: "Features",
      path: "/features",
      access: hasPermission("READ_FEATURE"),
    },
    {
      icon: <BiTransfer />,
      title: "Plans",
      path: "/plans",
      access: hasPermission("READ_PLAN"),
    },
    {
      icon: <BiCoinStack />,
      title: "Pricing",
      path: "/pricing",
      access: hasPermission("READ_LANGUAGE"),
    },
    {
      icon: <FaUsers />,
      title: "Tenants",
      path: "/tenants",
      access: hasPermission("READ_INDUSTRY"),
    },
    {
      icon: <AiOutlineIdcard />,
      title: "Subscriptions",
      path: "/subscriptions",
      access: hasPermission("READ_GENRE"),
    },
    {
      icon: <MdPayments />,
      title: "Payments",
      path: "/payments",
      access: hasPermission("READ_QUALITY"),
    },
    {
      icon: <BsFillEnvelopeOpenFill />,
      title: "Subscribers",
      path: "/subscribers",
      access: hasPermission("READ_CAST"),
    },

    {
      icon: <MdProductionQuantityLimits />,
      title: "Products",
      path: "/products",
      access: hasPermission("READ_DIRECTOR"),
    },

    {
      icon: <FaUsers />,
      title: "Clients",
      path: "/clients",
      access: hasPermission("READ_TAG"),
    },
    {
      icon: <FaUsers />,
      title: "Suppliers",
      path: "/suppliers",
      access: hasPermission("READ_MOVIE"),
    },

    {
      icon: <FaUsersCog />,
      title: "Employees",
      path: "/employees",
      access: hasPermission("READ_SERIES"),
    },
    {
      icon: <AiFillCreditCard />,
      title: "Accounts",
      path: "/accounts",
      access: hasPermission("READ_SERIES"),
    },
    {
      icon: <AiFillCreditCard />,
      title: "Balance Transfer",
      path: "/balance-transfer",
      access: hasPermission("READ_SERIES"),
    },
    {
      icon: <AiFillCreditCard />,
      title: "Expenses",
      path: "/expenses",
      access: hasPermission("READ_SERIES"),
    },
    {
      icon: <BsFillCartCheckFill />,
      title: "Purchases",
      path: "/purchases",
      access: hasPermission("READ_SERIES"),
    },
    {
      icon: <GiReturnArrow />,
      title: "Purchase Returns",
      path: "/purchase-returns",
      access: hasPermission("READ_SERIES"),
    },
    {
      icon: <TbFileInvoice />,
      title: "Invoices",
      path: "/invoices",
      access: hasPermission("READ_SERIES"),
    },
    {
      icon: <GiReturnArrow />,
      title: "Invoice Returns",
      path: "/invoice-returns",
      access: hasPermission("READ_SERIES"),
    },
    {
      icon: <MdPayments />,
      title: "Invoice Payments",
      path: "/invoice-payments",
      access: hasPermission("READ_SERIES"),
    },
    {
      icon: <MdPayments />,
      title: "Purchase Payments",
      path: "/purchase-payments",
      access: hasPermission("READ_SERIES"),
    },
    {
      icon: <MdInventory />,
      title: "Inventory",
      path: "/inventory",
      access: hasPermission("READ_SERIES"),
    },
    {
      icon: <MdManageAccounts />,
      title: "Accounts",
      path: "/accounts",
      access: hasPermission("READ_SERIES"),
    },

    {
      icon: <IoIosPeople />,
      title: "Admins",
      path: "",
      content: true,
      access: hasPermission("READ_ROLE_PERMISSION"),
      subCategory: [
        {
          icon: <IoIosPeople />,
          title: "Roles",
          path: "/roles",
          access: hasPermission("READ_ROLE_PERMISSION"),
        },
        {
          icon: <IoIosPeople />,
          title: "Admins",
          path: "/admins",
          access: hasPermission("READ_ADMIN"),
        },
        {
          icon: <MdSubscriptions />,
          title: "Subscriber",
          path: "/subscriber",
          access: hasPermission("READ_USER"),
        },
      ],
    },
    {
      icon: <FaBloggerB />,
      title: "Blog",
      path: "/blogs",
      access: hasPermission("READ_BLOG"),
    },
    {
      icon: <MdOutlineFeaturedPlayList />,
      title: "Feature",
      path: "/applicationfeatures",
      access: hasPermission("READ_APPLICATION_FEATURE"),
    },
    {
      icon: <AiTwotoneSetting />,
      title: "Application Settings",
      path: "/applicationSettings",
      access: hasPermission("READ_APPLICATION_SETTING"),
    },
    {
      icon: <GiSettingsKnobs />,
      title: "Footer",
      path: "",
      content: true,
      access: hasPermission(["READ_FOOTER", "READ_SOCIAL"]),
      subCategory: [
        {
          icon: <GiSettingsKnobs />,
          title: "Social",
          path: "/social",
          access: hasPermission("READ_SOCIAL"),
        },
        {
          icon: <GiSettingsKnobs />,
          title: "Footer Type",
          path: "/footer-type",
          access: hasPermission("READ_FOOTER"),
        },
      ],
    },
    {
      icon: <FaViacoin />,
      title: "Personalities",
      path: "/favoritepersonalities",
      access: hasPermission("READ_PERSONALITY"),
    },

    {
      icon: <BsCreditCard2FrontFill />,
      title: "Pay Gateway",
      path: "/paymentgateway",
    },
    {
      icon: <BiTransfer />,
      title: "Subscription",
      path: "/subscription",
      access: hasPermission("READ_SUBSCRIPTION"),
    },

    {
      icon: <BiTransfer />,
      title: "Subscription Plans",
      path: "/plans",
      access: hasPermission("READ_PLAN"),
    },

    {
      icon: <BsFillGearFill />,
      title: "Settings",
      path: "/settings",
      content: true,
      subCategory: [
        { icon: <BsFillGearFill />, title: "General", path: "/general" },
        { icon: <FaTelegramPlane />, title: "SMTP Email", path: "/smtpemail" },
        {
          icon: <BiLogInCircle />,
          title: "Social Login",
          path: "/sociallogin",
        },
        {
          icon: <AiOutlineBars />,
          title: "Menu",
          path: "/menu",
        },
        {
          icon: <BsTools />,
          title: "Maintenance",
          path: "/maintenance",
        },
      ],
    },
    {
      icon: <BiLockOpen />,
      title: "App Verify",
      path: "/appverify",
    },
  ];
  const SidebarStoreRoute = [
    {
      icon: <BsSpeedometer2 />,
      title: "Dashboard",
      path: "/",
      access: true,
    },

    {
      icon: <TbLanguage />,
      title: "Role Management",
      path: "/role-management",
      access: true,
      // access: hasPermission('READ_ROLE_PERMISSION'),
    },

    {
      icon: <BsCalculatorFill />,
      title: "Expenses",
      path: "",
      content: true,
      // access: hasPermission('READ_PLAN'),
      access: true,
      subCategory: [
        {
          icon: <BiCategoryAlt />,
          title: "Categories",
          path: "/categories",
          // access: hasPermission('READ_PLAN'),
          access: true,
        },
        {
          icon: <DiGitBranch />,
          title: "Sub Categories",
          path: "/sub-categories",
          // access: hasPermission('READ_PLAN'),
          access: true,
        },
        {
          icon: <GiExpense />,
          title: "Expenses List",
          path: "/expenses-list",
          // access: hasPermission('READ_PLAN'),
          access: true,
        },
      ],
    },
    {
      icon: <BsBagCheck />,
      title: "Purchases",
      path: "",
      content: true,
      access: hasPermission("READ_PLAN"),
      subCategory: [
        {
          icon: <GiSettingsKnobs />,
          title: "Purchases List",
          path: "/purchases-list",
          // access: hasPermission('READ_PLAN'),
          access: true,
        },
        {
          icon: <GiReturnArrow />,
          title: "Returns List",
          path: "/returns-list",
          // access: hasPermission('READ_PLAN'),
          access: true,
        },
      ],
    },
    {
      icon: <BsFillHandbagFill />,
      title: "Sales",
      path: "",
      content: true,
      access: hasPermission("READ_PLAN"),
      subCategory: [
        {
          icon: <AiOutlineBars />,
          title: "quotations List",
          path: "/quotations-list",
          // access: hasPermission('READ_PLAN'),
          access: true,
        },
        {
          icon: <FaFileInvoice />,
          title: "Invoices List",
          path: "/invoices-list",
          // access: hasPermission('READ_PLAN'),
          access: true,
        },
        {
          icon: <BsFillPostcardFill />,
          title: "POS",
          path: "/pos",
          // access: hasPermission('READ_PLAN'),
          access: true,
        },
        {
          icon: <GiReturnArrow />,
          title: "Retuns List",
          path: "/returns-list",
          // access: hasPermission('READ_PLAN'),
          access: true,
        },
      ],
    },
    {
      icon: <BsFillJournalBookmarkFill />,
      title: "Cash Book",
      path: "",
      content: true,
      access: true,
      subCategory: [
        {
          icon: <AiFillCreditCard />,
          title: "Accounts",
          path: "/accounts",
          access: true,
        },
        {
          icon: <GiMoneyStack />,
          title: "Balance Adjustments",
          path: "/balance-adjustments",
          access: true,
        },
        {
          icon: <GiMoneyStack />,
          title: "Balance Transfers",
          path: "/balance-transfers",
          access: true,
        },
        {
          icon: <BiTransfer />,
          title: "Transaction History",
          path: "/transactions-history",
          access: true,
        },
      ],
    },
    {
      icon: <AiFillCreditCard />,
      title: "Payments",
      path: "",
      content: true,
      access: true,
      subCategory: [
        {
          icon: <FaUsers />,
          title: "Clients",
          path: "/clients",
          access: true,
        },
        {
          icon: <RiUserShared2Fill />,
          title: "Suppliers",
          path: "/suppliers",
          access: true,
        },
      ],
    },
    {
      icon: <AiFillCreditCard />,
      title: "Load Management",
      path: "",
      content: true,
      access: true,
      subCategory: [
        {
          icon: <BsFillBuildingFill />,
          title: "Authorities",
          path: "/authorities",
          access: true,
        },
        {
          icon: <GiMoneyStack />,
          title: "Loans",
          path: "/loans",
          access: true,
        },
        {
          icon: <GiMoneyStack />,
          title: "Payments",
          path: "/payments",
          access: true,
        },
      ],
    },

    {
      icon: <FaStore />,
      title: "Store",
      path: "/store",
      access: true,
    },
    {
      icon: <MdOutlineFeaturedPlayList />,
      title: "Features",
      path: "/features",
      access: true,
    },

    {
      icon: <FaUsers />,
      title: "Suppliers",
      path: "/suppliers",
      access: true,
    },
    {
      icon: <TbBrandAirtable />,
      title: "Brand",
      path: "/brand",
      access: true,
    },
    {
      icon: <FaUnity />,
      title: "Unit",
      path: "/unit",
      access: true,
    },
    {
      icon: <HiOutlineReceiptTax />,
      title: "Tax",
      path: "/tax",
      access: true,
    },
    {
      icon: <MdOutlineProductionQuantityLimits />,
      title: "Product",
      path: "/product",
      access: true,
    },
    {
      icon: <MdAccountCircle />,
      title: "Account",
      path: "/account",
      access: true,
    },

    {
      icon: <IoIosPeople />,
      title: "Category",
      path: "",
      content: true,
      // access: hasPermission('READ_USER'),
      access: true,
      subCategory: [
        {
          icon: <IoIosPeople />,
          title: "Category",
          path: "/category",
          // access: hasPermission('READ_ROLE'),
          access: true,
        },
        {
          icon: <IoIosPeople />,
          title: "Subcategory",
          path: "/sub-category",
          // access: hasPermission('READ_USER'),
          access: true,
        },
      ],
    },
    {
      icon: <IoIosPeople />,
      title: "Users",
      path: "",
      content: true,
      // access: hasPermission('READ_USER'),
      access: true,
      subCategory: [
        {
          icon: <IoIosPeople />,
          title: "Roles",
          path: "/store-roles",
          // access: hasPermission('READ_ROLE'),
          access: true,
        },
        {
          icon: <IoIosPeople />,
          title: "Users",
          path: "/store-users",
          // access: hasPermission('READ_USER'),
          access: true,
        },
      ],
    },
    {
      icon: <FaBloggerB />,
      title: "Blog",
      path: "/blogs",
      access: hasPermission("READ_BLOG"),
    },
    {
      icon: <MdOutlineFeaturedPlayList />,
      title: "Feature",
      path: "/applicationfeatures",
      access: hasPermission("READ_APPLICATION_FEATURE"),
    },
    {
      icon: <AiTwotoneSetting />,
      title: "Application Settings",
      path: "/applicationSettings",
      access: hasPermission("READ_APPLICATION_SETTING"),
    },
    {
      icon: <GiSettingsKnobs />,
      title: "Footer",
      path: "",
      content: true,
      access: hasPermission(["READ_FOOTER", "READ_SOCIAL"]),
      subCategory: [
        {
          icon: <GiSettingsKnobs />,
          title: "Social",
          path: "/social",
          access: hasPermission("READ_SOCIAL"),
        },
        {
          icon: <GiSettingsKnobs />,
          title: "Footer Type",
          path: "/footer-type",
          access: hasPermission("READ_FOOTER"),
        },
      ],
    },

    {
      icon: <BsFillGearFill />,
      title: "Settings",
      path: "/settings",
      content: true,
      subCategory: [
        { icon: <BsFillGearFill />, title: "General", path: "/general" },
        { icon: <FaTelegramPlane />, title: "SMTP Email", path: "/smtpemail" },
        {
          icon: <BiLogInCircle />,
          title: "Social Login",
          path: "/sociallogin",
        },
        {
          icon: <AiOutlineBars />,
          title: "Menu",
          path: "/menu",
        },
        {
          icon: <BsTools />,
          title: "Maintenance",
          path: "/maintenance",
        },
      ],
    },
    {
      icon: <BiLockOpen />,
      title: "App Verify",
      path: "/appverify",
    },
  ];

  const [menuItem, setMenuItem] = useState(null);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const pathname = window.location.pathname;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsExpanded(false);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [setIsExpanded]);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
    setToggleMenu(false);
  };

  const handleMouseEnter = () => {
    if (!isExpanded) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isExpanded) {
      setIsHovered(false);
      setToggleMenu(false);
    }
  };

  const handleMenuClick = (index) => {
    if (menuItem === index) {
      setToggleMenu(!toggleMenu);
    } else {
      setMenuItem(index);
      setToggleMenu(true);
    }
  };

  const handleLinkClick = (index) => {
    setMenuItem(index);
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-white shadow-[0_35px_30px_0px_rgba(0,0,0,0.3)] z-50 ${
        isExpanded || isHovered
          ? "w-64"
          : "w-16 opacity-0 md:opacity-100 max-md:pointer-events-none"
      } transition-all duration-500 ease-in`}
    >
      <div className={`relative items-center p-4 justify-center gap-2`}>
        <div
          className={`text-blue-500 text-xl transition-opacity duration-300 flex justify-center transform ${
            isExpanded || isHovered ? "opacity-100" : "opacity-0 "
          }`}
        >
          <img className="max-w-[130px]" src="/ST_POS_LOGO.png" alt="" />
        </div>
        <button
          className={`${
            isExpanded || isHovered
              ? "rotate-180 rounded-tl-[5px] rounded-bl-[5px]"
              : "rotate-0 rounded-tr-[5px] rounded-br-[5px]"
          } focus:outline-none absolute right-[-32px] top-0 bg-black text-white py-4 px-2 `}
          onClick={toggleSidebar}
        >
          <FaSignInAlt className={``} />
        </button>
      </div>

      <div
        className={`p-4 text-black overflow-y-auto  ${
          isExpanded || isHovered ? "scrollbar-custom" : "scrollbar-hide"
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ maxHeight: "calc(90vh - 80px)" }}
      >
        <ul>
          {pathname.includes("/admin") &&
            SidebarAdminRoute?.filter((item) => item.access).map(
              (item, index) => (
                <li key={index} className="items-center mb-4 block ">
                  {item?.content ? (
                    <>
                      <div
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() => handleMenuClick(index)}
                      >
                        <button
                          className={`hover:text-blue-500 flex justify-center items-center gap-2 text-lg ${
                            menuItem === index && "text-blue-500"
                          }`}
                        >
                          <span className="min-w-[30px]">{item.icon}</span>
                          <span
                            className={`${
                              isExpanded || isHovered
                                ? "opacity-100 block"
                                : "opacity-0 hidden"
                            } transition-opacity duration-300 transform ${
                              isExpanded || isHovered
                                ? "translate-x-0"
                                : "translate-x-[-10px] hidden"
                            }`}
                          >
                            {item.title}
                          </span>
                        </button>
                        {(isExpanded || isHovered) &&
                          (toggleMenu && menuItem === index ? (
                            <BiChevronUp />
                          ) : (
                            <BiChevronDown />
                          ))}
                      </div>
                      <ul
                        className={`transition-all duration-300 ease-in-out overflow-hidden pl-5  ${
                          toggleMenu && menuItem === index
                            ? "max-h-[500px] opacity-100 pt-2"
                            : "max-h-0 opacity-0"
                        } `}
                      >
                        {item?.subCategory
                          ?.filter((subItem) => subItem.access)
                          .map((subItem, subIndex) => (
                            <li
                              key={subIndex}
                              className="flex items-center mb-2 w-full"
                            >
                              <Link
                                to={`/admin/dashboard${item.path}${subItem.path}`}
                              >
                                <button
                                  onClick={() => {
                                    handleLinkClick(index);
                                  }}
                                  className={`flex justify-center items-center gap-2 text-xl hover:text-blue-500 ${
                                    menuItem === subIndex && "text-blue-500"
                                  }`}
                                >
                                  {subItem.icon}
                                  <span
                                    className={`${
                                      isExpanded || isHovered
                                        ? "opacity-100 block"
                                        : "opacity-0 hidden"
                                    } transition-opacity duration-300 transform ${
                                      isExpanded || isHovered
                                        ? "translate-x-0"
                                        : "translate-x-[-10px]"
                                    }`}
                                  >
                                    {subItem.title}
                                  </span>
                                </button>
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </>
                  ) : (
                    <Link to={`/admin/dashboard${item.path}`}>
                      <button
                        className={`flex justify-center items-center gap-2 text-lg hover:text-blue-500 ${
                          menuItem === index && "text-blue-500"
                        }`}
                        onClick={() => {
                          handleLinkClick(index);
                        }}
                      >
                        <span className="min-w-[30px]">{item.icon}</span>
                        <span
                          className={`${
                            isExpanded || isHovered
                              ? "opacity-100 block"
                              : "opacity-0 hidden"
                          } transition-opacity duration-300 transform ${
                            isExpanded || isHovered
                              ? "translate-x-0"
                              : "translate-x-[-10px]"
                          }`}
                        >
                          {item.title}
                        </span>
                      </button>
                    </Link>
                  )}
                </li>
              )
            )}
          {pathname.includes("/store/dashboard") &&
            pathname !== "/admin/store" &&
            SidebarStoreRoute?.filter((item) => item.access).map(
              (item, index) => (
                <li key={index} className="items-center mb-4 block ">
                  {item?.content ? (
                    <>
                      <div
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() => handleMenuClick(index)}
                      >
                        <button
                          className={`hover:text-blue-500 flex justify-center items-center gap-2 text-lg ${
                            menuItem === index && "text-blue-500"
                          }`}
                        >
                          <span className="min-w-[30px]">{item.icon}</span>
                          <span
                            className={`${
                              isExpanded || isHovered
                                ? "opacity-100 block"
                                : "opacity-0 hidden"
                            } transition-opacity duration-300 transform ${
                              isExpanded || isHovered
                                ? "translate-x-0"
                                : "translate-x-[-10px] hidden"
                            }`}
                          >
                            {item.title}
                          </span>
                        </button>
                        {(isExpanded || isHovered) &&
                          (toggleMenu && menuItem === index ? (
                            <BiChevronUp />
                          ) : (
                            <BiChevronDown />
                          ))}
                      </div>
                      <ul
                        className={`transition-all duration-300 ease-in-out overflow-hidden pl-5  ${
                          toggleMenu && menuItem === index
                            ? "max-h-[500px] opacity-100 pt-2"
                            : "max-h-0 opacity-0"
                        } `}
                      >
                        {item?.subCategory
                          ?.filter((subItem) => subItem.access)
                          .map((subItem, subIndex) => (
                            <li
                              key={subIndex}
                              className="flex items-center mb-2 w-full"
                            >
                              <Link
                                to={`/store/dashboard${item.path}${subItem.path}`}
                              >
                                <button
                                  onClick={() => {
                                    handleLinkClick(index);
                                  }}
                                  className={`flex justify-center items-center gap-2 text-xl hover:text-blue-500 ${
                                    menuItem === subIndex && "text-blue-500"
                                  }`}
                                >
                                  {subItem.icon}
                                  <span
                                    className={`${
                                      isExpanded || isHovered
                                        ? "opacity-100 block"
                                        : "opacity-0 hidden"
                                    } transition-opacity duration-300 transform ${
                                      isExpanded || isHovered
                                        ? "translate-x-0"
                                        : "translate-x-[-10px]"
                                    }`}
                                  >
                                    {subItem.title}
                                  </span>
                                </button>
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </>
                  ) : (
                    <Link to={`/store/dashboard${item.path}`}>
                      <button
                        className={`flex justify-center items-center gap-2 text-lg hover:text-blue-500 ${
                          menuItem === index && "text-blue-500"
                        }`}
                        onClick={() => {
                          handleLinkClick(index);
                        }}
                      >
                        <span className="min-w-[30px]">{item.icon}</span>
                        <span
                          className={`${
                            isExpanded || isHovered
                              ? "opacity-100 block"
                              : "opacity-0 hidden"
                          } transition-opacity duration-300 transform ${
                            isExpanded || isHovered
                              ? "translate-x-0"
                              : "translate-x-[-10px]"
                          }`}
                        >
                          {item.title}
                        </span>
                      </button>
                    </Link>
                  )}
                </li>
              )
            )}
        </ul>
      </div>

      <div className={`relative items-center p-4 justify-center gap-2`}></div>
    </div>
  );
};

export default Sidebar;
