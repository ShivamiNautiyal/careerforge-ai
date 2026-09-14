import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import html2pdf from "html2pdf.js";

import Navbar from "../../components/Navbar/Navbar";
import PortfolioForm from "./PortfolioForm";
import PortfolioPreview from "./PortfolioPreview";
import "./PortfolioBuilder.css";

function PortfolioBuilder() {
  const defaultPortfolioData = {
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
        description: "",
      },
    ],
    experience: [
      {
        company: "",
        role: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    education: [
      {
        college: "",
        degree: "",
        branch: "",
        startYear: "",
        endYear: "",
      },
    ],
  };

  // Load saved portfolio
  const [portfolioData, setPortfolioData] = useState(() => {
    try {
      const savedData = localStorage.getItem(
        "careerforgePortfolioData"
      );

      if (savedData) {
        return JSON.parse(savedData);
      }

      return defaultPortfolioData;
    } catch (error) {
      console.error("Error loading portfolio data:", error);
      return defaultPortfolioData;
    }
  });

  // Load saved theme
  const [selectedTheme, setSelectedTheme] = useState(() => {
    return (
      localStorage.getItem("careerforgePortfolioTheme") ||
      "aurora"
    );
  });

  // Auto-save portfolio
  useEffect(() => {
    try {
      localStorage.setItem(
        "careerforgePortfolioData",
        JSON.stringify(portfolioData)
      );
    } catch (error) {
      console.error(
        "Unable to save portfolio data:",
        error
      );
    }
  }, [portfolioData]);

  // Auto-save theme
  useEffect(() => {
    localStorage.setItem(
      "careerforgePortfolioTheme",
      selectedTheme
    );
  }, [selectedTheme]);

  const themes = [
    {
      id: "aurora",
      name: "Aurora Professional",
      description:
        "Premium blue-purple design for professional portfolios.",
    },
    {
      id: "midnight",
      name: "Midnight Developer",
      description:
        "Dark modern theme for developers and tech professionals.",
    },
    {
      id: "glass",
      name: "Glass Premium",
      description:
        "Elegant glassmorphism design with a premium feel.",
    },
    {
      id: "creative",
      name: "Creative Gradient",
      description:
        "Colorful and energetic design for creative developers.",
    },
    {
      id: "minimal",
      name: "Minimal Elegant",
      description:
        "Clean, simple and professional portfolio design.",
    },
    {
      id: "ocean",
      name: "Ocean Tech",
      description:
        "Fresh cyan-blue design inspired by modern technology.",
    },
  ];

  const selectedThemeName =
    themes.find(
      (theme) => theme.id === selectedTheme
    )?.name || "Aurora Professional";

  // ==============================
  // DOWNLOAD PORTFOLIO PDF
  // ==============================
const downloadPortfolioPDF = async () => {
  if (!portfolioData.fullName.trim()) {
    alert("Please enter your name before downloading.");
    return;
  }

  const element = document.querySelector(".portfolio-preview");

  if (!element) {
    alert("Portfolio preview not found.");
    return;
  }

  try {
    const images = element.querySelectorAll("img");

    await Promise.all(
      Array.from(images).map((img) => {
        if (img.complete) {
          return Promise.resolve();
        }

        return new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      })
    );

    const options = {
      margin: 10,

      filename: `${portfolioData.fullName.replace(
        /\s+/g,
        "-"
      )}-Portfolio.pdf`,

      image: {
        type: "jpeg",
        quality: 0.95,
      },

      html2canvas: {
        scale: 1.5,
        useCORS: true,
        allowTaint: true,
        logging: false,
      },

      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      },

      pagebreak: {
        mode: ["css", "legacy"],
      },
    };

    await html2pdf()
      .set(options)
      .from(element)
      .save();

  } catch (error) {
    console.error(
      "PDF generation error:",
      error
    );

    alert(
      "Unable to download portfolio PDF."
    );
  }
};
 
  // ==============================
  // URL-SAFE BASE64 ENCODING
  // ==============================

  const createPortfolioLink = () => {
    const portfolioInfo = {
      data: portfolioData,
      theme: selectedTheme,
    };

    const jsonData = JSON.stringify(portfolioInfo);

    // Unicode safe encoding
    const encodedUnicode = encodeURIComponent(jsonData);

    // Convert Unicode string to binary
    const binaryString = encodedUnicode.replace(
      /%([0-9A-F]{2})/g,
      function (match, p1) {
        return String.fromCharCode(
          parseInt(p1, 16)
        );
      }
    );

    // Base64
    const base64Data = btoa(binaryString);

    // Make Base64 URL-safe
    const urlSafeBase64 = base64Data
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/g, "");

    const portfolioLink =
      `${window.location.origin}` +
      `${process.env.PUBLIC_URL || ""}` +
      `/#/portfolio?data=${urlSafeBase64}`;

    return portfolioLink;
  };

  // ==============================
  // COPY PORTFOLIO LINK
  // ==============================

  const generatePortfolioLink = async () => {
    if (!portfolioData.fullName.trim()) {
      alert("Please enter your name first.");
      return;
    }

    try {
      const portfolioLink = createPortfolioLink();

      console.log(
        "Generated Portfolio Link:",
        portfolioLink
      );

      await navigator.clipboard.writeText(
        portfolioLink
      );

      alert(
        "Portfolio link copied successfully! 🎉\n\nOpen it in a new browser to test."
      );
    } catch (error) {
      console.error(
        "Unable to generate portfolio link:",
        error
      );

      alert(
        "Unable to copy portfolio link."
      );
    }
  };

  // ==============================
  // CLEAR DATA
  // ==============================

  const clearPortfolioData = () => {
    const confirmClear = window.confirm(
      "Are you sure you want to clear your saved portfolio data?"
    );

    if (!confirmClear) {
      return;
    }

    localStorage.removeItem(
      "careerforgePortfolioData"
    );

    localStorage.removeItem(
      "careerforgePortfolioTheme"
    );

    setPortfolioData({
      ...defaultPortfolioData,
      projects: [
        {
          projectName: "",
          image: "",
          technologies: "",
          github: "",
          liveDemo: "",
          description: "",
        },
      ],
      experience: [
        {
          company: "",
          role: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
      education: [
        {
          college: "",
          degree: "",
          branch: "",
          startYear: "",
          endYear: "",
        },
      ],
    });

    setSelectedTheme("aurora");

    alert(
      "Portfolio data cleared successfully."
    );
  };

  return (
    <>
      <Navbar />

      <div className="portfolio-builder">

        {/* ================= HEADER ================= */}

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
            Create a stunning developer portfolio
            with beautiful themes, live preview
            and customizable sections.
          </p>

        </div>

        {/* ================= THEME SECTION ================= */}

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
                Pick a design that matches your
                personality and professional style.
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
                  selectedTheme === theme.id
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  setSelectedTheme(theme.id)
                }
              >

                <div
                  className={`theme-preview ${theme.id}`}
                >

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

                      setSelectedTheme(
                        theme.id
                      );
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

        {/* ================= SELECTED THEME ================= */}

        <div className="selected-theme-info">

          <div className="selected-dot"></div>

          <span>
            Currently using
          </span>

          <strong>
            {selectedThemeName}
          </strong>

        </div>

        {/* ================= BUILDER ================= */}

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
                    Fill in your details and watch
                    your portfolio update instantly.
                  </p>

                </div>

              </div>

              <PortfolioForm
                portfolioData={portfolioData}
                setPortfolioData={
                  setPortfolioData
                }
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

            {/* ACTION BUTTONS */}

            <div className="portfolio-actions">

              <button
                type="button"
                className="portfolio-action-btn pdf-btn"
                onClick={
                  downloadPortfolioPDF
                }
              >
                📄 Download Portfolio PDF
              </button>

              <button
                type="button"
                className="portfolio-action-btn link-btn"
                onClick={
                  generatePortfolioLink
                }
              >
                🔗 Copy Portfolio Link
              </button>

              <Link
                to="/portfolio"
                className="portfolio-action-btn open-btn"
                onClick={() => {

                  localStorage.setItem(
                    "careerforgePortfolioData",
                    JSON.stringify(
                      portfolioData
                    )
                  );

                  localStorage.setItem(
                    "careerforgePortfolioTheme",
                    selectedTheme
                  );

                }}
              >
                🌐 Open Portfolio
              </Link>

              <button
                type="button"
                className="portfolio-action-btn clear-btn"
                onClick={
                  clearPortfolioData
                }
              >
                🗑 Clear Saved Data
              </button>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default PortfolioBuilder;