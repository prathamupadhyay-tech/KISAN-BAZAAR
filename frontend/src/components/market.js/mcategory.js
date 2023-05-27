import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "../../css/mcategory.css";
import grain from "../../img/g1.jpg";
import veg from "../../img/veg2.jpg";
import fruit from "../../img/fruits.jpg";
import wheat from "../../img/wheat.jpg";
import corn from "../../img/corn.jpg";
import jowar from "../../img/jowar.jpg";
import rice from "../../img/rice.jpg";

import { MDBCard, MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import BuyerNavbar from "../BuyerNavbar";

const CategoryPage = () => {
  return (
    <>
      <BuyerNavbar></BuyerNavbar>

      <div className="marker-main-container">
      <Fragment>
        <h1 className="text-danger fw-bold text-center mb-5">
          Welcome to Market Page
        </h1>
        
        <div className="market">
          <MDBContainer>
            <div className="product-types mb-5">
              <h3 className="text-start ms-10 fw-bold mb-3">
                Browse the highlights
              </h3>
              <MDBRow>
                <MDBCol size="6" sm="3">
                  <MDBCard>
                    <img
                      src={grain}
                      className="img-fluid rounded-circle ms-4"
                      alt=""
                    />
                    <h3 className="py-1 ms-5">Grain</h3>
                  </MDBCard>
                </MDBCol>
                <MDBCol size="6" sm="3">
                  <MDBCard>
                    <img
                      src={veg}
                      className="img-fluid rounded-circle ms-4 py-3"
                      alt=""
                    />
                    <h3 className="py-1 ms-5">Vegetables</h3>
                  </MDBCard>
                </MDBCol>
                <MDBCol size="6" sm="3">
                  <MDBCard>
                    <img
                      src={fruit}
                      className="img-fluid rounded-circle ms-4 py-2"
                      alt=""
                    />
                    <h3 className="py-1 ms-5">Fruits</h3>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </div>

            <section className="grain-section mb-8">
              <div className="category-container">
                <div className="section-header">
                  <div className="thumbnail ms-2">
                    <img src={grain} alt="Grain Image" />
                  </div>
                  <div className="title">
                    <h1 className>Grain</h1>
                    <p className="ms-3 fw-bold">We offer best quality Grain</p>
                  </div>
                </div>
                <div className="row1">
                  <div className="card">
                    {/* <Link> */}
                    <div className="market-item px-2">
                      <div className="item-img">
                        <img className="img-fluid rounded" src={wheat} alt="" />
                        <h3>Wheat</h3>
                      </div>
                    </div>
                    {/* </Link> */}
                  </div>

                  <div className="card">
                    {/* <Link> */}
                    <div className="market-item px-2">
                      <div className="item-img">
                        <img className="img-fluid rounded" src={corn} alt="" />
                        <h3>Corn</h3>
                      </div>
                    </div>
                    {/* </Link> */}
                  </div>

                  <div className="card">
                    {/* <Link> */}
                    <div className="market-item px-2">
                      <div className="item-img">
                        <img className="img-fluid rounded" src={rice} alt="" />
                        <h3>Rice</h3>
                      </div>
                    </div>
                    {/* </Link> */}
                  </div>

                  <div className="card">
                    {/* <Link> */}
                    <div className="market-item px-2">
                      <div className="item-img">
                        <img className="img-fluid rounded" src={jowar} alt="" />
                        <h3>Jowar</h3>
                      </div>
                    </div>
                    {/* </Link> */}
                  </div>
                </div>
              </div>
            </section>

            <section className="vegetables-section mb-8">
              <div className="category-container">
                <div className="section-header">
                  <div className="thumbnail ms-2">
                    <img src={veg} alt="Veg Image" />
                  </div>
                  <div className="title">
                    <h1 className>Vegetables</h1>
                    <p className="ms-3 fw-bold">
                      We offer best quality Vegetables
                    </p>
                  </div>
                </div>
                <div className="row1">
                  <div className="card">
                    {/* <Link> */}
                    <div className="market-item px-2">
                      <div className="item-img">
                        <img className="img-fluid rounded" src={wheat} alt="" />
                        <h3>Wheat</h3>
                      </div>
                    </div>
                    {/* </Link> */}
                  </div>

                  <div className="card">
                    {/* <Link> */}
                    <div className="market-item px-2">
                      <div className="item-img">
                        <img className="img-fluid rounded" src={corn} alt="" />
                        <h3>Corn</h3>
                      </div>
                    </div>
                    {/* </Link> */}
                  </div>

                  <div className="card">
                    {/* <Link> */}
                    <div className="market-item px-2">
                      <div className="item-img">
                        <img className="img-fluid rounded" src={wheat} alt="" />
                        <h3>Rice</h3>
                      </div>
                    </div>
                    {/* </Link> */}
                  </div>

                  <div className="card">
                    {/* <Link> */}
                    <div className="market-item px-2">
                      <div className="item-img">
                        <img className="img-fluid rounded" src={wheat} alt="" />
                        <h3>Jowar</h3>
                      </div>
                    </div>
                    {/* </Link> */}
                  </div>
                </div>
              </div>
            </section>

            <section className="fruits-section mb-8">
              <div className="category-container">
                <div className="section-header">
                  <div className="thumbnail ms-2">
                    <img src={fruit} alt="fruits Image" />
                  </div>
                  <div className="title">
                    <h1 className="">Fruits</h1>
                    <p className="ms-3 fw-bold">We offer best quality Fruits</p>
                  </div>
                </div>
                <div className="row1">
                  <div className="card">
                    {/* <Link> */}
                    <div className="market-item px-2">
                      <div className="item-img">
                        <img className="img-fluid rounded" src={wheat} alt="" />
                        <h3>Wheat</h3>
                      </div>
                    </div>
                    {/* </Link> */}
                  </div>

                  <div className="card">
                    {/* <Link> */}
                    <div className="market-item px-2">
                      <div className="item-img">
                        <img className="img-fluid rounded" src={corn} alt="" />
                        <h3>Corn</h3>
                      </div>
                    </div>
                    {/* </Link> */}
                  </div>

                  <div className="card">
                    {/* <Link> */}
                    <div className="market-item px-2">
                      <div className="item-img">
                        <img className="img-fluid rounded" src={wheat} alt="" />
                        <h3>Rice</h3>
                      </div>
                    </div>
                    {/* </Link> */}
                  </div>

                  <div className="card">
                    {/* <Link> */}
                    <div className="market-item px-2">
                      <div className="item-img">
                        <img className="img-fluid rounded" src={wheat} alt="" />
                        <h3>Jowar</h3>
                      </div>
                    </div>
                    {/* </Link> */}
                  </div>
                </div>
              </div>
            </section>
          </MDBContainer>
        </div>
      </Fragment>
      </div>
      
    </>
  );
};

export default CategoryPage;
