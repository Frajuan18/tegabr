import { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
// In your router configuration
import ForgotPassword from "./pages/ForgotPassword";
import VerifyEmail from "./pages/VerifyEmail";
import Home from "./pages/Home";
import ResetPassword from "./pages/ResetPassword";
import ActionHandler from "./components/ActionHandler";
import Dashboard from "./pages/Dashboard";
import TimelinePage from "./pages/TimelinePage";
import SmartRemindersPage from "./pages/SmartReminderPage";
import WorkloadAwarenessPage from "./pages/WorkAwarenessPage";
function AppRouter() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/login" && location.pathname !== "/signup" && location.pathname !== "/forgot-password" && location.pathname !== "/verify-email"  && location.pathname !== "/reset-password" && location.pathname !== "/dashboard" && location.pathname !== "/timeline" && location.pathname !== "/smart-reminders" && location.pathname !== "/work-awareness" && (
        <Navbar />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/action" element={<ActionHandler />} /> 
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/timeline" element={<TimelinePage />} />
        <Route path="/smart-reminders" element={<SmartRemindersPage />} />
        <Route path="/work-awareness" element={<WorkloadAwarenessPage/>}/>
      </Routes>
    </>
  );
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
