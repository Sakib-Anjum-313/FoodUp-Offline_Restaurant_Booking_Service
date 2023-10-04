import React from "react";
import { Link } from "react-router-dom";
import img from "./restaurant-interior.webp";
const OpeningPage = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url(${img})`,
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Hello there!!!</h1>
          <p className="mb-5">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <Link to={'/login'}>
            <button className="btn btn-info">
              Admin & Restaurant Admin Page
            </button>
          </Link>
          <Link>
            <button className="btn btn-warning ml-3">Consumer Page</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OpeningPage;
