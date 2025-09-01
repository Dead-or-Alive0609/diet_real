import React, { useState } from "react";
import BottomNavBar from "../components/BottomNavBar";
import coach2 from "../assets/coach2.png";
import "../styles/MealInputPage.css";

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

  const openPopup = (mealType) => {
    setSelectedMeal(mealType);
    setInputValue("");
  };

  const closePopup = () => {
    setSelectedMeal(null);
    setInputValue("");
  };

  const addMeal = () => {
    if (inputValue.trim() !== "") {
      setMeals((prev) => ({
        ...prev,
        [selectedMeal]: [...prev[selectedMeal], inputValue.trim()],
      }));
    }
    closePopup();
  };

  const deleteMeal = (meal, idx) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      setMeals((prev) => ({
        ...prev,
        [meal]: prev[meal].filter((_, i) => i !== idx),
      }));
    }
  };

  return (
    <div className="meal_page">
      {/* 상단 타이틀 */}
      <div className="meal_header meal_full-width">
        <h2>식단 입력</h2>
      </div>

      {/* 탭 선택 */}
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

      {/* 탭 내용 */}
      {activeTab === "input" ? (
        <div className="meal_boxes">
          {Object.keys(meals).map((meal) => (
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
          {Object.keys(meals).map((meal) => (
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

      {/* 팝업 */}
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

      {/* 캐릭터 + 말풍선 */}
      <div className="meal_coach-section">
        <img src={coach2} alt="햄토리 코치" className="meal_coach-img" />
        <div className="meal_speech-bubble">오 많이도 먹었네</div>
      </div>

      {/* 네비게이션 */}
      <BottomNavBar />
    </div>
  );
};

export default MealInputPage;
