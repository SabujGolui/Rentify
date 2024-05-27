import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Buyersection from "./Buyersection";
import SellerSection from "./SellerSection.jsx";

export default function Home() {
  const [type, seType] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      let acc_type = sessionStorage.getItem("type");
      seType(acc_type);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="min-vh-100">
        {type === "Buyer" ? <Buyersection /> : <SellerSection />}
      </div>
      <Footer />
    </div>
  );
}
