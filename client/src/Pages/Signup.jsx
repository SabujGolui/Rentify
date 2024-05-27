import React, { useState } from "react";
import "./Page.css";
import img from "../Images/real-estate.webp";
import { userSignUp } from "../api/apiService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    type: "",
  });
  const [Loader, setLoader] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log("formData", formData);
    setLoader(true);
    try {
      let res = await userSignUp(formData);
      if (res.signup[0].issuccess === "1") {
        toast(res.signup[0].message);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (error) {
      toast("Error in form submission");
    }
    setLoader(false);
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
                  Sign Up
                </h5>
                <form onSubmit={handleSignUp}>
                  <div className="row g-2 mb-3">
                    <div className="col-md">
                      <div className="form-floating">
                        <input
                          type="text"
                          name="first_name"
                          className="form-control"
                          id="floatingInputGrid"
                          placeholder="First Name"
                          onChange={handleChange}
                        />
                        <label for="floatingInputGrid">First Name</label>
                      </div>
                    </div>
                    <div className="col-md">
                      <div className="form-floating">
                        <input
                          type="text"
                          name="last_name"
                          className="form-control"
                          id="floatingInputGrid"
                          placeholder="Last Name"
                          onChange={handleChange}
                        />
                        <label for="floatingInputGrid">Last Name</label>
                      </div>
                    </div>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      placeholder="Email Address"
                      name="email"
                      onChange={handleChange}
                      className="form-control"
                      id="floatingInput"
                    />
                    <label for="floatingInput">Email Address</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      name="phone"
                      placeholder="Phone Number"
                      onChange={handleChange}
                      className="form-control"
                      id="floatingInput"
                    />
                    <label for="floatingInput">Phone Number</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={handleChange}
                      className="form-control"
                      id="floatingPassword"
                    />
                    <label for="floatingPassword">Password</label>
                  </div>
                  <div className="form-floating mb-3">
                    <select
                      className="form-select"
                      name="type"
                      id="floatingSelectGrid"
                      aria-label="Floating label select example"
                      onChange={handleChange}
                    >
                      <option selected>Open this select menu</option>
                      <option value="Buyer">Buyer</option>
                      <option value="Seller">Seller</option>
                    </select>
                    <label for="floatingInput">User Type</label>
                  </div>
                  <div className="col-6">
                    {Loader == true ? (
                      <>
                        <button
                          className="btn btn-primary"
                          type="button"
                          disabled
                        >
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Submitting...
                        </button>
                      </>
                    ) : (
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    )}
                  </div>
                  <ToastContainer />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
