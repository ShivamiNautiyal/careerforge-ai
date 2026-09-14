import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./PortfolioAnalyzer.css";

/* =========================================================
   EMPTY PORTFOLIO
========================================================= */

const emptyPortfolio = {
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
  skills: "",
  projects: "",
  experience: "",
  education: ""
};

/* =========================================================
   CONVERT SAVED PORTFOLIO DATA
========================================================= */

function convertPortfolioData(data) {
  return {
    fullName: data.fullName || "",
    title: data.title || "",
    shortIntro: data.shortIntro || "",
    email: data.email || "",
    phone: data.phone || "",
    location: data.location || "",
    linkedin: data.linkedin || "",
    github: data.github || "",
    about: data.about || "",
    profileImage: data.profileImage || "",

    skills: Array.isArray(data.skills)
      ? data.skills.join(", ")
      : data.skills || "",

    projects: Array.isArray(data.projects)
      ? data.projects
          .map((project) => project.projectName)
          .filter(Boolean)
          .join(", ")
      : data.projects || "",

    experience: Array.isArray(data.experience)
      ? data.experience
          .map(
            (item) =>
              `${item.role || ""} at ${item.company || ""}`
          )
          .filter((item) => item.trim() !== "at")
          .join("\n")
      : data.experience || "",

    education: Array.isArray(data.education)
      ? data.education
          .map(
            (item) =>
              `${item.degree || ""} ${
                item.branch || ""
              } - ${item.college || ""}`
          )
          .filter((item) => item.trim() !== "-")
          .join("\n")
      : data.education || ""
  };
}

/* =========================================================
   COMPONENT
========================================================= */

function PortfolioAnalyzer() {
  const [portfolioData, setPortfolioData] =
    useState(emptyPortfolio);

  const [result, setResult] = useState(null);

  const [activeCategory, setActiveCategory] =
    useState("All");

  const [isAnalyzing, setIsAnalyzing] =
    useState(false);

  const [message, setMessage] = useState("");

  /* =========================================================
     LOAD SAVED PORTFOLIO
  ========================================================= */

  useEffect(() => {
    const savedPortfolio = localStorage.getItem(
      "careerforgePortfolioData"
    );

    if (!savedPortfolio) {
      return;
    }

    try {
      const parsedData = JSON.parse(savedPortfolio);

      const convertedData =
        convertPortfolioData(parsedData);

      setPortfolioData(convertedData);
    } catch (error) {
      console.error(
        "Error loading saved portfolio:",
        error
      );
    }
  }, []);

  /* =========================================================
     INPUT CHANGE
  ========================================================= */

  const handleChange = (event) => {
    const { name, value } = event.target;

    setPortfolioData((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  /* =========================================================
     ANALYZE PORTFOLIO
  ========================================================= */

  const analyzePortfolio = () => {
    setIsAnalyzing(true);
    setMessage("");

    setTimeout(() => {
      let score = 0;

      const strengths = [];
      const suggestions = [];

      /* =====================================================
         PROFILE SCORE - 25
      ===================================================== */

      let profileScore = 0;

      if (portfolioData.fullName.trim()) {
        profileScore += 5;

        strengths.push(
          "Your portfolio has a clear name/profile identity."
        );
      } else {
        suggestions.push(
          "Add your full name to your portfolio."
        );
      }

      if (portfolioData.title.trim()) {
        profileScore += 5;

        strengths.push(
          "Your professional title is present."
        );
      } else {
        suggestions.push(
          "Add a clear professional title such as Frontend Developer."
        );
      }

      if (
        portfolioData.shortIntro.trim().length >= 30
      ) {
        profileScore += 5;
      } else {
        suggestions.push(
          "Write a stronger short introduction of at least 30 characters."
        );
      }

      if (
        portfolioData.about.trim().length >= 50
      ) {
        profileScore += 5;
      } else {
        suggestions.push(
          "Add a detailed About section explaining your skills, interests and career goals."
        );
      }

      if (portfolioData.location.trim()) {
        profileScore += 5;
      } else {
        suggestions.push(
          "Consider adding your location so recruiters have more context."
        );
      }

      score += profileScore;

      /* =====================================================
         SKILLS SCORE - 15
      ===================================================== */

      const skills = portfolioData.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean);

      let skillsScore = 0;

      if (skills.length >= 5) {
        skillsScore = 15;

        strengths.push(
          "Your portfolio contains a good range of technical skills."
        );
      } else if (skills.length >= 3) {
        skillsScore = 10;

        suggestions.push(
          "Consider adding more relevant technical skills."
        );
      } else if (skills.length > 0) {
        skillsScore = 5;

        suggestions.push(
          "Add more relevant technical skills to strengthen your profile."
        );
      } else {
        suggestions.push(
          "Add a dedicated skills section."
        );
      }

      score += skillsScore;

      /* =====================================================
         PROJECTS SCORE - 20
      ===================================================== */

      const projects = portfolioData.projects
        .split(",")
        .map((project) => project.trim())
        .filter(Boolean);

      let projectsScore = 0;

      if (projects.length >= 3) {
        projectsScore = 20;

        strengths.push(
          "Your portfolio demonstrates multiple projects."
        );
      } else if (projects.length === 2) {
        projectsScore = 14;

        suggestions.push(
          "Add at least one more strong project."
        );
      } else if (projects.length === 1) {
        projectsScore = 8;

        suggestions.push(
          "Try to showcase 2–3 meaningful projects."
        );
      } else {
        suggestions.push(
          "Add projects that demonstrate your practical skills."
        );
      }

      score += projectsScore;

      /* =====================================================
         EXPERIENCE SCORE - 15
      ===================================================== */

      let experienceScore = 0;

      if (portfolioData.experience.trim()) {
        experienceScore = 15;

        strengths.push(
          "Your portfolio includes experience information."
        );
      } else {
        suggestions.push(
          "Add internship, freelance or work experience if available."
        );
      }

      score += experienceScore;

      /* =====================================================
         EDUCATION SCORE - 10
      ===================================================== */

      let educationScore = 0;

      if (portfolioData.education.trim()) {
        educationScore = 10;

        strengths.push(
          "Your educational background is included."
        );
      } else {
        suggestions.push(
          "Add your education details."
        );
      }

      score += educationScore;

      /* =====================================================
         SOCIAL LINKS SCORE - 10
      ===================================================== */

      let socialScore = 0;

      if (portfolioData.github.trim()) {
        socialScore += 5;

        strengths.push(
          "GitHub profile is linked."
        );
      } else {
        suggestions.push(
          "Add your GitHub profile so recruiters can view your code."
        );
      }

      if (portfolioData.linkedin.trim()) {
        socialScore += 5;

        strengths.push(
          "LinkedIn profile is linked."
        );
      } else {
        suggestions.push(
          "Add your LinkedIn profile for professional visibility."
        );
      }

      score += socialScore;

      /* =====================================================
         CONTACT CHECK
      ===================================================== */

      if (!portfolioData.email.trim()) {
        suggestions.push(
          "Add a professional email address."
        );
      }

      if (!portfolioData.phone.trim()) {
        suggestions.push(
          "Consider adding a phone number if appropriate for your portfolio."
        );
      }

      /* =====================================================
         NORMALIZE SCORE TO 100

         Original category maximum:
         Profile = 25
         Skills = 15
         Projects = 20
         Experience = 15
         Education = 10
         Social Links = 10

         Total = 95
      ===================================================== */

      const normalizedScore = Math.round(
        (score / 95) * 100
      );

      /* =====================================================
         CATEGORY SCORES
      ===================================================== */

      const categoryScores = [
        {
          name: "Profile",
          score: Math.round(
            (profileScore / 25) * 100
          ),
          icon: "👤"
        },
        {
          name: "Skills",
          score: Math.round(
            (skillsScore / 15) * 100
          ),
          icon: "⚡"
        },
        {
          name: "Projects",
          score: Math.round(
            (projectsScore / 20) * 100
          ),
          icon: "🚀"
        },
        {
          name: "Experience",
          score: Math.round(
            (experienceScore / 15) * 100
          ),
          icon: "💼"
        },
        {
          name: "Education",
          score: Math.round(
            (educationScore / 10) * 100
          ),
          icon: "🎓"
        },
        {
          name: "Social Links",
          score: Math.round(
            (socialScore / 10) * 100
          ),
          icon: "🔗"
        }
      ];

      /* =====================================================
         SCORE MESSAGE
      ===================================================== */

      let scoreMessage = "";

      if (normalizedScore >= 85) {
        scoreMessage =
          "Excellent portfolio! Only a few improvements are needed.";
      } else if (normalizedScore >= 70) {
        scoreMessage =
          "Strong portfolio with some areas that can be improved.";
      } else if (normalizedScore >= 50) {
        scoreMessage =
          "Good foundation, but several important sections need improvement.";
      } else {
        scoreMessage =
          "Your portfolio needs some important improvements before sharing it with recruiters.";
      }

      /* =====================================================
         SAVE RESULT
      ===================================================== */

      setResult({
        score: normalizedScore,
        scoreMessage,
        strengths: [...new Set(strengths)],
        suggestions: [...new Set(suggestions)],
        categoryScores
      });

      setActiveCategory("All");
      setIsAnalyzing(false);
    }, 700);
  };

  /* =========================================================
     RESET
  ========================================================= */

  const resetAnalyzer = () => {
    setPortfolioData(emptyPortfolio);
    setResult(null);
    setActiveCategory("All");
    setMessage("");
  };

  /* =========================================================
     CATEGORY FILTER
  ========================================================= */

  const filteredCategories = useMemo(() => {
    if (!result) {
      return [];
    }

    if (activeCategory === "All") {
      return result.categoryScores;
    }

    return result.categoryScores.filter(
      (category) =>
        category.name === activeCategory
    );
  }, [result, activeCategory]);

  /* =========================================================
     SCORE LABEL
  ========================================================= */

  const getScoreLabel = (score) => {
    if (score >= 85) {
      return "Excellent";
    }

    if (score >= 70) {
      return "Strong";
    }

    if (score >= 50) {
      return "Needs Improvement";
    }

    return "Needs Work";
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <>
      <Navbar />

      <div className="portfolio-analyzer-page">

        {/* =================================================
            HERO
        ================================================= */}

        <section className="portfolio-analyzer-hero">

          <div className="portfolio-analyzer-hero-content">

            <span className="portfolio-analyzer-badge">
              🔍 Portfolio Analysis
            </span>

            <h1>
              Analyze Your Portfolio.
              <span>
                Make It Recruiter Ready.
              </span>
            </h1>

            <p>
              Get a structured analysis of your
              portfolio profile, skills, projects,
              experience, education and professional
              links.
            </p>

            <div className="portfolio-analyzer-hero-points">
              <span>✓ Profile Analysis</span>
              <span>✓ Skills Review</span>
              <span>✓ Project Strength</span>
              <span>✓ Recruiter Suggestions</span>
            </div>

          </div>

        </section>

        {/* =================================================
            MAIN
        ================================================= */}

        <main className="portfolio-analyzer-container">

          {/* =================================================
              INPUT SECTION
          ================================================= */}

          {!result && (
            <section className="portfolio-input-card">

              <div className="portfolio-section-heading">

                <div>
                  <span className="portfolio-small-label">
                    STEP 01
                  </span>

                  <h2>
                    Analyze Your Portfolio
                  </h2>

                  <p>
                    Your saved CareerForge portfolio
                    will be loaded automatically.
                    You can also edit the information
                    below before running the analysis.
                  </p>
                </div>

                <div className="portfolio-heading-icon">
                  🔍
                </div>

              </div>

              {/* =================================================
                  PROFILE
              ================================================= */}

              <div className="portfolio-form-section">

                <div className="portfolio-form-section-title">
                  <span>👤</span>

                  <div>
                    <h3>
                      Profile Information
                    </h3>

                    <p>
                      Basic information recruiters
                      see first.
                    </p>
                  </div>
                </div>

                <div className="portfolio-form-grid">

                  <div className="portfolio-input-group">

                    <label>
                      Full Name
                    </label>

                    <input
                      name="fullName"
                      value={
                        portfolioData.fullName
                      }
                      onChange={handleChange}
                      placeholder="Your full name"
                    />

                  </div>

                  <div className="portfolio-input-group">

                    <label>
                      Professional Title
                    </label>

                    <input
                      name="title"
                      value={
                        portfolioData.title
                      }
                      onChange={handleChange}
                      placeholder="Frontend Developer"
                    />

                  </div>

                  <div className="portfolio-input-group full-width">

                    <label>
                      Short Introduction
                    </label>

                    <textarea
                      name="shortIntro"
                      value={
                        portfolioData.shortIntro
                      }
                      onChange={handleChange}
                      placeholder="Write a short introduction about yourself..."
                      rows="3"
                    />

                  </div>

                  <div className="portfolio-input-group full-width">

                    <label>
                      About
                    </label>

                    <textarea
                      name="about"
                      value={
                        portfolioData.about
                      }
                      onChange={handleChange}
                      placeholder="Tell recruiters about your background, skills, interests and career goals..."
                      rows="5"
                    />

                  </div>

                </div>

              </div>

              {/* =================================================
                  CONTACT
              ================================================= */}

              <div className="portfolio-form-section">

                <div className="portfolio-form-section-title">
                  <span>📞</span>

                  <div>
                    <h3>
                      Contact Information
                    </h3>

                    <p>
                      Make it easy for recruiters
                      to contact you.
                    </p>
                  </div>
                </div>

                <div className="portfolio-form-grid">

                  <div className="portfolio-input-group">

                    <label>
                      Email
                    </label>

                    <input
                      name="email"
                      value={
                        portfolioData.email
                      }
                      onChange={handleChange}
                      placeholder="you@example.com"
                    />

                  </div>

                  <div className="portfolio-input-group">

                    <label>
                      Phone
                    </label>

                    <input
                      name="phone"
                      value={
                        portfolioData.phone
                      }
                      onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX"
                    />

                  </div>

                  <div className="portfolio-input-group">

                    <label>
                      Location
                    </label>

                    <input
                      name="location"
                      value={
                        portfolioData.location
                      }
                      onChange={handleChange}
                      placeholder="Meerut, India"
                    />

                  </div>

                </div>

              </div>

              {/* =================================================
                  SKILLS
              ================================================= */}

              <div className="portfolio-form-section">

                <div className="portfolio-form-section-title">
                  <span>⚡</span>

                  <div>
                    <h3>
                      Technical Skills
                    </h3>

                    <p>
                      Separate multiple skills with
                      commas.
                    </p>
                  </div>
                </div>

                <div className="portfolio-input-group">

                  <label>
                    Skills
                  </label>

                  <textarea
                    name="skills"
                    value={
                      portfolioData.skills
                    }
                    onChange={handleChange}
                    placeholder="React, JavaScript, HTML, CSS, Git..."
                    rows="3"
                  />

                </div>

              </div>

              {/* =================================================
                  PROJECTS
              ================================================= */}

              <div className="portfolio-form-section">

                <div className="portfolio-form-section-title">
                  <span>🚀</span>

                  <div>
                    <h3>
                      Projects
                    </h3>

                    <p>
                      Add project names separated
                      by commas.
                    </p>
                  </div>
                </div>

                <div className="portfolio-input-group">

                  <label>
                    Projects
                  </label>

                  <textarea
                    name="projects"
                    value={
                      portfolioData.projects
                    }
                    onChange={handleChange}
                    placeholder="CareerForge AI, SafeTourist, TextUtils..."
                    rows="3"
                  />

                </div>

              </div>

              {/* =================================================
                  EXPERIENCE
              ================================================= */}

              <div className="portfolio-form-section">

                <div className="portfolio-form-section-title">
                  <span>💼</span>

                  <div>
                    <h3>
                      Experience
                    </h3>

                    <p>
                      Add internship, freelance or
                      professional experience.
                    </p>
                  </div>
                </div>

                <div className="portfolio-input-group">

                  <label>
                    Experience
                  </label>

                  <textarea
                    name="experience"
                    value={
                      portfolioData.experience
                    }
                    onChange={handleChange}
                    placeholder="Frontend Developer Intern at XYZ Company"
                    rows="3"
                  />

                </div>

              </div>

              {/* =================================================
                  EDUCATION
              ================================================= */}

              <div className="portfolio-form-section">

                <div className="portfolio-form-section-title">
                  <span>🎓</span>

                  <div>
                    <h3>
                      Education
                    </h3>

                    <p>
                      Add your latest educational
                      qualification.
                    </p>
                  </div>
                </div>

                <div className="portfolio-input-group">

                  <label>
                    Education
                  </label>

                  <textarea
                    name="education"
                    value={
                      portfolioData.education
                    }
                    onChange={handleChange}
                    placeholder="B.Tech - Information Technology - MIET"
                    rows="3"
                  />

                </div>

              </div>

              {/* =================================================
                  SOCIAL
              ================================================= */}

              <div className="portfolio-form-section">

                <div className="portfolio-form-section-title">
                  <span>🔗</span>

                  <div>
                    <h3>
                      Professional Links
                    </h3>

                    <p>
                      Add links recruiters can use to
                      explore your work.
                    </p>
                  </div>
                </div>

                <div className="portfolio-form-grid">

                  <div className="portfolio-input-group">

                    <label>
                      GitHub
                    </label>

                    <input
                      name="github"
                      value={
                        portfolioData.github
                      }
                      onChange={handleChange}
                      placeholder="GitHub profile URL"
                    />

                  </div>

                  <div className="portfolio-input-group">

                    <label>
                      LinkedIn
                    </label>

                    <input
                      name="linkedin"
                      value={
                        portfolioData.linkedin
                      }
                      onChange={handleChange}
                      placeholder="LinkedIn profile URL"
                    />

                  </div>

                </div>

              </div>

              {/* =================================================
                  MESSAGE
              ================================================= */}

              {message && (
                <div className="portfolio-info-message">
                  💡 {message}
                </div>
              )}

              {/* =================================================
                  ACTIONS
              ================================================= */}

              <div className="portfolio-analyzer-actions">

                <button
                  className="portfolio-analyze-button"
                  onClick={analyzePortfolio}
                  disabled={isAnalyzing}
                >
                  {isAnalyzing
                    ? "Analyzing Portfolio..."
                    : "🔍 Analyze My Portfolio"}
                </button>

                <button
                  className="portfolio-reset-button"
                  onClick={resetAnalyzer}
                >
                  ↻ Clear
                </button>

              </div>

            </section>
          )}

          {/* =================================================
              RESULTS
          ================================================= */}

          {result && (
            <section className="portfolio-results">

              {/* =================================================
                  RESULT HEADER
              ================================================= */}

              <div className="portfolio-results-header">

                <div>
                  <span className="portfolio-small-label">
                    ANALYSIS COMPLETE
                  </span>

                  <h2>
                    Your Portfolio Score
                  </h2>

                  <p>
                    Here is a structured review of
                    your portfolio and the areas you
                    can improve.
                  </p>
                </div>

                <button
                  className="portfolio-new-analysis"
                  onClick={resetAnalyzer}
                >
                  ↻ Analyze Again
                </button>

              </div>

              {/* =================================================
                  SCORE HERO
              ================================================= */}

              <div className="portfolio-score-card">

                <div className="portfolio-score-circle">

                  <div>
                    <strong>
                      {result.score}
                    </strong>

                    <span>
                      /100
                    </span>
                  </div>

                </div>

                <div className="portfolio-score-content">

                  <span className="portfolio-score-label">
                    {getScoreLabel(
                      result.score
                    )}
                  </span>

                  <h2>
                    {result.scoreMessage}
                  </h2>

                  <p>
                    This score is based on the
                    information available in your
                    portfolio. It is a rule-based
                    CareerForge analysis, not a
                    guaranteed recruiter or ATS score.
                  </p>

                </div>

              </div>

              {/* =================================================
                  CATEGORY FILTER
              ================================================= */}

              <div className="portfolio-result-toolbar">

                <div className="portfolio-category-filters">

                  <button
                    className={
                      activeCategory === "All"
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setActiveCategory("All")
                    }
                  >
                    All
                  </button>

                  {result.categoryScores.map(
                    (category) => (
                      <button
                        key={category.name}
                        className={
                          activeCategory ===
                          category.name
                            ? "active"
                            : ""
                        }
                        onClick={() =>
                          setActiveCategory(
                            category.name
                          )
                        }
                      >
                        {category.icon}{" "}
                        {category.name}
                      </button>
                    )
                  )}

                </div>

              </div>

              {/* =================================================
                  CATEGORY CARDS
              ================================================= */}

              <div className="portfolio-category-grid">

                {filteredCategories.map(
                  (category) => (
                    <div
                      className="portfolio-category-card"
                      key={category.name}
                    >

                      <div className="category-card-top">

                        <div className="category-icon">
                          {category.icon}
                        </div>

                        <div>
                          <h3>
                            {category.name}
                          </h3>

                          <span>
                            {category.score >= 85
                              ? "Excellent"
                              : category.score >= 70
                              ? "Strong"
                              : category.score >= 50
                              ? "Needs Improvement"
                              : "Needs Work"}
                          </span>
                        </div>

                        <strong>
                          {category.score}%
                        </strong>

                      </div>

                      <div className="category-progress">

                        <div
                          style={{
                            width: `${category.score}%`
                          }}
                        />

                      </div>

                    </div>
                  )
                )}

              </div>

              {/* =================================================
                  STRENGTHS + SUGGESTIONS
              ================================================= */}

              <div className="portfolio-insights-grid">

                {/* STRENGTHS */}

                <div className="portfolio-insight-card strengths-card">

                  <div className="insight-heading">

                    <div className="insight-icon">
                      ✓
                    </div>

                    <div>
                      <h3>
                        What You're Doing Well
                      </h3>

                      <p>
                        Strong areas detected in
                        your portfolio.
                      </p>
                    </div>

                  </div>

                  {result.strengths.length > 0 ? (
                    <ul className="insight-list">

                      {result.strengths.map(
                        (strength, index) => (
                          <li key={index}>
                            <span>✓</span>
                            {strength}
                          </li>
                        )
                      )}

                    </ul>
                  ) : (
                    <div className="empty-insight">
                      No major strengths detected
                      yet. Improve your profile and
                      run the analysis again.
                    </div>
                  )}

                </div>

                {/* SUGGESTIONS */}

                <div className="portfolio-insight-card suggestions-card">

                  <div className="insight-heading">

                    <div className="insight-icon">
                      💡
                    </div>

                    <div>
                      <h3>
                        Recommended Improvements
                      </h3>

                      <p>
                        Actions that can make your
                        portfolio stronger.
                      </p>
                    </div>

                  </div>

                  {result.suggestions.length > 0 ? (
                    <ul className="insight-list">

                      {result.suggestions.map(
                        (suggestion, index) => (
                          <li key={index}>
                            <span>
                              {index + 1}
                            </span>
                            {suggestion}
                          </li>
                        )
                      )}

                    </ul>
                  ) : (
                    <div className="empty-insight">
                      Great! No major improvements
                      were detected.
                    </div>
                  )}

                </div>

              </div>

              {/* =================================================
                  FINAL CHECKLIST
              ================================================= */}

              <div className="portfolio-final-check">

                <div className="final-check-heading">

                  <div className="final-check-icon">
                    🎯
                  </div>

                  <div>
                    <h2>
                      Recruiter-Ready Checklist
                    </h2>

                    <p>
                      Before sharing your portfolio,
                      make sure these basics are
                      covered.
                    </p>
                  </div>

                </div>

                <div className="checklist-grid">

                  {/* NAME */}

                  <div
                    className={
                      portfolioData.fullName.trim()
                        ? "check-item done"
                        : "check-item"
                    }
                  >
                    <span>
                      {portfolioData.fullName.trim()
                        ? "✓"
                        : "○"}
                    </span>

                    <div>
                      <strong>
                        Professional Name
                      </strong>

                      <small>
                        Clear identity
                      </small>
                    </div>
                  </div>

                  {/* TITLE */}

                  <div
                    className={
                      portfolioData.title.trim()
                        ? "check-item done"
                        : "check-item"
                    }
                  >
                    <span>
                      {portfolioData.title.trim()
                        ? "✓"
                        : "○"}
                    </span>

                    <div>
                      <strong>
                        Professional Title
                      </strong>

                      <small>
                        Target role is clear
                      </small>
                    </div>
                  </div>

                  {/* SKILLS */}

                  <div
                    className={
                      portfolioData.skills
                        .split(",")
                        .map((skill) =>
                          skill.trim()
                        )
                        .filter(Boolean).length >= 3
                        ? "check-item done"
                        : "check-item"
                    }
                  >
                    <span>
                      {portfolioData.skills
                        .split(",")
                        .map((skill) =>
                          skill.trim()
                        )
                        .filter(Boolean).length >= 3
                        ? "✓"
                        : "○"}
                    </span>

                    <div>
                      <strong>
                        Technical Skills
                      </strong>

                      <small>
                        3+ relevant skills
                      </small>
                    </div>
                  </div>

                  {/* PROJECTS */}

                  <div
                    className={
                      portfolioData.projects
                        .split(",")
                        .map((project) =>
                          project.trim()
                        )
                        .filter(Boolean).length >= 2
                        ? "check-item done"
                        : "check-item"
                    }
                  >
                    <span>
                      {portfolioData.projects
                        .split(",")
                        .map((project) =>
                          project.trim()
                        )
                        .filter(Boolean).length >= 2
                        ? "✓"
                        : "○"}
                    </span>

                    <div>
                      <strong>
                        Projects
                      </strong>

                      <small>
                        2+ meaningful projects
                      </small>
                    </div>
                  </div>

                  {/* GITHUB */}

                  <div
                    className={
                      portfolioData.github.trim()
                        ? "check-item done"
                        : "check-item"
                    }
                  >
                    <span>
                      {portfolioData.github.trim()
                        ? "✓"
                        : "○"}
                    </span>

                    <div>
                      <strong>
                        GitHub
                      </strong>

                      <small>
                        Code profile linked
                      </small>
                    </div>
                  </div>

                  {/* LINKEDIN */}

                  <div
                    className={
                      portfolioData.linkedin.trim()
                        ? "check-item done"
                        : "check-item"
                    }
                  >
                    <span>
                      {portfolioData.linkedin.trim()
                        ? "✓"
                        : "○"}
                    </span>

                    <div>
                      <strong>
                        LinkedIn
                      </strong>

                      <small>
                        Professional profile
                      </small>
                    </div>
                  </div>

                </div>

              </div>

            </section>
          )}

        </main>

        {/* =================================================
            FOOTER
        ================================================= */}

        <footer className="portfolio-analyzer-footer">

          <strong>
            CareerForge AI
          </strong>

          <span>
            Build better. Present better. Get
            interview ready.
          </span>

        </footer>

      </div>
    </>
  );
}

export default PortfolioAnalyzer;