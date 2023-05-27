import React from "react";
import "../css/SellProduct.css";
import SellProductForm from "./SellProductForm";
import { useState, useEffect } from "react";
import SellerNavbar from "./SellerNavbar";
import { customInstance } from "../helpers/axios";
import { useParams } from "react-router-dom";
import productimg from "../img/wheat.jpg";
import Timer from "./Timer";
const SellProduct = ({ socket }) => {
  const [isCrossed, setisCrossed] = useState(false);
  const [isAddProduct, setisAddProduct] = useState(false);
  const [ongoing, setOngoing] = useState([]);
  const [checkBid , setCheckBid] = useState(false);
  const [allProducts, setAllProducts] = useState([]);

  // socket.off('productSold').on("productSold" , (product) => {

  //     setLoading(true);
  //     let remov = allProducts.data.allProducts.map((p) => {
  //       if(p._id === product._id){
  //         p.bidEnded = true;
  //       }
  //       return p;
  //     });
  //     setAllProducts({data:{allProducts:remov}});

  // })
  
  socket.off("update_current_bid").on("update_current_bid", (product) => {
    let remov = ongoing.map((p) => {
      if (p._id === product.id) {
        p.currentBid = product.inputValue;
        if (!p.currentBidder) {
          p.currentBidder = {
            firstName: product.currentBidderName,
          };
        } else {
          p.currentBidder.firstName = product.currentBidderName;
        }
      }
      return p;
    });

    setOngoing(remov);
  });

  const handleSell = (product) => {
    socket.emit("productSold", product);
    const rem = ongoing.filter((p) => p._id !== product._id);
    setOngoing(rem);
  };
  useEffect(() => {
    const func = async () => {
      const axios = customInstance();
      const data = await axios.get("/seller/activeProducts");
      setOngoing([...data.data]);
    };
    func();
  }, []);
  useEffect(() => {
    console.log(ongoing);
  }, [ongoing]);

  return (
    <>
      <SellerNavbar />
      <div className="sellProduct-main-container">
        <div className="sellProduct-wrapper">
          <h1 className="sellProduct-heading">
            Start Selling Your Product Here!
          </h1>

          <div className="product-container">
            {ongoing.length > 0 &&
              ongoing.map((product, key) => {
                return (
                  <div className="product" key={key}>
                    <div
                      className="product-img-1"
                      style={{ backgroundImage: `url(${product.image})` }}
                    ></div>
                    <div className="product-details">
                      <h1>{product.name}</h1>
                      <div className="bid-info">
                        <div className="current-bid">
                          <p>Current Bid</p>
                          <p>{product.currentBid}</p>
                        </div>
                        <div className="highest-bidder">
                          <p>Highest Bider</p>
                          <p>
                            {product.currentBidder
                              ? product.currentBidder.firstName
                              : "None"}
                          </p>
                        </div>
                      </div>
                      <div>
                        <Timer time = {product.AuctionEndTime}/>
                        </div>
                      <div className="sell-btn">
                        <button disabled = {parseInt(product.currentBid) >= parseInt(product.basePrice) ? false : true} onClick={() => handleSell(product)}>
                          Sell
                        </button>
                       
                       
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          <button
            className="add-product-btn"
            onClick={() => {
              setisCrossed(false);
              setisAddProduct(true);
            }}
          >
            Add Product
          </button>
        </div>
      </div>

      {isAddProduct && !isCrossed ? (
        <div className="sell-product-form">
          <div className="cross-btn">
            <div
              className="hamburger"
              onClick={() => {
                setisCrossed(true);
                setisAddProduct(false);
              }}
            >
              <div className="hamburger_lines"></div>
              <div className="hamburger_lines"></div>
            </div>
          </div>
          <SellProductForm
            setisCrossed={setisCrossed}
            setisAddProduct={setisAddProduct}
            setter={setOngoing}
          ></SellProductForm>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default SellProduct;
