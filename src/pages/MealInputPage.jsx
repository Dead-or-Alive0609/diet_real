import React, { useState } from "react";
import BottomNavBar from "../components/BottomNavBar";
import coach2 from "../assets/coach2.png";
import "../styles/MealInputPage.css";

const MealInputPage = () => {
  const [activeTab, setActiveTab] = useState("input");

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

      {/* 네모 박스 4개 */}
      <div className="meal_boxes">
        <div className="meal_box">아침</div>
        <div className="meal_box">점심</div>
        <div className="meal_box">저녁</div>
        <div className="meal_box">간식</div>
      </div>

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
