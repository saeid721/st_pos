import { BiChevronDown, BiChevronLeft } from "react-icons/bi";
import { FaSignInAlt } from "react-icons/fa";
import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import getSidebarAdminRoutes from "../../../lib/adminRoutes";
import getSidebarStoreRoutes from "../../../lib/storeRoutes";
import { useGetStoresByIdQuery } from "../../../store/api/app/store/storeApiSlice";
import { useSelector } from "react-redux";
import LOGO from '../../../../public/ST_POS_LOGO.png';

const STORE_SECTION_GROUPS = {
  DASHBOARD: ["Dashboard"],
  ACTIVITIES: ["Sales", "Purchases", "Expense"],
  INVENTORY: ["Products", "Inventory"],
  PEOPLE: ["Clients", "Suppliers", "Employees"],
  ACCOUNTING: ["Cash Book", "Payments", "Loan Management", "Asset Management", "Payroll"],
  REPORTS: ["Balance Sheet", "Summary Report", "Profit Loss Report", "Expense Report", "Item Report", "Inventory Report"],
  ACCOUNT: ["Setup", "Database Backup", "Account", "Users", "Blog", "Feature", "Application Settings", "Footer", "Settings", "App Verify"],
};
const STORE_SECTION_ORDER = ["DASHBOARD", "ACTIVITIES", "ACCOUNTING", "PEOPLE", "INVENTORY", "REPORTS", "ACCOUNT"];

const Sidebar = ({ isExpanded, setIsExpanded, isMobileOpen, setIsMobileOpen, isPOSPage }) => {
  const { pathname: linkPath } = useLocation();
  const lastPath = linkPath.split("/").at(-1);
  const panelPath = linkPath.split("/")[1];

  const [menuItem, setMenuItem] = useState(0);
  const [menuIndex, setMenuIndex] = useState(null);
  const [menuMultipleClick, setMenuMultipleClick] = useState(0);
  const [subMenuItem, setSubMenuItem] = useState(null);
  const [toggleMenu, setToggleMenu] = useState(false);
  const pathname = window.location.pathname;

  // Floating menu state for collapsed sidebar
  const [hoveredMenuId, setHoveredMenuId] = useState(null);
  const [hoveredMenuRect, setHoveredMenuRect] = useState(null);
  const hoverTimeoutRef = useRef(null);

  const SidebarAdminRoute = getSidebarAdminRoutes();
  const SidebarStoreRoute = getSidebarStoreRoutes();
  const allSidebar = [
    { path: "admin", route: SidebarAdminRoute },
    { path: "store", route: SidebarStoreRoute },
  ];

  const { isAuth, auth } = useSelector((state) => state.auth);
  const { store_id } = auth.user;
  const { data: storeData } = useGetStoresByIdQuery(store_id);

  const getSidebarIndex = () => {
    allSidebar.forEach((sidebar) => {
      sidebar.route.forEach((route, routeIndex) => {
        if (route.subCategory) {
          route.subCategory.forEach((sub, subIndex) => {
            if (sub.path === `/${lastPath}`) {
              setMenuItem(null);
              setMenuIndex(routeIndex);
              setSubMenuItem(subIndex);
            }
          });
        } else if (route.path === `/${lastPath}`) {
          setMenuItem(routeIndex);
          setMenuIndex(routeIndex);
          setSubMenuItem(null);
        }
      });
    });
  };

  useEffect(() => {
    getSidebarIndex();
  }, [allSidebar]);

  useEffect(() => {
    const handleResize = () => {
      // Collapse by default on tablets and below; desktop (lg+) stays expanded.
      if (window.innerWidth < 1024) setIsExpanded(false);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsExpanded]);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
    setToggleMenu(false);
  };

  const handleMenuEnter = (e, item, globalIndex, sidebarPath) => {
    // Only show floating menus when collapsed on desktop
    if (isExpanded || window.innerWidth < 768) return;
    
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    
    const rect = e.currentTarget.getBoundingClientRect();
    setHoveredMenuId(globalIndex);
    setHoveredMenuRect({
      top: rect.top,
      item: item,
      path: sidebarPath
    });
  };

  const handleMenuLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredMenuId(null);
      setHoveredMenuRect(null);
    }, 150); // slight delay to allow mouse movement into the panel
  };

  const handleFloatingEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
  };

  const handleFloatingLeave = () => {
    handleMenuLeave();
  };

  const handleMenuClick = (index) => {
    if (menuItem === index) {
      setToggleMenu(!toggleMenu);
    } else {
      setMenuMultipleClick(index);
      setToggleMenu(true);
    }
  };

  const handleLinkClick = (index, menuType, menuIndex = null) => {
    if (menuType === "menu") {
      setSubMenuItem(null);
      setMenuItem(index);
      setToggleMenu(false);
    } else if (menuType === "subMenu") {
      setMenuItem(null);
      setSubMenuItem(index);
      setMenuIndex(menuIndex);
    }
    setIsMobileOpen?.(false);
  };

  // Reusable Menu Item Renderer
  const renderMenuItem = (item, globalIndex, sidebarPath) => {
    const isActiveParent = menuIndex === globalIndex;
    const isActive = menuItem === globalIndex && !item.content;

    return (
      <li 
        key={globalIndex}
        onMouseEnter={(e) => handleMenuEnter(e, item, globalIndex, sidebarPath)}
        onMouseLeave={handleMenuLeave}
      >
        {item.content ? (
          <>
            <button
              onClick={() => handleMenuClick(globalIndex)}
              className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl text-sm font-medium transition-all duration-200 group
                ${isActiveParent ? "bg-indigo-50 text-indigo-700" : "text-gray-700 hover:bg-gray-50"}`}
            >
              <span className="w-5 text-xl opacity-90">{item.icon}</span>
              <span className={`flex-1 text-left transition-all ${isExpanded ? "opacity-100" : "opacity-0 hidden"}`}>
                {item.title}
              </span>
              {isExpanded && (
                toggleMenu && menuMultipleClick === globalIndex ? <BiChevronDown className="text-lg" /> : <BiChevronLeft className="text-lg" />
              )}
            </button>

            <ul className={`pl-5 mt-0.5 space-y-0.5 transition-all duration-300 overflow-hidden ${
              isExpanded && toggleMenu && menuMultipleClick === globalIndex ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
            }`}>
              {item.subCategory?.filter(sub => sub.access).map((subItem, subIdx) => {
                const isSubActive = subMenuItem === subIdx && menuIndex === globalIndex;
                return (
                  <li key={subIdx}>
                    <Link
                      to={`/${sidebarPath}/dashboard${item.path}${subItem.path}`}
                      onClick={() => handleLinkClick(subIdx, "subMenu", globalIndex)}
                      className={`flex items-center gap-2.5 px-2.5 py-1 rounded-xl text-sm transition-all duration-200
                        ${isSubActive ? "bg-indigo-600 text-white" : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"}`}
                    >
                      <span className="w-4 text-base opacity-75">{subItem.icon}</span>
                      <span className={`transition-all ${isExpanded ? "opacity-100" : "opacity-0 hidden"}`}>
                        {subItem.title}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </>
        ) : (
          <Link
            to={`/${sidebarPath}/dashboard${item.path}`}
            onClick={() => handleLinkClick(globalIndex, "menu")}
            className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl text-sm font-medium transition-all duration-200
              ${isActive ? "bg-indigo-600 text-white shadow-sm" : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"}`}
          >
            <span className={`w-5 text-xl transition-colors ${isActive ? "text-white" : "text-gray-500 group-hover:text-indigo-600"}`}>
              {item.icon}
            </span>
            <span className={`flex-1 transition-all ${isExpanded ? "opacity-100" : "opacity-0 hidden"}`}>
              {item.title}
            </span>
          </Link>
        )}
      </li>
    );
  };

  // Store Sidebar with Sections — grouped by title, not array position
  const renderStoreSidebar = (routes) => {
    const groupedTitles = new Set(Object.values(STORE_SECTION_GROUPS).flat());
    const leftoverItems = routes.filter((item) => !groupedTitles.has(item.title));

    const sections = STORE_SECTION_ORDER.map((title) => ({
      title,
      items: routes.filter((item) => STORE_SECTION_GROUPS[title].includes(item.title)),
    }));

    // Anything not explicitly mapped still renders (under a catch-all group)
    // instead of silently disappearing, so a forgotten title is easy to spot.
    if (leftoverItems.length > 0) {
      sections.push({ title: "OTHER", items: leftoverItems });
    }

    return sections.map((section, secIdx) => {
      const filteredItems = section.items.filter((item) => item.access);
      if (filteredItems.length === 0) return null;

      return (
        <div key={secIdx} className="mb-2">
          {isExpanded && (
            <div className="px-3 mb-1 text-[10px] font-semibold tracking-widest text-gray-500 uppercase">
              {section.title}
            </div>
          )}
          <ul className="space-y-0.5">
            {filteredItems.map((item) => {
              const globalIndex = routes.findIndex((r) => r === item);
              return renderMenuItem(item, globalIndex, "store");
            })}
          </ul>
        </div>
      );
    });
  };

  const showFull = isExpanded;

  const widthClasses = isPOSPage
    ? "w-72"
    : showFull
    ? "w-72 md:w-72"
    : "w-72 md:w-20";

  const visibilityClasses = isPOSPage
    ? isMobileOpen
      ? "translate-x-0 opacity-100 pointer-events-auto"
      : "-translate-x-full opacity-0 pointer-events-none"
    : isMobileOpen
    ? "translate-x-0 opacity-100 pointer-events-auto md:translate-x-0 md:opacity-100 md:pointer-events-auto"
    : "-translate-x-full opacity-0 pointer-events-none md:translate-x-0 md:opacity-100 md:pointer-events-auto";

  return (
    <>
      {/* Backdrop: mobile drawer always; POS page drawer on any screen size */}
      {isMobileOpen && (
        <div
          className={`fixed inset-0 bg-black/40 z-40 ${!isPOSPage ? "md:hidden" : ""}`}
          onClick={() => setIsMobileOpen?.(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full bg-white flex flex-col shadow-[0_10px_30px_-10px_rgb(0,0,0,0.15)] border-r-[0.5px] border-slate-200/70 z-50 transition-all duration-300 ease-in-out transform ${widthClasses} ${visibilityClasses}`}
      >
        {/* Logo Area */}
        <div className="relative p-2 border-b border-gray-100 shrink-0">
          <div className="flex justify-center">
            <Link to={`/${panelPath}/dashboard`}>
              <img
                className={`transition-all duration-300 ${showFull || isMobileOpen ? "max-w-[100px]" : "max-w-[36px]"}`}
                src={LOGO}
                alt="Logo"
              />
            </Link>
          </div>
        </div>

        {/* Navigation */}
        <div className="overflow-y-auto flex-1 min-h-0 pt-2 px-2.5 pb-3 scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
          {allSidebar.map((sidebar) => {
            if (pathname.includes(`/${sidebar.path}/`)) {
              return (
                <div key={sidebar.path}>
                  {sidebar.path === "store" ? (
                    renderStoreSidebar(sidebar.route)
                  ) : (
                    // Admin Sidebar
                    <ul className="space-y-0.5">
                      {sidebar.route
                        .filter((item) => item.access)
                        .map((item, index) => renderMenuItem(item, index, "admin"))}
                    </ul>
                  )}
                </div>
              );
            }
            return null;
          })}
        </div>

        {/* Floating Menu/Tooltip Overlay */}
        {!isExpanded && hoveredMenuRect && (
          <div
            className="fixed left-[4.5rem] z-[9999]"
            style={{ top: `${hoveredMenuRect.top}px` }}
            onMouseEnter={handleFloatingEnter}
            onMouseLeave={handleFloatingLeave}
          >
            {hoveredMenuRect.item.content ? (
              // Submenu Panel
              <div className="ml-2 bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-slate-100 py-1.5 w-52 relative before:content-[''] before:absolute before:left-[-6px] before:top-4 before:w-3 before:h-3 before:bg-white before:border-l before:border-b before:border-slate-100 before:rotate-45">
                <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-50 mb-1">
                  {hoveredMenuRect.item.title}
                </div>
                <ul className="max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200">
                  {hoveredMenuRect.item.subCategory?.filter(sub => sub.access).map((subItem, subIdx) => {
                    const isSubActive = subMenuItem === subIdx && menuIndex === hoveredMenuId;
                    return (
                      <li key={subIdx}>
                        <Link
                          to={`/${hoveredMenuRect.path}/dashboard${hoveredMenuRect.item.path}${subItem.path}`}
                          onClick={() => {
                            handleLinkClick(subIdx, "subMenu", hoveredMenuId);
                            setHoveredMenuId(null);
                            setHoveredMenuRect(null);
                          }}
                          className={`flex items-center gap-2.5 px-4 py-2 text-sm transition-colors
                            ${isSubActive ? "bg-indigo-50 text-indigo-700 font-medium" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}
                        >
                          <span className="text-lg opacity-75">{subItem.icon}</span>
                          <span>{subItem.title}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : (
              // Tooltip
              <div className="ml-2 px-3 py-1.5 bg-slate-800 text-white text-sm font-medium rounded-lg shadow-lg relative whitespace-nowrap before:content-[''] before:absolute before:left-[-4px] before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:bg-slate-800 before:rotate-45">
                {hoveredMenuRect.item.title}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
