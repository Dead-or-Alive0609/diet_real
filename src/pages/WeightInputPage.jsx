import React, { useState, useEffect } from "react";
import coachImg from "../assets/coach.png";
import editIcon from "../assets/edit.png";
import BottomNavBar from "../components/BottomNavBar";
import "../styles/WeightInputPage.css";
import api from "../utils/api";

const WeightInputPage = () => {
  const [showGoalPopup, setShowGoalPopup] = useState(false);
  const [showTodayPopup, setShowTodayPopup] = useState(false);
  const [goalWeight, setGoalWeight] = useState("");
  const [todayWeight, setTodayWeight] = useState("");

  const [tempGoal, setTempGoal] = useState("");
  const [tempToday, setTempToday] = useState("");

  const today = new Date().toISOString().split("T")[0];

  // 페이지 진입 시 목표체중, 오늘 체중 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 목표 체중 GET
        const goalRes = await api.get("/target-weight");
        if (goalRes.data?.targetWeight) {
          setGoalWeight(goalRes.data.targetWeight + "kg");
        } else {
          setGoalWeight(""); // 데이터 없으면 "정보 없음."
        }
      } catch (err) {
        console.warn("목표 체중 불러오기 실패:", err);
        setGoalWeight(""); // 오류 시도 초기화
      }

      try {
        // 오늘 체중 GET
        const recordRes = await api.get(`/record?date=${today}`);
        if (recordRes.data?.weight !== null && recordRes.data?.weight !== undefined) {
          setTodayWeight(recordRes.data.weight + "kg");
        } else {
          setTodayWeight(""); // 데이터 없으면 "정보 없음."
        }
      } catch (err) {
        console.warn("오늘 체중 불러오기 실패:", err);
        setTodayWeight(""); // 오류 시도 초기화
      }
    };
    fetchData();
  }, [today]);

  // 목표 체중 저장
  const saveGoalWeight = async () => {
    if (tempGoal.trim() !== "") {
      const goalValue = parseFloat(tempGoal);
      try {
        await api.post("/target-weight", { targetWeight: goalValue });
        setGoalWeight(goalValue + "kg");
      } catch (err) {
        alert("목표 체중 저장 실패: " + (err.response?.data?.message || err.message));
      }
    }
    setShowGoalPopup(false);
    setTempGoal("");
  };

  // 오늘 체중 저장
  const saveTodayWeight = async () => {
    if (tempToday.trim() !== "") {
      const weightValue = parseFloat(tempToday);
      try {
        await api.post("/weight", {
          date: today,
          weight: weightValue,
        });
        setTodayWeight(weightValue + "kg");
      } catch (err) {
        alert("체중 저장 실패: " + (err.response?.data?.message || err.message));
      }
    }
    setShowTodayPopup(false);
    setTempToday("");
  };

  // 목표까지 남은 체중 계산
  const goalNum = parseFloat(goalWeight);
  const todayNum = parseFloat(todayWeight);
  let diffText = "";

  if (goalWeight && todayWeight && !isNaN(goalNum) && !isNaN(todayNum)) {
    const diff = todayNum - goalNum;
    if (diff > 0) {
      diffText = `현재 목표까지 ${diff.toFixed(1)}kg 남았습니다!`;
    } else if (diff === 0) {
      diffText = "축하드려요 목표를 달성했습니다!";
    } else {
      diffText = `총 ${Math.abs(diff).toFixed(1)}kg 다이어트 성공하셨습니다!`;
    }
  } else {
    diffText = "정보 없음.";
  }

  return (
    <div className="weight-page">
      <div className="white-box title-box full-width">
        <h2>체중 입력</h2>
      </div>

      <div className="coach-section">
        <div className="weight-speech-bubble">과연 오늘의 체중은?!</div>
        <img src={coachImg} alt="햄토리 코치" className="weight-coach-img" />
        <p className="goal-title">현재 목표 체중</p>
        <div className="goal-row">
          <span className="goal-weight">{goalWeight || "정보 없음."}</span>
          <img
            src={editIcon}
            alt="목표 체중 수정"
            className="edit-icon"
            onClick={() => setShowGoalPopup(true)}
          />
        </div>
      </div>

      <div className="white-box input-section">
        <h3>오늘의 체중 입력하기</h3>
        <div className="today-weight-box" onClick={() => setShowTodayPopup(true)}>
          {todayWeight || "정보 없음."}
        </div>
        <div className="goal-pill">{diffText}</div>
      </div>

      {/* 팝업 - 목표 체중 */}
      {showGoalPopup && (
        <div className="popup">
          <div className="popup-content">
            <h4>목표 체중 수정</h4>
            <input
              type="text"
              placeholder="목표 체중 입력"
              className="popup-input"
              value={tempGoal}
              onChange={(e) => setTempGoal(e.target.value)}
            />
            <div className="popup-buttons">
              <button className="cancel-btn" onClick={() => setShowGoalPopup(false)}>
                취소
              </button>
              <button className="save-btn" onClick={saveGoalWeight}>
                저장
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 팝업 - 오늘의 체중 */}
      {showTodayPopup && (
        <div className="popup">
          <div className="popup-content">
            <h4>오늘의 체중 입력</h4>
            <input
              type="text"
              placeholder="오늘의 체중"
              className="popup-input"
              value={tempToday}
              onChange={(e) => setTempToday(e.target.value)}
            />
            <div className="popup-buttons">
              <button className="cancel-btn" onClick={() => setShowTodayPopup(false)}>
                취소
              </button>
              <button className="save-btn" onClick={saveTodayWeight}>
                저장
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNavBar />
    </div>
  );
};

export default WeightInputPage;
