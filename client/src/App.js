import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import React, { useState, useEffect } from "react";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import UpdateProperty from "./Pages/UpdateProperty";
import CreateProperty from "./Pages/CreateProperty";
import Signup from "./Pages/Signup";

function App(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Check local storage for login status
    const storedUsername = sessionStorage.getItem("username");
    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
  }, []);

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setUsername(user);
    sessionStorage.setItem("username", user);
  };

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Home /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/update/:index"
            element={
              isLoggedIn ? <UpdateProperty /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/create"
            element={
              isLoggedIn ? <CreateProperty /> : <Navigate to="/login" replace />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
