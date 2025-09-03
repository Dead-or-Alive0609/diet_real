import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/RecordPage.css";
import BottomNavBar from "../components/BottomNavBar";
import machineIcon from "../assets/machine.png";
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

  // 날짜 바뀔 때 GET API 호출
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/record?date=${currentKey}`);
        if (res.data) {
          setMeals(res.data.meals || { 아침: [], 점심: [], 저녁: [], 간식: [] });
          setWeight(res.data.weight || "");
          setGoal(res.data.goal || "");
        }
      } catch {
        setMeals({ 아침: [], 점심: [], 저녁: [], 간식: [] });
        setWeight("");
        setGoal("");
      }
    };
    fetchData();
  }, [currentDate, currentKey]);

  // 날짜 이동 (좌우 드래그)
  const changeDate = (offset) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + offset);
    setCurrentDate(newDate);
  };

  // 좌우 날짜
  const prevDate = new Date(currentDate);
  prevDate.setDate(currentDate.getDate() - 1);
  const nextDate = new Date(currentDate);
  nextDate.setDate(currentDate.getDate() + 1);

  // 팝업 (식단 추가)
  const [showPopup, setShowPopup] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // 끼니별 추가
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

  // 끼니별 삭제 (팝업 확인 후 실행)
  const deleteMeal = async (idx) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

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
      {/* 상단 날짜 (캘린더 아이콘 삭제 → 날짜 클릭 시 달력 이동) */}
      <div className="calendar-header">
        <span
          className="calendar-title"
          onClick={() => navigate("/calendar")}
        >
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
        <h2 className="weight-value">
          {weight ? `${weight}kg` : "정보 없음"}
        </h2>
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
                <button
                  className="delete-btn"
                  onClick={() => deleteMeal(idx)}
                >
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

      {/* 팝업 (식단 추가) */}
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

