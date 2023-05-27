import React from "react";
import wheat from "../img/wheat.jpg";
import { useState , useEffect } from "react";
import "../css/BuyerCart.css";
import ReactStars from "react-rating-stars-component";
import { customInstance } from "../helpers/axios";
import axios from "axios";
import BuyerNavbar from "./BuyerNavbar";
const BuyerCart = () => {


  const [rating , setRating] = useState(0);
  const [allProducts , setAllProducts] = useState([]);
  const [loading , setLoading] = useState(true);
  const ratingChanged = (newRating) => {
      setRating(newRating);
    
  }
  const rateIt = async (product) => {
    const axios = customInstance();
    setLoading(true);
    const rate = await axios.post("/buyer/rateIt",{product , rating})

    const rem = allProducts.filter((p) => product._id !== p._id);
    // console.log(rem);
    setAllProducts(rem);
  }
  useEffect(() => {
    const axios = customInstance();
    setLoading(true);
    const func = async ()=>{
      try{
        const cart = await axios.get(`/buyer/cart`);
        setAllProducts(cart.data.allProducts);
      }
      catch(err){
        console.log(err)
      }
    }
    func();
  },[])
  useEffect(() => {
    setLoading(false);
    // console.log(allProducts);
  },[allProducts]);
  if(loading) <h1>Loading...</h1>
  return (
    <>
    <BuyerNavbar></BuyerNavbar>
    
      <div className="buyercart-main-container">
     
        <div className="sellProduct-wrapper">
          <div className="BuyerCart-heading">
            <h1>
              <span>Your </span>Cart
            </h1>
            <p>Keep Track of the products you have bought from our website</p>
          </div>

          <div className="product-container">
          {
            allProducts && allProducts.length > 0 && allProducts.map((product , key) => {

              return (
                <div className="product" key = {key}>
          <div
              className="product-img-1"
              style={{ backgroundImage: `url(${product.image})` }}
            ></div>
            <div className="product-details">
              <h1>{product.name}</h1>
              <div className="bid-info">
                <div className="current-bid">
                  <p>Bought At</p>
                  <p>{product.currentBid}</p>
                </div>
                <div className="highest-bidder">
                  <p>Seller</p>
                  <p>{product.owner.firstName}</p>
                </div>
              </div>
              <div className="sell-btn">
                <ReactStars
                  count={5}
                  onChange={ratingChanged}
                  value={rating}
                  size={24}
                  emptyIcon={<i className="far fa-star"></i>}
                  fullIcon={<i className="fa fa-star"></i>}
                  activeColor="#ffd700"
                />
                
              </div>
              <button onClick = {() => rateIt(product)} style ={{width : "200px"}}>Rate!</button>
            </div>
            
            </div>
              )
            })
          }
            

            
          </div>

          {/*           
      <div className="product">
          <div className="product-img"></div>
          <div className="product-main-details">
          <div className="product-name">
              <h1>Wheat</h1>
          </div>
          <div className="product-bid-details">

              <div>
                  <p>Current bid</p>
                  <p>$200.00</p>
              </div>
              <div className="seperator"></div>
              <div>
                  <p>Highest bidder</p>
                  <p>Name</p>
              </div>
          </div>
          <div className="sell-btn-div">
              <button >Sell Product</button>

          </div>
          </div>
        
   
      
    </div> */}
        </div>
      </div>
    </>
  );
};

export default BuyerCart;
