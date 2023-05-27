import React from "react";
import { useState, useEffect } from "react";
// import { enableRipple } from '@syncfusion/ej2-base';
// import the timepicker
// import { TimePickerComponent } from '@syncfusion/ej2-react-calendars';
import "mdb-react-ui-kit/dist/css/mdb.min.css";
// enableRipple(true);
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBTextArea,
  MDBFile,
} from "mdb-react-ui-kit";
import { customInstance } from "../helpers/axios";
const grains = ["Wheat", "Jowar", "Rice", "Corn"];
const vegetables = ["Potato", "Tomato", "Carrot", "Peas"];
const fruits = ["Banana", "Apple", "Orange", "kiwi"];

function SellProductForm({ setter, setisCrossed, setisAddProduct }) {
  const [productInfo, setProductInfo] = useState({
    name: "",
    quantity: "",
    basePrice: "",
    description: "",
    image: "",
    category: "",
    numberOfDaysToAdd: "",
  });

  const handleSubmit = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    const {
      name,
      quantity,
      image,
      description,
      basePrice,
      category,
      numberOfDaysToAdd,
    } = productInfo;
    if (
      !name ||
      !quantity ||
      !description ||
      !basePrice ||
      !category ||
      category.size === 0
    )
      return alert("Please Enter Valid Details");
    try {
      const axios = customInstance();
      const form = new FormData();
      const AuctionStartTime = new Date();

      const AuctionEndTime = new Date(
        AuctionStartTime.setDate(
          new Date().getDate() +
            parseInt(numberOfDaysToAdd ? numberOfDaysToAdd : 1)
        )
      );
      form.append("name", name);
      form.append("quantity", quantity);
      form.append("image", image);
      form.append("category", category);
      form.append("description", description);
      form.append("basePrice", basePrice);
      form.append("AuctionEndTime", AuctionEndTime);
      const add = await axios.post("/seller/addProduct", form);

      setter((prev) => {
        return [...prev, add.data.newProduct];
      });
    } catch {
      return alert("Sorry Something Went Wrong");
    }
    alert("Product Added Success");
    setProductInfo({
      name: "",
      quantity: "",
      basePrice: "",
      description: "",
      image: "",
      category: "",
      numberOfDaysToAdd: "",
    });
    setisCrossed(true);
    setisAddProduct(true);
  };
  const handleChange = (e) => {
    setProductInfo((prev) => {
      if (e.target.name === "image") {
        return { ...prev, [e.target.name]: e.target.files[0] };
      } else return { ...prev, [e.target.name]: e.target.value };
    });
  };
  return (
    <MDBContainer fluid>
      <MDBRow className="d-flex justify-content-center">
        <MDBCol lg="9" className="px-4">
          <MDBCard style={{ borderRadius: "1rem", maxWidth: "100%" }}>
            <h1
              className="fw-bold mb-4 mt-4 text-center"
              style={{
                color: "dodgerblue",
                fontFamily: "system-ui",
                fontSize: "40px",
              }}
            >
              Add Product
            </h1>
            <form onSubmit={handleSubmit}>
              <MDBRow className="align-items-center ms-3 pt-4 pb-3">
                <MDBCol md="3" className="ps-5">
                  <h6 className="mb-0">Category name</h6>
                </MDBCol>

                <MDBCol md="5" className="pe-5">
                  <select
                    value={productInfo.category}
                    onChange={handleChange}
                    name="category"
                    className="mb-1 py-2 px-4  square border border-grey"
                  >
                    <option value="">Please Select a value</option>
                    <option value="Vegetables">Vegetables</option>
                    <option value="Grains">Grains</option>
                    <option value="Fruits">Fruits</option>
                  </select>
                </MDBCol>
              </MDBRow>

              <hr className="mx-n3" />
              <MDBRow className="align-items-center ms-3 pt-4 pb-3">
                <MDBCol md="3" className="ps-5">
                  <h6 className="mb-0">Product name</h6>
                </MDBCol>

                <MDBCol md="5" className="pe-5">
                  <select
                    value={productInfo.name}
                    onChange={handleChange}
                    name="name"
                    className="mb-1 py-2 px-4  square border border-grey"
                  >
                    <option value="">Please Select a value</option>
                    {productInfo.category === "Vegetables" &&
                      vegetables.map((vegetable, index) => (
                        <option key={index} value={vegetable}>
                          {vegetable}
                        </option>
                      ))}
                    {productInfo.category === "Grains" &&
                      grains.map((grain, index) => (
                        <option key={index} value={grain}>
                          {grain}
                        </option>
                      ))}
                    {productInfo.category === "Fruits" &&
                      fruits.map((fruit, index) => (
                        <option key={index} value={fruit}>
                          {fruit}
                        </option>
                      ))}
                  </select>
                </MDBCol>
              </MDBRow>
              <MDBCardBody className="px-4">
                <hr className="mx-n3" />
                <MDBRow className="align-items-center pt-4 pb-3">
                  <MDBCol md="3" className="ps-5">
                    <h6 className="mb-0">Base Price(in Rs.)</h6>
                  </MDBCol>

                  <MDBCol md="5" className="pe-5">
                    <MDBInput
                      name="basePrice"
                      value={productInfo.basePrice}
                      onChange={handleChange}
                      label="Base Price"
                      id="typeNumber"
                      type="number"
                    />
                  </MDBCol>
                </MDBRow>

                <hr className="mx-n3" />
                <MDBRow className="align-items-center pt-4 pb-3">
                  <MDBCol md="3" className="ps-5">
                    <h6 className="mb-0">Quantity(in Kg)</h6>
                  </MDBCol>

                  <MDBCol md="5" className="pe-5">
                    <MDBInput
                      name="quantity"
                      value={productInfo.quantity}
                      onChange={handleChange}
                      label="Quantity"
                      id="typeNumber"
                      type="number"
                    />
                  </MDBCol>
                </MDBRow>

                <hr className="mx-n3" />
                <MDBRow className="align-items-center pt-4 pb-3">
                  <MDBCol md="3" className="ps-5">
                    <h6 className="mb-0">How Many Days The Auction Will Run</h6>
                  </MDBCol>

                  <MDBCol md="5" className="pe-5">
                    <select
                      className="mb-1 py-2 px-4 ms-3 square border border-grey"
                      name="numberOfDaysToAdd"
                      value={productInfo.numberOfDaysToAdd}
                      onChange={handleChange}
                    >
                      <option value="">Please Select</option>
                      <option value={1}> 1 </option>
                      <option value={2}> 2 </option>
                      <option value={3}> 3 </option>
                      <option value={4}> 4 </option>
                      <option value={5}> 5 </option>
                    </select>
                  </MDBCol>
                </MDBRow>

                <hr className="mx-n3" />
                {/* <MDBRow className="align-items-center pt-4 pb-3">
                  <MDBCol md="3" className="ps-5">
                    <h6 className="mb-0">Date(in Kg)</h6>
                  </MDBCol>

                  <MDBCol md="5" className="pe-5">
                    <MDBInput
                    data-mdb-inline="true"
                    type = "date"
                    onChange = {handleDate}
                      // name="quantity"
                      // value={productInfo.quantity}
                      // onChange={handleChange}
                      // label="Quantity"
                      // id="typeNumber"
                      // type="number"
                    />
                  </MDBCol>
                </MDBRow>

                <hr className="mx-n3" /> */}

                <MDBRow className="align-items-center pt-4 pb-3">
                  <MDBCol md="3" className="ps-5">
                    <h6 className="mb-0">Product Description</h6>
                  </MDBCol>

                  <MDBCol md="9" className="pe-5">
                    <MDBTextArea
                      name="description"
                      value={productInfo.description}
                      onChange={handleChange}
                      label="Description"
                      id="textAreaExample"
                      rows={3}
                    />
                  </MDBCol>
                </MDBRow>

                <hr className="mx-n3" />

                <MDBRow className="align-items-center pt-4 pb-3">
                  <MDBCol md="3" className="ps-5">
                    <h6 className="mb-0">Upload Product Image</h6>
                  </MDBCol>

                  <MDBCol md="9" className="pe-5">
                    <MDBFile
                      name="image"
                      onChange={handleChange}
                      size="lg"
                      id="customFile"
                    />
                    <div className="small text-muted mt-2">
                      Upload your Product Image. Max file size 50 MB
                    </div>
                  </MDBCol>
                </MDBRow>

                <hr className="mx-n3" />

                <MDBBtn type="submit" className="my-4" size="lg">
                  ADD
                </MDBBtn>
              </MDBCardBody>
            </form>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default SellProductForm;
