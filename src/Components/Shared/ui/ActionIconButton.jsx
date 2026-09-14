import React from "react";

const ActionIconButton = ({ icon, tooltip, onClick, className = "", type = "button" }) => {
  return (
    <span className="group relative inline-flex">
      <button
        type={type}
        aria-label={tooltip}
        onClick={onClick}
        className={`inline-flex h-9 w-9 items-center justify-center rounded text-white transition-colors ${className}`}
      >
        {icon}
      </button>
      <span className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded bg-black px-2 py-1 text-xs text-white opacity-0 shadow-md transition-all duration-150 group-hover:translate-y-0 group-hover:opacity-100">
        {tooltip}
        <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-black" />
      </span>
    </span>
  );
};

export default ActionIconButton;
