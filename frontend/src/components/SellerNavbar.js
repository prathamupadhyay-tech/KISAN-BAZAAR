import React from "react";

import "../css/SellerDashboard.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SellerNavbar = () => {
  return (
    <>
      <div className="dashboard-container">
        <div className="dashboard-wrapper">
          <div className="dash-navbar">
            <div className="dash-navbar-wrapper">
              <div className="dash-logo"></div>

              <div className="dash-nav-links-div">
                <Link to="/seller/profile">
                  <li className="dash-nav-links">Home</li>
                </Link>
                <Link to="/seller/SellProduct">
                 
                  <li className="dash-nav-links">Sell Products</li>
                </Link>


              <Link to = "/seller/SoldProducts">
                 <li className="dash-nav-links">Previous Auctions</li>
              </Link>
              <Link to ="/" onClick={() => localStorage.clear()}>
                  <li className="dash-nav-links">Logout</li>
              </Link>
             
            </div>
          </div>
        </div>
      </div>
       </div>
    </>
  )
}

export default SellerNavbar;
