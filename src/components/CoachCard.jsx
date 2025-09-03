import React from "react";
import coachImg from "../assets/coach.png";

const CoachCard = ({ diffText }) => {
  return (
    <div className="coach-card">
      <img src={coachImg} alt="햄토리 코치" className="coach-img" />

      {/* 말풍선 */}
      <div className="speech-bubble">
        Hello, pig. My name is 햄토리 코치.
      </div>

      {/* 목표까지 남은 무게 */}
      <div className="goal-pill">
        {diffText || "환영합니다!"}
      </div>
    </div>
  );
};

export default CoachCard;
