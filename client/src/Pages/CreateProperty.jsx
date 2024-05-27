import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { createProperty } from "../api/apiService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function CreateProperty() {
  const navigate = useNavigate();
  const [Loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    place: "",
    area: "",
    number_of_bed_room: "",
    bathroom: "",
    near_by: "",
    seller_id: sessionStorage.getItem("username"),
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    console.log("formData", formData);
    try {
      let res = await createProperty(formData);
      console.log("res", res);
      toast(res.create_update_property[0].message);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error("Error in form submission:", error);
      toast("Error in form submission");
    }
    setLoader(false);
  };

  return (
    <div>
      <div className="min-vh-100">
        <Navbar />
        {/* {successMessage && <Alert variant="success">{successMessage}</Alert>} */}
        <div className="container mt-5 mb-5 pb-4">
          <form className="row g-3" id="myForm" onSubmit={handleSubmit}>
            <div className="col-md-6">
              <label for="inputEmail4" className="form-label">
                Place
              </label>
              <input
                type="text"
                className="form-control"
                id="inputEmail4"
                defaultValue={formData.place}
                name="place"
                autoComplete="off"
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label for="inputPassword4" className="form-label">
                Area
              </label>
              <input
                type="text"
                className="form-control"
                id="inputPassword4"
                name="area"
                defaultValue={formData.area}
                autoComplete="off"
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label for="inputPassword4" className="form-label">
                Number of Bed Room(s)
              </label>
              <input
                type="number"
                className="form-control"
                id="inputPassword4"
                defaultValue={formData.number_of_bed_room}
                name="number_of_bed_room"
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label for="inputPassword4" className="form-label">
                Bathroom
              </label>
              <input
                type="text"
                className="form-control"
                id="inputPassword4"
                name="bathroom"
                defaultValue={formData.bathroom}
                autoComplete="off"
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label for="inputPassword4" className="form-label">
                Near By
              </label>
              <input
                type="text"
                className="form-control"
                id="inputPassword4"
                name="near_by"
                defaultValue={formData.near_by}
                autoComplete="off"
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-12">
              {Loader == true ? (
                <>
                  <button className="btn btn-primary" type="button" disabled>
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Saving
                  </button>
                </>
              ) : (
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              )}
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
      <Footer />
    </div>
  );
}
