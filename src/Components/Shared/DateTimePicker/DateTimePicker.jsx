import React, { useState } from "react";

import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // Main style file
import "react-date-range/dist/theme/default.css"; // Theme file
import { format, startOfDay } from 'date-fns';

const DateTimePicker = ({
  setFromDate,
  setToDate,
}) => {

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);


  const formatDate = (date) => {
    return format(startOfDay(date), 'yyyy-MM-dd'); // Format to YYYY-MM-DD
  };


  const handleCalendarToggle = () => {
    if (isCalendarOpen) {
        // If the calendar is closing, reset the dates to null
        setFromDate('');
        setToDate('');
    }
    setIsCalendarOpen((prev) => !prev); // Toggle the calendar visibility
};


  return (
    <div className="">
      <button
        type="button"
        onClick={handleCalendarToggle}
        className="py-2 px-5 bg-blue-500 text-white rounded text-sm font-semibold"
      >
        {isCalendarOpen ? "Close Calendar" : "Date Wise Filtering"}
      </button>

      {isCalendarOpen && (
        <DateRange
          ranges={range}
          onChange={(item) => {
            setRange([item.selection]); // Update the range state
            setFromDate(formatDate(item.selection.startDate)); // Set formatted fromDate
            setToDate(formatDate(item.selection.endDate)); // Set formatted toDate
          }}
          className="date-range-picker"
        />
      )}
    </div>
  );
};

export default DateTimePicker;