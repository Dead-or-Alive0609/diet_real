// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import "../styles/RecordPage.css";
// import BottomNavBar from "../components/BottomNavBar";
// import machineIcon from "../assets/machine.png";
// import api from "../utils/api";

// // 날짜 포맷
// const formatDateKey = (date) => date.toISOString().split("T")[0];
// const formatDisplay = (date) => `${date.getMonth() + 1}.${date.getDate()}`;

// const RecordPage = () => {
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [activeMeal, setActiveMeal] = useState("아침");
//   const [meals, setMeals] = useState({ 아침: [], 점심: [], 저녁: [], 간식: [] });
//   const [weight, setWeight] = useState("");
//   const [goal, setGoal] = useState("");

//   const [showCalendar, setShowCalendar] = useState(false); // 달력 팝업
//   const [showMonthPicker, setShowMonthPicker] = useState(false); // 월 선택기

//   const currentKey = formatDateKey(currentDate);

//   // 날짜 바뀔 때 데이터 조회 (현재는 GET API 없음 → 비워둠)
//   useEffect(() => {
//     setMeals({ 아침: [], 점심: [], 저녁: [], 간식: [] });
//     setWeight("");
//     setGoal("");
//   }, [currentDate]);

//   // 날짜 이동
//   const changeDate = (offset) => {
//     const newDate = new Date(currentDate);
//     newDate.setDate(currentDate.getDate() + offset);
//     setCurrentDate(newDate);
//   };

//   // 목표까지 남은 체중
//   let diffText = "정보 없음";
//   if (weight && goal) {
//     const goalNum = parseFloat(goal);
//     const todayNum = parseFloat(weight);
//     const diff = todayNum - goalNum;
//     if (diff > 0) diffText = `목표 체중까지 ${diff.toFixed(1)}kg 남았습니다!`;
//     else if (diff === 0) diffText = "목표를 달성했습니다!";
//     else diffText = `목표보다 ${Math.abs(diff).toFixed(1)}kg 적게 나가네요!`;
//   }

//   // 좌우 날짜
//   const prevDate = new Date(currentDate);
//   prevDate.setDate(currentDate.getDate() - 1);
//   const nextDate = new Date(currentDate);
//   nextDate.setDate(currentDate.getDate() + 1);

//   // 팝업
//   const [showPopup, setShowPopup] = useState(false);
//   const [inputValue, setInputValue] = useState("");

//   // ➡️ 끼니별 추가
//   const addMeal = async () => {
//     if (inputValue.trim() !== "") {
//       const updatedFoods = [...meals[activeMeal], inputValue.trim()];
//       try {
//         await api.post("/meal", {
//           date: currentKey,
//           mealType: activeMeal,
//           foods: updatedFoods,
//         });
//         setMeals((prev) => ({
//           ...prev,
//           [activeMeal]: updatedFoods,
//         }));
//       } catch (err) {
//         alert("추가 실패: " + (err.response?.data?.message || err.message));
//       }
//       setInputValue("");
//     }
//     setShowPopup(false);
//   };

//   // ➡️ 끼니별 삭제
//   const deleteMeal = async (idx) => {
//     const updatedFoods = meals[activeMeal].filter((_, i) => i !== idx);
//     try {
//       await api.post("/meal", {
//         date: currentKey,
//         mealType: activeMeal,
//         foods: updatedFoods,
//       });
//       setMeals((prev) => ({
//         ...prev,
//         [activeMeal]: updatedFoods,
//       }));
//     } catch (err) {
//       alert("삭제 실패: " + (err.response?.data?.message || err.message));
//     }
//   };

//   // 연도/월 선택
//   const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 2 + i);
//   const months = Array.from({ length: 12 }, (_, i) => i + 1);

//   return (
//     <div className="record-page">
//       {/* 상단 달력 헤더 */}
//       <div className="calendar-header">
//         <span
//           className="calendar-title"
//           onClick={() => setShowCalendar(!showCalendar)}
//         >
//           {currentDate.getFullYear()}.{" "}
//           {String(currentDate.getMonth() + 1).padStart(2, "0")}
//         </span>
//       </div>

//       {/* 달력 */}
//       {showCalendar && (
//         <div className="calendar-popup">
//           <Calendar
//             onChange={(date) => {
//               setCurrentDate(date);
//               setShowCalendar(false);
//             }}
//             value={currentDate}
//           />
//           <button
//             className="month-picker-btn"
//             onClick={() => setShowMonthPicker(true)}
//           >
//             연도/월 변경
//           </button>
//         </div>
//       )}

//       {/* 월 선택기 */}
//       {showMonthPicker && (
//         <div className="month-picker-overlay">
//           <div className="month-picker">
//             <div className="picker-columns">
//               <div className="year-column">
//                 {years.map((y) => (
//                   <div
//                     key={y}
//                     className={`picker-item ${
//                       y === currentDate.getFullYear() ? "selected" : ""
//                     }`}
//                     onClick={() =>
//                       setCurrentDate(new Date(y, currentDate.getMonth(), 1))
//                     }
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
//                       m === currentDate.getMonth() + 1 ? "selected" : ""
//                     }`}
//                     onClick={() =>
//                       setCurrentDate(new Date(currentDate.getFullYear(), m - 1, 1))
//                     }
//                   >
//                     {String(m).padStart(2, "0")}
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <button
//               className="close-picker"
//               onClick={() => setShowMonthPicker(false)}
//             >
//               닫기
//             </button>
//           </div>
//         </div>
//       )}

//       {/* 날짜 캐러셀 */}
//       <div className="date-bar-wrapper">
//         <motion.div
//           className="date-bar-inner"
//           drag="x"
//           dragConstraints={{ left: 0, right: 0 }}
//           onDragEnd={(e, info) => {
//             if (info.offset.x < -80) {
//               changeDate(1); // 다음 날짜
//             } else if (info.offset.x > 80) {
//               changeDate(-1); // 이전 날짜
//             }
//           }}
//           animate={{ x: 0 }}
//           transition={{ type: "spring", stiffness: 300, damping: 30 }}
//         >
//           <span className="date-faded">{formatDisplay(prevDate)}</span>
//           <span className="date-current">{formatDisplay(currentDate)}</span>
//           <span className="date-faded">{formatDisplay(nextDate)}</span>
//         </motion.div>
//       </div>

//       {/* 체중 카드 */}
//       <div className="record-white-box weight-card">
//         <p className="diff-text">{diffText}</p>
//         <h2 className="weight-value">{weight || "정보 없음"}</h2>
//         <img src={machineIcon} alt="체중계" className="machine-icon" />
//       </div>

//       {/* 식단 카드 */}
//       <div className="record-white-box meal-card">
//         <div className="meal-tabs">
//           {["아침", "점심", "저녁", "간식"].map((meal) => (
//             <button
//               key={meal}
//               className={`meal-tab ${activeMeal === meal ? "active" : ""}`}
//               onClick={() => setActiveMeal(meal)}
//             >
//               {meal}
//             </button>
//           ))}
//         </div>
//         <div className="meal-list">
//           {meals[activeMeal]?.length > 0 ? (
//             meals[activeMeal].map((item, idx) => (
//               <div className="meal-item" key={idx}>
//                 <span>{item}</span>
//                 <button className="delete-btn" onClick={() => deleteMeal(idx)}>
//                   ✕
//                 </button>
//               </div>
//             ))
//           ) : (
//             <p className="empty">기록 없음</p>
//           )}
//         </div>
//         <button className="add-btn" onClick={() => setShowPopup(true)}>
//           + 추가하기
//         </button>
//       </div>

//       {/* 팝업 */}
//       {showPopup && (
//         <div className="meal_popup-overlay">
//           <div className="meal_popup">
//             <h3>{activeMeal} 추가</h3>
//             <input
//               type="text"
//               placeholder="식단을 입력하세요"
//               value={inputValue}
//               onChange={(e) => setInputValue(e.target.value)}
//             />
//             <div className="meal_popup-buttons">
//               <button onClick={() => setShowPopup(false)}>취소</button>
//               <button onClick={addMeal}>추가</button>
//             </div>
//           </div>
//         </div>
//       )}

//       <BottomNavBar />
//     </div>
//   );
// };

// export default RecordPage;

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/RecordPage.css";
import BottomNavBar from "../components/BottomNavBar";
import machineIcon from "../assets/machine.png";
import calendarIcon from "../assets/calendar.png"; // 달력 아이콘
import api from "../utils/api";

// 날짜 포맷
const formatDateKey = (date) => date.toISOString().split("T")[0];
const formatDisplay = (date) => `${date.getMonth() + 1}.${date.getDate()}`;

const RecordPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // URL 쿼리 파라미터 확인
  const params = new URLSearchParams(location.search);
  const paramDate = params.get("date");

  // 오늘 날짜 or 선택된 날짜
  const [currentDate, setCurrentDate] = useState(
    paramDate ? new Date(paramDate) : new Date()
  );

  const [activeMeal, setActiveMeal] = useState("아침");
  const [meals, setMeals] = useState({ 아침: [], 점심: [], 저녁: [], 간식: [] });
  const [weight, setWeight] = useState("");
  const [goal, setGoal] = useState("");

  const currentKey = formatDateKey(currentDate);

  // 날짜 바뀔 때 데이터 조회 (현재 GET API 미구현 → 빈 데이터)
  useEffect(() => {
    setMeals({ 아침: [], 점심: [], 저녁: [], 간식: [] });
    setWeight("");
    setGoal("");
  }, [currentDate]);

  // 날짜 이동 (좌우 드래그)
  const changeDate = (offset) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + offset);
    setCurrentDate(newDate);
  };

  // 목표까지 남은 체중 계산
  let diffText = "정보 없음";
  if (weight && goal) {
    const goalNum = parseFloat(goal);
    const todayNum = parseFloat(weight);
    const diff = todayNum - goalNum;
    if (diff > 0) diffText = `목표 체중까지 ${diff.toFixed(1)}kg 남았습니다!`;
    else if (diff === 0) diffText = "목표를 달성했습니다!";
    else diffText = `목표보다 ${Math.abs(diff).toFixed(1)}kg 적게 나가네요!`;
  }

  // 좌우 날짜
  const prevDate = new Date(currentDate);
  prevDate.setDate(currentDate.getDate() - 1);
  const nextDate = new Date(currentDate);
  nextDate.setDate(currentDate.getDate() + 1);

  // 팝업 (식단 추가)
  const [showPopup, setShowPopup] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // ➡️ 끼니별 추가
  const addMeal = async () => {
    if (inputValue.trim() !== "") {
      const updatedFoods = [...meals[activeMeal], inputValue.trim()];
      try {
        await api.post("/meal", {
          date: currentKey,
          mealType: activeMeal,
          foods: updatedFoods,
        });
        setMeals((prev) => ({
          ...prev,
          [activeMeal]: updatedFoods,
        }));
      } catch (err) {
        alert("추가 실패: " + (err.response?.data?.message || err.message));
      }
      setInputValue("");
    }
    setShowPopup(false);
  };

  // ➡️ 끼니별 삭제
  const deleteMeal = async (idx) => {
    const updatedFoods = meals[activeMeal].filter((_, i) => i !== idx);
    try {
      await api.post("/meal", {
        date: currentKey,
        mealType: activeMeal,
        foods: updatedFoods,
      });
      setMeals((prev) => ({
        ...prev,
        [activeMeal]: updatedFoods,
      }));
    } catch (err) {
      alert("삭제 실패: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="record-page">
      {/* 상단 달력 버튼 */}
      <div className="calendar-header">
        <img
          src={calendarIcon}
          alt="달력"
          className="calendar-icon"
          onClick={() => navigate("/calendar")}
        />
        <span className="calendar-title">
          {currentDate.getFullYear()}. {String(currentDate.getMonth() + 1).padStart(2, "0")}
        </span>
      </div>

      {/* 날짜 캐러셀 */}
      <div className="date-bar-wrapper">
        <motion.div
          className="date-bar-inner"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(e, info) => {
            if (info.offset.x < -80) {
              changeDate(1);
            } else if (info.offset.x > 80) {
              changeDate(-1);
            }
          }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <span className="date-faded">{formatDisplay(prevDate)}</span>
          <span className="date-current">{formatDisplay(currentDate)}</span>
          <span className="date-faded">{formatDisplay(nextDate)}</span>
        </motion.div>
      </div>

      {/* 체중 카드 */}
      <div className="record-white-box weight-card">
        <p className="diff-text">{diffText}</p>
        <h2 className="weight-value">{weight || "정보 없음"}</h2>
        <img src={machineIcon} alt="체중계" className="machine-icon" />
      </div>

      {/* 식단 카드 */}
      <div className="record-white-box meal-card">
        <div className="meal-tabs">
          {["아침", "점심", "저녁", "간식"].map((meal) => (
            <button
              key={meal}
              className={`meal-tab ${activeMeal === meal ? "active" : ""}`}
              onClick={() => setActiveMeal(meal)}
            >
              {meal}
            </button>
          ))}
        </div>
        <div className="meal-list">
          {meals[activeMeal]?.length > 0 ? (
            meals[activeMeal].map((item, idx) => (
              <div className="meal-item" key={idx}>
                <span>{item}</span>
                <button className="delete-btn" onClick={() => deleteMeal(idx)}>
                  ✕
                </button>
              </div>
            ))
          ) : (
            <p className="empty">기록 없음</p>
          )}
        </div>
        <button className="add-btn" onClick={() => setShowPopup(true)}>
          + 추가하기
        </button>
      </div>

      {/* 팝업 */}
      {showPopup && (
        <div className="meal_popup-overlay">
          <div className="meal_popup">
            <h3>{activeMeal} 추가</h3>
            <input
              type="text"
              placeholder="식단을 입력하세요"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <div className="meal_popup-buttons">
              <button onClick={() => setShowPopup(false)}>취소</button>
              <button onClick={addMeal}>추가</button>
            </div>
          </div>
        </div>
      )}

      <BottomNavBar />
    </div>
  );
};

export default RecordPage;
