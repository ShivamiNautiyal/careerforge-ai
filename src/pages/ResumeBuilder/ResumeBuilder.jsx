import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar/Navbar";
import ResumeForm from "./components/ResumeForm";
import ResumePreview from "./components/ResumePreview";
import "./ResumeBuilder.css";
import html2pdf from "html2pdf.js";

function ResumeBuilder() {
  const [isLoaded, setIsLoaded] = useState(false);

  // ================================
  // RESUME DATA
  // ================================

  const [resumeData, setResumeData] = useState({

    // Personal Information
    fullName: "",
    email: "",
    phone: "",
    address: "",
    linkedIn: "",
    github: "",

    // Professional Summary
    summary: "",

    // Career Objective
    careerObjective: "",

    // Education
    education: [
      {
        college: "",
        degree: "",
        branch: "",
        startYear: "",
        endYear: "",
      },
    ],

    // Skills
    skills: [],
    currentSkill: "",

    // Work Experience
    experiences: [
      {
        company: "",
        role: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],

    // Projects
    projects: [
      {
        projectName: "",
        technologies: "",
        github: "",
        liveDemo: "",
        description: "",
      },
    ],

    // Certifications
    certifications: [
      {
        name: "",
        organization: "",
        date: "",
        link: "",
      },
    ],

    // Strengths
    strengths: [],
    currentStrength: "",
  });


  // ================================
  // LOAD SAVED RESUME
  // ================================

 useEffect(() => {

  const savedResume = localStorage.getItem("careerforgeResume");

  if (savedResume) {
    setResumeData(JSON.parse(savedResume));
  }

  setIsLoaded(true);

}, []);


  // ================================
  // AUTO SAVE RESUME
  // ================================

 useEffect(() => {

  if (!isLoaded) {
    return;
  }

  localStorage.setItem(
    "careerforgeResume",
    JSON.stringify(resumeData)
  );

}, [resumeData, isLoaded]);

  // ================================
  // RESET RESUME
  // ================================

  const resetResume = () => {

    const confirmReset = window.confirm(
      "Are you sure you want to clear your entire resume?"
    );

    if (!confirmReset) {
      return;
    }

    const emptyResume = {

      fullName: "",
      email: "",
      phone: "",
      address: "",
      linkedIn: "",
      github: "",

      summary: "",

      careerObjective: "",

      education: [
        {
          college: "",
          degree: "",
          branch: "",
          startYear: "",
          endYear: "",
        },
      ],

      skills: [],
      currentSkill: "",

      experiences: [
        {
          company: "",
          role: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],

      projects: [
        {
          projectName: "",
          technologies: "",
          github: "",
          liveDemo: "",
          description: "",
        },
      ],

      certifications: [
        {
          name: "",
          organization: "",
          date: "",
          link: "",
        },
      ],

      strengths: [],
      currentStrength: "",
    };

    setResumeData(emptyResume);

    // Remove saved resume
    localStorage.removeItem("careerforgeResume");
  };


  // ================================
  // DOWNLOAD PDF
  // ================================

  const downloadPDF = () => {

    // Required field validation

    if (!resumeData.fullName.trim()) {
      alert("Please enter your Full Name.");
      return;
    }

    if (!resumeData.email.trim()) {
      alert("Please enter your Email.");
      return;
    }

    if (!resumeData.phone.trim()) {
      alert("Please enter your Phone Number.");
      return;
    }

    if (resumeData.skills.length === 0) {
      alert("Please add at least one Skill.");
      return;
    }


    // Check Education

    const hasEducation = resumeData.education.some(
      (edu) =>
        edu.college.trim() ||
        edu.degree.trim() ||
        edu.branch.trim()
    );

    if (!hasEducation) {
      alert("Please add your Education details.");
      return;
    }


    // Find Resume Preview

    const element = document.querySelector(".resume-page");

    if (!element) {
      alert("Resume preview not found!");
      return;
    }


    // PDF options

    const options = {

      margin: 0,

      filename: `${resumeData.fullName || "My-Resume"}.pdf`,

      image: {
        type: "jpeg",
        quality: 0.98,
      },

      html2canvas: {
        scale: 2,
        useCORS: true,
      },

      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      },

    };


    // Download

    html2pdf()
      .set(options)
      .from(element)
      .save();
  };


  // ================================
  // UI
  // ================================

  return (
    <>
      <Navbar />

      <div className="resume-builder">

        {/* LEFT SIDE - FORM */}

        <div className="resume-form-panel">

          <ResumeForm
            resumeData={resumeData}
            setResumeData={setResumeData}
          />

        </div>


        {/* RIGHT SIDE - PREVIEW */}

        <div className="resume-preview-panel">

          {/* DOWNLOAD BUTTON */}

          <button
            type="button"
            className="download-btn"
            onClick={downloadPDF}
          >
            Download Resume PDF
          </button>


          {/* RESET BUTTON */}

          <button
            type="button"
            className="reset-btn"
            onClick={resetResume}
          >
            Clear Resume
          </button>


          {/* RESUME PREVIEW */}

          <ResumePreview
            resumeData={resumeData}
          />

        </div>

      </div>
    </>
  );
}

export default ResumeBuilder;