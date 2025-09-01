import React from "react";
import Header from "../components/Header";
import CoachCard from "../components/CoachCard";
import Button from "../components/Button";
import BottomNavBar from "../components/BottomNavBar";

import "../styles/home.css";

const HomePage = () => {
  return (
    <div className="home-container">
      <Header />
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
