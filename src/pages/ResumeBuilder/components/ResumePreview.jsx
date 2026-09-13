import "./ResumePreview.css";

function ResumePreview({ resumeData }) {
  return (
    <div className="resume-page">

      {/* =====================================================
          PERSONAL INFORMATION / HEADER
      ===================================================== */}

      <header className="resume-header">

        {resumeData.fullName && (
          <h1>{resumeData.fullName}</h1>
        )}

        <div className="contact-info">

          {resumeData.email && (
            <span>{resumeData.email}</span>
          )}

          {resumeData.phone && (
            <span>{resumeData.phone}</span>
          )}

          {resumeData.address && (
            <span>{resumeData.address}</span>
          )}

        </div>

        <div className="profile-links">

          {resumeData.linkedIn && (
            <a
              href={
                resumeData.linkedIn.startsWith("http")
                  ? resumeData.linkedIn
                  : `https://${resumeData.linkedIn}`
              }
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          )}

          {resumeData.github && (
            <a
              href={
                resumeData.github.startsWith("http")
                  ? resumeData.github
                  : `https://${resumeData.github}`
              }
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          )}

        </div>

      </header>


      {/* =====================================================
          PROFESSIONAL SUMMARY
      ===================================================== */}

      {resumeData.summary && (
        <section className="resume-section">

          <h2>Professional Summary</h2>

          <p className="section-text">
            {resumeData.summary}
          </p>

        </section>
      )}


      {/* =====================================================
          EDUCATION
      ===================================================== */}

      {resumeData.education?.some(
        (edu) =>
          edu.college ||
          edu.degree ||
          edu.branch ||
          edu.startYear ||
          edu.endYear
      ) && (

        <section className="resume-section">

          <h2>Education</h2>

          {resumeData.education.map((edu, index) => {

            if (
              !edu.college &&
              !edu.degree &&
              !edu.branch &&
              !edu.startYear &&
              !edu.endYear
            ) {
              return null;
            }

            return (
              <div
                className="education-item"
                key={index}
              >

                <div className="education-top">

                  <div>

                    {edu.degree && (
                      <strong>
                        {edu.degree}

                        {edu.branch &&
                          ` - ${edu.branch}`
                        }
                      </strong>
                    )}

                  </div>

                  {(edu.startYear || edu.endYear) && (
                    <span className="date">

                      {edu.startYear}

                      {edu.startYear &&
                        edu.endYear &&
                        " - "
                      }

                      {edu.endYear}

                    </span>
                  )}

                </div>

                {edu.college && (
                  <p className="institution">
                    {edu.college}
                  </p>
                )}

              </div>
            );
          })}

        </section>
      )}


      {/* =====================================================
          SKILLS
      ===================================================== */}

      {resumeData.skills?.length > 0 && (

        <section className="resume-section">

          <h2>Skills</h2>

          <ul className="skills-list">

            {resumeData.skills.map(
              (skill, index) => (
                <li key={index}>
                  {skill}
                </li>
              )
            )}

          </ul>

        </section>
      )}


      {/* =====================================================
          PROJECTS
      ===================================================== */}

      {resumeData.projects?.some(
        (project) =>
          project.projectName ||
          project.technologies ||
          project.description ||
          project.github ||
          project.liveDemo
      ) && (

        <section className="resume-section">

          <h2>Projects</h2>

          {resumeData.projects.map(
            (project, index) => {

              if (
                !project.projectName &&
                !project.technologies &&
                !project.description &&
                !project.github &&
                !project.liveDemo
              ) {
                return null;
              }

              return (
                <div
                  className="project-item"
                  key={index}
                >

                  <div className="project-heading">

                    {project.projectName && (
                      <strong>
                        {project.projectName}
                      </strong>
                    )}

                    {project.technologies && (
                      <span className="technologies">
                        {project.technologies}
                      </span>
                    )}

                  </div>

                  {project.description && (
                    <p className="project-description">
                      {project.description}
                    </p>
                  )}

                  {(project.github ||
                    project.liveDemo) && (

                    <div className="project-links">

                      {project.github && (
                        <a
                          href={
                            project.github.startsWith("http")
                              ? project.github
                              : `https://${project.github}`
                          }
                          target="_blank"
                          rel="noreferrer"
                        >
                          GitHub
                        </a>
                      )}

                      {project.liveDemo && (
                        <a
                          href={
                            project.liveDemo.startsWith("http")
                              ? project.liveDemo
                              : `https://${project.liveDemo}`
                          }
                          target="_blank"
                          rel="noreferrer"
                        >
                          Live Demo
                        </a>
                      )}

                    </div>
                  )}

                </div>
              );
            }
          )}

        </section>
      )}


      {/* =====================================================
          WORK EXPERIENCE
      ===================================================== */}

      {resumeData.experiences?.some(
        (experience) =>
          experience.company ||
          experience.role ||
          experience.startDate ||
          experience.endDate ||
          experience.description
      ) && (

        <section className="resume-section">

          <h2>Work Experience</h2>

          {resumeData.experiences.map(
            (experience, index) => {

              if (
                !experience.company &&
                !experience.role &&
                !experience.startDate &&
                !experience.endDate &&
                !experience.description
              ) {
                return null;
              }

              return (
                <div
                  className="experience-item"
                  key={index}
                >

                  <div className="experience-top">

                    <div>

                      {experience.role && (
                        <strong>
                          {experience.role}
                        </strong>
                      )}

                      {experience.company && (
                        <p className="company-name">
                          {experience.company}
                        </p>
                      )}

                    </div>

                    {(experience.startDate ||
                      experience.endDate) && (

                      <span className="date">

                        {experience.startDate}

                        {experience.startDate &&
                          experience.endDate &&
                          " - "
                        }

                        {experience.endDate}

                      </span>

                    )}

                  </div>

                  {experience.description && (
                    <p className="experience-description">
                      {experience.description}
                    </p>
                  )}

                </div>
              );
            }
          )}

        </section>
      )}


      {/* =====================================================
          CERTIFICATIONS
      ===================================================== */}

      {resumeData.certifications?.some(
        (certification) =>
          certification.name ||
          certification.organization ||
          certification.date ||
          certification.link
      ) && (

        <section className="resume-section">

          <h2>Certifications</h2>

          {resumeData.certifications.map(
            (certification, index) => {

              if (
                !certification.name &&
                !certification.organization &&
                !certification.date &&
                !certification.link
              ) {
                return null;
              }

              return (
                <div
                  className="certification-item"
                  key={index}
                >

                  <div className="certification-top">

                    {certification.name && (
                      <strong>
                        {certification.name}
                      </strong>
                    )}

                    {certification.date && (
                      <span className="date">
                        {certification.date}
                      </span>
                    )}

                  </div>

                  {certification.organization && (
                    <p className="certification-organization">
                      {certification.organization}
                    </p>
                  )}

                  {certification.link && (
                    <a
                      className="certificate-link"
                      href={
                        certification.link.startsWith("http")
                          ? certification.link
                          : `https://${certification.link}`
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      View Certificate
                    </a>
                  )}

                </div>
              );
            }
          )}

        </section>
      )}


      {/* =====================================================
          STRENGTHS
      ===================================================== */}

      {resumeData.strengths?.length > 0 && (

        <section className="resume-section">

          <h2>Strengths</h2>

          <ul className="strengths-list">

            {resumeData.strengths.map(
              (strength, index) => (
                <li key={index}>
                  {strength}
                </li>
              )
            )}

          </ul>

        </section>
      )}


      {/* =====================================================
          CAREER OBJECTIVE - LAST
      ===================================================== */}

      {resumeData.careerObjective && (

        <section className="resume-section career-objective">

          <h2>Career Objective</h2>

          <p className="section-text">
            {resumeData.careerObjective}
          </p>

        </section>
      )}
      

    </div>
  );
}

export default ResumePreview;