import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const ReviewForm = () => {
  const token = localStorage.getItem("token");
  const { id } = useParams();
  console.log(id);
  const [reviewText, setReviewText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch(`http://localhost:5000/api/artworks/${id}/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ reviewText }),
      });

      // Clear the form or show a success message
      setReviewText("");
      console.log("Success review send!");
    } catch (error) {
      console.error("Error posting review:", error);
    }
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <textarea
          className="textarea"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your review here..."
        />
        <button className="submit-button" type="submit">
          Submit Review
        </button>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 20px auto;
  padding: 20px;
  background: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  .textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
    resize: vertical;
  }

  .submit-button {
    background-color: #0077cc;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #005fa3;
    }
  }
`;

export default ReviewForm;
