import React from 'react';

const FormattedDateTime = ({ date }) => {
  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('en-GB', {
      day: 'numeric',
      month: 'long',  // Full month name (e.g., "August")
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true    // 12-hour format with AM/PM
    });
  };

  return formatDateTime(date); // Return the formatted date directly
};

export default FormattedDateTime;
