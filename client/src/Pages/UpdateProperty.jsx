import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { getPropertybyid, createProperty } from "../api/apiService";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const UpdateProperty = ({ students }) => {
  const [Loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const { index } = useParams();
  const id = index;

  const [formData, setFormData] = useState({
    id: id,
    place: "",
    area: "",
    number_of_bed_room: "",
    bathroom: "",
    near_by: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const FetchData = async () => {
      let Responce = await getPropertybyid({
        id: id,
      });
      if (Responce != null) {
        setFormData(Responce.get_property_by_id[0]);
      }
      setLoader(false);
    };
    FetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      let res = await createProperty(formData);
      console.log(res);
      toast(res.create_update_property[0].message);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error("Error in form submission:", error);
    }
    setLoader(false);
  };

  return (
    <div>
      <div className="min-vh-100">
        <Navbar />

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
                type="number"
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
                    Updating
                  </button>
                </>
              ) : (
                <button type="submit" className="btn btn-primary">
                  Update
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
};

export default UpdateProperty;
