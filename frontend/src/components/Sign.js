import React from "react";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { useState } from "react";
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
  MDBRadio,
  MDBCheckbox,
} from "mdb-react-ui-kit";

const options = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujurat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerela",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "NCT of Delhi",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttarakhand",
  "Uttar Pradesh",
  "West Bengal",
];

function Sign({ setisSignin, setisSignup, setcrossClicked }) {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    state: "",
    password: "",
  });
  const [query, setQuery] = useState("Buyer");

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFormErrors(validate(userInfo));
  };

  React.useEffect(() => {
    const funct = async () => {
      if (
        !formErrors.firstName &&
        !formErrors.lastName &&
        !formErrors.password &&
        !formErrors.email
      ) {
        try {
          const axios = customInstance();
          const payload = await axios.post(`/${query}/signup`, userInfo);
          localStorage.setItem("token", payload.data.token);
          localStorage.setItem("user", JSON.stringify(payload.data.user));
          if (query === "Buyer") {
            localStorage.setItem("userType", "Buyer");
            console.log("click");
            setcrossClicked(true);
            setisSignup(false);
          } else {
            localStorage.setItem("userType", "Seller");
            navigate("/seller/profile");
          }
        } catch (err) {
          if (err.response.data.message === "User Already Exists")
            alert("User Already Exists");

          // alert("Something Went Wrong");
        }
      }

      // alert(formErrors);
      setUserInfo({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        state: "",
        password: "",
      });
    };
    funct();
  }, [formErrors]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   setFormErrors(validate(userInfo));
  //   if (
  //     !formErrors.firstName &&
  //     !formErrors.lastName &&
  //     !formErrors.email &&
  //     !formErrors.password
  //   ) {
  //     try {
  //       const axios = customInstance();
  //       const payload = await axios.post(`/${query}/signup`, userInfo);
  //       localStorage.setItem("token", payload.data.token);
  //       localStorage.setItem("user", JSON.stringify(payload.data.user));
  //       if (query === "Buyer") {
  //         localStorage.setItem("userType", "Buyer");
  //         console.log("click");
  //         setcrossClicked(true);
  //         setisSignup(false);
  //       } else {
  //         localStorage.setItem("userType", "Seller");
  //         navigate("/seller/profile");
  //       }
  //     } catch {
  //       console.log("heyyy");
  //       alert("Something Went Wrong");
  //     }
  //   }

  //   // alert(formErrors);
  //   setUserInfo({
  //     firstName: "",
  //     lastName: "",
  //     email: "",
  //     address: "",
  //     state: "",
  //     password: "",
  //   });
  // };

  const handleChange = (e) => {
    setUserInfo((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const validate = (values) => {
    const errors = {};
    const regex =
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (values.firstName.length < 3) {
      errors.firstName = "First Name must have atleast 3 character.";
    }
    if (values.lastName.length < 3) {
      errors.lastName = "Last Name must have atleast 3 character.";
    }
    if (values.password.length < 7) {
      errors.password = "Password must have atleast 6 character.";
    } else if (values.password.length > 16) {
      errors.password = "Password can not have more than 16 character.";
    }
    if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format";
    }
    return errors;
  };

  return (
    <MDBContainer fluid>
      <form onSubmit={handleSubmit}>
        <MDBRow className="d-flex justify-content-center align-items-center h-100">
          <MDBCard
            className="bg-white my-5 mx-auto"
            style={{ borderRadius: "1rem", maxWidth: "600px" }}
          >
            <MDBCardBody className="px-5 py-4 w-100 d-flex flex-column h-90">
              <h2
                className="fw-bold mb-4 text-center"
                style={{
                  color: "dodgerblue",
                  fontFamily: "system-ui",
                  fontSize: "40px",
                }}
              >
                Sign Up
              </h2>

              <MDBCol md="6" className="mb-3">
                <h6 className="fw-bold">I am: </h6>
                <MDBRadio
                  required
                  name="inlineRadio"
                  id="inlineRadio1"
                  value="Buyer"
                  label="Buyer"
                  onClick={() => setQuery("Buyer")}
                  inline
                />
                <MDBRadio
                  name="inlineRadio"
                  id="inlineRadio2"
                  value="Seller"
                  label="Seller"
                  onClick={() => setQuery("Seller")}
                  inline
                />
              </MDBCol>

              <MDBRow>
                <MDBCol md="6">
                  <MDBInput
                    wrapperClass="mb-3"
                    required
                    label="First Name"
                    size="lg"
                    id="form1"
                    type="text"
                    name="firstName"
                    value={userInfo.firstName}
                    onChange={handleChange}
                  />
                  <p
                    className="mb-1"
                    style={{ color: "red", fontSize: "13px" }}
                  >
                    {formErrors.firstName}
                  </p>
                </MDBCol>

                <MDBCol md="6">
                  <MDBInput
                    wrapperClass="mb-3"
                    required
                    label="Last Name"
                    size="lg"
                    id="form2"
                    type="text"
                    name="lastName"
                    value={userInfo.lastName}
                    onChange={handleChange}
                  />
                  <p
                    className="mb-1"
                    style={{ color: "red", fontSize: "13px" }}
                  >
                    {formErrors.lastName}
                  </p>
                </MDBCol>
              </MDBRow>

              <MDBInput
                wrapperClass="mb-3 w-100"
                required
                label="Email address"
                id="formControlLg"
                type="email"
                size="lg"
                name="email"
                value={userInfo.email}
                onChange={handleChange}
              />
              <p className="mb-1" style={{ color: "red", fontSize: "13px" }}>
                {formErrors.email}
              </p>
              <MDBInput
                wrapperClass="mb-3 w-100"
                required
                label="Password"
                id="formControlLg"
                type="password"
                size="lg"
                name="password"
                value={userInfo.password}
                onChange={handleChange}
              />
              <p className="mb-1" style={{ color: "red", fontSize: "13px" }}>
                {formErrors.password}
              </p>
              <MDBInput
                wrapperClass="mb-3"
                required
                label="Address"
                size="lg"
                id="form1"
                type="text"
                name="address"
                value={userInfo.address}
                onChange={handleChange}
              />

              <MDBCol>
                <div className="fw-normal text-start me-2">
                  Select Region:
                  {/* <h6 className='fw-normal text-start me-2' >Select your region</h6> */}
                  <select
                    className="mb-1 py-2 px-4 ms-3 square border border-grey"
                    value={userInfo.state}
                    name="state"
                    onChange={handleChange}
                  >
                    <option disabled={true} value="">
                      Select State
                    </option>
                    {options.map((value, index) => (
                      <option value={value} key={index}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
              </MDBCol>

              {/* <MDBRow>
                <h6>Select your region</h6>
                <select
                  value={selected}
                  onChange={(e) => setSelected(e.target.value)}
                >
                  {options.map((value) => (
                    <option value={value} key={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </MDBRow> */}

              <div className="mb-4 my-3">
                <MDBCheckbox
                  name="flexCheck"
                  required
                  value=""
                  id="flexCheckDefault"
                  label="I Agree all terms and condition"
                />
              </div>

              <MDBBtn size="lg" type="submit">
                Submit
              </MDBBtn>

              <div>
                <hr />
                <p className="mb-0 text-center">
                  Already have an account?{" "}
                  <a
                    class="text-dark-50 fw-bold "
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setisSignin(true);
                      setisSignup(false);
                      setcrossClicked(false);
                      // alert("Welcome to Login");
                    }}
                  >
                    Login
                  </a>
                </p>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBRow>
      </form>
    </MDBContainer>
  );
}

export default Sign;
