import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { useArtworksContext } from "../context/artwork_context";
import { Loading, Error, ReviewForm, ArtworkReview } from "../components";
import { useUserContext } from "../context/user_context"; // Import UserContext

const SingleArtworkPage = () => {
  const { user } = useUserContext();
  const { id } = useParams(); // Extracting the artwork ID from the URL
  const navigate = useNavigate();

  const {
    single_artwork_loading: loading,
    single_artwork_error: error,
    single_artwork: artwork,
    fetchSingleArtwork,
  } = useArtworksContext();

  console.log(id);
  useEffect(() => {
    // Correcting the fetch URL
    console.log("Fetching artwork with ID:", id);
    fetchSingleArtwork(`/artworks/${id}`);
  }, []); // Adding fetchSingleArtwork to the dependency array

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [error, navigate]); // Adding navigate to the dependency array

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  // Destructuring the artwork details

  return (
    <Wrapper>
      {artwork && (
        <div className="artwork-details">
          <h1>{artwork.Title}</h1>
          <p className="artist-name">
            By:{" "}
            <Link
              to={`/artist/${artwork.artistUserId}`}
              className="styled-link"
            >
              {artwork.Artist}
            </Link>
          </p>
          <p className="year-category">
            <span>{artwork.Year}</span> | <span>{artwork.Category}</span>
          </p>
          <p className="medium">{artwork.Medium}</p>
          <p className="description">{artwork.Description}</p>
          <img
            src={artwork.Poster}
            alt={artwork.Title}
            className="artwork-image"
          />
          {/* Add more properties here if needed */}
        </div>
      )}
      <div className="review-form-wrapper">{user && <ReviewForm />}</div>
      <div className="artwork-review-wrapper">
        <ArtworkReview artworkId={id} />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  padding: 20px;

  .artwork-details {
    width: 100%;
    max-width: 800px;
    background: #f9f9f9;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    text-align: center;
  }

  .artwork-details h1 {
    margin-bottom: 10px;
  }

  .artist-name,
  .year-category,
  .medium,
  .description {
    margin: 10px 0;
  }

  .year-category span {
    font-weight: bold;
  }

  .artwork-image {
    width: 100%;
    max-width: 400px;
    height: auto;
    margin-top: 20px;
    border-radius: 5px;
  }

  .styled-link {
    color: #0077cc;
    text-decoration: none;
  }

  .styled-link:hover {
    text-decoration: underline;
  }

  .review-form-wrapper,
  .artwork-review-wrapper {
    width: 80%;
    max-width: 600px;
    margin-bottom: 20px;
  }
`;

export default SingleArtworkPage;
