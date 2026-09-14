import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

const SystemSettingsContext = createContext();

export const SystemSettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const accessToken = Cookies.get("accessToken");

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_LOCAL_API_URL}/system-settings/first`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const result = await response.json();

        if (response.ok && result?.data) {
          setSettings(result.data);

          // ✅ Set favicon globally
          if (result.data.favicon) {
            let link = document.querySelector("link[rel~='icon']");
            if (!link) {
              link = document.createElement("link");
              link.rel = "icon";
              document.head.appendChild(link);
            }
            link.href = result.data.favicon;
          }
        }
      } catch (err) {
        console.error("Failed to load system settings:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return (
    <SystemSettingsContext.Provider value={{ settings, isLoading }}>
      {children}
    </SystemSettingsContext.Provider>
  );
};

export const useSystemSettings = () => useContext(SystemSettingsContext);
