import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";

export const GlobalFilter = ({ onSearch }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(value); // Trigger search with the updated value
    }, 700);

    return () => clearTimeout(timer);
  }, [value, onSearch]);

  return (
    <div className="relative w-full md:w-1/2 lg:w-1/3">
      <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search..."
        className="w-full pl-12 pr-4 py-1 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
};
