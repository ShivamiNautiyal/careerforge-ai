import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import PortfolioForm from "./PortfolioForm";
import PortfolioPreview from "./PortfolioPreview";
import "./PortfolioBuilder.css";

function PortfolioBuilder() {

  const [selectedTheme, setSelectedTheme] = useState("aurora");

  const [portfolioData, setPortfolioData] = useState({
    fullName: "",
    title: "",
    shortIntro: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    about: "",
    profileImage: "",

    skills: [],

    projects: [
  {
    projectName: "",
    image: "",
    technologies: "",
    github: "",
    liveDemo: "",
    description: ""
  }
],

    experience: [
      {
        company: "",
        role: "",
        startDate: "",
        endDate: "",
        description: ""
      }
    ],

    education: [
      {
        college: "",
        degree: "",
        branch: "",
        startYear: "",
        endYear: ""
      }
    ]
  });

  const themes = [
    {
      id: "aurora",
      name: "Aurora Professional",
      description: "Premium blue-purple design for professional portfolios."
    },
    {
      id: "midnight",
      name: "Midnight Developer",
      description: "Dark modern theme for developers and tech professionals."
    },
    {
      id: "glass",
      name: "Glass Premium",
      description: "Elegant glassmorphism design with a premium feel."
    },
    {
      id: "creative",
      name: "Creative Gradient",
      description: "Colorful and energetic design for creative developers."
    },
    {
      id: "minimal",
      name: "Minimal Elegant",
      description: "Clean, simple and professional portfolio design."
    },
    {
      id: "ocean",
      name: "Ocean Tech",
      description: "Fresh cyan-blue design inspired by modern technology."
    }
  ];

  const selectedThemeName =
    themes.find((theme) => theme.id === selectedTheme)?.name;

  return (
    <>
      <Navbar />

      <div className="portfolio-builder">

        {/* HEADER */}

        <div className="portfolio-header">

          <div className="header-glow"></div>

          <span className="portfolio-badge">
            ✦ PORTFOLIO BUILDER
          </span>

          <h1>
            Build Your
            <span> Dream Portfolio</span>
          </h1>

          <p>
            Create a stunning developer portfolio with beautiful
            themes, live preview and customizable sections.
          </p>

        </div>


        {/* THEME SECTION */}

        <section className="theme-section">

          <div className="section-heading">

            <div>
              <span className="section-label">
                DESIGN YOUR WAY
              </span>

              <h2>
                Choose Your Theme
              </h2>

              <p>
                Pick a design that matches your personality and
                professional style.
              </p>
            </div>

            <div className="theme-count">
              {themes.length} Themes
            </div>

          </div>


          <div className="theme-grid">

            {themes.map((theme) => (

              <div
                key={theme.id}
                className={`theme-card ${
                  selectedTheme === theme.id ? "selected" : ""
                }`}
                onClick={() => setSelectedTheme(theme.id)}
              >

                {/* THEME PREVIEW */}

                <div className={`theme-preview ${theme.id}`}>

                  <div className="mini-navbar">
                    <span></span>
                    <div>
                      <i></i>
                      <i></i>
                      <i></i>
                    </div>
                  </div>

                  <div className="mini-hero">

                    <div className="mini-avatar"></div>

                    <div className="mini-lines">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>

                  </div>

                  <div className="mini-cards">

                    <span></span>
                    <span></span>
                    <span></span>

                  </div>

                </div>


                {/* THEME INFO */}

                <div className="theme-info">

                  <div className="theme-title-row">

                    <h3>
                      {theme.name}
                    </h3>

                    {selectedTheme === theme.id && (
                      <span className="selected-icon">
                        ✓
                      </span>
                    )}

                  </div>

                  <p>
                    {theme.description}
                  </p>

                  <button
                    type="button"
                    className={
                      selectedTheme === theme.id
                        ? "theme-btn active"
                        : "theme-btn"
                    }
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTheme(theme.id);
                    }}
                  >
                    {selectedTheme === theme.id
                      ? "Selected"
                      : "Use This Theme"}
                  </button>

                </div>

              </div>

            ))}

          </div>

        </section>


        {/* SELECTED THEME */}

        <div className="selected-theme-info">

          <div className="selected-dot"></div>

          <span>
            Currently using
          </span>

          <strong>
            {selectedThemeName}
          </strong>

        </div>


        {/* BUILDER */}

        <div className="builder-layout">

          {/* FORM */}

          <div className="builder-form">

            <div className="portfolio-form-container">

              <div className="form-header">

                <div className="form-icon">
                  ✦
                </div>

                <div>

                  <span className="form-badge">
                    YOUR INFORMATION
                  </span>

                  <h2>
                    Create Your Portfolio
                  </h2>

                  <p>
                    Fill in your details and watch your portfolio
                    update instantly.
                  </p>

                </div>

              </div>


              <PortfolioForm
                portfolioData={portfolioData}
                setPortfolioData={setPortfolioData}
              />

            </div>

          </div>


          {/* PREVIEW */}

          <div className="builder-preview">

            <div className="preview-heading">

              <div>

                <span className="preview-live-dot"></span>

                <span>
                  Live Preview
                </span>

              </div>

              <small>
                {selectedThemeName}
              </small>

            </div>


            <PortfolioPreview
              portfolioData={portfolioData}
              selectedTheme={selectedTheme}
            />

          </div>

        </div>

      </div>
    </>
  );
}

export default PortfolioBuilder;