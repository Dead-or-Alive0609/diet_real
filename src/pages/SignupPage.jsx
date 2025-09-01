import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/auth.css";

const SignupPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    if (!email || !password) {
      alert("이메일과 비밀번호를 입력해주세요.");
      return;
    }
    // 지금은 단순 저장 (나중엔 API 연동)
    localStorage.setItem("user", JSON.stringify({ email, password }));
    alert("회원가입이 완료되었습니다. 로그인해주세요.");
    navigate("/login");
  };

  return (
    <div className="auth-page">
      <h2>회원가입</h2>
      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>회원가입</button>
      <p>
        이미 계정이 있으신가요? <Link to="/login">로그인</Link>
      </p>
    </div>
  );
};

export default SignupPage;
