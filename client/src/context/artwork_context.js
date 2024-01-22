// In this context, we will load all the data fetched from the server side

import axios from "axios";
import React, { useContext, useEffect, useReducer, useCallback } from "react";
import reducer from "../reducers/artworks_reducer";

import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_ARTWORKS_BEGIN,
  GET_ARTWORKS_SUCCESS,
  GET_ARTWORKS_ERROR,
  GET_SINGLE_ARTWORK_BEGIN,
  GET_SINGLE_ARTWORK_SUCCESS,
  GET_SINGLE_ARTWORK_ERROR,
  GET_REVIEWS_BEGIN,
  GET_REVIEWS_SUCCESS,
  GET_REVIEWS_ERROR,
} from "../utils/action";

const initialState = {
  isSidebarOpen: false,
  artworks_loading: false,
  artworks_error: false,
  artworks: [],
  single_artwork_loading: false,
  single_artwork_error: false,
  single_artwork: {},
  single_artwork_reviews: [],
  likedArtwork: [],
};

const ArtworksContext = React.createContext();

export const ArtworkProvider = ({ children }) => {
  // Set up the reducer for the context -> the reducer is in other file
  const [state, dispatch] = useReducer(reducer, initialState);

  // Helper functions of toggling states
  const openSideBar = () => {
    dispatch({ type: SIDEBAR_OPEN });
  };

  const closeSideBar = () => {
    dispatch({ type: SIDEBAR_CLOSE });
  };

  // Function for fetching all artwork
  const fetchArtworks = async () => {
    console.log("Fetch artwork");
    dispatch({ type: GET_ARTWORKS_BEGIN });
    try {
      const response = await axios.get("/artworks");
      const artworks = response.data;
      // We will get the data from the reducer
      dispatch({ type: GET_ARTWORKS_SUCCESS, payload: artworks });
    } catch (error) {
      dispatch({ type: GET_ARTWORKS_ERROR });
    }
    console.log("Fetch artwork done");
  };

  const fetchSingleArtwork = async (url) => {
    dispatch({ type: GET_SINGLE_ARTWORK_BEGIN });
    try {
      const response = await axios.get(url);
      const singleArtwork = response.data;
      console.log("Data", singleArtwork);
      dispatch({ type: GET_SINGLE_ARTWORK_SUCCESS, payload: singleArtwork });
    } catch (error) {
      dispatch({ type: GET_SINGLE_ARTWORK_ERROR });
    }
  };

  const fetchReviews = useCallback(
    async (artworkId) => {
      dispatch({ type: GET_REVIEWS_BEGIN });
      try {
        const response = await axios.get(
          `/api/artworks/${artworkId}/getReviews`
        );
        const reviews = response.data;
        dispatch({ type: GET_REVIEWS_SUCCESS, payload: reviews });
      } catch (error) {
        dispatch({ type: GET_REVIEWS_ERROR });
      }
    },
    [dispatch]
  );

  useEffect(() => {
    fetchArtworks();
  }, []);

  return (
    <ArtworksContext.Provider
      value={{
        ...state,
        openSideBar,
        closeSideBar,
        fetchSingleArtwork,
        fetchArtworks,
        fetchReviews,
      }}
    >
      {children}
    </ArtworksContext.Provider>
  );
};
export const useArtworksContext = () => {
  return useContext(ArtworksContext);
};
