import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import WeightInputPage from "./pages/WeightInputPage";
import MealInputPage from "./pages/MealInputPage";
import RecordPage from "./pages/RecordPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/weight" element={<WeightInputPage />} />
        <Route path="/meal" element={<MealInputPage />} />
        <Route path="/record" element={<RecordPage />} />
      </Routes>
    </Router>
  );
};

export default App;
