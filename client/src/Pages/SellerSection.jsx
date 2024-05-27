import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProperty, DeleteProperty } from "../api/apiService";
import "./style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SellerSection() {
  const [Data, setData] = useState([]);
  const [user, setUser] = useState("");
  const [loader, setLoader] = useState(true);

  const FetchData = async () => {
    setUser(sessionStorage.getItem("name"));

    try {
      let Responce = await getProperty({
        seller_id: sessionStorage.getItem("username"),
      });
      //console.log(Responce);
      if (Responce != null) {
        setData(Responce.get_property);
      }
    } catch (error) {
      console.error("Error in form submission:", error);
    }
    setLoader(false);
  };

  useEffect(() => {
    FetchData();
  }, []);

  const DeleteItem = async (id) => {
    try {
      let Responce = await DeleteProperty({
        id: id,
      });
      //console.log(Responce);
      if (Responce) {
        toast(Responce.delete_property[0].message);
        FetchData();
      }
    } catch (error) {
      console.error("Error in form submission:", error);
    }
    setLoader(false);
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
                    <p>Start listing Your Properties</p>
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
                              <span>Number of total Properties</span>
                            </div>
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
                    <th className="col-md-2" scope="col">
                      Update
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
                        <td className="text-center">
                          <Link to={`/update/${row.id}`}>
                            <button
                              type="button"
                              className="btn btn-warning m-2"
                            >
                              Update
                            </button>
                          </Link>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => DeleteItem(row.id)}
                          >
                            Delete
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
    </div>
  );
}
