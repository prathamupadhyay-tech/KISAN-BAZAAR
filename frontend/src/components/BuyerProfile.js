import "../css/SellerProfile.css";
import React from "react";
import { useState, useEffect } from "react";
import BuyerNavbar from "./BuyerNavbar";
import "../css/BuyerProfile.css";
const BuyerProfile = () => {
  const [userProfile, setUserProfile] = useState({
    name: "",
    email: "",
    rating: "",
    address: "",
    state: "",
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setUserProfile(() => {
      return JSON.parse(localStorage.getItem("user"));
    });
  }, []);
  useEffect(() => {
    setLoading(false);
    console.log(userProfile);
  }, [userProfile]);
  if (loading) return <h1>Loading...</h1>;
  return (
    <>
      <BuyerNavbar />
      <div className="buyer-profile-container">
        <div className="seller-container-wrapper">
          <div className="main-profile-div">
            <div className="Profile-pic"></div>
            <div className="buyer-details">
              <div>
                <label htmlFor="">UserName:</label>
                <label htmlFor="">Email:</label>
                <label htmlFor="">Address:</label>
              </div>
              <div>
                <p>{userProfile.firstName + userProfile.lastName}</p>
                <p>{userProfile.email}</p>

                <p>{userProfile.address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyerProfile;
