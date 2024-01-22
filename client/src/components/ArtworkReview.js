import React, { useState, useEffect } from "react";
import { useArtworksContext } from "../context/artwork_context";
import styled from "styled-components";

const ArtworkReview = ({ artworkId }) => {
  const { fetchReviews, single_artwork_reviews } = useArtworksContext();

  useEffect(() => {
    fetchReviews(artworkId);
  }, [artworkId, fetchReviews]);

  return (
    <Wrapper>
      {single_artwork_reviews.map((review, index) => (
        <div key={index} className="review-card">
          <p>{review.reviewText}</p>
        </div>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .review-card {
    background: #f8f8f8;
    border: 1px solid #e2e2e2;
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    p {
      color: #333;
      font-size: 1em;
      line-height: 1.6;
    }
  }
`;

export default ArtworkReview;
