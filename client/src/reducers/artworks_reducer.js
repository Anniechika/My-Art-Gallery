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

// Do the actual implementation

const artwork_reducer = (state, action) => {
  if (action.type === SIDEBAR_OPEN) {
    return { ...state, isSidebarOpen: true };
  }
  if (action.type === SIDEBAR_CLOSE) {
    return { ...state, isSidebarOpen: false };
  }

  if (action.type === GET_ARTWORKS_BEGIN) {
    return { ...state, artworks_loading: true };
  }

  if (action.type === GET_ARTWORKS_SUCCESS) {
    // Set the loading state to false, return all the artworks
    return { ...state, artworks_loading: false, artworks: action.payload };
  }
  if (action.type === GET_ARTWORKS_ERROR) {
    return { ...state, artworks_loading: false, artworks_error: true };
  }

  if (action.type === GET_SINGLE_ARTWORK_BEGIN) {
    return {
      ...state,
      single_artwork_loading: true,
      single_artwork_error: false,
    };
  }

  if (action.type === GET_SINGLE_ARTWORK_SUCCESS) {
    return {
      ...state,
      single_artwork_loading: false,
      single_artwork: action.payload,
    };
  }

  if (action.type === GET_SINGLE_ARTWORK_ERROR) {
    return {
      ...state,
      single_artwork_loading: false,
      single_artwork_error: true,
    };
  }

  if (action.type === GET_REVIEWS_BEGIN) {
    return {
      ...state,
      // single_artwork_loading: true,
      // single_artwork_error: false,
    };
  }

  if (action.type === GET_REVIEWS_SUCCESS) {
    return {
      ...state,
      // single_artwork_loading: false,
      single_artwork_reviews: action.payload,
    };
  }

  if (action.type === GET_REVIEWS_ERROR) {
    return {
      ...state,
      // single_artwork_loading: false,
      // single_artwork_error: true,
    };
  }
};

export default artwork_reducer;
