import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { checkAuth } from "./features/auth/authSlice";
import Login from "./pages/Login";
import SpaceDashboard from "./pages/SpaceDashboard";

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // 1. ADDED: A local state that forces the app to wait on the very first load
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    // 2. UPDATED: Dispatch the check, and use .finally() to turn off the boot screen
    // ONLY after the backend has given a definitive yes or no.
    dispatch(checkAuth()).finally(() => {
      setIsBooting(false);
    });
  }, [dispatch]);

  // 3. UPDATED: Use the local isBooting state instead of Redux's isLoading
  if (isBooting) {
    return (
      <div className="h-screen bg-[#060B19] flex items-center justify-center text-white font-bold tracking-widest animate-pulse">
        SYSTEM BOOT...
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/"
          element={user ? <SpaceDashboard /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
