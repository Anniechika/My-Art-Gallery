import React from "react";
import styled from "styled-components";

const SearchBar = ({ onSearchChange }) => {
  return (
    <Wrapper>
      <div className="search-container">
        <i className="fa fa-search search-icon" />
        <form>
          <input
            id="searchInput"
            className="search-input"
            placeholder="Search"
            onChange={(e) => onSearchChange(e.target.value)} // Update search query on change
          />
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center; // Centers the search bar
  margin-top: 20px; // Spacing from the top
  .search-container {
    display: flex;
    padding: 0.5vw;
    margin-left: 2vw;
    margin-right: 2vw;
    border-radius: 20px;
    background: #f1f3f5;
    overflow: hidden;
    width: 80vw;
    border-color: white;
  }

  .search-container:hover {
    background: #e9ecef;
  }

  .search-container:focus-within {
    border: 1.5px solid #c74778;
    box-shadow: 2px 2px 5px hsl(0, 69%, 77%);
    transition: 0.2s ease-out;
  }

  .search-icon {
    font-size: 1em;
    padding: 0.2em;
    color: #c74778;
  }

  .delete-icon {
    font-size: 1em;
    padding: 0.2em;
    margin-right: 0.2em;
    color: #c74778;
    cursor: pointer;
  }

  .hide {
    opacity: 0;
  }

  .show {
    opacity: 1;
  }
  .search-input {
    outline: none;
    border: none;
    background: none;
    caret-color: #c74778;
    font-size: 1em;
    width: calc(100% - 36px);
    box-sizing: border-box;
  }

  form {
    width: 100%;
    background: none;
  }
`;

export default SearchBar;
