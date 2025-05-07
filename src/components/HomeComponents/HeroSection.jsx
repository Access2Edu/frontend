import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/global.css";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="hero-section">
      {/* Decorative Stars - hidden on mobile */}
      <img
        src="/src/assets/Component 3.png"
        alt="star"
        className="star star-top-left hide-on-mobile"
      />
      <img
        src="/src/assets/Component 3.png"
        alt="star"
        className="star star-top-meddle hide-on-mobile"
      />
      <img
        src="/src/assets/Component 3.png"
        alt="star"
        className="star star-top-up hide-on-mobile"
      />
      <img
        src="/src/assets/Component 3.png"
        alt="star"
        className="star star-top-center hide-on-mobile"
      />
      <img
        src="/src/assets/Component 8.png"
        alt="star"
        className="star star-top-right hide-on-mobile"
      />
      <img
        src="/src/assets/Component 7.png"
        alt="star"
        className="star star-bottom-right hide-on-mobile"
      />

      <div className="hero-container">
        <div className="hero-content">
          <h1>
            Quality Education Made{" "}
            <span className="typing-text">Accessible</span> for Every Child
          </h1>

          <p>
          Learn online, get a recognized certificate from a school near you.
          </p>

          {/* Desktop Buttons */}
          <div className="hero-buttons desktop-buttons">
            <button className="button">Students</button>
            <button className="button secondary">Parents</button>
            <button className="button secondary">Teachers</button>
          </div>

          {/* Mobile Buttons */}
          <div className="hero-buttons mobile-buttons">
            <button
              className="button primary"
              onClick={() => navigate("/signup")}
            >
              Register now
            </button>
            <button
              className="button secondary"
              onClick={() => navigate("/login")}
            >
              Log in
            </button>
          </div>

          {/* Mobile Affiliate Section */}
          <div className="mobile-affiliate-card">
            <img
              src="/src/assets/Hero-image.png"
              alt="Hero"
              className="students-img"
            />
            <div className="affiliate-card">
              <img
                src="/src/assets/volunteers.png"
                alt="Our Affiliate Schools"
                className="affiliate-image"
              />
            </div>
          </div>
        </div>

        {/* Desktop Affiliate Section */}
        <div className="desktop-affiliate-card hide-on-mobile">
          <div className="hero-image">
            <img
              src="/src/assets/Hero-image.png"
              alt="Hero"
              className="students-img"
            />
            <div className="affiliate-card">
              <img
                src="/src/assets/volunteers.png"
                alt="Our Affiliate Schools"
                className="affiliate-image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
