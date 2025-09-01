import React, { useContext } from "react";
import Header from "../components/Header";
import CoachCard from "../components/CoachCard";
import Button from "../components/Button";
import BottomNavBar from "../components/BottomNavBar";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import "../styles/home.css";

const HomePage = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="home-container">
      <Header />

      {/* 로그아웃 버튼 */}
      <button className="logout-btn" onClick={handleLogout}>
        로그아웃
      </button>

      <CoachCard />

      <div className="button-group">
        <Button text="체중 입력하러 가기" link="/weight" />
        <Button text="식단 입력하러 가기" link="/meal" />
        <Button text="지난 기록 보러 가기" link="/record" />
      </div>

      <BottomNavBar />
    </div>
  );
};

export default HomePage;
