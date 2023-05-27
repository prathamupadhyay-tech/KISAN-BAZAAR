import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { customInstance } from "../helpers/axios";
const PrevAuction = () => {
  const [ongoing, setOngoing] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const func = async () => {
      const axios = customInstance();
      const data = await axios.get("/seller/inactiveProducts");
      setOngoing([...data.data]);
    };
    func();
  }, []);
  useEffect(() => {
    setLoading(false);
  }, [ongoing]);
  if (loading) return <h1>Loading...</h1>;

  return (
    <>
      <div className="sellProduct-main-container">
        <div className="sellProduct-wrapper">
          <h1 className="sellProduct-heading">Sold Products From You.</h1>

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
                          <p>Buyer Name</p>
                          <p>
                            {
                              product.currentBidder ? product.currentBidder.firstName : "WrongData"
                              }
                          </p>
                        </div>
                        <div className="highest-bidder">
                          <p>Sold At</p>
                          <p>{product.currentBid}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default PrevAuction;
