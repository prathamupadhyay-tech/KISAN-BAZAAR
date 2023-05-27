import "../css/MarketNew.css";
import React from "react";
import wheat from "../img/wheat.jpg";
import rice from "../img/rice.jpg";
import jowar from "../img/jowar.jpg";
import corn from "../img/corn.jpg";
import veg from "../img/veg.webp";
import tomatos from "../img/tomatos.jpg";
import carrot from "../img/carrot.jpg";
import veg2 from "../img/veg2.jpg";
import peas from "../img/peas.jpg";
import banana from "../img/banana.jpg";
import kiwi from "../img/kiwi.jpg";
import apple from "../img/apple.jpg";
import orange from "../img/orange.jpg";

import potatos from "../img/potatos.jpg";
import BuyerNavbar from "./BuyerNavbar";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
const MarketNew = () => {
  const navigate = useNavigate();
  const handleClick = (e) => {
    navigate(`/buyer/market/${e.target.getAttribute("name")}`);
  };
  return (
    <>
      <BuyerNavbar></BuyerNavbar>

      <div className="main-market-container">
        <div className="market-main-heading">
          <h1>
            <span>Kisan</span> Market
          </h1>
          <p>
            Get best quality Groceries for your Shop directly from the farm.
          </p>
        </div>
        <div className="market-container-wrapper">
          <div className="market-product-catagory-1">
            <div className="product-heading">
              <h1>Grains</h1>
              <p>Top quality grains from top quality vendors</p>
            </div>
            <div className="market-products-div">
              <div
                className="market-product"
                style={{ backgroundImage: `url(${wheat})`, content: "" }}
              >
                <div>
                  <h1 name="Wheat" onClick={handleClick}>
                    wheat
                  </h1>
                </div>
              </div>
              <div
                className="market-product"
                style={{ backgroundImage: `url(${rice})` }}
              >
                <div>
                  <h1 name="Rice" onClick={handleClick}>
                    Rice
                  </h1>
                </div>
              </div>
              <div
                className="market-product"
                style={{ backgroundImage: `url(${jowar})` }}
              >
                <div>
                  <h1 onClick={handleClick} name="Jowar">
                    Jowar
                  </h1>
                </div>
              </div>
              <div
                className="market-product"
                style={{ backgroundImage: `url(${corn})` }}
              >
                <div>
                  <h1 name="Corn" onClick={handleClick}>
                    Corn
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className="market-product-catagory-1">
            <div className="product-heading">
              <h1>Vegetable</h1>
              <p>Top quality Vegetable from top quality vendors</p>
            </div>
            <div className="market-products-div">
              <div
                className="market-product"
                style={{ backgroundImage: `url(${potatos})`, content: "" }}
              >
                <div>
                  <h1 name="Potato" onClick={handleClick}>
                    Potato
                  </h1>
                </div>
              </div>
              <div
                className="market-product"
                style={{ backgroundImage: `url(${tomatos})` }}
              >
                <div>
                  <h1 name="Tomato" onClick={handleClick}>
                    Tomato
                  </h1>
                </div>
              </div>
              <div
                className="market-product"
                style={{ backgroundImage: `url(${carrot})` }}
              >
                <div>
                  <h1 name="Carrot" onClick={handleClick}>
                    Carrot
                  </h1>
                </div>
              </div>
              <div
                className="market-product"
                style={{ backgroundImage: `url(${peas})` }}
              >
                <div>
                  <h1 name="Peas" onClick={handleClick}>
                    Peas
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className="market-product-catagory-1">
            <div className="product-heading">
              <h1>Fruits</h1>
              <p>Top quality fruits from top quality vendors</p>
            </div>
            <div className="market-products-div">
              <div
                className="market-product"
                style={{ backgroundImage: `url(${banana})`, content: "" }}
              >
                <div>
                  <h1 name="Banana" onClick={handleClick}>
                    Banana
                  </h1>
                </div>
              </div>
              <div
                className="market-product"
                style={{ backgroundImage: `url(${apple})` }}
              >
                <div>
                  <h1 name="Apple" onClick={handleClick}>
                    Apple
                  </h1>
                </div>
              </div>
              <div
                className="market-product"
                style={{ backgroundImage: `url(${orange})` }}
              >
                <div>
                  <h1 name="Orange" onClick={handleClick}>
                    Orange
                  </h1>
                </div>
              </div>
              <div
                className="market-product"
                style={{ backgroundImage: `url(${kiwi})` }}
              >
                <div>
                  <h1 name="kiwi" onClick={handleClick}>
                    kiwi
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MarketNew;
