import React, { useState, useEffect } from "react";
import { redirect, Link } from "react-router-dom";
import styled from "styled-components";
import { FormRow } from "../components";
import { useUserContext } from "../context/user_context";
import { validateInput } from "../utils/validators";

const RegisterPage = () => {
  const { showAlert, register, registerSuccess } = useUserContext();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
  });

  // Mark the field as touched when the field is blurred
  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  // Validation
  // The function will dynamically combine all the input value with the useState value
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });

    // Mark the field as touched when the user starts typing
    if (!touched[e.target.name]) {
      setTouched({ ...touched, [e.target.name]: true });
    }
  };

  const getValidationFeedback = (name) => {
    if (touched[name]) {
      const validationMessage = validateInput(name, values[name]);
      return validationMessage ? <span>{validationMessage}</span> : null;
    }
    return null;
  };

  const isFormValid = () => {
    return (
      !validateInput("name", values.name) &&
      !validateInput("email", values.email) &&
      !validateInput("password", values.password)
    );
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (isFormValid()) {
      console.log("submit");
      register(values);
    }
  };

  return (
    <Wrapper className="page full-page">
      <div className="container">
        {showAlert && (
          <div className="alert alert-danger">
            there was an error, please try again
          </div>
        )}
        <form className="form" onSubmit={onSubmit}>
          <h4>Register</h4>
          <FormRow
            type="name"
            name="name"
            value={values.name}
            placeholder="Enter your username here"
            handleChange={handleChange}
            handleBlur={handleBlur}
          />
          <p className="error_info">{getValidationFeedback("name")}</p>

          <FormRow
            type="email"
            name="email"
            value={values.email}
            placeholder="Enter your email address"
            handleChange={handleChange}
            handleBlur={handleBlur}
          />
          <p className="error_info">{getValidationFeedback("email")}</p>

          <FormRow
            type="password"
            name="password"
            value={values.password}
            placeholder="Enter your password here"
            handleChange={handleChange}
            handleBlur={handleBlur}
          />
          <p className="error_info">{getValidationFeedback("password")}</p>

          {/* end of single form row */}

          <button
            type="submit"
            className="btn btn-block"
            disabled={!isFormValid()}
          >
            Submit
          </button>
          <p>
            "Already a member?"
            <button type="button" className="member-btn">
              <Link to="/register">Register</Link>
            </button>
          </p>
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh; /* Make the page full height */
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  .page {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
  }
  .full-page {
    min-height: 100vh;
  }
  .form {
    max-width: 400;
    border-top: 5px solid var(--primary-500);
  }

  .container {
    background: #fff; /* Light background for the form */
    padding: 2rem;
    border-radius: 8px; /* Rounded corners for the form */
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1); /* A subtle shadow */
    width: 100%;
    max-width: 400px; /* Maximum width of the form */
  }
  .error_info {
    color: red;
    text-align: left;
    font-size: 10px;
  }
  h4 {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .btn {
    margin-top: 1rem;
  }
  .btn-block {
    width: 100%;
  }

  .btn.btn-block:disabled {
    background-color: #cccccc; /* Grayed out */
    color: #666666; /* Darker text color for contrast */
    cursor: not-allowed; /* Cursor to indicate disabled state */
  }
  .member-btn {
    padding: 5px;
    background: transparent;
    border: transparent;
    color: var(--primary-500);
    cursor: pointer;
  }
`;

export default RegisterPage;
