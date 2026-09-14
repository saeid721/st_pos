import { useSystemSettings } from "./SystemSettingsProvider";

export const formatCurrency = (amount) => {
  const { settings } = useSystemSettings();
  if (amount === null || amount === undefined) return `${settings?.currency}0`;
  return `${settings?.currency || "৳"}${amount}`;
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return `${date.getDate()}th ${date.toLocaleString('default', { month: 'short' })}, ${date.getFullYear()}`;
};

export const formatDateForInput = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const iso = date.toISOString(); // e.g., 2024-09-12T08:30:00.000Z
  return iso.slice(0, 16); // Keep YYYY-MM-DDTHH:MM
};
