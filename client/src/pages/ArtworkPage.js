import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useArtworksContext } from "../context/artwork_context";
import { Art, SearchBar, Loading, Error, ArtModal } from "../components";

const ArtworkPage = () => {
  const navigate = useNavigate();
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleArtClick = (artwork) => {
    setSelectedArtwork(artwork);
    setIsModalOpen(true);
  };

  // Applying the filtering based on the search later!!! The filter application
  const {
    artworks,
    artworks_loading: loading,
    artworks_error: error,
    fetchArtworks,
  } = useArtworksContext();
  // console.log(artworks);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [error]);

  useEffect(() => {
    fetchArtworks();
  }, []);

  const handleSearchChange = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  const filteredArtworks = searchQuery
    ? artworks.filter(
        (artwork) =>
          (artwork.Title &&
            artwork.Title.toLowerCase().includes(searchQuery)) ||
          (artwork.Artist && artwork.Artist.toLowerCase().includes(searchQuery))
      )
    : artworks; // Return all artworks if searchQuery is empty

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  console.log(filteredArtworks);
  return (
    <Wrapper>
      <SearchBar onSearchChange={handleSearchChange} />
      <div className="gallery-container">
        <ul className="gallery">
          {filteredArtworks && filteredArtworks.length > 0 ? (
            filteredArtworks.map((artwork) => (
              <Art
                key={artwork._id}
                artwork={artwork}
                onArtClick={handleArtClick}
                isModalOpen={isModalOpen}
              />
            ))
          ) : (
            <p>No artworks found.</p>
          )}

          {isModalOpen && (
            <div className="modal-overlay">
              <div className="modal-content">
                <ArtModal
                  artwork={selectedArtwork}
                  onClose={() => setIsModalOpen(false)}
                />
              </div>
            </div>
          )}
        </ul>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  ul {
    list-style: none;
    list-style-type: none;
    padding-inline-start: 0px;
  }

  .gallery {
    display: inline-block;
    max-width: 95%;
    max-height: 100%;
    column-gap: 1.5em;
    padding: 20px;
  }
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000; /* Ensure it's above other content */
  }

  .modal-content {
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    z-index: 1001; /* Ensure it's above the overlay */
  }

  /* .gallery_art {
    padding: 20px;
  } */
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  html {
    box-sizing: border-box;
  }

  @media only screen and (min-width: 1024px) {
    .gallery {
      column-count: 4;
    }
  }

  @media only screen and (max-width: 1023px) and (min-width: 768px) {
    .gallery {
      column-count: 3;
    }
  }

  @media only screen and (max-width: 767px) and (min-width: 1px) {
    .gallery {
      column-count: 2;
    }
  }
`;
export default ArtworkPage;
