import { useRef } from "react";

function PortfolioForm({ portfolioData, setPortfolioData }) {
  const projectImageRefs = useRef([]);

  /* ================= PERSONAL INFORMATION ================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPortfolioData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ================= PROFILE IMAGE ================= */

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setPortfolioData((prev) => ({
        ...prev,
        profileImage: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  /* ================= SKILLS ================= */

  const handleSkillChange = (e) => {
    setPortfolioData((prev) => ({
      ...prev,
      currentSkill: e.target.value,
    }));
  };

  const addSkill = () => {
    const skill = portfolioData.currentSkill?.trim();

    if (!skill) return;

    if (portfolioData.skills.includes(skill)) {
      alert("Skill already added.");
      return;
    }

    setPortfolioData((prev) => ({
      ...prev,
      skills: [...prev.skills, skill],
      currentSkill: "",
    }));
  };

  const removeSkill = (index) => {
    setPortfolioData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  /* ================= PROJECTS ================= */

  const addProject = () => {
    setPortfolioData((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          projectName: "",
          technologies: "",
          github: "",
          liveDemo: "",
          description: "",
          image: "",
        },
      ],
    }));
  };

  const removeProject = (index) => {
    setPortfolioData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));

    projectImageRefs.current.splice(index, 1);
  };

  const handleProjectChange = (index, e) => {
    const { name, value } = e.target;

    setPortfolioData((prev) => ({
      ...prev,
      projects: prev.projects.map((project, i) =>
        i === index
          ? {
              ...project,
              [name]: value,
            }
          : project
      ),
    }));
  };

  /* ================= PROJECT IMAGE ================= */

  const handleProjectImage = (index, e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Project image should be less than 5MB.");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setPortfolioData((prev) => ({
        ...prev,
        projects: prev.projects.map((project, i) =>
          i === index
            ? {
                ...project,
                image: reader.result,
              }
            : project
        ),
      }));
    };

    reader.readAsDataURL(file);
  };

  const removeProjectImage = (index) => {
    setPortfolioData((prev) => ({
      ...prev,
      projects: prev.projects.map((project, i) =>
        i === index
          ? {
              ...project,
              image: "",
            }
          : project
      ),
    }));

    if (projectImageRefs.current[index]) {
      projectImageRefs.current[index].value = "";
    }
  };

  /* ================= EXPERIENCE ================= */

  const addExperience = () => {
    setPortfolioData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          company: "",
          role: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    }));
  };

  const removeExperience = (index) => {
    setPortfolioData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  };

  const handleExperienceChange = (index, e) => {
    const { name, value } = e.target;

    setPortfolioData((prev) => ({
      ...prev,
      experience: prev.experience.map((item, i) =>
        i === index
          ? {
              ...item,
              [name]: value,
            }
          : item
      ),
    }));
  };

  /* ================= EDUCATION ================= */

  const addEducation = () => {
    setPortfolioData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          college: "",
          degree: "",
          branch: "",
          startYear: "",
          endYear: "",
        },
      ],
    }));
  };

  const removeEducation = (index) => {
    setPortfolioData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  const handleEducationChange = (index, e) => {
    const { name, value } = e.target;

    setPortfolioData((prev) => ({
      ...prev,
      education: prev.education.map((item, i) =>
        i === index
          ? {
              ...item,
              [name]: value,
            }
          : item
      ),
    }));
  };

  return (
    <div className="portfolio-form">

      {/* ================= PERSONAL INFORMATION ================= */}

      <div className="form-section">

        <div className="form-section-title">
          <span>👤</span>

          <div>
            <h3>Personal Information</h3>
            <p>Tell visitors who you are.</p>
          </div>
        </div>

        <div className="form-grid">

          <div className="input-group">
            <label>Full Name</label>

            <input
              type="text"
              name="fullName"
              value={portfolioData.fullName || ""}
              onChange={handleChange}
              placeholder="Enter your full name"
            />
          </div>

          <div className="input-group">
            <label>Professional Title</label>

            <input
              type="text"
              name="title"
              value={portfolioData.title || ""}
              onChange={handleChange}
              placeholder="Frontend Developer"
            />
          </div>

          <div className="input-group full-width">
            <label>Short Introduction</label>

            <input
              type="text"
              name="shortIntro"
              value={portfolioData.shortIntro || ""}
              onChange={handleChange}
              placeholder="I build modern and user-friendly web applications."
            />
          </div>

          <div className="input-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              value={portfolioData.email || ""}
              onChange={handleChange}
              placeholder="your@email.com"
            />
          </div>

          <div className="input-group">
            <label>Phone</label>

            <input
              type="text"
              name="phone"
              value={portfolioData.phone || ""}
              onChange={handleChange}
              placeholder="+91 XXXXX XXXXX"
            />
          </div>

          <div className="input-group">
            <label>Location</label>

            <input
              type="text"
              name="location"
              value={portfolioData.location || ""}
              onChange={handleChange}
              placeholder="Meerut, India"
            />
          </div>

          <div className="input-group">
            <label>LinkedIn</label>

            <input
              type="text"
              name="linkedin"
              value={portfolioData.linkedin || ""}
              onChange={handleChange}
              placeholder="LinkedIn profile URL"
            />
          </div>

          <div className="input-group">
            <label>GitHub</label>

            <input
              type="text"
              name="github"
              value={portfolioData.github || ""}
              onChange={handleChange}
              placeholder="GitHub profile URL"
            />
          </div>

        </div>

        {/* PROFILE IMAGE */}

        <div className="profile-upload">

          <label>Profile Picture</label>

          <div className="profile-upload-box">

            {portfolioData.profileImage ? (
              <img
                src={portfolioData.profileImage}
                alt="Profile"
                className="profile-upload-preview"
              />
            ) : (
              <div className="profile-placeholder">
                📷
              </div>
            )}

            <div className="profile-upload-content">

              <strong>Upload your picture</strong>

              <span>
                JPG, PNG or WEBP • Maximum 5MB
              </span>

              <label className="upload-button">

                Choose Image

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />

              </label>

            </div>

          </div>

        </div>

      </div>

      {/* ================= ABOUT ================= */}

      <div className="form-section">

        <div className="form-section-title">

          <span>📝</span>

          <div>
            <h3>About Me</h3>
            <p>Write a short description about yourself.</p>
          </div>

        </div>

        <div className="input-group">

          <label>About Me</label>

          <textarea
            name="about"
            value={portfolioData.about || ""}
            onChange={handleChange}
            rows="6"
            placeholder="Write about your skills, interests, experience and career goals..."
          />

        </div>

      </div>

      {/* ================= SKILLS ================= */}

      <div className="form-section">

        <div className="form-section-title">

          <span>⚡</span>

          <div>
            <h3>Skills</h3>
            <p>Add your technical and professional skills.</p>
          </div>

        </div>

        <div className="skill-input-row">

          <input
            type="text"
            value={portfolioData.currentSkill || ""}
            onChange={handleSkillChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addSkill();
              }
            }}
            placeholder="e.g. React"
          />

          <button
            type="button"
            onClick={addSkill}
            className="add-btn"
          >
            + Add Skill
          </button>

        </div>

        <div className="skills-list">

          {(portfolioData.skills || []).map((skill, index) => (

            <div
              className="skill-tag"
              key={`${skill}-${index}`}
            >

              <span>{skill}</span>

              <button
                type="button"
                onClick={() => removeSkill(index)}
              >
                ×
              </button>

            </div>

          ))}

        </div>

      </div>

      {/* ================= PROJECTS ================= */}

      <div className="form-section">

        <div className="form-section-title section-title-with-button">

          <div className="title-left">

            <span>💻</span>

            <div>
              <h3>Projects</h3>
              <p>Showcase your best projects.</p>
            </div>

          </div>

          <button
            type="button"
            className="add-section-btn"
            onClick={addProject}
          >
            + Add Project
          </button>

        </div>

        {(portfolioData.projects || []).map((project, index) => (

          <div
            className="dynamic-card"
            key={index}
          >

            <div className="dynamic-card-header">

              <h4>Project {index + 1}</h4>

              {portfolioData.projects.length > 1 && (

                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => removeProject(index)}
                >
                  Remove
                </button>

              )}

            </div>

            {/* PROJECT IMAGE */}

            <div className="project-image-upload">

              <label>Project Image</label>

              {project.image ? (

                <div className="project-image-preview">

                  <img
                    src={project.image}
                    alt={`Project ${index + 1}`}
                  />

                  <div className="project-image-actions">

                    <button
                      type="button"
                      onClick={() =>
                        projectImageRefs.current[index]?.click()
                      }
                    >
                      Change Image
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        removeProjectImage(index)
                      }
                    >
                      Remove
                    </button>

                  </div>

                </div>

              ) : (

                <label className="project-upload-box">

                  <span className="upload-icon">
                    🖼️
                  </span>

                  <strong>
                    Add Project Image
                  </strong>

                  <small>
                    JPG, PNG or WEBP • Maximum 5MB
                  </small>

                  <input
                    ref={(el) => {
                      projectImageRefs.current[index] = el;
                    }}
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleProjectImage(index, e)
                    }
                  />

                </label>

              )}

              {/* Hidden input for Change Image */}

              {project.image && (

                <input
                  ref={(el) => {
                    projectImageRefs.current[index] = el;
                  }}
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleProjectImage(index, e)
                  }
                  style={{ display: "none" }}
                />

              )}

            </div>

            {/* PROJECT DETAILS */}

            <div className="form-grid">

              <div className="input-group">

                <label>Project Name</label>

                <input
                  type="text"
                  name="projectName"
                  value={project.projectName || ""}
                  onChange={(e) =>
                    handleProjectChange(index, e)
                  }
                  placeholder="CareerForge AI"
                />

              </div>

              <div className="input-group">

                <label>Technologies</label>

                <input
                  type="text"
                  name="technologies"
                  value={project.technologies || ""}
                  onChange={(e) =>
                    handleProjectChange(index, e)
                  }
                  placeholder="React, JavaScript, CSS"
                />

              </div>

              <div className="input-group">

                <label>GitHub Link</label>

                <input
                  type="text"
                  name="github"
                  value={project.github || ""}
                  onChange={(e) =>
                    handleProjectChange(index, e)
                  }
                  placeholder="https://github.com/..."
                />

              </div>

              <div className="input-group">

                <label>Live Demo</label>

                <input
                  type="text"
                  name="liveDemo"
                  value={project.liveDemo || ""}
                  onChange={(e) =>
                    handleProjectChange(index, e)
                  }
                  placeholder="https://..."
                />

              </div>

              <div className="input-group full-width">

                <label>Project Description</label>

                <textarea
                  name="description"
                  value={project.description || ""}
                  onChange={(e) =>
                    handleProjectChange(index, e)
                  }
                  rows="4"
                  placeholder="Describe what you built and the main features..."
                />

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* ================= EXPERIENCE ================= */}

      <div className="form-section">

        <div className="form-section-title section-title-with-button">

          <div className="title-left">

            <span>💼</span>

            <div>
              <h3>Experience</h3>
              <p>Add internships and work experience.</p>
            </div>

          </div>

          <button
            type="button"
            className="add-section-btn"
            onClick={addExperience}
          >
            + Add Experience
          </button>

        </div>

        {(portfolioData.experience || []).map((item, index) => (

          <div
            className="dynamic-card"
            key={index}
          >

            <div className="dynamic-card-header">

              <h4>Experience {index + 1}</h4>

              {portfolioData.experience.length > 1 && (

                <button
                  type="button"
                  className="remove-btn"
                  onClick={() =>
                    removeExperience(index)
                  }
                >
                  Remove
                </button>

              )}

            </div>

            <div className="form-grid">

              <div className="input-group">

                <label>Company</label>

                <input
                  type="text"
                  name="company"
                  value={item.company || ""}
                  onChange={(e) =>
                    handleExperienceChange(index, e)
                  }
                  placeholder="Company Name"
                />

              </div>

              <div className="input-group">

                <label>Role</label>

                <input
                  type="text"
                  name="role"
                  value={item.role || ""}
                  onChange={(e) =>
                    handleExperienceChange(index, e)
                  }
                  placeholder="Frontend Developer Intern"
                />

              </div>

              <div className="input-group">

                <label>Start Date</label>

                <input
                  type="month"
                  name="startDate"
                  value={item.startDate || ""}
                  onChange={(e) =>
                    handleExperienceChange(index, e)
                  }
                />

              </div>

              <div className="input-group">

                <label>End Date</label>

                <input
                  type="month"
                  name="endDate"
                  value={item.endDate || ""}
                  onChange={(e) =>
                    handleExperienceChange(index, e)
                  }
                />

              </div>

              <div className="input-group full-width">

                <label>Description</label>

                <textarea
                  name="description"
                  value={item.description || ""}
                  onChange={(e) =>
                    handleExperienceChange(index, e)
                  }
                  rows="4"
                  placeholder="Describe your responsibilities and achievements..."
                />

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* ================= EDUCATION ================= */}

      <div className="form-section">

        <div className="form-section-title section-title-with-button">

          <div className="title-left">

            <span>🎓</span>

            <div>
              <h3>Education</h3>
              <p>Add your academic background.</p>
            </div>

          </div>

          <button
            type="button"
            className="add-section-btn"
            onClick={addEducation}
          >
            + Add Education
          </button>

        </div>

        {(portfolioData.education || []).map((item, index) => (

          <div
            className="dynamic-card"
            key={index}
          >

            <div className="dynamic-card-header">

              <h4>Education {index + 1}</h4>

              {portfolioData.education.length > 1 && (

                <button
                  type="button"
                  className="remove-btn"
                  onClick={() =>
                    removeEducation(index)
                  }
                >
                  Remove
                </button>

              )}

            </div>

            <div className="form-grid">

              <div className="input-group full-width">

                <label>College / University</label>

                <input
                  type="text"
                  name="college"
                  value={item.college || ""}
                  onChange={(e) =>
                    handleEducationChange(index, e)
                  }
                  placeholder="College / University Name"
                />

              </div>

              <div className="input-group">

                <label>Degree</label>

                <input
                  type="text"
                  name="degree"
                  value={item.degree || ""}
                  onChange={(e) =>
                    handleEducationChange(index, e)
                  }
                  placeholder="B.Tech"
                />

              </div>

              <div className="input-group">

                <label>Branch</label>

                <input
                  type="text"
                  name="branch"
                  value={item.branch || ""}
                  onChange={(e) =>
                    handleEducationChange(index, e)
                  }
                  placeholder="Information Technology"
                />

              </div>

              <div className="input-group">

                <label>Start Year</label>

                <input
                  type="text"
                  name="startYear"
                  value={item.startYear || ""}
                  onChange={(e) =>
                    handleEducationChange(index, e)
                  }
                  placeholder="2022"
                />

              </div>

              <div className="input-group">

                <label>End Year</label>

                <input
                  type="text"
                  name="endYear"
                  value={item.endYear || ""}
                  onChange={(e) =>
                    handleEducationChange(index, e)
                  }
                  placeholder="2026"
                />

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default PortfolioForm;