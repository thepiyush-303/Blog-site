import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./api/auth.js";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components/index.js";
import { Outlet } from "react-router-dom";
import Loading from "./components/loading.jsx";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
        setLoading(false);
      })
      .catch(() => {
        dispatch(logout());
        setLoading(false);
      });
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  ) : (
    <Loading />
  );
}

export default App;
