import React from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import gardenAnim from "../assets/garden-illustration.json"; // <-- Download this animation into assets folder

const Home = () => {
  return (
    <div className="homepage-wrapper">
      <div className="top-section">
        <div className="intro-section">
          <h1>Welcome to Gardener’s Companion</h1>
          <p>Start your journey into plant care, tracking, and seasonal gardening tips.</p>
          <p className="subtitle">
            Whether you're a beginner or an expert, we’ve got the tools to help your garden thrive.
          </p>
          <Link to="/register" className="cta-button">Get Started</Link>
          <p className="discover">
            New here? <Link to="/about">Learn how we help your garden grow →</Link>
          </p>
        </div>

        <div className="image-section">
          <Lottie animationData={gardenAnim} className="garden-animation" loop={true} />
          <p className="quote">"To plant a garden is to believe in tomorrow."</p>
        </div>
      </div>

      <div className="bottom-section">
        <h2>Already a Member?</h2>
        <p>Log in to track your plants and notes.</p>
        <Link to="/login" className="login-button">Login</Link>
        <p>Don’t have an account? <Link to="/register">Create one</Link></p>
      </div>
    </div>
  );
};

export default Home;
