import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import FormRow from "./FormRow";
import { useUserContext } from "../context/user_context";
import { Loading, Error } from "../components";
import axios from "axios";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const CommissionForm = () => {
  const [artists, setArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const { user } = useUserContext();

  const [localError, setLocalError] = useState({
    hasError: false,
    errorText: "",
  });
  const [formData, setFormData] = useState({
    email: "",
    request: "",
  });

  const fetchArtists = async () => {
    try {
      const response = await axios.get("/api/artists");
      setArtists(response.data);
    } catch (error) {
      console.error("Error fetching artists:", error);
      return <Error />;
    }
  };

  useEffect(() => {
    fetchArtists();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setLocalError({
        hasError: true,
        errorText: "Not logged in!",
      });
      console.error("No artist selected");
      return;
    }
    if (!selectedArtist) {
      setLocalError({
        hasError: true,
        errorText: "No artist selected!",
      });
      console.error("No artist selected");
      return; // Make sure to return to prevent further execution
    }

    const userId = user.userId || user._id;

    const commissionData = {
      sender: userId,
      email: formData.email,
      commissionText: formData.request,
      artistId: selectedArtist, // ID of the selected artist
    };

    try {
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage

      const response = await axios.post(
        "/api/send-commission",
        commissionData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );

      setLocalError({
        hasError: false,
        errorText: "",
      });
      console.log("Commission request sent:", response.data);
      // Additional logic upon successful submission
    } catch (error) {
      console.error("Error sending commission request:", error);
      setLocalError({
        hasError: true,
        errorText: "Error sending commission request",
      });
      // Additional error handling logic
    }
  };

  const handleArtistSelect = (artistId) => {
    setSelectedArtist(artistId);
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <FormRow
        type="email"
        name="email"
        value={formData.email}
        handleChange={handleChange}
        placeholder="Enter your email"
      />
      <FormRow
        type="text"
        name="request"
        value={formData.request}
        handleChange={handleChange}
        placeholder="Describe your request"
      />

      <h4 className="choose_artist">Choose an Artist!</h4>
      <div className="artists-container">
        {artists.map((artist) => (
          <button
            type="button"
            key={artist._id}
            className={`artist-button ${
              selectedArtist === artist._id ? "selected-artist" : ""
            }`}
            onClick={() => handleArtistSelect(artist._id)}
          >
            {artist.name}
          </button>
        ))}
      </div>

      {localError && <p>{localError.errorText}</p>}
      <button type="submit" className="submit-btn">
        Submit
      </button>
    </FormWrapper>
  );
};

const FormWrapper = styled.form`
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  animation: ${fadeIn} 1s ease-out;
  .form-select {
    width: 100%;
    padding: 0.375rem 0.75rem;
    border-radius: 0.25rem;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    margin-bottom: 1rem;
  }

  .submit-btn {
    width: 100%;
    padding: 0.5rem;
    border: none;
    background-color: hsl(0, 69%, 77%);
    color: white;
    border-radius: 0.25rem;
    margin-top: 20px;
    cursor: pointer;

    &:hover {
      color: grey;
    }
  }
  .choose_artist {
    text-align: center;
    margin: 10 10;
    padding: 15px;
  }

  .artists-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
  }

  .artist-button {
    background-color: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 15px;
    padding: 8px 12px;
    cursor: pointer;
    transition: background-color 0.2s, box-shadow 0.2s, transform 0.2s ease;

    &:hover {
      background-color: #e2e8f0;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
      transform: scale(1.05);
    }
  }

  .artist-circle {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #ddd;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
    cursor: pointer;
    border: 2px solid transparent;
    overflow: hidden;
    background-size: cover;
    background-position: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: scale(1.1);
      box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
    }
  }

  .selected-artist {
    background-color: hsl(0, 69%, 77%);
    border-color: hsl(0, 80%, 77%)
    transform: scale(1.5);
  }

  .artist-tooltip {
    position: absolute;
    bottom: -25px; /* Adjust the distance from the circle */
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    font-size: 12px;
    padding: 4px 8px;
    border-radius: 4px;
    pointer-events: none; /* Ensure the tooltip doesn't interfere with clicks */
    white-space: nowrap; /* Prevent text from wrapping */
    opacity: 0; /* Hide the tooltip by default */
    transition: opacity 0.2s ease-in-out;
  }

  .artist-circle:hover .artist-tooltip {
    opacity: 1; /* Show the tooltip when hovering over the circle */
  }
`;

export default CommissionForm;
