import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";

import * as pdfjsLib from "pdfjs-dist";
import mammoth from "mammoth";

import "./ResumeAnalyzer.css";

pdfjsLib.GlobalWorkerOptions.workerSrc =
  `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

function ResumeAnalyzer() {

  const [file, setFile] = useState(null);
  const [resumeText, setResumeText] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const [jobDescription, setJobDescription] = useState("");
  const [jobMatch, setJobMatch] = useState(null);
  const [matching, setMatching] = useState(false);


  /* =========================================
     FILE SELECT
  ========================================= */

  const handleFileChange = (e) => {

    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    const fileType = selectedFile.type;

    const isPDF =
      fileType === "application/pdf";

    const isDOCX =
      fileType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

    if (!isPDF && !isDOCX) {
      alert("Please upload a PDF or DOCX file.");
      return;
    }

    setFile(selectedFile);
    setResumeText("");
    setAnalysis(null);
    setJobMatch(null);
  };


  /* =========================================
     PDF TEXT EXTRACTION
  ========================================= */

  const extractPDFText = async (file) => {

    const arrayBuffer = await file.arrayBuffer();

    const pdf = await pdfjsLib.getDocument({
      data: arrayBuffer
    }).promise;

    let text = "";

    for (let i = 1; i <= pdf.numPages; i++) {

      const page = await pdf.getPage(i);

      const content = await page.getTextContent();

      const pageText = content.items
        .map((item) => item.str)
        .join(" ");

      text += pageText + "\n";
    }

    return text;
  };


  /* =========================================
     DOCX TEXT EXTRACTION
  ========================================= */

  const extractDOCXText = async (file) => {

    const arrayBuffer = await file.arrayBuffer();

    const result = await mammoth.extractRawText({
      arrayBuffer
    });

    return result.value;
  };


  /* =========================================
     ANALYZE RESUME
  ========================================= */

  const analyzeResumeContent = (text) => {

    const lowerText = text.toLowerCase();

    const emailRegex =
      /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;

    const phoneRegex =
      /(?:\+91[\s-]?)?[6-9]\d{9}/;

    const educationKeywords = [
      "b.tech",
      "btech",
      "b.e",
      "bachelor",
      "degree",
      "engineering",
      "college",
      "university",
      "education"
    ];

    const technicalKeywords = [
      "html",
      "css",
      "javascript",
      "react",
      "react.js",
      "node",
      "express",
      "mongodb",
      "sql",
      "java",
      "python",
      "c++",
      "git",
      "github",
      "bootstrap",
      "tailwind",
      "next.js",
      "typescript",
      "api",
      "rest",
      "figma"
    ];


    const detectedKeywords =
      technicalKeywords.filter((keyword) =>
        lowerText.includes(keyword)
      );


    const missingKeywords =
      technicalKeywords.filter(
        (keyword) =>
          !lowerText.includes(keyword)
      );


    const keywordMatchPercentage =
      technicalKeywords.length === 0
        ? 0
        : Math.round(
            (detectedKeywords.length /
              technicalKeywords.length) *
              100
          );


    const hasEmail =
      emailRegex.test(text);

    const hasPhone =
      phoneRegex.test(text);

    const hasEducation =
      educationKeywords.some((keyword) =>
        lowerText.includes(keyword)
      );

    const hasSkills =
      lowerText.includes("skills") ||
      detectedKeywords.length >= 2;

    const hasProjects =
      lowerText.includes("project") ||
      lowerText.includes("projects");

    const hasExperience =
      lowerText.includes("experience") ||
      lowerText.includes("internship") ||
      lowerText.includes("work experience");

    const hasCertifications =
      lowerText.includes("certification") ||
      lowerText.includes("certificate");

    const hasSummary =
      lowerText.includes("summary") ||
      lowerText.includes("profile") ||
      lowerText.includes("objective");


    const sectionItems = [
      {
        name: "Contact Information",
        status: hasEmail && hasPhone
      },
      {
        name: "Education",
        status: hasEducation
      },
      {
        name: "Skills",
        status: hasSkills
      },
      {
        name: "Projects",
        status: hasProjects
      },
      {
        name: "Experience",
        status: hasExperience
      },
      {
        name: "Certifications",
        status: hasCertifications
      },
      {
        name: "Professional Summary",
        status: hasSummary
      }
    ];


    const completedSections =
      sectionItems.filter(
        (item) => item.status
      ).length;


    const atsScore =
      Math.round(
        (completedSections /
          sectionItems.length) *
          100
      );


    const wordCount =
      text
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .length;


    const suggestions = [];


    if (!hasEmail) {
      suggestions.push(
        "Add a professional email address."
      );
    }

    if (!hasPhone) {
      suggestions.push(
        "Add a valid phone number."
      );
    }

    if (!hasEducation) {
      suggestions.push(
        "Add your education details clearly."
      );
    }

    if (!hasSkills) {
      suggestions.push(
        "Add relevant technical skills."
      );
    }

    if (!hasProjects) {
      suggestions.push(
        "Add projects with technologies and your contribution."
      );
    }

    if (!hasExperience) {
      suggestions.push(
        "Add internship, work experience or relevant practical experience."
      );
    }

    if (!hasSummary) {
      suggestions.push(
        "Add a short professional summary."
      );
    }

    if (wordCount < 250) {
      suggestions.push(
        "Your resume appears short. Add more relevant details."
      );
    }

    if (suggestions.length === 0) {
      suggestions.push(
        "Your resume has good basic coverage. Keep improving it with job-specific keywords."
      );
    }


    return {
      atsScore,
      wordCount,
      sections: sectionItems,
      suggestions,
      detectedKeywords,
      missingKeywords,
      keywordMatchPercentage
    };
  };


  /* =========================================
     ANALYZE BUTTON
  ========================================= */

  const analyzeResume = async () => {

    if (!file) {
      alert("Please upload your resume first.");
      return;
    }

    try {

      setLoading(true);

      let extractedText = "";

      if (file.type === "application/pdf") {

        extractedText =
          await extractPDFText(file);

      } else {

        extractedText =
          await extractDOCXText(file);
      }

      setResumeText(extractedText);

      const result =
        analyzeResumeContent(
          extractedText
        );

      setAnalysis(result);

    } catch (error) {

      console.error(error);

      alert(
        "Unable to analyze the resume. Please try again."
      );

    } finally {

      setLoading(false);
    }
  };


  /* =========================================
     JOB DESCRIPTION MATCHER
  ========================================= */

  const matchJobDescription = () => {

    if (!resumeText) {
      alert(
        "Please analyze your resume first."
      );
      return;
    }

    if (!jobDescription.trim()) {
      alert(
        "Please paste a job description."
      );
      return;
    }

    setMatching(true);

    const resumeLower =
      resumeText.toLowerCase();

    const jobLower =
      jobDescription.toLowerCase();


    const technicalKeywords = [
      "html",
      "css",
      "javascript",
      "react",
      "react.js",
      "node",
      "express",
      "mongodb",
      "sql",
      "java",
      "python",
      "git",
      "github",
      "bootstrap",
      "tailwind",
      "next.js",
      "typescript",
      "api",
      "rest",
      "figma",
      "redux",
      "testing",
      "jest"
    ];


    const requiredKeywords =
      technicalKeywords.filter(
        (keyword) =>
          jobLower.includes(keyword)
      );


    const matchedKeywords =
      requiredKeywords.filter(
        (keyword) =>
          resumeLower.includes(keyword)
      );


    const missingJobKeywords =
      requiredKeywords.filter(
        (keyword) =>
          !resumeLower.includes(keyword)
      );


    const matchPercentage =
      requiredKeywords.length === 0
        ? 0
        : Math.round(
            (matchedKeywords.length /
              requiredKeywords.length) *
              100
          );


    setJobMatch({
      matchPercentage,
      matchedKeywords,
      missingJobKeywords
    });

    setMatching(false);
  };


  return (
    <>
      <Navbar />

      <div className="resume-analyzer">

        <div className="analyzer-container">

          {/* =====================================
              HEADER
          ===================================== */}

          <div className="analyzer-header">

            <div className="header-badge">
              ✨ Smart Resume Analysis
            </div>

            <h1>
              Resume Analyzer
            </h1>

            <p className="analyzer-subtitle">
              Upload your resume and get instant
              insights about ATS compatibility,
              keywords, sections and job matching.
            </p>

          </div>


          {/* =====================================
              UPLOAD CARD
          ===================================== */}

          <div className="upload-box">

            <div className="upload-icon">
              📄
            </div>

            <h2>
              Analyze Your Resume
            </h2>

            <p>
              Upload your resume in PDF or DOCX format
            </p>

            <label className="upload-btn">
              Choose Resume

              <input
                type="file"
                accept=".pdf,.docx"
                onChange={handleFileChange}
                hidden
              />
            </label>


            {file && (

              <div className="selected-file">

                <span>✓</span>

                <span>
                  {file.name}
                </span>

              </div>

            )}


            <button
              className="analyze-btn"
              onClick={analyzeResume}
              disabled={loading}
            >
              {loading
                ? "Analyzing..."
                : "Analyze Resume →"}
            </button>

          </div>


          {/* =====================================
              EXTRACTED TEXT
          ===================================== */}

          {resumeText && (

            <div className="resume-text-box">

              <div className="section-title-row">

                <div>
                  <span className="mini-icon">
                    📝
                  </span>

                  <div>
                    <h2>
                      Extracted Resume Text
                    </h2>

                    <p>
                      Review the text extracted from
                      your uploaded resume.
                    </p>
                  </div>
                </div>

              </div>


              <textarea
                value={resumeText}
                onChange={(e) =>
                  setResumeText(
                    e.target.value
                  )
                }
              />

            </div>

          )}


          {/* =====================================
              ANALYSIS
          ===================================== */}

          {analysis && (

            <div className="analysis-results">

              <div className="results-heading">

                <div>

                  <span className="results-label">
                    RESULTS
                  </span>

                  <h2>
                    Resume Analysis
                  </h2>

                </div>

                <span className="success-badge">
                  ✓ Analysis Complete
                </span>

              </div>


              {/* SCORE + QUICK STATS */}

              <div className="top-analysis-grid">

                <div className="score-card">

                  <div className="card-label">
                    ATS COMPATIBILITY
                  </div>

                  <div
                    className="score-circle"
                    style={{
                      "--score":
                        `${analysis.atsScore}%`
                    }}
                  >

                    <div className="score-circle-inner">

                      <span>
                        {analysis.atsScore}%
                      </span>

                      <small>
                        ATS Score
                      </small>

                    </div>

                  </div>

                  <p>
                    Resume compatibility score
                  </p>

                </div>


                <div className="quick-stats-card">

                  <div className="card-label">
                    RESUME OVERVIEW
                  </div>

                  <div className="stat-item">

                    <span className="stat-icon purple">
                      📝
                    </span>

                    <div>
                      <strong>
                        {analysis.wordCount}
                      </strong>

                      <span>
                        Words
                      </span>
                    </div>

                  </div>


                  <div className="stat-item">

                    <span className="stat-icon blue">
                      🔑
                    </span>

                    <div>
                      <strong>
                        {analysis.detectedKeywords.length}
                      </strong>

                      <span>
                        Keywords Detected
                      </span>
                    </div>

                  </div>


                  <div className="stat-item">

                    <span className="stat-icon green">
                      ✓
                    </span>

                    <div>
                      <strong>
                        {
                          analysis.sections.filter(
                            (item) => item.status
                          ).length
                        }
                        /{analysis.sections.length}
                      </strong>

                      <span>
                        Sections Complete
                      </span>
                    </div>

                  </div>

                </div>

              </div>


              {/* =================================
                  SECTION ANALYSIS
              ================================= */}

              <div className="section-analysis">

                <div className="card-heading">

                  <div className="heading-icon blue-bg">
                    📋
                  </div>

                  <div>
                    <h3>
                      Section Analysis
                    </h3>

                    <p>
                      Check which important resume
                      sections are present.
                    </p>
                  </div>

                </div>


                <div className="analysis-list">

                  {analysis.sections.map(
                    (section, index) => (

                      <div
                        key={index}
                        className={
                          section.status
                            ? "analysis-row complete"
                            : "analysis-row incomplete"
                        }
                      >

                        <div className="section-name">

                          <span className="status-dot">
                            {section.status
                              ? "✓"
                              : "!"}
                          </span>

                          {section.name}

                        </div>

                        <span className="status-text">

                          {section.status
                            ? "Complete"
                            : "Missing"}

                        </span>

                      </div>

                    )
                  )}

                </div>

              </div>


              {/* =================================
                  KEYWORD ANALYSIS
              ================================= */}

              <div className="keyword-analysis">

                <div className="card-heading">

                  <div className="heading-icon purple-bg">
                    🔑
                  </div>

                  <div>

                    <h3>
                      ATS Keyword Analysis
                    </h3>

                    <p>
                      Technical keywords detected
                      in your resume.
                    </p>

                  </div>

                </div>


                <div className="keyword-score">

                  <div>

                    <span>
                      Keyword Coverage
                    </span>

                    <small>
                      Based on common technical keywords
                    </small>

                  </div>

                  <strong>
                    {analysis.keywordMatchPercentage}%
                  </strong>

                </div>


                <div className="keyword-columns">

                  <div className="keyword-section">

                    <h4 className="detected-title">
                      ✓ Detected Keywords
                    </h4>

                    <div className="keyword-list">

                      {analysis.detectedKeywords.length > 0
                        ? analysis.detectedKeywords.map(
                            (keyword, index) => (

                              <span
                                className="keyword detected"
                                key={index}
                              >
                                {keyword}
                              </span>

                            )
                          )
                        : (
                          <p>
                            No common technical
                            keywords detected.
                          </p>
                        )}

                    </div>

                  </div>


                  <div className="keyword-section">

                    <h4 className="missing-title">
                      + Suggested Keywords
                    </h4>

                    <div className="keyword-list">

                      {analysis.missingKeywords
                        .slice(0, 12)
                        .map(
                          (keyword, index) => (

                            <span
                              className="keyword missing"
                              key={index}
                            >
                              {keyword}
                            </span>

                          )
                        )}

                    </div>

                  </div>

                </div>


                <div className="keyword-tip">
                  💡 Add relevant keywords from the
                  job description naturally to your
                  resume. Do not add skills you don't
                  actually know.
                </div>

              </div>


              {/* =================================
                  JOB MATCHER
              ================================= */}

              <div className="job-matcher">

                <div className="matcher-header">

                  <div className="card-heading">

                    <div className="heading-icon cyan-bg">
                      🎯
                    </div>

                    <div>

                      <h3>
                        Job Description Matcher
                      </h3>

                      <p>
                        Compare your resume with a
                        specific job description.
                      </p>

                    </div>

                  </div>

                  <span className="match-badge">
                    Smart Match
                  </span>

                </div>


                <textarea
                  className="job-description-input"
                  value={jobDescription}
                  onChange={(e) =>
                    setJobDescription(
                      e.target.value
                    )
                  }
                  placeholder="Paste the job description here..."
                />


                <button
                  className="match-btn"
                  onClick={matchJobDescription}
                  disabled={matching}
                >
                  {matching
                    ? "Checking..."
                    : "Check Job Match →"}
                </button>


                {jobMatch && (

                  <div className="job-match-results">

                    <div className="match-score-card">

                      <div
                        className="match-circle"
                        style={{
                          "--match":
                            `${jobMatch.matchPercentage}%`
                        }}
                      >

                        <div className="match-circle-inner">

                          <span>
                            {jobMatch.matchPercentage}%
                          </span>

                          <small>
                            Match
                          </small>

                        </div>

                      </div>


                      <div className="match-message">

                        <h3>
                          {jobMatch.matchPercentage >= 80
                            ? "Excellent Match! 🎉"
                            : jobMatch.matchPercentage >= 60
                            ? "Good Match 👍"
                            : jobMatch.matchPercentage >= 40
                            ? "Moderate Match"
                            : "Low Match"}
                        </h3>

                        <p>
                          Your resume matches{" "}
                          {jobMatch.matchPercentage}%
                          of the detected technical
                          requirements.
                        </p>

                      </div>

                    </div>


                    <div className="job-keyword-grid">

                      <div className="job-keyword-section matched-box">

                        <h4>
                          ✓ Matched Keywords
                        </h4>

                        <div className="keyword-list">

                          {jobMatch.matchedKeywords.length > 0
                            ? jobMatch.matchedKeywords.map(
                                (keyword, index) => (

                                  <span
                                    className="keyword detected"
                                    key={index}
                                  >
                                    {keyword}
                                  </span>

                                )
                              )
                            : (
                              <p>
                                No matching keywords found.
                              </p>
                            )}

                        </div>

                      </div>


                      <div className="job-keyword-section missing-box">

                        <h4>
                          ! Missing Keywords
                        </h4>

                        <div className="keyword-list">

                          {jobMatch.missingJobKeywords.length > 0
                            ? jobMatch.missingJobKeywords.map(
                                (keyword, index) => (

                                  <span
                                    className="keyword missing"
                                    key={index}
                                  >
                                    {keyword}
                                  </span>

                                )
                              )
                            : (
                              <p>
                                No major missing keywords.
                              </p>
                            )}

                        </div>

                      </div>

                    </div>


                    <div className="job-match-tip">
                      🎯 <strong>Tip:</strong> Tailor your
                      resume according to the job
                      description while keeping all
                      information truthful.
                    </div>

                  </div>

                )}

              </div>


              {/* =================================
                  SUGGESTIONS
              ================================= */}

              <div className="suggestions-box">

                <div className="card-heading">

                  <div className="heading-icon orange-bg">
                    💡
                  </div>

                  <div>

                    <h3>
                      Improvement Suggestions
                    </h3>

                    <p>
                      Simple ways to strengthen your
                      resume.
                    </p>

                  </div>

                </div>


                <div className="suggestions-list">

                  {analysis.suggestions.map(
                    (suggestion, index) => (

                      <div
                        className="suggestion-item"
                        key={index}
                      >

                        <span>
                          {index + 1}
                        </span>

                        <p>
                          {suggestion}
                        </p>

                      </div>

                    )
                  )}

                </div>

              </div>

            </div>

          )}

        </div>

      </div>
    </>
  );
}

export default ResumeAnalyzer;