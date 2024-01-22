import React from "react";
import { Link } from "react-router-dom";
import { LikedArt, FollowedArtist } from "../components";
import { useUserContext } from "../context/user_context";
import styled from "styled-components";
import profilePic from "../assets/profilepic.png";

const ProfilePage = () => {
  const { user } = useUserContext();
  console.log("commision request", user.CommissionRequest);

  return (
    <Wrapper>
      <div className="profile-card">
        <div
          className={`profile-header ${user.isArtist ? "artist" : "patron"}`}
        >
          {user.isArtist ? "Artist" : "Patron"}
        </div>
        <div className="avatar">
          <img src={profilePic} alt={`${user.name}'s Avatar`} />
        </div>
        <div className="user-info">
          <h1>{user.name}</h1>
          <p>Welcome to the art gallery!</p>
        </div>
      </div>
      <div className="followed-artists">
        <FollowedArtist />
      </div>
      <div className="liked-artworks">
        <LikedArt />
      </div>

      {user.isArtist &&
        user.CommissionRequest &&
        user.CommissionRequest.length > 0 && (
          <div className="commission-requests">
            <h2>Commission Requests</h2>
            {user.CommissionRequest.map((request, index) => (
              <div key={index} className="commission-request">
                <p>
                  <strong>From:</strong> {request.senderEmail}
                </p>
                <p>
                  <strong>Request:</strong> {request.commisionText}
                </p>
              </div>
            ))}
          </div>
        )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f4f4f4;
  padding: 20px;

  .profile-card {
    background: white;
    border-radius: 15px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    padding: 20px;
    width: 100%;
    max-width: 1000px;
    margin-bottom: 20px;
  }

  .profile-header {
    color: white;
    padding: 8px 16px;
    border-radius: 20px;
    display: inline-block;
    margin-top: -20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    &.patron {
      background-color: #95c781;
    }
    &.artist {
      background-color: #cf9f74;
    }
  }

  .avatar img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    border: 5px solid white;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  .user-info h1 {
    font-size: 1.8em;
    color: #333;
    margin: 10px 0;
  }

  .user-info p {
    font-size: 1em;
    color: #555;
  }

  .upgrade-link {
    background-color: #dca3a3;
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 1em;
    color: white;
    text-decoration: none;
    margin-top: 10px;
    display: inline-block;
    &:hover {
      background-color: #c79292;
    }
  }

  .followed-artists,
  .liked-artworks {
    background: white;
    border-radius: 15px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    width: 100%;
    max-width: 500px;
    margin: 10px 0;
  }

  .followed-artists h2,
  .liked-artworks h2 {
    font-size: 1.5em;
    color: #333;
  }
  .commission-requests {
    background: white;
    border-radius: 15px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    width: 100%;
    max-width: 500px;
    margin: 20px 0;
    text-align: left;

    h2 {
      font-size: 1.5em;
      color: #333;
      margin-bottom: 15px;
    }

    .commission-request {
      border-bottom: 1px solid #eee;
      padding: 10px 0;

      &:last-child {
        border-bottom: none;
      }

      p {
        margin: 5px 0;
        font-size: 1em;
        color: #555;

        strong {
          font-weight: bold;
        }
      }
    }
  }
`;

export default ProfilePage;
