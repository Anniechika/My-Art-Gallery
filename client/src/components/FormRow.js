import React from "react";
import styled from "styled-components";

const FormRow = ({
  type,
  name,
  value,
  handleChange,
  handleBlur,
  horizontal,
  placeholder,
}) => {
  return (
    <Wrapper>
      <div className="form-row">
        {!horizontal && (
          <label htmlFor={name} className="form-label">
            {name}
          </label>
        )}
        <input
          type={type}
          value={value}
          name={name}
          onChange={handleChange}
          onBlur={handleBlur}
          className="form-input"
          placeholder={placeholder}
        />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .form-row {
    margin-bottom: 1rem;
  }

  .form-label {
    display: block;
    font-size: 0.7rem;
    margin-bottom: 0.5rem;
    text-transform: capitalize;
    letter-spacing: 1px;
  }

  .form-input,
  .form-textarea {
    width: 100%;
    padding: 0.375rem 0.75rem;
    border-radius: 0.25rem;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
  }
`;
export default FormRow;
