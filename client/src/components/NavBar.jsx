import React from "react";
import { currentAuthenticatedUser, isAuthenticated, signOut } from "../services/authService.js";
import { useNavigate, Link } from "react-router-dom";
const NavBar = () => {
  useNavigate(); // Hack
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link to="/#" className="navbar-brand d-flex align-items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            aria-hidden="true"
            className="mr-2"
            viewBox="0 0 24 24"
            focusable="false"
          >
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
            <circle cx="12" cy="13" r="4"></circle>
          </svg>
          <strong>My WorkoutLogger</strong>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample07"
          aria-controls="navbarsExample07"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample07">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/create">
                Create new record
              </Link>
            </li>
          </ul>

          <ul className="navbar-nav ml-auto">
            {
              !isAuthenticated() ? (
                <>
                  <li className="nav-item active">
                    <Link className="nav-link" to="/signin">Signin</Link>
                  </li>
                  <li className="nav-item active">
                    <Link className="nav-link" to="/register">Register</Link>
                  </li>
                </>
              ) : (
                <li className="nav-item dropdown">
                  <Link className="nav-link dropdown-toggle active" to="#" id="dropdown07" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Welcome {currentAuthenticatedUser()}</Link>
                  <div className="dropdown-menu" aria-labelledby="dropdown07">
                    <Link className="dropdown-item" to="/#" onClick={()=>{signOut()}}>Signout</Link>
                  </div>
                </li>
              )
            }
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
