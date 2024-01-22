import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Loading, Error } from "../components";
import { useUserContext } from "../context/user_context"; // Import UserContext
import styled from "styled-components";
import axios from "axios";
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;

  .artist-info {
    margin-bottom: 20px;
    text-align: center;
  }

  .artworks {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
  }

  .artwork {
    width: 300px; // Increased width for better display
    border: 1px solid #ccc;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 10px; // Rounded corners
    background: #f9f9f9; // Light background for contrast
    text-align: left; // Align text to the left for readability
    cursor: pointer;
  }

  .artwork-link {
    text-decoration: none; // Removes the underline from links
    color: inherit; // Inherits the text color

    &:hover .artwork {
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); // Adds a shadow on hover for visual feedback
      transform: translateY(-5px); // Slightly lifts the artwork
      transition: box-shadow 0.3s ease, transform 0.3s ease;
    }
  }

  .artwork-image {
    width: 100%;
    height: auto;
    border-radius: 5px; // Rounded corners for the image
    margin-bottom: 10px;
  }

  .follow-button {
    background-color: hsl(0, 69%, 77%);
    color: white;
    border: none;
    padding: 8px 15px;
    margin: 10px 0;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

const SingleArtistPage = () => {
  const { userId } = useParams();
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFollowingLocally, setIsFollowingLocally] = useState(false);
  const { followArtist, unfollowArtist, user, likedArtists } = useUserContext();
  const fetchArtistData = async () => {
    try {
      const response = await axios.get(`/api/users/${userId}`);
      setArtist(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchArtistData();
    }
  }, [userId]);

  const isLoggedIn = !!localStorage.getItem("token");
  const isFollowing = user?.likedArtists?.includes(userId);

  const handleFollowUnfollow = async () => {
    if (!user) return;

    try {
      if (isFollowingLocally) {
        await unfollowArtist(userId, user.userId || user._id);
      } else {
        await followArtist(userId, user.userId || user._id);
      }
      // Toggle the local follow/unfollow status
      setIsFollowingLocally(!isFollowingLocally);
    } catch (err) {
      console.error("Error following/unfollowing artist:", err);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error />;
  if (!artist) return <div>No artist found</div>;

  return (
    <Wrapper>
      <div className="artist-info">
        <h1>{artist.name}</h1>
        <p>Email: {artist.email}</p>
        {isLoggedIn && (
          <button className="follow-button" onClick={handleFollowUnfollow}>
            {isFollowingLocally ? "Unfollow" : "Follow"}
          </button>
        )}
      </div>
      <div className="artworks">
        {artist.ownArtworks.map((artwork) => (
          <Link
            to={`/artworks/${artwork._id}`}
            key={artwork._id}
            className="artwork-link"
          >
            <div key={artwork._id} className="artwork">
              <img
                src={artwork.Poster}
                alt={artwork.Title}
                className="artwork-image"
              />
              <h3>{artwork.Title}</h3>
              <p>
                <strong>Artist:</strong> {artwork.Artist}
              </p>
              <p>
                <strong>Year:</strong> {artwork.Year}
              </p>
              <p>
                <strong>Category:</strong> {artwork.Category}
              </p>
              <p>
                <strong>Medium:</strong> {artwork.Medium}
              </p>
              <p>
                <strong>Description:</strong> {artwork.Description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </Wrapper>
  );
};

export default SingleArtistPage;
