import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import CoachCard from "../components/CoachCard";
import Button from "../components/Button";
import BottomNavBar from "../components/BottomNavBar";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

import "../styles/HomePage.css";

const HomePage = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [goalWeight, setGoalWeight] = useState("");
  const [todayWeight, setTodayWeight] = useState("");
  const [diffText, setDiffText] = useState("정보 없음.");

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 목표 체중 GET
        const goalRes = await api.get("/target-weight");
        if (goalRes.data?.targetWeight) {
          setGoalWeight(goalRes.data.targetWeight);
        }

        // 오늘 체중 GET
        const recordRes = await api.get(`/record?date=${today}`);
        if (recordRes.data?.weight !== null && recordRes.data?.weight !== undefined) {
          setTodayWeight(recordRes.data.weight);
        }

        // diff 계산
        if (goalRes.data?.targetWeight && recordRes.data?.weight !== null) {
          const goalNum = parseFloat(goalRes.data.targetWeight);
          const todayNum = parseFloat(recordRes.data.weight);

          if (!isNaN(goalNum) && !isNaN(todayNum)) {
            const diff = todayNum - goalNum;
            if (diff > 0) {
              setDiffText(`현재 목표까지 ${diff.toFixed(1)}kg 남았습니다!`);
            } else if (diff === 0) {
              setDiffText("축하드려요 목표를 달성했습니다!");
            } else {
              setDiffText(`총 ${Math.abs(diff).toFixed(1)}kg 다이어트 성공하셨습니다!`);
            }
          }
        } else {
          setDiffText("환영합니다!"); // 둘 중 하나라도 없으면 환영합니다
        }
      } catch (err) {
        console.warn("홈 데이터 불러오기 실패:", err);
        setDiffText("환영합니다!");
      }
    };

    fetchData();
  }, [today]);

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

      {/* CoachCard에 diffText 전달 */}
      <CoachCard diffText={diffText} />

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
