import {
  SET_LOADING,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_ERROR,
  UPDATE_USER_LIKED_ARTWORKS,
  GET_USER_LIKED_ARTWORKS,
  FOLLOW_ARTIST_SUCCESS,
  UNFOLLOW_ARTIST_SUCCESS,
  FETCH_ARTISTS_SUCCESS,
  SET_USER,
} from "../utils/action";

const user_reducer = (state, action) => {
  if (action.type === SET_USER) {
    return {
      ...state,
      user: action.payload,
    };
  }

  if (action.type === "REGISTER_BEGIN") {
    return {
      ...state,
      registerSuccess: false,
    };
  }

  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,
      registerSuccess: true,
      showAlert: false,
    };
  }

  if (action.type === REGISTER_USER_ERROR) {
    return {
      ...state,
      registerSuccess: false,
      showAlert: true,
    };
  }

  if (action.type === LOGIN_USER_SUCCESS) {
    return {
      ...state,
    };
  }

  if (action.type === LOGIN_USER_ERROR) {
    return {
      ...state,
      showAlert: true,
    };
  }

  if (action.type === UPDATE_USER_LIKED_ARTWORKS) {
    return {
      ...state,
      likedArtworks: action.payload,
    };
  }

  if (action.type === GET_USER_LIKED_ARTWORKS) {
    return {
      ...state,
      userLikedArtworks: action.payload,
    };
  }
  if (action.type === FOLLOW_ARTIST_SUCCESS) {
    return {
      ...state,
      user: {
        ...state.user,
        likedArtists: [...state.user.likedArtists, action.payload], // Add the new artist ID to likedArtists
      },
      likedArtists: [...state.likedArtists, action.payload],
    };
  }

  if (action.type === UNFOLLOW_ARTIST_SUCCESS) {
    return {
      ...state,
      user: {
        ...state.user,
        likedArtists: state.user.likedArtists.filter(
          (artistId) => artistId !== action.payload
        ), // Remove the artist ID from likedArtists
      },
      likedArtists: state.likedArtists.filter(
        (artistId) => artistId !== action.payload
      ),
    };
  }

  if (action.type === FETCH_ARTISTS_SUCCESS) {
    return {
      ...state,
      artists: action.payload,
    };
  }
};

export default user_reducer;
