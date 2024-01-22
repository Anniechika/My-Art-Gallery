import React, {
  useContext,
  useEffect,
  useState,
  useReducer,
  useCallback,
} from "react";
import axios from "axios";
import reducer from "../reducers/user_reducer";

import {
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  UPDATE_LIKES_SUCCESS,
  GET_USER_LIKED_ARTWORKS,
  UPDATE_USER_LIKED_ARTWORKS,
  UPDATE_ARTWORK_LIKES,
  FOLLOW_ARTIST_SUCCESS,
  UNFOLLOW_ARTIST_SUCCESS,
  SET_USER,
  GET_USER_FOLLOWED_ARTIST,
  FETCH_ARTISTS_SUCCESS,
} from "../utils/action";

// Context that contains the validation logic for registeration / Login

const initialState = {
  registerSuccess: false,
  user: null,
  showAlert: false,
  likedArtworks: [],
  userLikedArtworks: [],
  likedArtists: [],
  artists: [],
};

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchAllArtists = async () => {
    console.log("fetchAllArtists called!");
    try {
      const response = await axios.get("/api/artists"); // Update with your actual endpoint URL
      if (response.status === 201) {
        console.log("response.daata is", response.data);
        dispatch({ type: FETCH_ARTISTS_SUCCESS, payload: response.data });
      }
    } catch (error) {
      console.error("Error fetching artists:", error);
      // Optionally, handle error in state
    }
    console.log("fetchAllArtists done!");
  };

  const fetchUserProfile = useCallback(async () => {
    console.log("fetchUserProfile called!");
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.get("/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data) {
          console.log("The data is", response.data);
          dispatch({ type: SET_USER, payload: response.data });
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        // Clear the token if it's invalid
        localStorage.removeItem("token");
      }
    }
  }, []);

  const startRegister = () => {
    dispatch({ type: "REGISTER_BEGIN" });
  };

  const register = async (userInput) => {
    startRegister();
    console.log(userInput);
    try {
      const response = await axios.post("/register", userInput);
      if (response.status === 201) {
        // Dispatch success action
        console.log("registeration success!");
        dispatch({ type: REGISTER_USER_SUCCESS, payload: response.data });
      }
    } catch (error) {
      // Dispatch error action
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: error.response ? error.response.data : error,
      });
    }
  };

  const login = async (userInput) => {
    console.log(userInput);
    console.log("Log in begin");
    try {
      const response = await axios.post("/login", userInput);
      if (response.status === 201) {
        localStorage.setItem("token", response.data.token);
        dispatch({ type: SET_USER, payload: response.data });
      }
    } catch (error) {
      console.log("Log in fails");
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: error.response ? error.response.data : error,
      });
    }
  };

  const logout = async () => {
    localStorage.removeItem("token");
    dispatch({ type: SET_USER, payload: null });
  };

  const likeArt = async (artworkId) => {
    try {
      const response = await fetch("http://localhost:5000/api/like-artwork", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ artworkId }),
      });

      if (response.status === 201) {
        const data = await response.json();
        dispatch({
          type: UPDATE_USER_LIKED_ARTWORKS,
          payload: data.likedArtworks,
        });
        return data.likes;
      } else {
        console.error("Failed to like artwork");
      }
    } catch (error) {
      console.error("Error liking artwork:", error);
      return null;
    }
  };

  const fetchLikedArtworks = async (likedArtworkID) => {
    console.log("fetch liked artwork");
    console.log(likedArtworkID);
    try {
      const response = await fetch("http://localhost:5000/api/artworks/byIds", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ artworkIds: likedArtworkID }),
      });

      if (response.status === 201) {
        const data = await response.json();
        dispatch({
          type: GET_USER_LIKED_ARTWORKS,
          payload: data,
        });
        console.log(data);
      }
    } catch (error) {
      console.error("Error fetching liked artworks:", error);
    }
    console.log("fetch liked done");
  };

  //   const fetchFollowedArtist = async (followedArtist) => {
  //     console.log("fetch followed artist");
  //     console.log(followedArtist);

  //     try {
  //       const response = await fetch("http://localhost:5000/api/artist/byIds", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ artistId: followedArtist }),
  //       });

  //       if (response.status === 201) {
  //         const data = await response.json();
  //         dispatch({
  //           type: GET_USER_FOLLOWED_ARTIST,
  //           payload: data,
  //         });
  //         console.log(data);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching liked artworks:", error);
  //     }
  //     console.log("fetch followed user done");
  //   };

  const followArtist = async (artistId, userId) => {
    console.log("ArtistID", artistId);
    console.log("UserID", userId); //undefined
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "/api/users/follow",
        { userId, artistId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch({
        type: FOLLOW_ARTIST_SUCCESS,
        payload: response.data.likedArtists,
      });
      console.log("done!!!");
    } catch (error) {
      console.error("Error following artist:", error);
      // Optionally, handle error in state
    }
  };

  const unfollowArtist = async (artistId, userId) => {
    console.log("ArtistID unfollowed client", artistId);
    console.log("UserID  unfollowed client", userId); //undefined
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "/api/users/unfollow",
        { userId, artistId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch({
        type: UNFOLLOW_ARTIST_SUCCESS,
        payload: response.data.likedArtists,
      });
    } catch (error) {
      console.error("Error unfollowing artist:", error);
      // Optionally, handle error in state
    }
  };
  useEffect(() => {
    fetchUserProfile();
    fetchAllArtists(); // Fetch artists when the provider mounts
  }, [fetchUserProfile]);

  return (
    <UserContext.Provider
      value={{
        ...state,
        register,
        login,
        logout,
        likeArt,
        fetchLikedArtworks,
        followArtist,
        unfollowArtist,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
