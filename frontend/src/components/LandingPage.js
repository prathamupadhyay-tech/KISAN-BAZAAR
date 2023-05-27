import React from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import "../css/LandingPage.css";
import Login2 from "./Login2";
import BuyerNavbar from "./BuyerNavbar";
import Sign from "./Sign";
const LandingPage = () => {
  const [crossClicked, setcrossClicked] = useState(false);

  const [isSignup, setisSignup] = useState(false);

  const [isSignin, setisSignin] = useState(false);

  // const [burger_class, setBurgerClass] = useState("hamburger_lines unclicked");

  // const [isMenuClicked, setIsMenuClicked] = useState(false);
  // const updateMenu = () => {
  //   if (!isMenuClicked) {
  //     setBurgerClass("hamburger_lines  clicked");

  //     document.body.style.overflow = "hidden";
  //     // setMenuClass("menu_bar menu_visible");
  //   } else {
  //     setBurgerClass("hamburger_lines unclicked");

  //     document.body.style.overflow = "auto";
  //     // setMenuClass("menu_bar menu_hidden");
  //   }
  //   setIsMenuClicked(!isMenuClicked);
  // };
  if (localStorage.getItem("token")) {
    if (localStorage.getItem("userType") === "Seller")
      return <Navigate to="/seller/profile" />;
  }
  return (
    <>
      <div className="landing-container">
        <div className="scroll_down_btn_div">
          <div className="scroll_down_btn"></div>
        </div>
        <div className="landing-page-background"></div>

        <BuyerNavbar
          setisSignin={setisSignin}
          setisSignup={setisSignup}
          setcrossClicked={setcrossClicked}
        />
        <div className="landing-wrapper">
          <div className="slogan">
            <h1>Farmers Market Place</h1>
            <p>
              We provide a way through which a farmer can earn his fare share of
              price for their products and earn their keep.
            </p>
          </div>
        </div>
      </div>

      <div className="landing-section-2">
        <div className="back-lines"></div>
        <div className="landing-section-2-wrapper">
          <div className="our-solution">
            <div>
              {" "}
              <h1>
                {" "}
                <span>Our</span> Solution
              </h1>
              <p>
                <span>Kisan Bazaar</span> is a digital B2B market solution that
                brings together Farmers and Industrial Buyers
              </p>
            </div>

            <p className="philosophy">
              We drive agricultural transactions through our digital platform in
              combination with our service partnership network. Kisan Bazaar
              accommodates online payments between buyer and seller.
            </p>
          </div>
          <div className="landing-section-2-imgs"></div>
        </div>
      </div>

      <div className="landing-section-3">
        <div className="landing-section-3-wrapper">
          <div className="Buyer">
            <div className="Buyer-div">
              <p>ARE YOU LOOKING TO BUY SOMETHING </p>
              <h1>BUYER</h1>
            </div>
          </div>
          <div className="Seller">
            <div className="Seller-div">
              <p>ARE YOU LOOKING TO SELL SOMETHING </p>
              <h1>SELLER</h1>
            </div>
          </div>
        </div>
      </div>
      {/* <div class="header">

    <h1>Key Features </h1>
    <hr />


  </div>
  <div class="row1-container">
    <div class="box box-down cyan">
      <h2>Sell Your Products</h2>
      <p> Users can sell their products via our website . Our website uses
                an auction system which provides a fare chance for the seller to
                earn decent price for their products. Our system cuts the need
                of a middleman for the farmers and help them earn a lot .</p>

    </div>

    <div class="box red">
      <h2>Buy Products</h2>
      <p> Users can register as a buyer and can participate in auctions of
                their choice on the market place. Our System also suggest the
                best autions to participate in . Buyers can see the ratings of
                the respective seller and decide on their own.</p>

    </div>

    <div class="box box-down blue">
      <h2>Learn to farm</h2>
      <p>Our system provides a learning platform for the farmers by which
                the can know which plants or crops can be grown according to the
                whether at their rexpective locations. This will help them to
                maximize their agriculture and benifit in the long run</p>

    </div>
  </div>
  <div class="row2-container">
    <div class="box orange">
      <h2>Compare the best prices</h2>
      <p>For the buyers our system compares the best priced autions that
                are currently available for the buyer to participate in . This
                comparision is based on the quantity as well as the current bid
                of the product.</p>

    </div>
  </div> */}

      <div className="features">
        <div className="back-lines"> </div>
        <div className="features-wrapper">
          <div className="features-heading">
            <h1>
              <span>Key</span> Features
            </h1>
          </div>

          <div className="features-main-section">
            <div className=" feature-box">
              <h1>Sell Your Products</h1>
              <p>
                Users can sell their products via our website . Our website uses
                an auction system which provides a fare chance for the seller to
                earn decent price for their products. Our system cuts the need
                of a middleman for the farmers and help them earn a lot .
              </p>
            </div>
            <div className="feature-box">
              <h1>Buy Products</h1>
              <p>
                Users can register as a buyer and can participate in auctions of
                their choice on the market place. Our System also suggest the
                best autions to participate in . Buyers can see the ratings of
                the respective seller and decide on their own.
              </p>
            </div>
            <div className="feature-box">
              <h1>Learn to farm</h1>
              <p>
                Our system provides a learning platform for the farmers by which
                the can know which plants or crops can be grown according to the
                whether at their rexpective locations. This will help them to
                maximize their agriculture and benifit in the long run
              </p>
            </div>
            <div className="feature-box">
              <h1>Compare the best prices</h1>
              <p>
                For the buyers our system compares the best priced autions that
                are currently available for the buyer to participate in . This
                comparision is based on the quantity as well as the current bid
                of the product.
              </p>
            </div>
          </div>
        </div>
      </div>

      {isSignin && !crossClicked ? (
        <div className="login_page">
          <div className="cross-btn">
            <div
              className="hamburger"
              onClick={() => {
                setcrossClicked(true);
                setisSignin(false);
                setisSignup(false);
              }}
            >
              <div className="hamburger_lines"></div>
              <div className="hamburger_lines"></div>
            </div>
          </div>
          <Login2
            setcrossClicked={setcrossClicked}
            setisSignin={setisSignin}
            setisSignup={setisSignup}
          />
        </div>
      ) : isSignup && !crossClicked ? (
        <div className="login_page">
          <div className="cross-btn">
            <div
              className="hamburger"
              onClick={() => {
                setcrossClicked(true);
                setisSignin(false);
                setisSignup(false);
              }}
            >
              <div className="hamburger_lines"></div>
              <div className="hamburger_lines"></div>
            </div>
          </div>
          <Sign
            setisSignin={setisSignin}
            setcrossClicked={setcrossClicked}
            setisSignup={setisSignup}
          ></Sign>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default LandingPage;
