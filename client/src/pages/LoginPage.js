import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { FormRow } from "../components";
import { useUserContext } from "../context/user_context";
import { validateInput } from "../utils/validators";

const LoginPage = () => {
  const navigate = useNavigate();
  const { showAlert, login } = useUserContext();
  const initialFormValues = {
    email: "",
    password: "",
  };
  const [values, setValues] = useState(initialFormValues);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("User is logged in, redirecting to home");
      navigate("/");
    }
  }, []);

  // CHECK: if is a user already, we redirect the user to the profile page

  // Helper function for logging in
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  // Frontend validation
  const isFormValid = () => {
    return (
      !validateInput("email", values.email) &&
      !validateInput("password", values.password)
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (isFormValid()) {
      login(values);
    }
  };

  // We will redirect the user if it is already logged in
  return (
    <Wrapper className="page full-page">
      <div className="container">
        {showAlert && (
          <div className="alert alert-danger">
            there was an error, please try again
          </div>
        )}
        <form className="form" onSubmit={onSubmit}>
          <h4>Login</h4>
          <FormRow
            type="email"
            name="email"
            value={values.email}
            placeholder="Enter your email address"
            handleChange={handleChange}
          />

          <FormRow
            type="password"
            name="password"
            value={values.password}
            placeholder="Enter your password here"
            handleChange={handleChange}
          />

          {/* end of single form row */}

          <button
            type="submit"
            className="btn btn-block"
            disabled={!isFormValid()}
          >
            Submit
          </button>
          <p>
            Not a member yet?
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

export default LoginPage;
