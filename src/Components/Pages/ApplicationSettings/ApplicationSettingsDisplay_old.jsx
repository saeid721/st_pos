import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetApplicationSettingsQuery } from "../../../store/api/app/ApplicationSettings/applicationSettingsApiSlice";
import fallbackSrc from "/fallBack_Image.jpg";
import hasPermission from "../../../utils/hasPermission";

const ApplicationSettingsDisplay = () => {
  const { data, isLoading, isError, error } = useGetApplicationSettingsQuery();
  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_LOCAL_API_URL;

  // Move hasPermission call outside of JSX
  const canUpdateApplicationSetting = hasPermission(
    "UPDATE_APPLICATION_SETTING"
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  const settings = data?.data || "not Found";

  // Define the keys you want to display and their order
  const displayKeys = [
    "site_name",
    "site_logo",
    "site_url",
    "contact_email",
    "phone_number",
    "copyright",
    "meta_title",
    "meta_description",
    "meta_keywords",
  ];

  const handleUpdateClick = () => {
    navigate("/admin/settings/edit");
  };

  return (
    <div className="bg-white overflow-hidden sm:rounded-lg my-[50px] shadow-[0_0_25px_5px_rgba(0,0,0,0.3)]">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Application Settings
        </h3>
        {canUpdateApplicationSetting && (
          <button
            onClick={handleUpdateClick}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update Application
          </button>
        )}
      </div>
      <div className="border-t border-gray-200">
        <dl>
          {displayKeys.map((key) => (
            <div
              key={key || ""}
              className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
            >
              <dt className="text-sm font-medium text-gray-500">
                {key.replace(/_/g, " ").charAt(0).toUpperCase() +
                  key.replace(/_/g, " ").slice(1)}
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {settings[key] ? (
                  key === "site_logo" ? (
                    <img
                      src={`${backendUrl}${settings[key]}`}
                      alt="Site Logo"
                      className="h-12 w-auto"
                      onError={(e) => {
                        e.target.onerror = null; // Prevents looping
                        e.target.src = fallbackSrc;
                      }}
                    />
                  ) : (
                    settings[key]
                  )
                ) : (
                  <span className="text-red-500">Not Found</span>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default ApplicationSettingsDisplay;
