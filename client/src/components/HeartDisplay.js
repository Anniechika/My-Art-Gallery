import React from "react";
import styled from "styled-components";
import HollowHeart from "../assets/Icons/HollowHeart";

const HeartDisplay = ({ likes }) => {
  return (
    <Wrapper>
      <div className="author-display">
        <div className="author-details">
          <HollowHeart />
          <p className="author-name">{likes}</p>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 16px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 16px;

  .author-avatar {
    width: 80px;
    height: 80px;
    border-radius: 40px;
    margin-right: 16px;
  }

  .author-name {
    font-weight: bold;
    margin: 0;
  }

  .author-info {
    margin: 0;
  }
`;
export default HeartDisplay;
