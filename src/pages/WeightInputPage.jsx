import React, { useState } from "react";
import coachImg from "../assets/coach.png";
import editIcon from "../assets/edit.png";
import BottomNavBar from "../components/BottomNavBar";
import "../styles/WeightInputPage.css";

const WeightInputPage = () => {
    const [showGoalPopup, setShowGoalPopup] = useState(false);
    const [showTodayPopup, setShowTodayPopup] = useState(false);
    const [goalWeight, setGoalWeight] = useState("");
    const [todayWeight, setTodayWeight] = useState("");

    // 임시 입력 상태
    const [tempGoal, setTempGoal] = useState("");
    const [tempToday, setTempToday] = useState("");

    const saveGoalWeight = () => {
        if (tempGoal.trim() !== "") {
            setGoalWeight(tempGoal + "kg");
        }
        setShowGoalPopup(false);
        setTempGoal("");
    };

    const saveTodayWeight = () => {
        if (tempToday.trim() !== "") {
            setTodayWeight(tempToday + "kg");
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
            {/* 상단 타이틀 박스 */}
            <div className="white-box title-box full-width">
                <h2>체중 입력</h2>
            </div>

            {/* 캐릭터 + 목표 체중 */}
            <div className="coach-section">
                <div className="weight-speech-bubble">
                    과연 오늘의 체중은?!
                </div>

                <img src={coachImg} alt="햄토리 코치" className="weight-coach-img" />

                <p className="goal-title">현재 목표 체중</p>
                <div className="goal-row">
                    <span className="goal-weight">
                        {goalWeight || "정보 없음."}
                    </span>
                    <img
                        src={editIcon}
                        alt="목표 체중 수정"
                        className="edit-icon"
                        onClick={() => setShowGoalPopup(true)}
                    />
                </div>
            </div>

            {/* 오늘의 체중 입력 */}
            <div className="white-box input-section">
                <h3>오늘의 체중 입력하기</h3>
                <div
                    className="today-weight-box"
                    onClick={() => setShowTodayPopup(true)}
                >
                    {todayWeight || "정보 없음."}
                </div>
                <div className="goal-pill">
                    {diffText}
                </div>
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
                            <button
                                className="cancel-btn"
                                onClick={() => setShowGoalPopup(false)}
                            >
                                취소
                            </button>
                            <button
                                className="save-btn"
                                onClick={saveGoalWeight}
                            >
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
                            <button
                                className="cancel-btn"
                                onClick={() => setShowTodayPopup(false)}
                            >
                                취소
                            </button>
                            <button
                                className="save-btn"
                                onClick={saveTodayWeight}
                            >
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
