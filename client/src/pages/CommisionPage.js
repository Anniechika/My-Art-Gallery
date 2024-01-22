import React from "react";
import styled from "styled-components";
import { CommissionForm } from "../components";

const CommisionPage = () => {
  return (
    <Wrapper>
      <h2 className="title">Request Commision to artist!</h2>
      <CommissionForm />
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .title {
    padding: 15px;
    margin: 10 10;
    text-align: center;
  }
`;
export default CommisionPage;
