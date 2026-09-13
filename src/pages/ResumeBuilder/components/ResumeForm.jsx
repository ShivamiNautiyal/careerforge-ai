import { useState } from "react";
import "./ResumeForm.css";

import SkillsSection from "./SkillsSection";
import CertificationSection from "./CertificationSection";
import CareerObjective from "./CareerObjective";
import Strengths from "./Strengths";
import ProjectsForm from "./ProjectsForm";
import ExperienceForm from "./ExperienceForm";
function ResumeForm({ resumeData, setResumeData }) {

  const [openSection, setOpenSection] = useState("personal");

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? "" : section);
  };

  const handleChange = (e) => {
    setResumeData({
      ...resumeData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEducationChange = (index, e) => {

    const updatedEducation = [...resumeData.education];

    updatedEducation[index][e.target.name] = e.target.value;

    setResumeData({
      ...resumeData,
      education: updatedEducation,
    });
  };

  const addEducation = () => {

    setResumeData({
      ...resumeData,

      education: [
        ...resumeData.education,
        {
          college: "",
          degree: "",
          branch: "",
          startYear: "",
          endYear: "",
        },
      ],
    });
  };

  return (
    <div className="resume-form">

      {/* Personal Information */}
      <div className="form-section">

        <button
          className="section-header"
          onClick={() => toggleSection("personal")}
        >
          <span>Personal Information</span>
          <span>
            {openSection === "personal" ? "−" : "+"}
          </span>
        </button>

        {openSection === "personal" && (

          <div className="section-content">

            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={resumeData.fullName}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={resumeData.email}
              onChange={handleChange}
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={resumeData.phone}
              onChange={handleChange}
            />

            <input
              type="text"
              name="address"
              placeholder="Address"
              value={resumeData.address}
              onChange={handleChange}
            />

            <input
              type="text"
              name="linkedIn"
              placeholder="LinkedIn Profile"
              value={resumeData.linkedIn}
              onChange={handleChange}
            />

            <input
              type="text"
              name="github"
              placeholder="GitHub Profile"
              value={resumeData.github}
              onChange={handleChange}
            />

          </div>

        )}

      </div>


      {/* Professional Summary */}
      <div className="form-section">

        <button
          className="section-header"
          onClick={() => toggleSection("summary")}
        >
          <span>Professional Summary</span>
          <span>
            {openSection === "summary" ? "−" : "+"}
          </span>
        </button>

        {openSection === "summary" && (

          <div className="section-content">

            <textarea
              name="summary"
              rows="5"
              placeholder="Write your professional summary..."
              value={resumeData.summary}
              onChange={handleChange}
            />

          </div>

        )}

      </div>


      {/* Career Objective */}
      <div className="form-section">

        <button
          className="section-header"
          onClick={() => toggleSection("careerObjective")}
        >
          <span>Career Objective</span>

          <span>
            {openSection === "careerObjective" ? "−" : "+"}
          </span>

        </button>

        {openSection === "careerObjective" && (

          <div className="section-content">

            <CareerObjective
              resumeData={resumeData}
              setResumeData={setResumeData}
            />

          </div>

        )}

      </div>


      {/* Education */}
      <div className="form-section">

        <button
          className="section-header"
          onClick={() => toggleSection("education")}
        >
          <span>Education</span>

          <span>
            {openSection === "education" ? "−" : "+"}
          </span>

        </button>

        {openSection === "education" && (

          <div className="section-content">

            {resumeData.education.map((edu, index) => (

              <div
                key={index}
                className="education-box"
              >

                <input
                  type="text"
                  placeholder="College Name"
                  name="college"
                  value={edu.college}
                  onChange={(e) =>
                    handleEducationChange(index, e)
                  }
                />

                <input
                  type="text"
                  placeholder="Degree"
                  name="degree"
                  value={edu.degree}
                  onChange={(e) =>
                    handleEducationChange(index, e)
                  }
                />

                <input
                  type="text"
                  placeholder="Branch"
                  name="branch"
                  value={edu.branch}
                  onChange={(e) =>
                    handleEducationChange(index, e)
                  }
                />

                <input
                  type="text"
                  placeholder="Start Year"
                  name="startYear"
                  value={edu.startYear}
                  onChange={(e) =>
                    handleEducationChange(index, e)
                  }
                />

                <input
                  type="text"
                  placeholder="End Year"
                  name="endYear"
                  value={edu.endYear}
                  onChange={(e) =>
                    handleEducationChange(index, e)
                  }
                />

              </div>

            ))}

            <button
              type="button"
              onClick={addEducation}
            >
              + Add Education
            </button>

          </div>

        )}

      </div>


      {/* Skills */}
      <div className="form-section">

        <button
          className="section-header"
          onClick={() => toggleSection("skills")}
        >
          <span>Skills</span>

          <span>
            {openSection === "skills" ? "−" : "+"}
          </span>

        </button>

        {openSection === "skills" && (

          <div className="section-content">

            <SkillsSection
              resumeData={resumeData}
              setResumeData={setResumeData}
            />

          </div>

        )}

      </div>
{/* Projects */}

<div className="form-section">

  <button
    type="button"
    className="section-header"
    onClick={() => toggleSection("projects")}
  >
    <span>Projects</span>

    <span>
      {openSection === "projects" ? "−" : "+"}
    </span>
  </button>

  {openSection === "projects" && (

    <div className="section-content">

      <ProjectsForm
        resumeData={resumeData}
        setResumeData={setResumeData}
      />

    </div>

  )}

</div>
{/* Work Experience */}

<div className="form-section">

  <button
    type="button"
    className="section-header"
    onClick={() => toggleSection("experience")}
  >
    <span>Work Experience</span>

    <span>
      {openSection === "experience" ? "−" : "+"}
    </span>
  </button>

  {openSection === "experience" && (

    <div className="section-content">

      <ExperienceForm
        resumeData={resumeData}
        setResumeData={setResumeData}
      />

    </div>

  )}

</div>
      {/* Career Objective already above */}
      {/* Strengths */}
      <div className="form-section">

        <button
          className="section-header"
          onClick={() => toggleSection("strengths")}
        >
          <span>Strengths</span>

          <span>
            {openSection === "strengths" ? "−" : "+"}
          </span>

        </button>

        {openSection === "strengths" && (

          <div className="section-content">

            <Strengths
              resumeData={resumeData}
              setResumeData={setResumeData}
            />

          </div>

        )}

      </div>


      {/* Certifications */}
      <div className="form-section">

        <button
          className="section-header"
          onClick={() => toggleSection("certifications")}
        >
          <span>Certifications</span>

          <span>
            {openSection === "certifications" ? "−" : "+"}
          </span>

        </button>

        {openSection === "certifications" && (

          <div className="section-content">

            <CertificationSection
              resumeData={resumeData}
              setResumeData={setResumeData}
            />

          </div>

        )}

      </div>

    </div>
  );
}

export default ResumeForm;