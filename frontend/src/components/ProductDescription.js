import React from "react";
import "../css/ProductDescription.css";
import productImg from "../img/corn.jpg";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { io } from "socket.io-client";
import { customInstance } from "../helpers/axios";
import Timer from "./Timer";

const ProductDescription = ({ socket }) => {
  const [currProduct, setcurrProduct] = useState();
  const { id } = useParams();
  const [isbidGreater, setisbidGreater] = useState();
  const [currBid, setcurrBid] = useState();
  const [inputValue, setinputValue] = useState();

  socket.on("send_current_bid", (data) => {
    console.log(data);
  });
  const updateCurrentBid = () => {
    if (parseInt(currBid) < parseInt(inputValue)) {
      setcurrBid(inputValue);
    }
    const data = {
      inputValue: inputValue,
      id: id,
      currentBidder: JSON.parse(localStorage.user)._id,
      currentBidderName: JSON.parse(localStorage.user).firstName,
    };

    socket.emit("send_current_bid", data);
  };

  useEffect(() => {
    console.log(inputValue);
    console.log(currBid);
    if (parseInt(currBid) < parseInt(inputValue)) {
      setisbidGreater(true);
    } else {
      setisbidGreater(false);
    }
  }, [inputValue]);

  socket.off("update_current_bid").on("update_current_bid", (data) => {
    setinputValue(data.inputValue);
    setcurrBid(data.inputValue);
    console.log("hello" + data.inputValue);
  });

  useEffect(() => {
    const func = async () => {
      const axios = customInstance();
      try {
        const product = await axios.get(`/buyer/activeProducts/product/${id}`);
        setcurrProduct(product.data.allProducts[0]);
        setinputValue(product.data.allProducts[0].basePrice);
        console.log(product.data.allProducts[0]);
        setcurrBid(product.data.allProducts[0].currentBid);
      } catch (err) {
        alert("Something Went Wrong PLease Try Again Later");
      }
    };
    func();
  }, []);

  const handleInput = (e) => {
    const inputBid = e.target.value;
    setinputValue(inputBid);
  };
  socket.off("productSold").on("productSold", (product) => {
    if (product._id === id) {
      setcurrProduct((prev) => {
        return { ...prev, bidEnded: true };
      });
    }
  });
  useEffect(() => {
    console.log(currProduct);
  }, [currProduct]);
  if (!currProduct) return <h1>Loading...</h1>;
  return (
    <>
      <div className="main-product-container">
        <div className="product-back-lines"></div>
        <div className="main-product-wrapper">
          <div className="main-product">
            <div
              className="main-product-image"
              style={{ backgroundImage: `url(${currProduct.image})` }}
            ></div>

            <div className="main-product-info">
              <div className="product-name">
                <h1>Wheat</h1>
              </div>
              <div className="product-description">
                <h1>
                  Product Description:{" "}
                  <span className="">{currProduct.description}</span>
                </h1>
              </div>
              <div className="product-seller-name">
                <h1>
                  Seller:{" "}
                  <span>
                    {currProduct.owner.firstName}{" "}
                    {currProduct.bidEnded ? (
                      <span style={{ color: "red" }}>SOLD!!</span>
                    ) : (
                      ""
                    )}
                  </span>{" "}
                </h1>
              </div>
              <div className="product-seller-rating">
                <h1>Rating: </h1>
                <ReactStars
                  edit={false}
                  count={5}
                  size={24}
                  value ={parseInt(currProduct.owner.rating)}
                  emptyIcon={<i className="far fa-star"></i>}
                  fullIcon={<i className="fa fa-star"></i>}
                  activeColor="#ffd700"
                />
              </div>
              <div className="product-bid-time-left">
                <div className="time-left-div">
                  <Timer time={currProduct.AuctionEndTime}> </Timer>
                </div>
              </div>

              <div className="product-current-bid">
                <h1>
                  Current Bid: <span>{currBid}</span>
                </h1>
                <h1>
                  Base price: <span>{currProduct.basePrice + "Rs"}</span>
                </h1>
              </div>

              <div className="product-bid-increaser">
                <input
                  onChange={(e) => handleInput(e)}
                  min={currProduct.basePrice}
                  value={inputValue}
                  // placeholder={currProduct.basePrice}
                  type="number"
                />
                <button
                  disabled={
                    currProduct.bidEnded || !isbidGreater ? true : false
                  }
                  onClick={updateCurrentBid}
                >
                  Bid
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDescription;
