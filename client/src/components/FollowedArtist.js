import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../context/user_context";
import styled from "styled-components";

const FollowedArtist = () => {
  const { artists, user } = useUserContext();
  console.log(user.likedArtists);
  console.log(artists);

  // Filter artists to only include those that are followed by the user
  const followedArtists = artists.filter((artist) =>
    user.likedArtists.includes(artist._id)
  );

  return (
    <Wrapper>
      <h2>My Followed Artists</h2>
      <div className="artist-list">
        {followedArtists.length > 0 ? (
          followedArtists.map((artist) => (
            <Link
              key={artist._id}
              to={`/artist/${artist._id}`}
              className="artist-link"
            >
              {artist.name}
            </Link>
          ))
        ) : (
          <p>You have not followed any artists yet.</p>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  text-align: center;
  margin-top: 2rem;

  h2 {
    color: #333;
    margin-bottom: 1.5rem;
  }

  .artist-list {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .artist-link {
    background-color: #f0f0f0;
    color: #0077cc;
    padding: 10px 15px;
    margin: 10px 0;
    border-radius: 5px;
    text-decoration: none;
    transition: background-color 0.3s, color 0.3s;

    &:hover {
      background-color: #0077cc;
      color: #fff;
    }
  }
`;

export default FollowedArtist;
