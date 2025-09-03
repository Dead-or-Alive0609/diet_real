import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNavBar from "../components/BottomNavBar";
import "../styles/CalendarPage.css";

const days = ["일", "월", "화", "수", "목", "금", "토"];

const CalendarPage = () => {
  const navigate = useNavigate();
  const today = new Date();

  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth() + 1); // 1~12
  const [showPicker, setShowPicker] = useState(false);

  // 해당 월의 1일 요일
  const firstDay = new Date(currentYear, currentMonth - 1, 1).getDay();
  // 해당 월의 마지막 날짜
  const lastDate = new Date(currentYear, currentMonth, 0).getDate();

  // 연/월 선택 범위 (현재 기준 -5년 ~ +5년)
  const years = Array.from({ length: 11 }, (_, i) => today.getFullYear() - 5 + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  // yyyy-mm-dd 포맷 함수 (UTC 보정 없이 그대로)
  const formatDate = (year, month, day) => {
    return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  };

  // 날짜 클릭 → RecordPage 이동
  const handleDateClick = (day) => {
    const formatted = formatDate(currentYear, currentMonth, day);
    navigate(`/record?date=${formatted}`);
  };

  return (
    <div className="calendar-page">
      {/* 상단 년월 */}
      <div className="calendar-header">
        <span className="calendar-title" onClick={() => setShowPicker(true)}>
          {`${currentYear}.${String(currentMonth).padStart(2, "0")}`}
        </span>
      </div>

      {/* 연/월 선택기 */}
      {showPicker && (
        <div className="month-picker-overlay">
          <div className="month-picker">
            <div className="picker-columns">
              <div className="year-column">
                {years.map((y) => (
                  <div
                    key={y}
                    className={`picker-item ${y === currentYear ? "selected" : ""}`}
                    onClick={() => setCurrentYear(y)}
                  >
                    {y}
                  </div>
                ))}
              </div>
              <div className="month-column">
                {months.map((m) => (
                  <div
                    key={m}
                    className={`picker-item ${m === currentMonth ? "selected" : ""}`}
                    onClick={() => setCurrentMonth(m)}
                  >
                    {String(m).padStart(2, "0")}
                  </div>
                ))}
              </div>
            </div>
            <button className="confirm-btn" onClick={() => setShowPicker(false)}>
              확인
            </button>
          </div>
        </div>
      )}

      {/* 달력 */}
      <div className="calendar-grid">
        {days.map((d) => (
          <div key={d} className="day-header">
            {d}
          </div>
        ))}
        {/* 앞쪽 공백 */}
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} className="empty"></div>
        ))}
        {/* 날짜 */}
        {Array.from({ length: lastDate }).map((_, i) => {
          const day = i + 1;
          const isToday =
            currentYear === today.getFullYear() &&
            currentMonth === today.getMonth() + 1 &&
            day === today.getDate();

          const weekday = new Date(currentYear, currentMonth - 1, day).getDay();
          const weekendClass = weekday === 0 || weekday === 6 ? "weekend" : "";

          return (
            <div
              key={day}
              className={`day-cell ${isToday ? "today" : ""} ${weekendClass}`}
              onClick={() => handleDateClick(day)}
            >
              {day}
            </div>
          );
        })}
      </div>

      <BottomNavBar />
    </div>
  );
};

export default CalendarPage;
