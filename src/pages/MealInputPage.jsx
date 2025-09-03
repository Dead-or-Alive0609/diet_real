import React, { useState, useEffect } from "react";
import BottomNavBar from "../components/BottomNavBar";
import coach2 from "../assets/coach2.png";
import "../styles/MealInputPage.css";
import api from "../utils/api";

const MealInputPage = () => {
  const [activeTab, setActiveTab] = useState("input");
  const [meals, setMeals] = useState({
    아침: [],
    점심: [],
    저녁: [],
    간식: [],
  });
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  // 페이지 처음 로드 시 오늘 기록 불러오기
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await api.get(`/record?date=${today}`);
        if (res.data?.meals) {
          setMeals({
            아침: res.data.meals["아침"] || [],
            점심: res.data.meals["점심"] || [],
            저녁: res.data.meals["저녁"] || [],
            간식: res.data.meals["간식"] || [],
          });
        } else {
          setMeals({ 아침: [], 점심: [], 저녁: [], 간식: [] });
        }
      } catch (err) {
        console.error("오늘 식단 불러오기 실패:", err);
        setMeals({ 아침: [], 점심: [], 저녁: [], 간식: [] });
      }
    };
    fetchMeals();
  }, [today]);

  const openPopup = (mealType) => {
    setSelectedMeal(mealType);
    setInputValue("");
  };

  const closePopup = () => {
    setSelectedMeal(null);
    setInputValue("");
  };

  // 끼니별 추가
  const addMeal = async () => {
    if (inputValue.trim() !== "") {
      const updatedFoods = [...meals[selectedMeal], inputValue.trim()];
      try {
        await api.post("/meal", {
          date: today,
          mealType: selectedMeal,
          foods: updatedFoods,
        });
        setMeals((prev) => ({
          ...prev,
          [selectedMeal]: updatedFoods,
        }));
      } catch (err) {
        alert("식단 저장 실패: " + (err.response?.data?.message || err.message));
      }
    }
    closePopup();
  };

  // 끼니별 삭제
  const deleteMeal = async (meal, idx) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      const updatedFoods = meals[meal].filter((_, i) => i !== idx);
      try {
        await api.post("/meal", {
          date: today,
          mealType: meal,
          foods: updatedFoods,
        });
        setMeals((prev) => ({
          ...prev,
          [meal]: updatedFoods,
        }));
      } catch (err) {
        alert("삭제 실패: " + (err.response?.data?.message || err.message));
      }
    }
  };

  return (
    <div className="meal_page">
      <div className="meal_header meal_full-width">
        <h2>식단 입력</h2>
      </div>

      <div className="meal_tabs">
        <button
          className={`meal_tab ${activeTab === "input" ? "active" : ""}`}
          onClick={() => setActiveTab("input")}
        >
          식단 입력
        </button>
        <button
          className={`meal_tab ${activeTab === "record" ? "active" : ""}`}
          onClick={() => setActiveTab("record")}
        >
          오늘 기록
        </button>
      </div>

      {activeTab === "input" ? (
        <div className="meal_boxes">
          {["아침", "점심", "저녁", "간식"].map((meal) => (
            <div className="meal_box" key={meal}>
              <h3>{meal}</h3>
              <button className="meal_add-btn" onClick={() => openPopup(meal)}>
                추가하기
              </button>
              <div className="meal_example">예: 샐러드</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="meal_boxes">
          {["아침", "점심", "저녁", "간식"].map((meal) => (
            <div className="meal_box" key={meal}>
              <h3>{meal}</h3>
              <div className="meal_count">
                추가한 음식 <span>{meals[meal].length}</span>
              </div>
              {meals[meal].length > 0 ? (
                <ul style={{ padding: 0, margin: 0, listStyle: "none" }}>
                  {meals[meal].map((item, idx) => (
                    <li key={idx} className="meal_item">
                      {item}
                      <span
                        className="meal_delete"
                        onClick={() => deleteMeal(meal, idx)}
                      >
                        ✕
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ fontSize: "13px", color: "#bbb" }}>기록 없음</p>
              )}
            </div>
          ))}
        </div>
      )}

      {selectedMeal && (
        <div className="meal_popup-overlay">
          <div className="meal_popup">
            <h3>{selectedMeal} 추가</h3>
            <input
              type="text"
              placeholder="식단을 입력하세요"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <div className="meal_popup-buttons">
              <button onClick={closePopup}>취소</button>
              <button onClick={addMeal}>추가</button>
            </div>
          </div>
        </div>
      )}

      <div className="meal_coach-section">
        <img src={coach2} alt="햄토리 코치" className="meal_coach-img" />
        <div className="meal_speech-bubble">오 많이도 먹었네</div>
      </div>

      <BottomNavBar />
    </div>
  );
};

export default MealInputPage;
