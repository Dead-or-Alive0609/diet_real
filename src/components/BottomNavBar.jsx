import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

// 기본 아이콘
import homeIcon from "../assets/home.png";
import weightIcon from "../assets/weight.png";
import mealIcon from "../assets/meal.png";
import recordIcon from "../assets/record.png";

// 활성화 아이콘
import homeIconActive from "../assets/home_active.png";
import weightIconActive from "../assets/weight_active.png";
import mealIconActive from "../assets/meal_active.png";
import recordIconActive from "../assets/record_active.png";

const BottomNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;

  return (
    <div className="bottom-nav">
      <img
        src={currentPath === "/" ? homeIconActive : homeIcon}
        alt="홈"
        className="nav-icon"
        onClick={() => navigate("/")}
      />
      <img
        src={currentPath === "/weight" ? weightIconActive : weightIcon}
        alt="체중 입력"
        className="nav-icon"
        onClick={() => navigate("/weight")}
      />
      <img
        src={currentPath === "/meal" ? mealIconActive : mealIcon}
        alt="식단 입력"
        className="nav-icon"
        onClick={() => navigate("/meal")}
      />
      <img
        src={currentPath === "/record" ? recordIconActive : recordIcon}
        alt="지난 기록"
        className="nav-icon"
        onClick={() => navigate("/record")}
      />
    </div>
  );
};

export default BottomNavBar;
