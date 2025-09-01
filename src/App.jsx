import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthProvider, AuthContext } from "./context/AuthContext";

import HomePage from "./pages/HomePage";
import WeightInputPage from "./pages/WeightInputPage";
import MealInputPage from "./pages/MealInputPage";
import RecordPage from "./pages/RecordPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/weight"
          element={
            <PrivateRoute>
              <WeightInputPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/meal"
          element={
            <PrivateRoute>
              <MealInputPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/record"
          element={
            <PrivateRoute>
              <RecordPage />
            </PrivateRoute>
          }
        />
        {/* 기본 경로는 로그인으로 */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
