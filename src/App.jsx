import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/LoginPage.jsx";
import RegisterPage from "./components/RegisterPage.jsx";
import OTPPage from "./components/OTPPage.jsx";
import QuantumChatApp from "./components/QuantumChatApp.jsx";
import SplashScreen from "./components/SplashScreen.jsx";
import LandingPage from "./components/LandingPage.jsx";
import Test1 from "./components/Test1.jsx";
import Test2 from "./components/Test2.jsx";

export default function App() {
  const [auth, setAuth] = useState({ user: null });
  const [pendingUser, setPendingUser] = useState(null);
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <Routes>
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/test1" element={<Test1 />} />
      <Route path="/test2" element={<Test2 />} />
      <Route
        path="/login"
        element={<LoginPage setPendingUser={setPendingUser} setAuth={setAuth} />}
      />
      <Route
        path="/register"
        element={<RegisterPage setPendingUser={setPendingUser} />}
      />
      <Route
        path="/otp"
        element={
          <OTPPage
            pendingUser={pendingUser}
            setAuth={setAuth}
            setPendingUser={setPendingUser}
          />
        }
      />
      <Route
        path="/chat"
        element={
          auth.user ? (
            <QuantumChatApp auth={auth} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route path="*" element={<Navigate to="/landing" />} />
    </Routes>
  );
}
