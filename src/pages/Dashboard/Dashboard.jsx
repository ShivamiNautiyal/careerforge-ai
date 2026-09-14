import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";

import {
  FaFileAlt,
  FaUserTie,
  FaChartBar,
  FaGlobe,
  FaCode,
  FaLaptopCode,
  FaArrowRight,
  FaCheckCircle,
  FaRocket,
  FaBriefcase,
  FaLayerGroup,
  FaLightbulb,
} from "react-icons/fa";

import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [resumeReady, setResumeReady] = useState(false);
  const [portfolioReady, setPortfolioReady] = useState(false);

  useEffect(() => {
    try {
      const savedResume = localStorage.getItem("careerforgeResume");
      const savedPortfolio = localStorage.getItem(
        "careerforgePortfolioData"
      );

      if (savedResume) {
        const resume = JSON.parse(savedResume);

        if (
          resume?.fullName ||
          resume?.email ||
          resume?.skills?.length > 0
        ) {
          setResumeReady(true);
        }
      }

      if (savedPortfolio) {
        const portfolio = JSON.parse(savedPortfolio);

        if (
          portfolio?.fullName ||
          portfolio?.title ||
          portfolio?.about
        ) {
          setPortfolioReady(true);
        }
      }
    } catch (error) {
      console.log("Dashboard data check failed:", error);
    }
  }, []);

  const features = [
    {
      icon: <FaFileAlt />,
      title: "Resume Builder",
      description:
        "Create a professional, ATS-friendly resume with an easy step-by-step builder.",
      path: "/resume-builder",
      tag: resumeReady ? "Saved" : "Build Now",
      tagType: resumeReady ? "success" : "default",
    },
    {
      icon: <FaChartBar />,
      title: "Resume Analyzer",
      description:
        "Analyze your resume and identify areas that can be improved for better job applications.",
      path: "/resume-analyzer",
      tag: "Analyze",
      tagType: "default",
    },
    {
      icon: <FaGlobe />,
      title: "Portfolio Builder",
      description:
        "Build a modern developer portfolio to showcase your skills, projects and experience.",
      path: "/portfolio-builder",
      tag: portfolioReady ? "Saved" : "Create",
      tagType: portfolioReady ? "success" : "default",
    },
    {
      icon: <FaLaptopCode />,
      title: "Portfolio Analyzer",
      description:
        "Review your portfolio structure and get practical suggestions to make it stronger.",
      path: "/portfolio-analyzer",
      tag: "Review",
      tagType: "default",
    },
    {
      icon: <FaUserTie />,
      title: "Interview Prep",
      description:
        "Prepare interview notes and questions based on your resume, skills and technology stack.",
      path: "/interview-prep",
      tag: "Prepare",
      tagType: "default",
    },
    {
      icon: <FaCode />,
      title: "Code Explainer",
      description:
        "Understand JavaScript, React, Java, HTML and CSS code with simple line-by-line explanations.",
      path: "/code-explainer",
      tag: "Learn",
      tagType: "default",
    },
  ];

  return (
    <>
      <Navbar />

      <main className="cf-dashboard">

        {/* HERO SECTION */}
        <section className="cf-hero">

          <div className="cf-hero-content">

            <div className="cf-badge">
              <FaRocket />
              <span>SMART CAREER WORKSPACE</span>
            </div>

            <h1>
              Build your career.
              <br />
              <span>Stand out with confidence.</span>
            </h1>

            <p>
              CareerForge AI brings your resume, portfolio, interview
              preparation and coding learning tools together in one
              professional workspace.
            </p>

            <div className="cf-hero-buttons">

              <button
                className="cf-primary-btn"
                onClick={() => navigate("/resume-builder")}
              >
                Build My Resume
                <FaArrowRight />
              </button>

              <button
                className="cf-secondary-btn"
                onClick={() => navigate("/portfolio-builder")}
              >
                Create Portfolio
              </button>

            </div>

          </div>

          {/* HERO VISUAL */}
          <div className="cf-hero-visual">

            <div className="cf-glow cf-glow-one"></div>
            <div className="cf-glow cf-glow-two"></div>

            <div className="cf-dashboard-preview">

              <div className="cf-preview-top">
                <div>
                  <span className="cf-preview-small">
                    CAREER PROFILE
                  </span>

                  <h3>Your Career Toolkit</h3>
                </div>

                <div className="cf-preview-icon">
                  <FaBriefcase />
                </div>
              </div>

              <div className="cf-preview-progress">

                <div className="cf-progress-header">
                  <span>Career Setup</span>
                  <strong>
                    {resumeReady && portfolioReady
                      ? "2 / 2"
                      : resumeReady || portfolioReady
                      ? "1 / 2"
                      : "0 / 2"}
                  </strong>
                </div>

                <div className="cf-progress-bar">
                  <div
                    style={{
                      width:
                        resumeReady && portfolioReady
                          ? "100%"
                          : resumeReady || portfolioReady
                          ? "50%"
                          : "10%",
                    }}
                  ></div>
                </div>

              </div>

              <div className="cf-preview-items">

                <div className="cf-preview-item">
                  <div className="cf-item-icon">
                    <FaFileAlt />
                  </div>

                  <div>
                    <strong>Professional Resume</strong>
                    <span>
                      {resumeReady
                        ? "Resume saved"
                        : "Ready to build"}
                    </span>
                  </div>

                  {resumeReady && (
                    <FaCheckCircle className="cf-check" />
                  )}
                </div>

                <div className="cf-preview-item">
                  <div className="cf-item-icon">
                    <FaGlobe />
                  </div>

                  <div>
                    <strong>Developer Portfolio</strong>
                    <span>
                      {portfolioReady
                        ? "Portfolio saved"
                        : "Ready to create"}
                    </span>
                  </div>

                  {portfolioReady && (
                    <FaCheckCircle className="cf-check" />
                  )}
                </div>

              </div>

            </div>

          </div>

        </section>


        {/* QUICK STATS */}
        <section className="cf-stats">

          <div className="cf-stat-card">
            <div className="cf-stat-icon">
              <FaLayerGroup />
            </div>

            <div>
              <strong>06</strong>
              <span>Career Tools</span>
            </div>
          </div>

          <div className="cf-stat-card">
            <div className="cf-stat-icon">
              <FaFileAlt />
            </div>

            <div>
              <strong>02</strong>
              <span>Profile Builders</span>
            </div>
          </div>

          <div className="cf-stat-card">
            <div className="cf-stat-icon">
              <FaChartBar />
            </div>

            <div>
              <strong>02</strong>
              <span>Analyzers</span>
            </div>
          </div>

          <div className="cf-stat-card">
            <div className="cf-stat-icon">
              <FaLightbulb />
            </div>

            <div>
              <strong>02</strong>
              <span>Learning Tools</span>
            </div>
          </div>

        </section>


        {/* FEATURES SECTION */}
        <section className="cf-features-section">

          <div className="cf-section-heading">

            <div>
              <span className="cf-section-label">
                YOUR CAREER TOOLKIT
              </span>

              <h2>
                Everything you need
                <br />
                to move forward.
              </h2>
            </div>

            <p>
              Create your professional profile, improve your
              applications and prepare for technical interviews —
              all from one place.
            </p>

          </div>


          <div className="cf-feature-grid">

            {features.map((feature, index) => (
              <div
                className="cf-feature-card"
                key={feature.title}
                onClick={() => navigate(feature.path)}
              >

                <div className="cf-feature-top">

                  <div className="cf-feature-icon">
                    {feature.icon}
                  </div>

                  <span
                    className={`cf-feature-tag ${
                      feature.tagType === "success"
                        ? "cf-success-tag"
                        : ""
                    }`}
                  >
                    {feature.tag}
                  </span>

                </div>

                <h3>{feature.title}</h3>

                <p>{feature.description}</p>

                <button
                  className="cf-feature-link"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(feature.path);
                  }}
                >
                  Open Tool
                  <FaArrowRight />
                </button>

              </div>
            ))}

          </div>

        </section>


        {/* CAREER WORKFLOW */}
        <section className="cf-workflow">

          <div className="cf-workflow-header">

            <span className="cf-section-label">
              SIMPLE WORKFLOW
            </span>

            <h2>
              From preparation to opportunity.
            </h2>

            <p>
              Follow a simple career-building workflow and keep
              improving every stage of your professional profile.
            </p>

          </div>


          <div className="cf-workflow-grid">

            <div className="cf-workflow-step">

              <div className="cf-step-number">01</div>

              <div className="cf-step-icon">
                <FaFileAlt />
              </div>

              <h3>Build</h3>

              <p>
                Create your resume and portfolio with your
                education, skills, projects and experience.
              </p>

            </div>


            <div className="cf-workflow-line"></div>


            <div className="cf-workflow-step">

              <div className="cf-step-number">02</div>

              <div className="cf-step-icon">
                <FaChartBar />
              </div>

              <h3>Improve</h3>

              <p>
                Analyze your professional profiles and identify
                areas that need improvement.
              </p>

            </div>


            <div className="cf-workflow-line"></div>


            <div className="cf-workflow-step">

              <div className="cf-step-number">03</div>

              <div className="cf-step-icon">
                <FaUserTie />
              </div>

              <h3>Prepare</h3>

              <p>
                Study interview notes and practice questions
                based on your skills and resume.
              </p>

            </div>


            <div className="cf-workflow-line"></div>


            <div className="cf-workflow-step">

              <div className="cf-step-number">04</div>

              <div className="cf-step-icon">
                <FaRocket />
              </div>

              <h3>Apply</h3>

              <p>
                Use your polished resume and portfolio to apply
                confidently for opportunities.
              </p>

            </div>

          </div>

        </section>


        {/* BOTTOM CTA */}
        <section className="cf-bottom-cta">

          <div>

            <span className="cf-section-label">
              READY TO START?
            </span>

            <h2>
              Forge your next career opportunity.
            </h2>

            <p>
              Start with your resume and build your professional
              profile step by step.
            </p>

          </div>

          <button
            className="cf-primary-btn"
            onClick={() => navigate("/resume-builder")}
          >
            Get Started
            <FaArrowRight />
          </button>

        </section>


        {/* FOOTER */}
        <footer className="cf-dashboard-footer">

          <div>
            <strong>CareerForge AI</strong>
            <span>
              Smart tools for your career journey.
            </span>
          </div>

          <p>
            Build • Improve • Prepare • Grow
          </p>

        </footer>

      </main>
    </>
  );
}

export default Dashboard;