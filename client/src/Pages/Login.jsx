import React, { useState } from "react";
import "./Page.css";
import img from "../Images/real-estate.webp";
import { Link } from "react-router-dom";
import { getUser } from "../api/apiService";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    let formData = { username: username, password: password };
    try {
      let user = await getUser(formData);
      console.log("user", user);
      if (user) {
        onLogin(user.login.email);
        sessionStorage.setItem("type", user.login.type);
        sessionStorage.setItem("name", user.login.first_name);
      } else {
        setError("Invalid credentials. Please try again.");
        alert("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Error in form submission:", error);
    }
  };

  return (
    <div className="body p-5">
      <div className="container mx-auto">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-12 mx-auto">
            <div className="card border-0 shadow rounded-3  flex-row">
              <img
                src={img}
                className="d-none d-sm-none d-md-block rounded card-img-left example-card-img-responsive"
                alt="image"
              />
              <div className="card-body p-4 p-sm-5">
                <h5 className="card-title text-center mb-5 fw-20 fs-5">
                  Sign In
                </h5>
                <form>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      placeholder="Email Address"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="form-control"
                      id="floatingInput"
                    />
                    <label for="floatingInput">Email Address</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-control"
                      id="floatingPassword"
                    />
                    <label for="floatingPassword">Password</label>
                  </div>

                  <div className="d-grid">
                    <Link
                      to={"/"}
                      onClick={handleLogin}
                      className="text-decoration-none btn btn-primary btn-login text-uppercase fw-bold"
                    >
                      Sign in
                    </Link>
                    {error && <div style={{ color: "red" }}>{error}</div>}
                  </div>
                  <hr className="my-4" />
                  <div className="d-grid">
                    <Link
                      to={"/signup"}
                        className="text-decoration-none btn btn-danger text-uppercase fw-bold"
                    >
                      Sign Up
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
