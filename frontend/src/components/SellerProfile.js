import "../css/SellerProfile.css";
import React from "react";
import { useState, useEffect } from "react";
import SellerNavbar from "./SellerNavbar";
const SellerProfile = () => {
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
      <SellerNavbar />
      <div className="seller-profile-container">
        <div className="seller-container-wrapper">
          <div className="main-profile-div">
            <div className="Profile-pic"></div>
            <div className="Profile-details">
              <div>
                <label htmlFor="">UserName:</label>
                <label htmlFor="">Email:</label>
                <label htmlFor="">Rating:</label>
                <label htmlFor="">Earning:</label>
                <label htmlFor="">Address:</label>
              </div>
              <div>
                <p>{userProfile.firstName + userProfile.lastName}</p>
                <p>{userProfile.email}</p>

                <p>{userProfile.rating}</p>
                <p>{userProfile.earning ? userProfile.earning : 0}</p>
                <p>{userProfile.address}</p>
              </div>
            </div>
          </div>
         
        </div>
      </div>
    </>
  );
};

export default SellerProfile;
