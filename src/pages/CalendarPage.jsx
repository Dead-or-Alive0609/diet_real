// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import "../styles/CalendarPage.css";
// import BottomNavBar from "../components/BottomNavBar";

// const CalendarPage = () => {
//   const navigate = useNavigate();
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [showMonthPicker, setShowMonthPicker] = useState(false);
//   const [tempYear, setTempYear] = useState(currentDate.getFullYear());
//   const [tempMonth, setTempMonth] = useState(currentDate.getMonth() + 1);

//   const handleDateClick = (date) => {
//     navigate("/record", { state: { date } });
//   };

//   const years = Array.from({ length: 10 }, (_, i) => 2020 + i);
//   const months = Array.from({ length: 12 }, (_, i) => i + 1);

//   return (
//     <div className="calendar-page">
//       {/* 상단 바 */}
//       <div className="calendar-header">
//         <span
//           className="calendar-title"
//           onClick={() => setShowMonthPicker(true)}
//         >
//           {currentDate.getFullYear()}.{String(currentDate.getMonth() + 1).padStart(2, "0")}
//         </span>
//       </div>

//       {/* 달력 */}
//       <div className="calendar-wrapper">
//         <Calendar
//           onClickDay={(date) => handleDateClick(date)}
//           value={currentDate}
//           onActiveStartDateChange={({ activeStartDate }) =>
//             setCurrentDate(activeStartDate)
//           }
//           locale="ko-KR"
//           formatShortWeekday={(locale, date) =>
//             ["일", "월", "화", "수", "목", "금", "토"][date.getDay()]
//           }
//           formatDay={(locale, date) => date.getDate().toString()} // 숫자만
//           prev2Label={null}
//           next2Label={null}
//           navigationLabel={null} /* 기본 네비게이션 숨김 */
//         />
//       </div>

//       {/* 연/월 선택기 */}
//       {showMonthPicker && (
//         <div className="month-picker-overlay">
//           <div className="month-picker">
//             <div className="picker-columns">
//               <div className="year-column">
//                 {years.map((y) => (
//                   <div
//                     key={y}
//                     className={`picker-item ${
//                       y === tempYear ? "selected" : ""
//                     }`}
//                     onClick={() => setTempYear(y)}
//                   >
//                     {y}
//                   </div>
//                 ))}
//               </div>
//               <div className="month-column">
//                 {months.map((m) => (
//                   <div
//                     key={m}
//                     className={`picker-item ${
//                       m === tempMonth ? "selected" : ""
//                     }`}
//                     onClick={() => setTempMonth(m)}
//                   >
//                     {String(m).padStart(2, "0")}
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <button
//               className="confirm-btn"
//               onClick={() => {
//                 setCurrentDate(new Date(tempYear, tempMonth - 1, 1));
//                 setShowMonthPicker(false);
//               }}
//             >
//               확인
//             </button>
//           </div>
//         </div>
//       )}

//       <BottomNavBar />
//     </div>
//   );
// };

// export default CalendarPage;

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

  // 날짜 클릭 → RecordPage 이동
  const handleDateClick = (day) => {
    const date = new Date(currentYear, currentMonth - 1, day);
    const formatted = date.toISOString().split("T")[0]; // YYYY-MM-DD
    navigate(`/record?date=${formatted}`);
  };

  return (
    <div className="calendar-page">
      {/* 상단 년월 */}
      <div className="calendar-header">
        <span
          className="calendar-title"
          onClick={() => setShowPicker(true)}
        >
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
                    className={`picker-item ${
                      y === currentYear ? "selected" : ""
                    }`}
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
                    className={`picker-item ${
                      m === currentMonth ? "selected" : ""
                    }`}
                    onClick={() => setCurrentMonth(m)}
                  >
                    {String(m).padStart(2, "0")}
                  </div>
                ))}
              </div>
            </div>
            <button
              className="confirm-btn"
              onClick={() => setShowPicker(false)}
            >
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
        {Array.from({ length: lastDate }).map((_, i) => (
          <div
            key={i + 1}
            className="day-cell"
            onClick={() => handleDateClick(i + 1)}
          >
            {i + 1}
          </div>
        ))}
      </div>

      <BottomNavBar />
    </div>
  );
};

export default CalendarPage;
