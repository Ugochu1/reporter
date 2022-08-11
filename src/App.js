import React from "react"
import { Route, Routes } from "react-router-dom";
import "./index.css";
import "./App.css";


// import website pages...
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import ReportsPage from "./pages/ReportsPage";
import ReportDevelopment from "./pages/ReportDevelopment";
import ChartViewer from "./pages/ChartViewer";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/development/report/:id" element={<ReportDevelopment />} />
        <Route path="/development/chart/:id" element={<ChartViewer />} />
      </Routes>
    </div>
  );
}

export default App;
