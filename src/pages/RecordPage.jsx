import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../styles/RecordPage.css";
import BottomNavBar from "../components/BottomNavBar";
import machineIcon from "../assets/machine.png";

// 날짜 포맷
const formatDateKey = (date) => date.toISOString().split("T")[0];
const formatDisplay = (date) => `${date.getMonth() + 1}.${date.getDate()}`;

// 더미 데이터
const dummyData = {
  "2025-08-13": {
    weight: "113.5kg",
    goal: "110kg",
    meals: { 아침: ["토스트"], 점심: ["김치찌개"], 저녁: ["비빔밥"], 간식: [] },
  },
  "2025-08-14": {
    weight: "112.2kg",
    goal: "109kg",
    meals: { 아침: ["샐러드", "사과"], 점심: ["공깃밥", "계란후라이"], 저녁: [], 간식: ["초코파이"] },
  },
};

const RecordPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeMeal, setActiveMeal] = useState("아침");
  const [meals, setMeals] = useState({ 아침: [], 점심: [], 저녁: [], 간식: [] });

  const currentKey = formatDateKey(currentDate);
  const record = dummyData[currentKey];

  // 날짜 바뀔 때 meals 갱신
  useEffect(() => {
    if (record) setMeals(record.meals);
    else setMeals({ 아침: [], 점심: [], 저녁: [], 간식: [] });
  }, [currentDate]);

  // 날짜 이동
  const changeDate = (offset) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + offset);
    setCurrentDate(newDate);
  };

  // 목표까지 남은 체중
  let diffText = "정보 없음";
  if (record?.weight && record?.goal) {
    const goalNum = parseFloat(record.goal);
    const todayNum = parseFloat(record.weight);
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

  // 팝업
  const [showPopup, setShowPopup] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const addMeal = () => {
    if (inputValue.trim() !== "") {
      setMeals((prev) => ({
        ...prev,
        [activeMeal]: [...prev[activeMeal], inputValue.trim()],
      }));
      setInputValue("");
    }
    setShowPopup(false);
  };

  const deleteMeal = (idx) => {
    setMeals((prev) => ({
      ...prev,
      [activeMeal]: prev[activeMeal].filter((_, i) => i !== idx),
    }));
  };

  return (
    <div className="record-page">
      {/* 날짜 캐러셀 */}
      <div className="date-bar-wrapper">
        <motion.div
          className="date-bar-inner"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(e, info) => {
            if (info.offset.x < -80) {
              changeDate(1); // 다음 날짜
            } else if (info.offset.x > 80) {
              changeDate(-1); // 이전 날짜
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
        <h2 className="weight-value">{record?.weight || "정보 없음"}</h2>
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
