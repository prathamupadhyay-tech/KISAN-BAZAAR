import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import LandingPage from "./components/LandingPage";
import Login2 from "./components/Login2";
import { BrowserRouter } from "react-router-dom";
import Sign from "./components/Sign";
import SellerDashboard from "./components/SellerDashboard";
import SellProduct from "./components/SellProduct";
import ProductDescription from "./components/ProductDescription";
import Market from "./components/market.js/market";
import CategoryPage from "./components/market.js/mcategory";
import MarketNew from "./components/MarketNew";
import BuyerCart from "./components/BuyerCart";
import PrevAuction from "./components/PrevAuction";
import SellProductForm from "./components/SellProductForm";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App></App>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
