import React from "react";
import coachImg from "../assets/coach.png";

const CoachCard = () => {
  return (
    <div className="coach-card">
      <img src={coachImg} alt="햄토리 코치" className="coach-img" />

      {/* 말풍선 */}
      <div className="speech-bubble">
        Hello, pig. My name is 햄토리 코치.
      </div>

      {/* 목표까지 남은 무게 */}
      <div className="goal-pill">
        현재 목표까지 3.2kg 남았습니다!
      </div>
    </div>
  );
};

export default CoachCard;
