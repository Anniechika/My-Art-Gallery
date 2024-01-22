import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import HeartDisplay from "./HeartDisplay";
import IconHeart from "../assets/Icons/IconHeart";
import { useUserContext } from "../context/user_context";
const truncateText = (text, limit) => {
  const words = text.split(" ");
  if (words.length > limit) {
    return words.slice(0, limit).join(" ") + "...";
  }
  return text;
};
const ArtModal = ({ artwork, onClose }) => {
  //   console.log("id", artwork._id);
  const [likesCount, setLikesCount] = useState(artwork.Likes);
  const { likedArtworks, likeArt } = useUserContext();
  const [isVisible, setIsVisible] = useState(false);
  const isLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {
    setIsVisible(true);
  }, []);
  if (!artwork) return null;

  const descriptionSnippet = truncateText(artwork.Description, 20);

  const modalClick = (e) => {
    e.stopPropagation();
  };

  const handleLikeClick = async () => {
    console.log(likedArtworks);
    const isLiked = likedArtworks.includes(artwork._id);
    if (!isLiked) {
      const updatedLikes = await likeArt(artwork._id); // Call the likeArt function from context
      if (updatedLikes !== null) {
        setLikesCount(updatedLikes); // Update the likes count in the component state
      }
    } else {
      alert("Artwork already liked");
    }
  };

  //   const likeArt = async () => {
  //     try {
  //       const response = await fetch("http://localhost:5000/api/like-artwork", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //         body: JSON.stringify({ artworkId: artwork._id }),
  //       });

  //       if (response.status === 201) {
  //         const data = await response.json();
  //         // Update the likes count in the state
  //         setLikesCount(data.likes);
  //         console.log("Artwork liked successfully");
  //       } else {
  //         console.error("Failed to like artwork");
  //       }
  //     } catch (error) {
  //       console.error("Error liking artwork:", error);
  //     }
  //   };

  return (
    <Wrapper isVisible={isVisible} onClick={onClose}>
      <HeartDisplay likes={likesCount} />
      <div className="modal-content" onClick={modalClick}>
        <div className="modal-text">
          <h4>{artwork.Title}</h4>
          <p>{descriptionSnippet}</p>
          <p>
            By:{" "}
            <Link to={`/artist/${artwork.artistUserId}`}>{artwork.Artist}</Link>
          </p>
          {/* Other details here */}
          {isLoggedIn && (
            <button
              className="btn-heart"
              type="button"
              onClick={handleLikeClick}
            >
              <IconHeart />
            </button>
          )}
          {/* <button onClick={onClose} className="btn">
            Close
          </button> */}
        </div>
        <div className="art_container">
          <img src={artwork.Poster} alt={artwork.Title} className="modal-img" />
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.5s, visibility 0.5s;
  z-index: 1000;

  ${({ isVisible }) =>
    isVisible &&
    `
    opacity: 1;
    visibility: visible;
  `}

  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); */
    display: grid;
    grid-template-columns: 30% 70%;
    align-items: start; /* Align grid items to the start of the modal */
    justify-items: center; /* Center grid items horizontally */
    width: 100vh; /* Fixed width of the modal */
    height: auto; /* Height to auto to adjust to the content */
    overflow-y: auto;
  }

  .modal-text {
    /* Place the text at the top of the column */
    align-self: start;
  }
  .art_container {
    width: 60%; /* Adjust the width as necessary */
    display: flex;
    justify-content: center; /* This will center the image in the container */
  }

  .modal-img {
    width: 120%; /* This will make the image take up all available width of its parent container */
    height: auto; /* This will maintain the aspect ratio of the image */
    display: block; /* This will remove any extra space below the image */
    object-fit: cover; /* This will cover the entire area of the container, potentially cropping the image */
  }

  h2 {
    margin-top: 0;
  }
  .btn {
    padding: 10px 20px;
    background: #f44336;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
  }
  .btn-heart {
    width: 50px;
    height: 50px;
    padding: 5px;
    background: #f44336;
    color: white;
    border: none;
    border-radius: 20%; /* Make it round */
    cursor: pointer;
    margin-top: 5px;
    transition: transform 0.3s ease; /* Smooth transition for the transform property */

    &:hover {
      transform: scale(1.1); /* Slightly enlarge the button on hover */
      background: #ff6666; /* Lighten the background color on hover */
    }
  }
`;

export default ArtModal;
