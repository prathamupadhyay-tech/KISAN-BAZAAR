import React from "react";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { useState } from "react";
import "../css/Login2.css";
import { customInstance } from "../helpers/axios";
import { useNavigate } from "react-router-dom";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBCheckbox,
  MDBRadio,
} from "mdb-react-ui-kit";

function Login2({ setisSignin, setisSignup, setcrossClicked }) {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [query, setQuery] = useState("Buyer");
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const axios = customInstance();
      console.log(query);
      const payload = await axios.post(`/${query}/signin`, userInfo);
      localStorage.setItem("token", payload.data.token);
      localStorage.setItem("user", JSON.stringify(payload.data.user));
      if (query === "Buyer") {
        localStorage.setItem("userType", "Buyer");
        setcrossClicked(true);
        setisSignin(false);
      } else {
        localStorage.setItem("userType", "Seller");
        navigate("/seller/profile");
      }
    } catch {
      alert("Something Went Wrong");
    }
    setUserInfo({
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      state: "",
      password: "",
    });
  };
  const handleChange = (e) => {
    setUserInfo((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  return (
    <MDBContainer fluid>
      <form onSubmit={handleSubmit}>
        <MDBRow className="d-flex justify-content-center align-items-center h-100">
          <MDBCol col="12">
            <MDBCard
              className="bg-white my-5 mx-auto"
              style={{ borderRadius: "1rem", maxWidth: "500px" }}
            >
              <MDBCardBody className="p-5 w-100 d-flex flex-column">
                <h2 className="fw-bold mb-4 text-center" 
                style={{color: 'dodgerblue', fontFamily: "system-ui", fontSize: '40px'}} >Login</h2>

                <MDBInput
                  wrapperClass="mb-4 w-100"
                  required
                  label="Email address"
                  id="formControlLg"
                  type="email"
                  size="lg"
                  name="email"
                  value={userInfo.email}
                  onChange={handleChange}
                />
                <MDBInput
                  wrapperClass="mb-4 w-100"
                  required
                  label="Password"
                  id="formControlLg"
                  type="password"
                  size="lg"
                  name="password"
                  value={userInfo.password}
                  onChange={handleChange}
                />
                <MDBCol md="6" className="mb-4">
                  <h6 className="fw-bold">I am: </h6>
                  <MDBRadio
                    name="inlineRadio"
                    id="inlineRadio1"
                    value="Buyer"
                    label="Buyer"
                    onClick={(e) => setQuery(e.target.value)}
                    inline
                  />
                  <MDBRadio
                    name="inlineRadio"
                    id="inlineRadio2"
                    value="Seller"
                    label="Seller"
                    onClick={(e) => setQuery(e.target.value)}
                    inline
                  />
                </MDBCol>

                {/* <MDBCheckbox name='flexCheck' id='flexCheckDefault' className='mb-4' label='Remember password' /> */}
                {/* <p className="small mb-3 pb-lg-2">
                  <a class="text-dark-50" href="#!">
                    Forgot password?
                  </a>
                </p> */}

                <MDBBtn size="lg">Login</MDBBtn>

                <div>
                  <hr />
                  <p className="mb-0 text-center">
                    Don't have an account?{" "}
                    <a
                      class="text-dark-50 fw-bold"
                      style={{cursor: 'pointer'}}
                      onClick={() => {
                        setisSignin(false);
                        setisSignup(true);
                        setcrossClicked(false);
                        alert("Welcome to Sign Up");
                      }}
                    >
                      Sign Up
                    </a>
                  </p>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </form>
    </MDBContainer>
  );
}

export default Login2;
