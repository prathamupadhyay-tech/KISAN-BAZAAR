import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
const BuyerNavbar = ({ setisSignin, setisSignup, setcrossClicked }) => {
  const [buyer, setBuyer] = useState(localStorage.getItem("userType"));
  useEffect(() => {
    setBuyer(localStorage.getItem("userType"));
  });

  const navigate = useNavigate();
  return (
    <div className="main-navbar" style={{ heigth: "200px" }}>
      <div className="navbar-wrapper">
        <div className="logo"></div>
        <div className="navbar-links-div">
          {" "}
          <Link to={"/"}>
            <li className="navbar-links">Home</li>
          </Link>
          {buyer && (
            <>
              <Link to="/buyer/market">
                <li className="navbar-links">Market</li>
              </Link>
              <Link to="/buyer/cart">
                <li className="navbar-links">Cart</li>
              </Link>
            </>
          )}
          {!buyer ? (
            <>
              <li
                className="navbar-links "
                onClick={() => {
                  setisSignup(true);
                  setisSignin(false);
                  setcrossClicked(false);
                }}
              >
                Sign Up
              </li>
              <li
                className="navbar-links "
                onClick={() => {
                  setisSignup(false);
                  setisSignin(true);
                  setcrossClicked(false);
                }}
              >
                Sign In
              </li>
            </>
          ) : (
            <>
              <Link to="/buyer/profile">
                {" "}
                <li className="navbar-links">Profile</li>
              </Link>

              <li
                className="navbar-links "
                onClick={() => {
                  localStorage.clear();
                  navigate("/");
                }}
              >
                {" "}
                Logout
              </li>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuyerNavbar;
