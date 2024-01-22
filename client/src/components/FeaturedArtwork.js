import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useArtworksContext } from "../context/artwork_context";
import { Loading, Error } from "../components";

const FeaturedArtwork = () => {
  const {
    artworks,
    artworks_loading: loading,
    artworks_error: error,
    fetchArtworks,
  } = useArtworksContext();
  const [topLikedArtworks, setTopLikedArtworks] = useState([]);

  const getArtworks = async () => {
    try {
      // Assuming fetchArtworks is an async function that fetches your data
      await fetchArtworks();

      // Sort artworks by 'Likes' in descending order and get the top 3 artworks
      const sortedArtworks = artworks
        .sort((a, b) => b.Likes - a.Likes)
        .slice(0, 3);

      setTopLikedArtworks(sortedArtworks);
    } catch (error) {
      console.error("Failed to fetch artworks:", error);
      // Handle errors as needed
    }
  };
  useEffect(() => {
    getArtworks();
  }, []);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }
  return (
    <Wrapper className="section">
      <div className="title">
        <h2>Trending Artwork</h2>
        <div className="underline"></div>
      </div>
      <div className="section-center featured">
        {topLikedArtworks.length > 0 ? (
          topLikedArtworks.map((art, index) => (
            <Link
              to={`/artworks/${art._id}`}
              key={index}
              className="artwork-link"
            >
              {" "}
              {/* Update this line */}
              <div>
                <h3>{art.Title}</h3>
                <p>- {art.Artist}</p>
                <img src={art.Poster} alt={art.Title} />
                {/* Add more artwork details here if needed */}
              </div>
            </Link>
          ))
        ) : (
          <p>Loading artworks...</p>
          // Or render a loading spinner or any other loading indication
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: var(--clr-grey-10);
  .title {
    text-align: center;
    margin-bottom: 2rem;
  }

  .underline {
    width: 60px;
    height: 4px;
    background: var(--clr-primary-5); /* Adjust color as needed */
    margin: 0 auto; /* Centers the underline */
    margin-top: 1rem;
  }

  .section-center {
    width: 90vw;
    max-width: 1170px; /* Adjust max-width as needed */
    margin: 0 auto;
    display: grid;
    gap: 2rem;
  }

  .featured {
    display: grid;
    gap: 2.5rem;
  }

  .featured div {
    background: white;
    padding: 1rem;
    border-radius: var(--radius); /* Adjust radius as needed */
    box-shadow: var(--light-shadow); /* Adjust shadow as needed */
  }

  .featured h3 {
    margin-bottom: 1rem;
    text-align: center;
  }

  .featured img {
    width: 100%;
    height: auto;
    border-radius: var(--radius); /* Adjust radius as needed */
  }

  .featured p {
    margin-top: 1rem;
    color: var(--clr-grey-5); /* Adjust color as needed */
  }

  .artwork-link {
    text-decoration: none; /* Removes underline from links */
    color: inherit; /* Inherits text color */
    display: block; /* Ensure the link is block-level for transform to work */
    transition: transform 0.3s ease, box-shadow 0.3s ease; /* Smooth transition for hover effect */
  }

  .artwork-link:hover {
    transform: scale(1.05); /* Enlarges the artwork a bit */
  }

  /* Adjust the hover effect on the child div instead */
  .artwork-link:hover div {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  .btn {
    display: block;
    width: 148px;
    margin: 1rem auto;
    text-align: center;
    padding: 0.5rem 1rem;
    background: var(--clr-primary-5); /* Adjust color as needed */
    color: white;
    border-radius: var(--radius);
    border: none;
    cursor: pointer;
    transition: var(--transition); /* Adjust transition as needed */
  }

  .btn:hover {
    background: var(--clr-primary-7); /* Adjust color as needed */
  }

  @media (min-width: 576px) {
    .featured {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
`;

export default FeaturedArtwork;
