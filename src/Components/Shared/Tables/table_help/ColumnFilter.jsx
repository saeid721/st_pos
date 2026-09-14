// ColumnFilter.js
import React from "react";

export const ColumnFilter = ({ column, setFilter }) => {
  return (
    <span>
      <input
        value={column?.filterValue || ""}
        onChange={(e) => setFilter(e.target.value || undefined)}
        placeholder={`Search ${column.Header}`}
        style={{ marginBottom: "10px", marginRight: "10px" }}
      />
    </span>
  );
};
