import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import img from "../Images/real_statelogo.png";

function Navbar() {
  const [type, setType] = useState("");
  const handleLogout = () => {
    sessionStorage.removeItem("username");
    window.location.reload();
  };
  useEffect(() => {
    const fetchdata = async () => {
      let Acc_type = sessionStorage.getItem("type");
      setType(Acc_type);
    };
    fetchdata();
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link to="/home">
            <img src={img} alt="image" className="" width="85" height="70" />
          </Link>

          <Link className="navbar-brand" to="/">
            Rentify
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link mx-2" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              {type != "Buyer" && (
                <li className="nav-item">
                  <Link className="nav-link mx-2" to="/create">
                    Add Poperty
                  </Link>
                </li>
              )}

              <li className="nav-item"></li>
            </ul>
            <button className="btn btn-outline-primary mx-3">
              <Link className="nav-link" onClick={handleLogout} to="/login">
                Log Out
              </Link>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
