import React, { Fragment, useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "../../css/market.css";

import { useParams } from "react-router-dom";
import { customInstance } from "../../helpers/axios";
import BuyerNavbar from "../BuyerNavbar";
import Timer from "../Timer.js";
import { MDBContainer, MDBBtn } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";

const Market = ({ socket }) => {
  const { category } = useParams();
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const axios = customInstance();
    const func = async () => {
      try {
        const activeProducts = await axios.get(
          `/buyer/activeProducts/${category}`
        );
        setAllProducts(activeProducts);
      } catch (err) {
        console.log(err);
      }
    };

    func();
  }, []);
  useEffect(() => {
    setLoading(false);
  }, [allProducts]);
  socket.off("productSold").on("productSold", (product) => {
    if (
      product.name === category &&
      allProducts.data &&
      allProducts.data.allProducts &&
      allProducts.data.allProducts.length > 0
    ) {
      setLoading(true);
      let remov = allProducts.data.allProducts.map((p) => {
        if (p._id === product._id) {
          p.bidEnded = true;
        }
        return p;
      });
      setAllProducts({ data: { allProducts: remov } });
    }
  });
  useEffect(() => {
    let temp;
    if (
      allProducts.data &&
      allProducts.data.allProducts &&
      allProducts.data.allProducts.length > 0
    ) {
      setLoading(true);
      temp = allProducts.data.allProducts;
      setAllProducts(() =>
        temp.sort((a, b) => {
          if (filter === "price") {
            return (
              parseInt(a.currentBid) / parseInt(a.quantity) -
              parseInt(b.currentBid) / parseInt(b.quantity)
            );
          } else {
            return parseInt(b.owner.rating) - parseInt(a.owner.rating);
          }
        })
      );
    }
    setAllProducts({ data: { allProducts: temp } });
  }, [filter]);
  if (loading) return <h1>Loading...</h1>;
  return (
    <>
      <BuyerNavbar></BuyerNavbar>

      <div className="market-main-container">
        <h1 className="text-danger fw-bold text-center mb-5 market-heading">
          <span> {category}</span> Market
        </h1>

        <div className="select-option-market-div">
          <p>Chose According to your Choice</p>
          <select
            className="select-option-market"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option disabled={true} value="">
              Select Filter
            </option>
            <option value="price">Price</option>

            <option value="rating">Rating</option>
          </select>
        </div>

        <Fragment>
          <div className="market">
            <MDBContainer>
              <section id="wheat" className="wheat-section mb-8">
                <div className="m-container">
                  <div className="section-header">
                    <div className="thumbnail ms-2">
                      <img
                        src="https://i.pinimg.com/736x/52/1a/f9/521af9cd92d33e0cf4afffdd091d591e.jpg"
                        alt="Wheat Image"
                      />
                    </div>
                    <div className="title">
                      <h1>{category}</h1>
                    </div>
                  </div>
                  {/* <div className="row1"> */}
                  <div className="row1">
                    {allProducts.data &&
                      allProducts.data.allProducts &&
                      allProducts.data.allProducts.length > 0 &&
                      allProducts.data.allProducts.map((product, key) => (
                        <div className="card mb-3" key={key}>
                          <div className="market-item px-2">
                            <div className="item-img">
                              <img src={product.image} alt="" />
                              <div className="rating d-flex ms-1">
                                <ReactStars
                                  count={5}
                                  size={24}
                                  edit={false}
                                  value={parseInt(product.owner.rating)}
                                  emptyIcon={<i className="far fa-star"></i>}
                                  fullIcon={<i className="fa fa-star"></i>}
                                  activeColor="#ffd700"
                                />
                              </div>
                            </div>
                            <div className="item-content">
                              <h6 className="title fw-bold">
                                Seller -{" "}
                                {product.owner.firstName +
                                  product.owner.lastName}
                              </h6>
                              <div className="bid-area">
                                <div
                                  className="Amt"
                                  style={{ color: "limegreen" }}
                                >
                                  <div className="current">Quantity</div>
                                  <div className="amt">{product.quantity}</div>
                                </div>
                                <div style={{ color: "red" }}>
                                  <div className="buy">
                                    {product.bidEnded ? "Sorry" : "Hurry Up"}
                                  </div>
                                  <div className="buy">
                                    {product.bidEnded ? "Sold" : "And Buy"}
                                  </div>
                                </div>
                              </div>
                              <div className="countdown d-flex my-2">
                                <div className="timer">
                                  <Timer time={product.AuctionEndTime} />
                                </div>
                                <div className="total-bit">
                                  Current Bid:{" "}
                                  {product.currentBid
                                    ? product.currentBid
                                    : "0"}{" "}
                                </div>
                              </div>
                              <MDBBtn
                                disabled={product.bidEnded ? true : false}
                                onClick={() =>
                                  navigate(
                                    `/buyer/market/product/${product._id}`
                                  )
                                }
                                style={{ margin: "8px 100px" }}
                              >
                                Submit A Bid
                              </MDBBtn>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                {/* </div> */}
              </section>
            </MDBContainer>
          </div>
        </Fragment>
      </div>
    </>
  );
};

export default Market;
