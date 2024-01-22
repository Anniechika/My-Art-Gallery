// Component for rendering single art
import React from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Art = ({ artwork, onArtClick, isModalOpen }) => {
  const cardClass = isModalOpen
    ? "card-container card-border no-hover"
    : "card-container card-border";

  return (
    <Wrapper onClick={() => onArtClick(artwork)}>
      <div id="cardContainer" className={cardClass}>
        <div className="card-image-container">
          <img
            id="cardImage"
            className="card-image"
            alt={artwork.Title}
            src={artwork.Poster}
          />
        </div>
        <div className="overlay">
          <div id="cardTitleContainer" className="items card-title-container">
            <p id="cardTitle">{artwork.Title}</p>
            <hr />
          </div>
          {/* <div id="cardDateContainer" className="items card-date-container">
            <p id="cardDate">{artwork.Year}</p>
          </div> */}
        </div>
      </div>
    </Wrapper>
  );
};

//     <img src={artwork.Poster} alt={artwork.Title} className="card-image" />
//   </div>
//   <div className="overlay">
//     <div className="items card-title-container">
//       <p>{artwork.Title}</p>
//       <hr />
//     </div>
//     <div className="items card-date-container">
//       <p>{artwork.Year}</p>
//     </div>

const Wrapper = styled.div`
  animation: ${fadeIn} 0.5s ease-out;
  .card-image-container {
    position: relative;
  }

  .card-container {
    margin: 0 0 1.5em;
    overflow: hidden;
    position: relative;
    max-height: 100%;
    display: inline-block;
    font-weight: 600;
  }

  .card-border {
    border-width: 1px;
    border-color: rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    border-style: solid;
  }

  .card-container.no-hover .overlay {
    opacity: 0; /* Reset to default or whatever it should be when modal is not open */
    pointer-events: all; /* This should not affect visibility */
    /* Ensure the overlay doesn't cover the image */
    z-index: -1;
  }

  .card-container.no-hover .card-image {
    z-index: 1; /* Make sure image is above the overlay */
  }

  .card-image {
    max-width: 100%;
    max-height: 100%;
    display: table-row;
    z-index: 0;
  }
  .overlay {
    grid-template-columns: 1fr;
    grid-template-rows: 50% 50%;
    background: rgba(255, 255, 255, 0.85);
    color: #c74778;
    opacity: 0;
    transition: all 0.5s;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 1;
    display: table-cell;
    position: absolute;
    font-family: "Playfair Display", serif;
  }

  .items {
    letter-spacing: 3px;
    justify-self: center;
    align-self: stretch center;
  }

  .card-title-container {
    transform: translateY(50px);
    transition: all 0.5s;
    height: 100%;
  }

  .card-title-container hr {
    display: block;
    width: 0;
    border: none;
    border-bottom: solid 2px hsl(209, 34%, 30%);
    bottom: 0;
    left: 20px;
    transition: all 0.5s;
    text-align: center;
  }

  .card-title-container p {
    margin-right: 0.5vh;
    margin-left: 0.5vh;
    padding-top: 2vw;
    padding-bottom: 2vw;
    text-align: center;
  }

  .card-date-container {
    font-weight: bold;
    opacity: 0;
    transform: translateY(4px);
    transition: all 0.7s;
    height: 80%;
    padding-bottom: 2vw;
    text-align: center;
  }

  .card-container:hover .overlay {
    opacity: 1;
    cursor: pointer;
  }

  .card-container:hover .overlay .card-title-container {
    transform: translateY(0px);
  }

  .card-container:hover .overlay hr {
    width: 75px;
    transition-delay: 0.4s;
  }

  .card-container:hover .overlay .card-date-container {
    transform: translateY(0px);
    transition-delay: 0.3s;
    opacity: 1;
  }

  @media only screen and (min-width: 1024px) {
    .card-title-container {
      font-size: 2.5vw;
    }
    .card-date-container {
      font-size: 1.5vw;
    }
    .overlay hr {
      margin-top: -2.5vw;
    }
  }

  @media only screen and (max-width: 1023px) and (min-width: 768px) {
    .card-title-container {
      font-size: 3vw;
    }
    .card-date-container {
      font-size: 2vw;
    }
    .overlay hr {
      margin-top: -3vw;
    }
  }

  @media only screen and (max-width: 767px) and (min-width: 1px) {
    .card-title-container {
      font-size: 4vw;
    }
    .card-date-container {
      font-size: 3vw;
    }
    .overlay hr {
      margin-top: -4vw;
    }
  }
`;
export default Art;
