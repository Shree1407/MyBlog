import React from "react";

const FormattedDate = ({ date }) => {
  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const formattedDate = dateObj.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
    const formattedTime = dateObj.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });

      return `${formattedTime} ${formattedDate}`;
  };

  const formattedDate = formatDate(date);

  return <span>{formattedDate}</span>;
};

export default FormattedDate;
