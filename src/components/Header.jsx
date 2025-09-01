import React from "react";
import calendarIcon from "../assets/healthicons_i-schedule-school-date-time.png";

const Header = () => {
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0].replace(/-/g, ".");

  return (
    <div className="header">
      <img src={calendarIcon} alt="달력 아이콘" className="calendar-icon" />
      <span className="date">{formattedDate}</span>
    </div>
  );
};

export default Header;
