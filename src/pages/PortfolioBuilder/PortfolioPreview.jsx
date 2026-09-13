import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaArrowDown,
  FaExternalLinkAlt
} from "react-icons/fa";

function PortfolioPreview({
  portfolioData,
  selectedTheme
}) {

  const {
    fullName,
    title,
    shortIntro,
    email,
    phone,
    location,
    linkedin,
    github,
    about,
    profileImage,
    skills,
    projects,
    experience,
    education
  } = portfolioData;


  const scrollToSection = (id) => {

    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth"
      });
    }

  };


  const validProjects = projects?.filter(
  project =>
    project.projectName ||
    project.description ||
    project.image
) || [];

  const validExperience =
    experience?.filter(
      (item) =>
        item.company ||
        item.role
    ) || [];


  const validEducation =
    education?.filter(
      (item) =>
        item.college ||
        item.degree
    ) || [];


  return (

    <div
      className={`portfolio-preview theme-${selectedTheme}`}
    >

      {/* NAVBAR */}

      <nav className="portfolio-nav">

        <div className="portfolio-logo">

          {fullName
            ? fullName.split(" ").map(word => word[0]).join("").slice(0, 2)
            : "CF"}

        </div>


        <div className="portfolio-nav-links">

          <button onClick={() => scrollToSection("home")}>
            Home
          </button>

          <button onClick={() => scrollToSection("about")}>
            About
          </button>

          <button onClick={() => scrollToSection("skills")}>
            Skills
          </button>

          <button onClick={() => scrollToSection("projects")}>
            Projects
          </button>

          <button onClick={() => scrollToSection("experience")}>
            Experience
          </button>

          <button onClick={() => scrollToSection("education")}>
            Education
          </button>

        </div>

      </nav>


      {/* HERO */}

      <section
        id="home"
        className="portfolio-hero"
      >

        <div className="hero-background-shape shape-one"></div>
        <div className="hero-background-shape shape-two"></div>


        <div className="hero-content">

          <span className="hero-small-text">
            HELLO, I'M
          </span>

          <h1>
            {fullName || "Your Name"}
          </h1>

          <h2>
            {title || "Your Professional Title"}
          </h2>

          <p className="hero-about">

            {shortIntro ||
              "Add a short introduction about yourself from the portfolio form."}

          </p>


          <div className="hero-buttons">

            <button
              className="primary-btn"
              onClick={() => scrollToSection("projects")}
            >
              View My Work
              <FaArrowDown />
            </button>


            <button
              className="secondary-btn"
              onClick={() => scrollToSection("contact")}
            >
              Contact Me
            </button>

          </div>


          {/* SOCIAL */}

          <div className="hero-socials">

            {github && (
              <a
                href={github}
                target="_blank"
                rel="noreferrer"
              >
                <FaGithub />
              </a>
            )}

            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedin />
              </a>
            )}

            {email && (
              <a href={`mailto:${email}`}>
                <FaEnvelope />
              </a>
            )}

          </div>

        </div>


        {/* PROFILE IMAGE */}

        <div className="hero-image-wrapper">

          <div className="hero-image-ring">

            {profileImage ? (

              <img
                src={profileImage}
                alt={fullName || "Profile"}
              />

            ) : (

              <div className="default-profile">

                {fullName
                  ? fullName.charAt(0).toUpperCase()
                  : "Y"}

              </div>

            )}

          </div>

          <div className="floating-badge">
            ✦ Available for opportunities
          </div>

        </div>

      </section>


      {/* ABOUT */}

      {(about || location) && (

        <section
          id="about"
          className="portfolio-section about-section"
        >

          <div className="section-title">

            <span>
              ABOUT ME
            </span>

            <h2>
              A Little About Me
            </h2>

          </div>


          <div className="about-content">

            {about && (
              <p>
                {about}
              </p>
            )}


            {location && (

              <div className="info-pill">

                <FaMapMarkerAlt />

                <span>
                  {location}
                </span>

              </div>

            )}

          </div>

        </section>

      )}


      {/* SKILLS */}

      {skills?.length > 0 && (

        <section
          id="skills"
          className="portfolio-section"
        >

          <div className="section-title">

            <span>
              MY EXPERTISE
            </span>

            <h2>
              Skills & Technologies
            </h2>

          </div>


          <div className="skills-grid">

            {skills.map((skill, index) => (

              <div
                className="skill-card"
                key={index}
              >

                <div className="skill-number">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <h3>
                  {skill}
                </h3>

                <div className="skill-line"></div>

              </div>

            ))}

          </div>

        </section>

      )}


     {/* PROJECTS */}

{validProjects.length > 0 && (

  <section
    id="projects"
    className="portfolio-section projects-section"
  >

    <div className="section-title">

      <span>
        MY WORK
      </span>

      <h2>
        Featured Projects
      </h2>

      <p>
        Some of the projects I've worked on.
      </p>

    </div>


    <div className="projects-grid">

      {validProjects.map(
        (project, index) => (

          <div
            className="project-card"
            key={index}
          >

            {/* PROJECT IMAGE */}

            <div className="project-image-preview">

              {project.image ? (

                <img
                  src={project.image}
                  alt={
                    project.projectName ||
                    "Project preview"
                  }
                />

              ) : (

                <div className="project-image-placeholder">

                  <span>
                    🚀
                  </span>

                  <small>
                    Project Preview
                  </small>

                </div>

              )}

              <div className="project-number">
                0{index + 1}
              </div>

            </div>


            {/* PROJECT CONTENT */}

            <div className="project-content">

              <h3>
                {project.projectName ||
                  "Project"}
              </h3>


              {project.description && (

                <p>
                  {project.description}
                </p>

              )}


              {project.technologies && (

                <div className="technology-list">

                  {project.technologies
                    .split(",")
                    .map(
                      (tech, i) => (

                        <span key={i}>
                          {tech.trim()}
                        </span>

                      )
                    )}

                </div>

              )}


              <div className="project-links">

                {project.github && (

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaGithub />
                    GitHub
                  </a>

                )}


                {project.liveDemo && (

                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaExternalLinkAlt />
                    Live Demo
                  </a>

                )}

              </div>

            </div>

          </div>

        )
      )}

    </div>

  </section>

)}


      {/* EXPERIENCE */}

      {validExperience.length > 0 && (

        <section
          id="experience"
          className="portfolio-section"
        >

          <div className="section-title">

            <span>
              MY JOURNEY
            </span>

            <h2>
              Experience
            </h2>

          </div>


          <div className="timeline">

            {validExperience.map(
              (item, index) => (

                <div
                  className="timeline-item"
                  key={index}
                >

                  <div className="timeline-dot"></div>

                  <div className="timeline-content">

                    <div className="timeline-date">

                      {item.startDate || ""}
                      {" — "}
                      {item.endDate || "Present"}

                    </div>

                    <h3>
                      {item.role || "Role"}
                    </h3>

                    <h4>
                      {item.company || "Company"}
                    </h4>

                    <p>
                      {item.description}
                    </p>

                  </div>

                </div>

              )
            )}

          </div>

        </section>

      )}


      {/* EDUCATION */}

      {validEducation.length > 0 && (

        <section
          id="education"
          className="portfolio-section education-section"
        >

          <div className="section-title">

            <span>
              EDUCATION
            </span>

            <h2>
              Academic Background
            </h2>

          </div>


          <div className="education-grid">

            {validEducation.map(
              (item, index) => (

                <div
                  className="education-card"
                  key={index}
                >

                  <span className="education-year">

                    {item.startYear || ""}
                    {item.endYear &&
                      ` — ${item.endYear}`}

                  </span>

                  <h3>
                    {item.degree || "Degree"}
                  </h3>

                  <p>
                    {item.branch}
                  </p>

                  <strong>
                    {item.college}
                  </strong>

                </div>

              )
            )}

          </div>

        </section>

      )}


      {/* CONTACT */}

      <section
        id="contact"
        className="portfolio-section contact-section"
      >

        <div className="section-title">

          <span>
            GET IN TOUCH
          </span>

          <h2>
            Let's Connect
          </h2>

          <p>
            Have a project or opportunity?
            I'd love to hear from you.
          </p>

        </div>


        <div className="contact-grid">

          {email && (

            <a
              href={`mailto:${email}`}
              className="contact-card"
            >

              <FaEnvelope />

              <div>

                <span>
                  Email
                </span>

                <strong>
                  {email}
                </strong>

              </div>

            </a>

          )}


          {phone && (

            <a
              href={`tel:${phone}`}
              className="contact-card"
            >

              <FaPhone />

              <div>

                <span>
                  Phone
                </span>

                <strong>
                  {phone}
                </strong>

              </div>

            </a>

          )}


          {linkedin && (

            <a
              href={linkedin}
              target="_blank"
              rel="noreferrer"
              className="contact-card"
            >

              <FaLinkedin />

              <div>

                <span>
                  LinkedIn
                </span>

                <strong>
                  View Profile
                </strong>

              </div>

            </a>

          )}

        </div>

      </section>


      {/* FOOTER */}

      <footer className="portfolio-footer">

        <div className="footer-logo">

          {fullName || "Your Name"}

        </div>

        <p>
          Built with CareerForge AI ✦
        </p>

      </footer>

    </div>

  );
}

export default PortfolioPreview;