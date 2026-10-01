# CareerForge AI 🚀

CareerForge AI is a React-based career development platform designed to help students and freshers build and improve their professional profiles.

## 🌐 Live Demo

https://shivaminautiyal.github.io/careerforge-ai/

## 📌 About the Project

CareerForge AI brings multiple career-related tools into one platform. Users can create resumes and portfolios, analyze their profiles, prepare for interviews, and understand code.

The current analysis and explanation features use rule-based logic and predefined conditions.

## ✨ Features

### 📄 Resume Builder
- Create a professional resume
- Add personal information, education, skills, projects and experience
- Add certifications and strengths
- Live resume preview
- Download resume as PDF
- Save resume data using LocalStorage

### 🔍 Resume Analyzer
- Upload PDF or DOCX resume
- Extract resume text
- Check important resume sections
- Analyze keywords
- Compare resume with a job description
- Generate improvement suggestions

### 💼 Portfolio Builder
- Create a personal portfolio
- Add projects, skills, education and experience
- Add GitHub and LinkedIn profiles
- Choose from multiple portfolio themes
- Download portfolio as PDF
- Generate a shareable portfolio link

### 📊 Portfolio Analyzer
- Analyze portfolio information
- Check profile, skills, projects, experience and education
- Generate a rule-based score
- Show strengths and improvement suggestions

### 🎯 Interview Preparation
- Technology-based interview questions
- Resume-based question selection
- Questions for React, JavaScript, HTML, CSS, Java, DSA and Git
- Answers and interview tips
- Track completed questions

### 💻 Code Explainer
- Supports JavaScript, React/JSX, Java, HTML and CSS
- Line-by-line code explanation
- Code complexity overview
- Beginner-friendly explanations

## 🛠️ Technologies Used

- React.js
- JavaScript
- HTML5
- CSS3
- React Router
- LocalStorage
- html2pdf.js
- pdfjs-dist
- Mammoth.js
- Git
- GitHub

## 📂 Project Structure

```text
src/
├── components/
│   ├── Navbar/
│   ├── Sidebar/
│   ├── Footer/
│   └── DashboardCard/
│
├── pages/
│   ├── Dashboard/
│   ├── ResumeBuilder/
│   ├── ResumeAnalyzer/
│   ├── PortfolioBuilder/
│   ├── PortfolioAnalyzer/
│   ├── InterviewPrep/
│   └── CodeExplainer/
│
├── App.js
└── index.js
