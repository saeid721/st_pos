import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import MainContent from "../Components/MainContent/MainContent";
import Navbar from "../Components/Shared/Navbar/Navbar";
import Sidebar from "../Components/Shared/Sidebar/Sidebar";
import { logOut } from "../store/api/auth/authSlice";
import { useGetStoresByIdQuery, useUpdateStoresMutation } from "../store/api/app/store/storeApiSlice";
import { useGetPlansQuery, useLazyGetPlansByIdQuery } from "../store/api/app/Plans/plansApiSlice";
import PlanModal from "../Components/Shared/PlanModal/PlanModal";
import { toast } from "react-toastify";
import { useSystemSettings } from "../lib/SystemSettingsProvider";

const Layout = ({ type }) => {
  const [year, setYear] = useState(new Date().getFullYear()); // Default to the current year
  const [showModal, setShowModal] = useState(false);
  const [daysLeft, setDaysLeft] = useState(null);
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { isAuth, auth } = useSelector((state) => state.auth);
  const { settings } = useSystemSettings();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const pathArray = pathname.split("/");
  const isPOSPage = pathname.toLowerCase().includes("/pos");

  const handleSidebarToggle = () => {
    if (isPOSPage || window.innerWidth < 768) {
      setIsMobileSidebarOpen((prev) => !prev);
    } else {
      setIsExpanded((prev) => !prev);
    }
  };

  const { store_id } = auth?.user || {};

  const { data: storeData } = useGetStoresByIdQuery(store_id);
  const { data: plansData } = useGetPlansQuery()
  const [fetchPlanById, { isFetching: isFetchingPlan, isLoading: isLoadingPlan, isError: isPlanError, error: planError }] = useLazyGetPlansByIdQuery();

  const [submit, { isLoading, isSuccess, isError, error }] = useUpdateStoresMutation();

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    if (!isAuth || !accessToken) {
      if (pathArray[1] === "admin") {
        navigate("/admin/login");
      } else if (pathArray[1] === "store") {
        navigate("/store/login");
      }
      dispatch(logOut());
    }

    if (isAuth && accessToken) {
      if (pathArray[1] === "admin" && auth?.user?.user_type !== "super_admin") {
        navigate("/admin/login");
      } else if (
        pathArray[1] === "store" &&
        auth?.user?.user_type !== "store"
      ) {
        navigate("/store/login");
      }
    }
  }, [isAuth, navigate]);

  useEffect(() => {
    if (!storeData || !storeData.data) return;

    const planEndsAt = storeData.data.plan_id ? new Date(storeData.data.plan_ends_at) : new Date(storeData.data.trial_ends_at);
    const today = new Date();


    // Calculate days left
    const timeDiff = planEndsAt.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));


    if (pathname.includes("/store/dashboard")) {
      if (daysDiff <= 0 && !pathname.includes("/store/dashboard/payment")) {
        setShowModal(true);
      } else if (daysDiff <= 3) {
        setDaysLeft(daysDiff);
      }
    }
  }, [storeData, pathname]);

  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [pathname]);

  const handlePlanClick = async (planId) => {
    // Close modal
    setShowModal(false);

    try {
      // Fetch the selected plan details lazily
      const result = await fetchPlanById(planId).unwrap();

      if (result?.data?.is_trial && storeData?.data?.has_trial) {
        toast.error("You already have a trial plan!");
        setShowModal(true);
        return;
      }

      if (result?.data?.is_trial && !storeData?.data?.has_trial) {
        const payload = {
          slug: storeData?.data?.slug,
          plan_id: parseInt(planId),
        };

        const response = await submit({ id: store_id, data: payload }).unwrap();

        if (response?.status !== 'success') {
          throw new Error(response?.message || 'Error occurred from server!');
        } else {
          toast.success(response?.message);
          navigate('/store/dashboard');
        }
      } else {
        navigate(`/store/dashboard/payment?selectedPlan=${planId}`, {
          state: { selectedPlan: result },
        });
      }
    } catch (e) {
      console.error("Failed to fetch plan details", e);
      // Navigate anyway with only the planId; the payment page can fetch the rest
      navigate(`/store/dashboard/payment?selectedPlan=${planId}`);
    }
  };
  return (
    <div className="min-h-screen bg-[#f4f6f9]">
      <Navbar isExpanded={isExpanded} onToggleSidebar={handleSidebarToggle} isPOSPage={isPOSPage} />
      <Sidebar
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        isMobileOpen={isMobileSidebarOpen}
        setIsMobileOpen={setIsMobileSidebarOpen}
        isPOSPage={isPOSPage}
      />
      <MainContent isExpanded={isExpanded} isPOSPage={isPOSPage} />

      <footer className="fixed inset-x-0 bottom-0 z-40 border-t bg-white px-4 py-2 text-center text-sm text-gray-600 shadow-sm">
        {settings?.copyright_text || (
          <>
            Copyright {year} | Developed by{" "}
            <a
              href="https://stitbd.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              STITBD
            </a>
          </>
        )}
      </footer>

      {showModal && (
        <PlanModal
          plans={plansData?.data}
          handlePlanClick={handlePlanClick}
          payment={storeData?.data?.payment}
          storeData={storeData}
        />
      )}
    </div>
  );
};

export default Layout;
