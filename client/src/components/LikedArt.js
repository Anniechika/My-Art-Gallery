import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useUserContext } from "../context/user_context";

const LikedArt = () => {
  const { user, userLikedArtworks, fetchLikedArtworks } = useUserContext();

  // We get the likedArtworks ID from the user
  const likedArtworks = user.likedArtworks;

  // We want to pass the ID to the function

  useEffect(() => {
    if (likedArtworks && likedArtworks.length > 0) {
      console.log("fetch");
      fetchLikedArtworks(likedArtworks);
    }
  }, []); // Add likedArtworks as a dependency

  return (
    <>
      <h2>Liked Artworks</h2>
      <Wrapper>
        <div className="liked-artworks-container">
          {userLikedArtworks &&
            userLikedArtworks.map((artwork) => (
              <Link
                to={`/artworks/${artwork._id}`}
                key={artwork._id}
                className="liked-art-link"
              >
                <div className="liked-art_container">
                  <img
                    src={artwork.Poster}
                    alt={artwork.Title}
                    className="liked-artwork-image"
                  />
                  <div className="liked-artwork-info">
                    <p>{artwork.Title}</p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
  .liked-artworks-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    padding: 50px;
    background: #f0f0f0;
  }

  .liked-art-link {
    text-decoration: none; /* Removes the underline from links */
    color: inherit; /* The link will use the text color from its parent */
    margin: 0; /* Ensures there are no extra margins applied to the link */
  }

  .liked-art_container {
    flex: 0 1 300px;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .liked-art_container:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
  }

  .liked-artwork-image {
    width: 100%; /* Ensures the image takes up the full width of its container */
    height: 160px; /* Set a fixed height for all images */
    object-fit: cover; /* This will cover the area of the container, potentially cropping the image */
  }

  .liked-artwork-info {
    padding: 8px; /* Add padding for spacing around the text */
    text-align: center; /* Center-align the text */
    width: 100%; /* Ensure the div takes up the full width of its parent */
    background: #ffffff; /* Set background color to match the container */
    border-top: 1px solid #e0e0e0; /* Add a subtle border for separation */
  }

  .liked-artwork-info p {
    color: #333; /* Dark text for better readability */
    font-size: 0.9rem; /* Set font-size to suit your design */
    margin: 0; /* Remove default paragraph margin */
    white-space: nowrap; /* Ensure text stays on a single line */
    overflow: hidden; /* Hide overflow */
    text-overflow: ellipsis; /* Add ellipsis for overflow text */
  }
  /* Add additional styles for titles, prices, etc., as needed */

  /* Responsive adjustments */
  @media (max-width: 600px) {
    .liked-artworks-container {
      padding: 20px;
    }

    .liked-art_container {
      flex: 0 1 100px; /* Adjust size on smaller screens */
    }

    .liked-artwork-image {
      height: 130px; /* Adjust height on smaller screens */
    }
  }
`;

export default LikedArt;
