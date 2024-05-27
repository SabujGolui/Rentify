import React, { useEffect, useState } from "react";
import {
  getProperty,
  interestedProperty,
  searchProperty,
} from "../api/apiService";
import "./style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal } from "bootstrap";

export default function Buyersection() {
  const [Data, setData] = useState([]);
  const [user, setUser] = useState("");
  const [loader, setLoader] = useState(true);
  const [sloader, setSLoader] = useState(false);
  const [contactDetails, setContactDetails] = useState([]);
  const [searchItem, setSearchItem] = useState("");

  const FetchData = async () => {
    setUser(sessionStorage.getItem("name"));

    try {
      let Responce = await getProperty();
      if (Responce != null) {
        setData(Responce.get_property);
      }
    } catch (error) {
      console.error("Error in Fetching Data", error);
      toast("Error in Fetching Data");
    }
    setLoader(false);
  };

  useEffect(() => {
    FetchData();
  }, []);

  const handleInterest = async (id) => {
    console.log(id);

    let postData = {
      interested_buyer: sessionStorage.getItem("username"),
      id: id,
    };
    try {
      let Responce = await interestedProperty(postData);
      if (Responce.property_interested[0]) {
        setContactDetails(Responce.property_interested[0]);
        const modalElement = document.getElementById("staticBackdrop");
        const modal = new Modal(modalElement, {
          backdrop: "static",
          keyboard: false,
        });
        modal.show();
      }
      console.log("Responce", Responce);
    } catch (error) {
      console.error("Error in Fetching Data", error);
      toast("Error in Fetching Data");
    }
  };

  const handleSearch = async () => {
    setSLoader(true);
    try {
      let Responce = await searchProperty({
        search_by: searchItem,
      });
      if (Responce.search_property) {
        setData(Responce.search_property);
      } else {
        toast("No Relevent Property Found");
      }
      console.log(Responce);
    } catch (error) {
      console.error("Error in Fetching Data", error);
      toast("Error in Fetching Data");
    }
    setSLoader(false);
  };

  return (
    <div>
      {loader == false ? (
        <>
          <div className="container mb-5">
            <div className="container-fluid ">
              <section id="minimal-statistics">
                <div className="row">
                  <div className="col-12 mt-3 mb-1">
                    <h4 className="text-uppercase">Welcome {user}</h4>
                    <p>Start Finding Your Properties</p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-xl-3 col-sm-6 col-12">
                    <div className="card">
                      <div className="card-content">
                        <div className="card-body">
                          <div className="media d-flex">
                            <div className="align-self-center">
                              <i className="icon-pencil primary font-large-2 float-left"></i>
                            </div>
                            <div className="media-body text-right">
                              <h3>{Data ? Data[0]?.v_count : 0}</h3>
                              <span>Number of Properties Listed</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-9 col-sm-6 col-12">
                    <div className="card">
                      <div className="card-content">
                        <div className="card-body">
                          <div className="search col-md-12 d-flex">
                            <i className="fa fa-search"></i>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search by Place , Area, No of Bedrooms, Near By etc."
                              onChange={(e) => setSearchItem(e.target.value)}
                            />
                            {sloader == false ? (
                              <button
                                className="btn btn-primary mx-4"
                                onClick={() => handleSearch()}
                              >
                                Search
                              </button>
                            ) : (
                              <button className="btn btn-primary mx-4">
                                <span
                                  className="spinner-border spinner-border-sm mx-2"
                                  role="status"
                                  aria-hidden="true"
                                ></span>
                                Search
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>

          {Data && Data.length > 0 ? (
            <div className="container border rounded">
              <table className="table table-striped ">
                <thead>
                  <tr>
                    <th scope="col">Serial No</th>
                    <th scope="col">Place</th>
                    <th scope="col">Area</th>
                    <th scope="col">No of Bed Room(s)</th>
                    <th scope="col">Bathroom</th>
                    <th scope="col">Near By</th>
                    <th className="col" scope="col">
                      Review
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Data &&
                    Data.length > 0 &&
                    Data.map((row, index) => (
                      <tr>
                        <th scope="row">{index + 1}</th>
                        <td>{row.place}</td>
                        <td>{row.area}</td>
                        <td>{row.number_of_bed_room}</td>
                        <td>{row.bathroom}</td>
                        <td>{row.near_by}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-warning"
                            onClick={() => handleInterest(row.id)}
                          >
                            Interested
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ) : (
            ""
          )}
        </>
      ) : (
        <div className="text-center pt-5">
          <div
            className="spinner-border"
            style={{ width: "3rem", height: "3rem", color: "blue" }}
            role="status"
          ></div>
        </div>
      )}
      <ToastContainer />
      <div
        className="modal fade"
        id="staticBackdrop"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Seller Contact Information
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <b>Name: {contactDetails.name}</b>
              <br />
              <b>Phone Number: {contactDetails.phone_no}</b>
              <br />
              <b>Email Address: {contactDetails.email}</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
