import React, { useState } from "react";
import coachImg from "../assets/coach.png";
import editIcon from "../assets/edit.png";
import BottomNavBar from "../components/BottomNavBar";
import "../styles/WeightInputPage.css";

const WeightInputPage = () => {
    const [showGoalPopup, setShowGoalPopup] = useState(false);
    const [showTodayPopup, setShowTodayPopup] = useState(false);
    const [goalWeight, setGoalWeight] = useState("103kg"); // API 연결 예정
    const [todayWeight, setTodayWeight] = useState("112.2kg"); // API 연결 예정

    return (
        <div className="weight-page">
            {/* 상단 타이틀 박스 */}
            <div className="white-box title-box full-width">
                <h2>체중 입력</h2>
            </div>

            {/* 캐릭터 + 목표 체중 */}
            <div className="coach-section">
                {/* 말풍선 */}
                <div className="weight-speech-bubble">
                    과연 오늘의 체중은?!
                </div>

                <img src={coachImg} alt="햄토리 코치" className="weight-coach-img" />

                <p className="goal-title">현재 목표 체중</p>
                <div className="goal-row">
                    <span className="goal-weight">{goalWeight}</span>
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
                    {todayWeight}
                </div>
                <div className="goal-pill">
                    현재 목표까지 3.2kg 남았습니다!
                </div>
            </div>

            {/* 팝업 */}
            {showGoalPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h4>목표 체중 수정</h4>
                        <input
                            type="text"
                            placeholder="목표 체중 입력"
                            className="popup-input"
                            onChange={(e) => setGoalWeight(e.target.value + "kg")}
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
                                onClick={() => setShowGoalPopup(false)}
                            >
                                저장
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showTodayPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h4>오늘의 체중 입력</h4>
                        <input
                            type="text"
                            placeholder="오늘의 체중"
                            className="popup-input"
                            onChange={(e) => setTodayWeight(e.target.value + "kg")}
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
                                onClick={() => setShowTodayPopup(false)}
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
