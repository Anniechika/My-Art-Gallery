import React from "react";
import styled from "styled-components";
import { FaBars } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { links } from "../utils/constants";
import { useArtworksContext } from "../context/artwork_context";
import { useUserContext } from "../context/user_context";

const Navbar = () => {
  const navigate = useNavigate();
  const { openSidebar } = useArtworksContext();
  const { logout } = useUserContext();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogOut = () => {
    logout();
    setTimeout(() => {
      navigate("/");
    }, 50);
  };
  return (
    <NavContainer>
      <div className="nav-center">
        <div className="nav-header">
          <Link to="/">Home</Link>
        </div>
        <ul className="nav-links">
          {links.map((link) => {
            const { id, text, url } = link;
            return (
              // Every list need a key
              <li key={id}>
                <Link to={url}>{text}</Link>
              </li>
            );
          })}
          {isLoggedIn && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
        </ul>
        <div className="nav-links__right">
          {isLoggedIn ? (
            <div className="nav_links_logout" onClick={handleLogOut}>
              <Link to="/login">Log out</Link>
            </div>
          ) : (
            <>
              <div className="nav_links_login">
                <Link to="/login">Log in</Link>
              </div>

              <div className="nav_links_register">
                <Link to="/register">Register</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  .nav-center {
    width: 90vw;
    margin: 0 auto;
    max-width: var(--max-width);
    display: flex; /* Set nav-center to be a flex container */
    justify-content: space-between; /* This will push nav-links and nav-links__right apart */
    align-items: center;
  }
  .nav-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: 175px;
      margin-left: -15px;
    }
  }
  .nav-toggle {
    background: transparent;
    border: transparent;
    color: var(--clr-primary-5);
    cursor: pointer;
    svg {
      font-size: 2rem;
    }
  }
  .nav-links {
    display: flex;
    align-items: center;
    flex-grow: 1; /* This will make nav-links grow and push nav-links__right to the end */
  }
  .cart-btn-wrapper {
    display: none;
  }

  .nav-links__right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 10px;
  }

  .nav_links_login {
    padding-right: 20px;
  }
  .nav_links_logout {
    background-color: hsl(0, 69%, 77%);
    border: none;
    color: white;
    padding: 15px;
    cursor: pointer;
    text-align: center; /* If you want to center the text */
  }

  .nav_links_logout a {
    color: white; /* Make link text white */
    text-decoration: none; /* Remove underline */
    display: block; /* Make the link fill the container */
  }
  .nav_links_logout a:hover {
    color: grey;
  }
  .nav_links_register {
    background-color: hsl(0, 69%, 77%);
    border: none;
    color: white;
    padding: 12px;
    cursor: pointer;
  }

  /* Only display our navbar if the screen size is bigger than 992px */
  @media (min-width: 992px) {
    .nav-toggle {
      display: none;
    }
    .nav-center {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
    }
    .nav-links {
      display: flex;
      justify-content: center;
      li {
        margin: 0 0.5rem;
      }
      a {
        color: var(--clr-grey-3);
        font-size: 1rem;
        text-transform: capitalize;
        letter-spacing: var(--spacing);
        padding: 0.5rem;
        &:hover {
          border-bottom: 2px solid var(--clr-primary-7);
        }
      }
    }
    .cart-btn-wrapper {
      display: grid;
    }
  }
`;

export default Navbar;
