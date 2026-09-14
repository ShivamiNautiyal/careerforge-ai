import React, { useEffect, useMemo, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import mammoth from "mammoth";

import Navbar from "../../components/Navbar/Navbar";
import "./InterviewPrep.css";

pdfjsLib.GlobalWorkerOptions.workerSrc =
  `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

/* =========================================================
   TECHNICAL INTERVIEW NOTES
========================================================= */

const questionBank = {
  React: [
    {
      question: "What is React?",
      answer:
        "React is a JavaScript library used for building user interfaces, especially single-page applications. React allows developers to create reusable UI components and efficiently update the interface when data changes.",
      tip:
        "In an interview, explain React with a simple example from one of your projects.",
      difficulty: "Beginner"
    },
    {
      question: "What are components in React?",
      answer:
        "Components are independent and reusable building blocks of a React application. A component can contain its own UI, logic and state. Components make an application easier to maintain because large interfaces can be divided into smaller pieces.",
      tip:
        "Mention components such as Navbar, ResumeForm, ResumePreview and DashboardCard from your project.",
      difficulty: "Beginner"
    },
    {
      question: "What is the difference between props and state?",
      answer:
        "Props are values passed from a parent component to a child component, whereas state is data managed inside a component. Props are generally read-only from the receiving component, while state can change during the lifetime of a component.",
      tip:
        "Always give a practical example when explaining props and state.",
      difficulty: "Beginner"
    },
    {
      question: "What is useState?",
      answer:
        "useState is a React Hook that allows functional components to create and manage state. It returns the current state value and a function used to update that state.",
      tip:
        "Be prepared to explain why changing state causes the component to re-render.",
      difficulty: "Beginner"
    },
    {
      question: "What is useEffect?",
      answer:
        "useEffect is a React Hook used to perform side effects in functional components. Examples include loading data, saving data to localStorage, setting up subscriptions and interacting with external systems.",
      tip:
        "Explain how you can use useEffect to load and save resume data in CareerForge AI.",
      difficulty: "Intermediate"
    },
    {
      question: "What is conditional rendering in React?",
      answer:
        "Conditional rendering means displaying different UI elements depending on a condition. React commonly uses JavaScript conditions such as if statements, ternary operators and logical && operators for this purpose.",
      tip:
        "For example, show the Resume Analysis result only after the user has uploaded and analyzed a resume.",
      difficulty: "Beginner"
    },
    {
      question: "Why are keys used when rendering lists in React?",
      answer:
        "Keys help React identify individual elements in a list. They allow React to efficiently determine which items have changed, been added or removed during re-rendering.",
      tip:
        "Use stable unique values as keys instead of unnecessarily using array indexes.",
      difficulty: "Intermediate"
    },
    {
      question: "What is React Router?",
      answer:
        "React Router is a library used to implement client-side routing in React applications. It allows different components or pages to be displayed for different URLs without requiring a complete browser page reload.",
      tip:
        "Explain your routes such as Resume Builder, Resume Analyzer, Portfolio Builder and Interview Prep.",
      difficulty: "Intermediate"
    },
    {
      question: "What is the Virtual DOM?",
      answer:
        "The Virtual DOM is an in-memory representation of the actual DOM. When state or props change, React creates a new representation, compares it with the previous one and updates the required parts of the actual DOM.",
      tip:
        "Focus on the idea of efficient UI updates rather than memorizing complicated terminology.",
      difficulty: "Intermediate"
    },
    {
      question: "How do you pass data between React components?",
      answer:
        "Data can be passed from parent to child components using props. When sibling components need shared data, the state can be lifted to their common parent. Context can also be used when data needs to be shared across many components.",
      tip:
        "Give an example from your Resume Builder where parent state is passed to child components.",
      difficulty: "Intermediate"
    }
  ],

  JavaScript: [
    {
      question: "What is JavaScript?",
      answer:
        "JavaScript is a programming language primarily used to add logic and interactivity to web applications. It is also the main programming language used with React for frontend development.",
      tip:
        "Connect your JavaScript knowledge with the React applications you have built.",
      difficulty: "Beginner"
    },
    {
      question: "What is the difference between var, let and const?",
      answer:
        "var is function-scoped, while let and const are block-scoped. let allows reassignment, whereas const does not allow reassignment of the variable. Modern JavaScript generally prefers let and const.",
      tip:
        "Remember that const prevents reassignment of the variable, although objects and arrays declared with const can still have their contents modified.",
      difficulty: "Beginner"
    },
    {
      question: "What is the difference between == and ===?",
      answer:
        "The == operator performs comparison after type conversion in many situations, whereas === compares both value and type without implicit type conversion.",
      tip:
        "In most modern JavaScript code, === is preferred because it gives more predictable comparisons.",
      difficulty: "Beginner"
    },
    {
      question: "What is an array in JavaScript?",
      answer:
        "An array is an ordered collection of values. JavaScript arrays can contain different types of values and provide methods such as map, filter, reduce, push, pop, slice and splice.",
      tip:
        "Know the commonly used array methods because they are frequently asked in frontend interviews.",
      difficulty: "Beginner"
    },
    {
      question: "What is map()?",
      answer:
        "The map() method creates a new array by applying a function to every element of the original array. It does not modify the original array in the normal use case.",
      tip:
        "React frequently uses map() to render arrays of data as UI elements.",
      difficulty: "Beginner"
    },
    {
      question: "What is the difference between map(), filter() and reduce()?",
      answer:
        "map() transforms every element and returns a new array. filter() returns a new array containing elements that satisfy a condition. reduce() processes the elements and combines them into a single accumulated value.",
      tip:
        "Prepare one simple example for each method.",
      difficulty: "Intermediate"
    },
    {
      question: "What is a callback function?",
      answer:
        "A callback function is a function passed as an argument to another function so that it can be executed later or when a particular operation occurs.",
      tip:
        "Array methods such as map(), filter() and forEach() commonly use callback functions.",
      difficulty: "Intermediate"
    },
    {
      question: "What is a Promise?",
      answer:
        "A Promise is an object representing the eventual completion or failure of an asynchronous operation. A Promise can be pending, fulfilled or rejected.",
      tip:
        "Be prepared to explain then(), catch() and finally().",
      difficulty: "Intermediate"
    },
    {
      question: "What is async/await?",
      answer:
        "async/await provides a cleaner syntax for handling asynchronous operations based on Promises. An async function returns a Promise, while await waits for a Promise to settle inside an async function.",
      tip:
        "Explain async/await using a simple data-fetching example.",
      difficulty: "Intermediate"
    },
    {
      question: "What is the difference between synchronous and asynchronous JavaScript?",
      answer:
        "Synchronous operations execute sequentially and the next operation normally waits for the previous one. Asynchronous operations allow certain work to continue while waiting for another operation, such as a network request, to complete.",
      tip:
        "Promises, fetch and async/await are common examples.",
      difficulty: "Intermediate"
    }
  ],

  HTML: [
    {
      question: "What is semantic HTML?",
      answer:
        "Semantic HTML means using HTML elements that clearly describe the meaning and purpose of their content, such as header, nav, section, article and footer.",
      tip:
        "Semantic HTML improves structure, accessibility and readability.",
      difficulty: "Beginner"
    },
    {
      question: "What is the difference between div and semantic elements?",
      answer:
        "div is a generic container that does not describe the meaning of its content. Semantic elements such as section, article and nav provide meaningful structure to the document.",
      tip:
        "Use semantic elements when their meaning matches the content.",
      difficulty: "Beginner"
    },
    {
      question: "What is the purpose of a form in HTML?",
      answer:
        "The form element is used to group controls that collect user input. Forms commonly contain elements such as input, select, textarea and button.",
      tip:
        "Resume Builder forms are a good practical example.",
      difficulty: "Beginner"
    },
    {
      question: "What is HTML accessibility?",
      answer:
        "HTML accessibility means creating markup that can be effectively used by people with different abilities. Semantic HTML, labels, alt text and proper form structure help improve accessibility.",
      tip:
        "Accessibility is an increasingly important frontend interview topic.",
      difficulty: "Intermediate"
    },
    {
      question: "What is the difference between id and class?",
      answer:
        "An id is intended to uniquely identify an element, while a class can be assigned to multiple elements. Classes are commonly used for reusable CSS styling.",
      tip:
        "Do not use the same id for multiple elements when uniqueness is required.",
      difficulty: "Beginner"
    },
    {
      question: "Why is the alt attribute used with images?",
      answer:
        "The alt attribute provides alternative text that describes an image. It helps users who rely on screen readers and also provides useful information if the image cannot be displayed.",
      tip:
        "Always use meaningful alt text for important images.",
      difficulty: "Beginner"
    }
  ],

  CSS: [
    {
      question: "What is CSS?",
      answer:
        "CSS, or Cascading Style Sheets, is used to control the presentation, layout and visual appearance of HTML elements.",
      tip:
        "Mention how you used CSS to create responsive and visually appealing interfaces.",
      difficulty: "Beginner"
    },
    {
      question: "What is the CSS box model?",
      answer:
        "The CSS box model describes how an element's dimensions are calculated using content, padding, border and margin.",
      tip:
        "Be able to explain the difference between padding and margin.",
      difficulty: "Beginner"
    },
    {
      question: "What is Flexbox?",
      answer:
        "Flexbox is a one-dimensional CSS layout system designed to arrange elements along a row or column. It provides properties for alignment, spacing and ordering.",
      tip:
        "Know justify-content, align-items, flex-direction and flex-wrap.",
      difficulty: "Beginner"
    },
    {
      question: "What is CSS Grid?",
      answer:
        "CSS Grid is a two-dimensional layout system that allows developers to create layouts using rows and columns.",
      tip:
        "Grid is especially useful for dashboard cards and complex page layouts.",
      difficulty: "Intermediate"
    },
    {
      question: "What is responsive web design?",
      answer:
        "Responsive design means creating interfaces that adapt to different screen sizes and devices. Media queries, flexible layouts and relative units are commonly used.",
      tip:
        "Mention mobile responsiveness when discussing your projects.",
      difficulty: "Beginner"
    },
    {
      question: "What is the difference between margin and padding?",
      answer:
        "Margin creates space outside an element's border, while padding creates space between the content and the element's border.",
      tip:
        "This is one of the most common basic CSS interview questions.",
      difficulty: "Beginner"
    }
  ],

  Java: [
    {
      question: "What is Java?",
      answer:
        "Java is a high-level, object-oriented programming language. Java programs are compiled into bytecode that can run on a Java Virtual Machine, making Java platform independent at the bytecode level.",
      tip:
        "Be ready to explain JVM, JRE and JDK at a basic level.",
      difficulty: "Beginner"
    },
    {
      question: "What are the four pillars of OOP?",
      answer:
        "The four major principles of object-oriented programming are encapsulation, inheritance, polymorphism and abstraction.",
      tip:
        "Prepare a simple real-world or Java example for each concept.",
      difficulty: "Beginner"
    },
    {
      question: "What is inheritance?",
      answer:
        "Inheritance allows a class to acquire properties and behaviors from another class. In Java, class inheritance is commonly implemented using the extends keyword.",
      tip:
        "Explain parent and child classes with a simple example.",
      difficulty: "Beginner"
    },
    {
      question: "What is polymorphism?",
      answer:
        "Polymorphism allows the same method or interface to represent different behaviors. In Java, method overloading and method overriding are important examples.",
      tip:
        "Understand compile-time and runtime polymorphism.",
      difficulty: "Intermediate"
    },
    {
      question: "What is the difference between Array and ArrayList?",
      answer:
        "An array generally has a fixed length once created, whereas ArrayList is a resizable collection from the Java Collections Framework.",
      tip:
        "Know common ArrayList methods such as add(), remove() and get().",
      difficulty: "Intermediate"
    },
    {
      question: "What is exception handling in Java?",
      answer:
        "Exception handling is a mechanism for handling runtime errors using constructs such as try, catch, finally, throw and throws.",
      tip:
        "Understand checked and unchecked exceptions at a basic level.",
      difficulty: "Intermediate"
    }
  ],

  DSA: [
    {
      question: "What is an array?",
      answer:
        "An array is a data structure that stores elements in an ordered sequence and provides indexed access to its elements.",
      tip:
        "Know common array operations and their time complexities.",
      difficulty: "Beginner"
    },
    {
      question: "What is time complexity?",
      answer:
        "Time complexity describes how the number of operations performed by an algorithm grows as the input size increases. Big-O notation is commonly used to express this growth.",
      tip:
        "Be comfortable with O(1), O(log n), O(n), O(n log n) and O(n²).",
      difficulty: "Beginner"
    },
    {
      question: "What is binary search?",
      answer:
        "Binary search is a searching algorithm that works on a sorted search space. It repeatedly divides the search space into two halves and eliminates the half that cannot contain the target.",
      tip:
        "Its typical time complexity is O(log n).",
      difficulty: "Intermediate"
    },
    {
      question: "What is the two-pointer technique?",
      answer:
        "The two-pointer technique uses two indexes to traverse or search a data structure efficiently. It is particularly useful for sorted arrays and problems involving pairs or ranges.",
      tip:
        "Container With Most Water and sorted two-sum problems are common examples.",
      difficulty: "Intermediate"
    },
    {
      question: "What is the difference between linear search and binary search?",
      answer:
        "Linear search checks elements sequentially and can work on unsorted data. Binary search requires a sorted search space and repeatedly divides it into two parts.",
      tip:
        "Typical time complexities are O(n) for linear search and O(log n) for binary search.",
      difficulty: "Beginner"
    },
    {
      question: "What is a stack?",
      answer:
        "A stack is a linear data structure that follows the LIFO principle, meaning the last element inserted is the first element removed.",
      tip:
        "Know push, pop and peek operations.",
      difficulty: "Beginner"
    },
    {
      question: "What is a queue?",
      answer:
        "A queue is a linear data structure that follows the FIFO principle, meaning the first element inserted is the first element removed.",
      tip:
        "BFS is a common application of a queue.",
      difficulty: "Beginner"
    },
    {
      question: "What is recursion?",
      answer:
        "Recursion is a technique where a function calls itself to solve smaller versions of the same problem. A recursive solution must have a base condition to stop the recursion.",
      tip:
        "Always identify the base case before writing recursive code.",
      difficulty: "Intermediate"
    }
  ],

  Git: [
    {
      question: "What is Git?",
      answer:
        "Git is a distributed version control system used to track changes in source code and collaborate with other developers.",
      tip:
        "Understand the difference between Git and GitHub.",
      difficulty: "Beginner"
    },
    {
      question: "What is GitHub?",
      answer:
        "GitHub is a platform used to host Git repositories and provide collaboration features such as pull requests, issues and code review.",
      tip:
        "Git is the version control system; GitHub is a hosting and collaboration platform.",
      difficulty: "Beginner"
    },
    {
      question: "What is git commit?",
      answer:
        "A commit records a set of changes in the local Git repository. Each commit represents a point in the project's history.",
      tip:
        "Use clear and meaningful commit messages.",
      difficulty: "Beginner"
    },
    {
      question: "What is git push?",
      answer:
        "git push uploads local commits to a remote repository.",
      tip:
        "A common workflow is add → commit → push.",
      difficulty: "Beginner"
    },
    {
      question: "What is git pull?",
      answer:
        "git pull downloads changes from a remote repository and integrates them into the current local branch.",
      tip:
        "Understand the difference between pull and fetch.",
      difficulty: "Intermediate"
    },
    {
      question: "What is a Git branch?",
      answer:
        "A branch is an independent line of development in Git. Developers can use branches to work on features without directly changing the main branch.",
      tip:
        "Know basic branch commands such as git branch, git checkout and git switch.",
      difficulty: "Intermediate"
    }
  ]
};

/* =========================================================
   RESUME / HR QUESTIONS
========================================================= */

const resumeNotes = {
  profile: [
    {
      question: "Tell me about yourself.",
      answer:
        "Start with your current education or role, then briefly mention your strongest technical skills, relevant projects or internship experience, and finally explain the type of opportunity you are looking for.",
      tip:
        "Keep the answer around 60–90 seconds. Do not simply read your resume."
    },
    {
      question: "Walk me through your resume.",
      answer:
        "Explain your resume in a logical order: education, technical skills, projects, internship or experience, certifications and achievements. For each important item, explain what you actually did rather than only naming it.",
      tip:
        "The interviewer may ask follow-up questions about anything you mention."
    },
    {
      question: "What is your strongest technical skill?",
      answer:
        "Choose a skill that you have actually used in projects or practical work. Explain why you are comfortable with it and give one example where you used it.",
      tip:
        "Do not claim expert-level knowledge if you have only basic experience."
    },
    {
      question: "Which technical skill are you currently improving?",
      answer:
        "Choose a genuine skill you are currently learning and explain what you have already studied, practiced or built using that skill.",
      tip:
        "This answer should show a learning mindset."
    },
    {
      question: "Why should we hire you?",
      answer:
        "Connect your technical skills, practical projects, internship experience and willingness to learn with the requirements of the role. Support your answer with concrete examples.",
      tip:
        "Avoid generic statements without evidence."
    }
  ],

  projects: [
    {
      question: "Explain your project.",
      answer:
        "Explain the project's purpose, the problem it solves, technologies used, your personal contribution, important features, challenges and possible future improvements.",
      tip:
        "A good structure is: Problem → Solution → Technology → Your Role → Challenges → Result."
    },
    {
      question: "Why did you choose the technologies used in your project?",
      answer:
        "Explain each major technology based on the problem it helped solve. Also mention your familiarity with the technology and why it was suitable for the project.",
      tip:
        "Never say you selected a technology only because it is popular."
    },
    {
      question: "What was the biggest challenge in your project?",
      answer:
        "Describe a real problem you faced, how you investigated it, what solution you implemented and what you learned from the experience.",
      tip:
        "Interviewers often use this question to check whether you actually worked on the project."
    },
    {
      question: "What would you improve in your project?",
      answer:
        "Mention realistic improvements such as better testing, performance, accessibility, UI, authentication, data management or additional functionality.",
      tip:
        "Choose improvements that make sense for your actual project."
    },
    {
      question: "How did you test your project?",
      answer:
        "Explain how you tested the important user flows, handled errors and checked the application across different situations. Mention automated testing only if you actually used it.",
      tip:
        "Be honest about your testing process."
    },
    {
      question: "What was your personal contribution to the project?",
      answer:
        "Clearly describe the components, features, debugging, styling, logic or other work that you personally implemented.",
      tip:
        "Be specific because interviewers may ask you to explain any feature in detail."
    },
    {
      question: "How would you make your project scalable?",
      answer:
        "For a frontend application, discuss reusable components, clean architecture, state management, performance optimization, code splitting, testing and maintainability. If the project grows, a backend and database can be introduced where appropriate.",
      tip:
        "Focus on improvements relevant to your project's current architecture."
    },
    {
      question: "How would you explain your project to a non-technical person?",
      answer:
        "Explain the problem, who the application is for, what the application does and what benefit it provides. Avoid unnecessary technical terminology.",
      tip:
        "This tests communication skills as well as technical understanding."
    }
  ],

  experience: [
    {
      question: "Tell me about your internship or work experience.",
      answer:
        "Explain the organization, your role, the technologies or tools you used, the tasks you performed and the key things you learned.",
      tip:
        "Focus mainly on your own contribution."
    },
    {
      question: "What was your most important contribution during your internship?",
      answer:
        "Choose one concrete task or contribution. Explain the problem, what you did, how you implemented it and what the outcome was.",
      tip:
        "Use measurable results when you genuinely have them."
    },
    {
      question: "What did your internship teach you that college projects did not?",
      answer:
        "Discuss practical lessons such as working with requirements, deadlines, version control, communication, teamwork, debugging or professional development practices.",
      tip:
        "Use an actual experience instead of a theoretical answer."
    },
    {
      question: "Tell me about a problem you faced during your internship.",
      answer:
        "Explain the problem, how you investigated it, the solution you selected and what you learned from solving it.",
      tip:
        "Use a specific example rather than a general statement."
    }
  ],

  hr: [
    {
      question: "Why do you want this role?",
      answer:
        "Connect your technical interests, current skills, projects and career goals with the responsibilities of the role.",
      tip:
        "Research the company and job description before the interview."
    },
    {
      question: "Where do you see yourself in three years?",
      answer:
        "Describe realistic professional growth. You can mention improving technical expertise, taking more responsibility and contributing to meaningful projects.",
      tip:
        "Keep your answer connected to the type of role you are applying for."
    },
    {
      question: "What is your biggest strength?",
      answer:
        "Choose one genuine strength and support it with a real example from your academics, project or internship.",
      tip:
        "Evidence makes the answer stronger."
    },
    {
      question: "What is your weakness?",
      answer:
        "Mention a genuine weakness that you are actively working to improve, then explain the specific steps you are taking.",
      tip:
        "Avoid fake weaknesses such as 'I work too hard'."
    },
    {
      question: "What do you do when you don't know an answer?",
      answer:
        "Be honest about what you know, break the problem into smaller parts and explain how you would research, test or learn the missing information.",
      tip:
        "Interviewers value problem-solving and learning ability."
    }
  ]
};

/* =========================================================
   HELPERS
========================================================= */

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function detectSkills(text) {
  const normalized = normalizeText(text);

  const patterns = {
    React: /\breact(?:\.js|js)?\b/i,
    JavaScript: /\bjavascript\b|\bjs\b/i,
    HTML: /\bhtml5?\b/i,
    CSS: /\bcss3?\b/i,
    Java: /\bjava\b/i,
    DSA: /\bdsa\b|\bdata structures?\b|\balgorithms?\b/i,
    Git: /\bgit\b|\bgithub\b/i
  };

  return Object.keys(patterns).filter((skill) =>
    patterns[skill].test(normalized)
  );
}

function detectProjects(text) {
  const lines = text
    .split(/\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 2);

  const results = [];

  lines.forEach((line) => {
    const lower = line.toLowerCase();

    if (
      lower.includes("project") ||
      lower.includes("application") ||
      lower.includes("portfolio")
    ) {
      results.push(line);
    }
  });

  return [...new Set(results)].slice(0, 5);
}

function detectExperience(text) {
  const normalized = normalizeText(text);

  return [
    "internship",
    "intern",
    "experience",
    "worked",
    "developer",
    "trainee"
  ].some((word) => normalized.includes(word));
}

function getCategoryIcon(category) {
  const icons = {
    "Resume / Profile": "👤",
    React: "⚛️",
    JavaScript: "🟨",
    HTML: "🌐",
    CSS: "🎨",
    Java: "☕",
    DSA: "🧠",
    Git: "🔀",
    Projects: "🚀",
    "Internship / Experience": "💼",
    "HR / Behavioral": "🗣️"
  };

  return icons[category] || "📘";
}

function getPriority(index, category) {
  if (
    index < 20 ||
    category === "Resume / Profile" ||
    category === "Projects"
  ) {
    return "Must Prepare";
  }

  if (index < 40) {
    return "Important";
  }

  return "Good to Know";
}

/* =========================================================
   COMPONENT
========================================================= */

function InterviewPrep() {
  const [mode, setMode] = useState("resume");

  const [resumeFile, setResumeFile] = useState(null);
  const [resumeText, setResumeText] = useState("");
  const [resumeSkills, setResumeSkills] = useState([]);
  const [resumeProjects, setResumeProjects] = useState([]);
  const [hasExperience, setHasExperience] = useState(false);

  const [questions, setQuestions] = useState([]);

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [searchTerm, setSearchTerm] = useState("");

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [completed, setCompleted] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isNotesView, setIsNotesView] = useState(false);

  const [message, setMessage] = useState("");

  /* =========================================================
     LOAD SAVED RESUME
  ========================================================= */

  useEffect(() => {
    const savedResume =
      localStorage.getItem("careerforgeResume");

    if (!savedResume) return;

    try {
      const data = JSON.parse(savedResume);

      const text = [
        data.fullName,
        data.email,
        data.phone,
        data.address,
        data.linkedIn,
        data.github,
        data.summary,
        data.careerObjective,
        data.skills?.join(" "),
        data.education
          ?.map(
            (item) =>
              `${item.degree} ${item.branch} ${item.college}`
          )
          .join("\n"),
        data.experiences
          ?.map(
            (item) =>
              `${item.role} ${item.company} ${item.description}`
          )
          .join("\n"),
        data.projects
          ?.map(
            (item) =>
              `${item.projectName} ${item.technologies} ${item.description}`
          )
          .join("\n")
      ]
        .filter(Boolean)
        .join("\n");

      if (text.trim()) {
        setResumeText(text);
        setResumeSkills(detectSkills(text));

        setResumeProjects(
          data.projects
            ?.map((item) => item.projectName)
            .filter(Boolean) || []
        );

        setHasExperience(
          Array.isArray(data.experiences) &&
            data.experiences.length > 0
        );
      }
    } catch (error) {
      console.log("Saved resume could not be loaded.");
    }
  }, []);

  /* =========================================================
     PDF TEXT
  ========================================================= */

  const extractPDFText = async (file) => {
    const buffer = await file.arrayBuffer();

    const pdf = await pdfjsLib.getDocument({
      data: buffer
    }).promise;

    let text = "";

    for (
      let pageNumber = 1;
      pageNumber <= pdf.numPages;
      pageNumber++
    ) {
      const page = await pdf.getPage(pageNumber);

      const content = await page.getTextContent();

      text +=
        content.items.map((item) => item.str).join(" ") +
        "\n";
    }

    return text;
  };

  /* =========================================================
     DOCX TEXT
  ========================================================= */

  const extractDOCXText = async (file) => {
    const buffer = await file.arrayBuffer();

    const result = await mammoth.extractRawText({
      arrayBuffer: buffer
    });

    return result.value;
  };

  /* =========================================================
     UPLOAD RESUME
  ========================================================= */

  const handleResumeUpload = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const extension = file.name
      .split(".")
      .pop()
      .toLowerCase();

    if (!["pdf", "docx"].includes(extension)) {
      setMessage(
        "Please upload a PDF or DOCX resume."
      );
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      let extractedText = "";

      if (extension === "pdf") {
        extractedText =
          await extractPDFText(file);
      } else {
        extractedText =
          await extractDOCXText(file);
      }

      const skills = detectSkills(extractedText);
      const projects =
        detectProjects(extractedText);
      const experience =
        detectExperience(extractedText);

      setResumeFile(file);
      setResumeText(extractedText);
      setResumeSkills(skills);
      setResumeProjects(projects);
      setHasExperience(experience);

      setMessage(
        skills.length > 0
          ? `${skills.length} technologies detected successfully.`
          : "Resume uploaded successfully. Some technologies could not be automatically detected."
      );
    } catch (error) {
      console.error(error);

      setMessage(
        "Unable to read this resume. Please upload a text-based PDF or DOCX."
      );
    } finally {
      setIsLoading(false);
    }
  };

  /* =========================================================
     GENERATE RESUME QUESTIONS
  ========================================================= */

  const generateResumeQuestions = () => {
    if (!resumeText.trim()) {
      setMessage(
        "Please upload your resume first."
      );
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      let generated = [];

      /* PROFILE - 5 */

      resumeNotes.profile.forEach((item) => {
        generated.push({
          ...item,
          category: "Resume / Profile",
          resumeMatched: true
        });
      });

      /* TECHNOLOGIES */

      const distribution = {
        React: 10,
        JavaScript: 10,
        HTML: 5,
        CSS: 5,
        Java: 7,
        DSA: 8,
        Git: 4
      };

      resumeSkills.forEach((skill) => {
        const bank = questionBank[skill];

        if (!bank) return;

        const count =
          distribution[skill] || 4;

        shuffle(bank)
          .slice(0, count)
          .forEach((item) => {
            generated.push({
              ...item,
              category: skill,
              resumeMatched: true
            });
          });
      });

      /* PROJECTS */

      const projectName =
        resumeProjects.length > 0
          ? resumeProjects[0]
          : "";

      shuffle(resumeNotes.projects)
        .slice(0, 8)
        .forEach((item, index) => {
          let question = item.question;

          if (
            projectName &&
            index === 0
          ) {
            question =
              `Explain your project "${projectName}".`;
          }

          generated.push({
            ...item,
            question,
            category: "Projects",
            resumeMatched: true
          });
        });

      /* EXPERIENCE */

      const experienceQuestions =
        hasExperience
          ? resumeNotes.experience
          : resumeNotes.experience.slice(0, 2);

      shuffle(experienceQuestions)
        .slice(0, 4)
        .forEach((item) => {
          generated.push({
            ...item,
            category:
              "Internship / Experience",
            resumeMatched: hasExperience
          });
        });

      /* HR */

      shuffle(resumeNotes.hr)
        .slice(0, 4)
        .forEach((item) => {
          generated.push({
            ...item,
            category: "HR / Behavioral",
            resumeMatched: true
          });
        });

      /* REMOVE DUPLICATES */

      const seen = new Set();

      generated = generated.filter((item) => {
        const key =
          item.question.toLowerCase();

        if (seen.has(key)) {
          return false;
        }

        seen.add(key);
        return true;
      });

      /* FILL UP TO 60 */

      if (generated.length < 50) {
        Object.keys(questionBank).forEach(
          (technology) => {
            if (generated.length >= 60) {
              return;
            }

            questionBank[technology].forEach(
              (item) => {
                if (generated.length >= 60) {
                  return;
                }

                const key =
                  item.question.toLowerCase();

                if (!seen.has(key)) {
                  seen.add(key);

                  generated.push({
                    ...item,
                    category: technology,
                    resumeMatched:
                      resumeSkills.includes(
                        technology
                      )
                  });
                }
              }
            );
          }
        );
      }

      /* LIMIT */

      generated = generated.slice(0, 60);

      /* PRIORITY */

      generated = generated.map(
        (item, index) => ({
          ...item,
          priority: getPriority(
            index,
            item.category
          ),
          id: `${index}-${item.category}`
        })
      );

      setQuestions(generated);
      setCompleted([]);
      setCurrentQuestion(0);
      setSelectedCategory("All");
      setSearchTerm("");
      setShowAnswer(false);
      setIsNotesView(false);

      setIsLoading(false);
      setMessage("");
    }, 700);
  };

  /* =========================================================
     GENERAL QUESTIONS
  ========================================================= */

  const generateGeneralQuestions = () => {
    setIsLoading(true);

    setTimeout(() => {
      let generated = [];

      Object.keys(questionBank).forEach(
        (technology) => {
          shuffle(questionBank[technology])
            .slice(0, 5)
            .forEach((item) => {
              generated.push({
                ...item,
                category: technology,
                resumeMatched: false
              });
            });
        }
      );

      shuffle(resumeNotes.hr)
        .slice(0, 5)
        .forEach((item) => {
          generated.push({
            ...item,
            category: "HR / Behavioral",
            resumeMatched: false
          });
        });

      generated = shuffle(
        generated
      ).slice(0, 40);

      generated = generated.map(
        (item, index) => ({
          ...item,
          priority: getPriority(
            index,
            item.category
          ),
          id: `${index}-${item.category}`
        })
      );

      setQuestions(generated);
      setCompleted([]);
      setCurrentQuestion(0);
      setSelectedCategory("All");
      setSearchTerm("");
      setShowAnswer(false);
      setIsNotesView(false);

      setIsLoading(false);
    }, 500);
  };

  /* =========================================================
     FILTERED QUESTIONS
  ========================================================= */

  const filteredQuestions = useMemo(() => {
    return questions.filter((item) => {

      const categoryMatch =
        selectedCategory === "All" ||
        item.category === selectedCategory;

      const searchMatch =
        item.question
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [
    questions,
    selectedCategory,
    searchTerm
  ]);

  const currentItem =
    filteredQuestions[currentQuestion];

  /* =========================================================
     MARK COMPLETED
  ========================================================= */

  const markAsRead = (id) => {
    setCompleted((previous) => {
      if (previous.includes(id)) {
        return previous;
      }

      return [...previous, id];
    });
  };

  const handleNext = () => {
    if (!currentItem) return;

    markAsRead(currentItem.id);

    if (
      currentQuestion <
      filteredQuestions.length - 1
    ) {
      setCurrentQuestion(
        (previous) => previous + 1
      );
      setShowAnswer(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(
        (previous) => previous - 1
      );
      setShowAnswer(false);
    }
  };

  

  /* =========================================================
     RESET
  ========================================================= */

  const resetPreparation = () => {
    setQuestions([]);
    setCompleted([]);
    setCurrentQuestion(0);
    setShowAnswer(false);
    setIsNotesView(false);
    setSelectedCategory("All");
    setSearchTerm("");
  };

  /* =========================================================
     CATEGORY DATA
  ========================================================= */

  const categories = useMemo(() => {
    const values = [
      "All",
      ...new Set(
        questions.map(
          (item) => item.category
        )
      )
    ];

    return values;
  }, [questions]);

  const progress =
    questions.length > 0
      ? Math.round(
          (completed.length /
            questions.length) *
            100
        )
      : 0;

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <>
      <Navbar />

      <div className="interview-page">

        {/* HERO */}

        <section className="interview-hero">

          <div className="hero-content">

            <div className="hero-badge">
              🎯 Resume-Based Interview Preparation
            </div>

            <h1>
              Prepare Smart.
              <span>
                Answer With Confidence.
              </span>
            </h1>

            <p>
              Upload your resume and get a
              personalized collection of the most
              important interview questions with
              proper answers, follow-up questions
              and interview tips.
            </p>

            <div className="hero-features">
              <span>✓ 50–60 Questions</span>
              <span>✓ Resume Based</span>
              <span>✓ Detailed Answers</span>
              <span>✓ Project Questions</span>
              <span>✓ Interview Tips</span>
            </div>

          </div>

        </section>

        <main className="interview-container">

          {/* =================================================
              SETUP
          ================================================= */}

          {questions.length === 0 && (
            <>
              <section className="mode-grid">

                <button
                  className={`mode-card ${
                    mode === "resume"
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setMode("resume")
                  }
                >
                  <div className="mode-icon">
                    📄
                  </div>

                  <div>
                    <h2>
                      Resume Based Notes
                    </h2>

                    <p>
                      Get 50–60 important
                      questions based on your
                      resume.
                    </p>
                  </div>

                  <span className="mode-check">
                    {mode === "resume"
                      ? "✓"
                      : ""}
                  </span>
                </button>

                <button
                  className={`mode-card ${
                    mode === "general"
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setMode("general")
                  }
                >
                  <div className="mode-icon">
                    📚
                  </div>

                  <div>
                    <h2>
                      General Interview Notes
                    </h2>

                    <p>
                      Learn common technical
                      and HR interview questions.
                    </p>
                  </div>

                  <span className="mode-check">
                    {mode === "general"
                      ? "✓"
                      : ""}
                  </span>
                </button>

              </section>

              {mode === "resume" && (
                <section className="setup-card">

                  <div className="section-heading">

                    <div>
                      <span className="small-label">
                        STEP 01
                      </span>

                      <h2>
                        Upload Your Resume
                      </h2>

                      <p>
                        CareerForge will identify
                        your technologies, projects
                        and experience and use them
                        to create your interview
                        preparation notes.
                      </p>
                    </div>

                    <div className="heading-icon">
                      📄
                    </div>

                  </div>

                  <label className="upload-box">

                    <input
                      type="file"
                      accept=".pdf,.docx"
                      onChange={
                        handleResumeUpload
                      }
                    />

                    <div className="upload-icon">
                      {isLoading
                        ? "⏳"
                        : "⬆️"}
                    </div>

                    <h3>
                      {resumeFile
                        ? resumeFile.name
                        : "Upload your resume"}
                    </h3>

                    <p>
                      PDF or DOCX •
                      Text-based resume
                    </p>

                    <span className="browse-button">
                      Browse Resume
                    </span>

                  </label>

                  {resumeText && (
                    <div className="resume-analysis">

                      <div className="analysis-success">

                        <span>✓</span>

                        <div>
                          <strong>
                            Resume analyzed
                            successfully
                          </strong>

                          <small>
                            Your personalized
                            interview notes are
                            ready to generate.
                          </small>
                        </div>

                      </div>

                      <div className="detected-grid">

                        <div className="detected-card">
                          <span>⚡</span>
                          <div>
                            <small>
                              Technologies
                            </small>
                            <strong>
                              {resumeSkills.length}
                            </strong>
                          </div>
                        </div>

                        <div className="detected-card">
                          <span>🚀</span>
                          <div>
                            <small>
                              Projects
                            </small>
                            <strong>
                              {resumeProjects.length}
                            </strong>
                          </div>
                        </div>

                        <div className="detected-card">
                          <span>💼</span>
                          <div>
                            <small>
                              Experience
                            </small>
                            <strong>
                              {hasExperience
                                ? "Detected"
                                : "Not Detected"}
                            </strong>
                          </div>
                        </div>

                      </div>

                      {resumeSkills.length >
                        0 && (
                        <div className="skill-detection">

                          <h3>
                            Technologies Detected
                          </h3>

                          <div className="skill-tags">
                            {resumeSkills.map(
                              (skill) => (
                                <span
                                  key={skill}
                                >
                                  ✓ {skill}
                                </span>
                              )
                            )}
                          </div>

                        </div>
                      )}

                      {resumeProjects.length >
                        0 && (
                        <div className="project-detection">

                          <h3>
                            Projects Found
                          </h3>

                          <div className="project-tags">
                            {resumeProjects.map(
                              (
                                project,
                                index
                              ) => (
                                <span
                                  key={`${project}-${index}`}
                                >
                                  🚀 {project}
                                </span>
                              )
                            )}
                          </div>

                        </div>
                      )}

                    </div>
                  )}

                  {message && (
                    <div className="info-message">
                      💡 {message}
                    </div>
                  )}

                  <div className="question-set-info">

                    <div className="set-icon">
                      📚
                    </div>

                    <div>
                      <strong>
                        Your Personalized
                        Interview Notes
                      </strong>

                      <p>
                        Up to 60 questions covering
                        your resume, skills, projects,
                        internship and HR preparation.
                      </p>
                    </div>

                  </div>

                  <button
                    className="generate-button"
                    onClick={
                      generateResumeQuestions
                    }
                    disabled={
                      !resumeText ||
                      isLoading
                    }
                  >
                    {isLoading
                      ? "Preparing Your Notes..."
                      : "🎯 Generate My Interview Notes"}
                  </button>

                </section>
              )}

              {mode === "general" && (
                <section className="setup-card">

                  <div className="section-heading">

                    <div>
                      <span className="small-label">
                        GENERAL PREPARATION
                      </span>

                      <h2>
                        Build Your Interview
                        Foundation
                      </h2>

                      <p>
                        Prepare important questions
                        from React, JavaScript, HTML,
                        CSS, Java, DSA, Git and HR.
                      </p>
                    </div>

                    <div className="heading-icon">
                      📚
                    </div>

                  </div>

                  <div className="general-topics">

                    {[
                      "React",
                      "JavaScript",
                      "HTML",
                      "CSS",
                      "Java",
                      "DSA",
                      "Git",
                      "HR"
                    ].map((topic) => (
                      <span key={topic}>
                        {topic}
                      </span>
                    ))}

                  </div>

                  <button
                    className="generate-button"
                    onClick={
                      generateGeneralQuestions
                    }
                    disabled={isLoading}
                  >
                    {isLoading
                      ? "Preparing Notes..."
                      : "📚 Generate General Notes"}
                  </button>

                </section>
              )}
            </>
          )}

          {/* =================================================
              NOTES
          ================================================= */}

          {questions.length > 0 && (
            <section className="notes-section">

              {/* TOP */}

              <div className="notes-header">

                <div>
                  <span className="small-label">
                    INTERVIEW NOTES
                  </span>

                  <h2>
                    Your Personalized
                    Preparation
                  </h2>

                  <p>
                    {questions.length} questions
                    selected for your preparation.
                  </p>
                </div>

                <div className="notes-actions">

                  <button
                    className={
                      isNotesView
                        ? "active-action"
                        : ""
                    }
                    onClick={() =>
                      setIsNotesView(
                        !isNotesView
                      )
                    }
                  >
                    📖{" "}
                    {isNotesView
                      ? "Question View"
                      : "Full Notes"}
                  </button>

                  <button
                    onClick={
                      resetPreparation
                    }
                  >
                    ↻ Reset
                  </button>

                </div>

              </div>

              {/* PROGRESS */}

              <div className="progress-card">

                <div className="progress-header">

                  <div>
                    <strong>
                      Preparation Progress
                    </strong>

                    <span>
                      {completed.length} /{" "}
                      {questions.length} questions
                      read
                    </span>
                  </div>

                  <strong>
                    {progress}%
                  </strong>

                </div>

                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${progress}%`
                    }}
                  />
                </div>

              </div>

              {/* CATEGORY FILTER */}

              <div className="notes-toolbar">

                <div className="category-filters">

                  {categories.map(
                    (category) => (
                      <button
                        key={category}
                        className={
                          selectedCategory ===
                          category
                            ? "selected"
                            : ""
                        }
                        onClick={() => {
                          setSelectedCategory(
                            category
                          );
                          setCurrentQuestion(
                            0
                          );
                        }}
                      >
                        {category === "All"
                          ? "All Questions"
                          : `${getCategoryIcon(
                              category
                            )} ${category}`}
                      </button>
                    )
                  )}

                </div>

                <div className="search-box">
                  🔍

                  <input
                    type="text"
                    placeholder="Search questions..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(
                        e.target.value
                      );
                      setCurrentQuestion(0);
                    }}
                  />
                </div>

              </div>

              {/* FULL NOTES */}

              {isNotesView ? (
                <div className="full-notes">

                  {filteredQuestions.map(
                    (item, index) => (
                      <article
                        className={`note-card ${
                          completed.includes(
                            item.id
                          )
                            ? "read"
                            : ""
                        }`}
                        key={item.id}
                      >

                        <div className="note-card-top">

                          <span className="note-number">
                            {String(
                              index + 1
                            ).padStart(2, "0")}
                          </span>

                          <div className="note-tags">

                            <span>
                              {getCategoryIcon(
                                item.category
                              )}{" "}
                              {item.category}
                            </span>

                            <span
                              className={`priority ${
                                item.priority
                                  .toLowerCase()
                                  .replace(
                                    /\s+/g,
                                    "-"
                                  )
                              }`}
                            >
                              {item.priority}
                            </span>

                            {item.difficulty && (
                              <span>
                                {
                                  item.difficulty
                                }
                              </span>
                            )}

                          </div>

                        </div>

                        <h2>
                          {item.question}
                        </h2>

                        {item.resumeMatched && (
                          <div className="resume-match">
                            ✓ Matched with your
                            resume
                          </div>
                        )}

                        <div className="note-answer">

                          <h3>
                            <span>✓</span>
                            Proper Answer
                          </h3>

                          <p>
                            {item.answer}
                          </p>

                        </div>

                        <div className="note-tip">

                          <strong>
                            💡 Interview Tip
                          </strong>

                          <p>
                            {item.tip}
                          </p>

                        </div>

                        <button
                          className="mark-read"
                          onClick={() =>
                            markAsRead(
                              item.id
                            )
                          }
                        >
                          {completed.includes(
                            item.id
                          )
                            ? "✓ Read"
                            : "Mark as Read"}
                        </button>

                      </article>
                    )
                  )}

                </div>
              ) : (
                /* SINGLE QUESTION VIEW */

                <div className="question-layout">

                  <div className="question-main">

                    {currentItem ? (
                      <article className="question-card">

                        <div className="question-top">

                          <div className="question-number">
                            Question{" "}
                            {currentQuestion +
                              1}{" "}
                            of{" "}
                            {
                              filteredQuestions.length
                            }
                          </div>

                          <div className="question-badges">

                            <span className="category-badge">
                              {getCategoryIcon(
                                currentItem.category
                              )}{" "}
                              {
                                currentItem.category
                              }
                            </span>

                            <span
                              className={`priority-badge ${
                                currentItem.priority
                                  .toLowerCase()
                                  .replace(
                                    /\s+/g,
                                    "-"
                                  )
                              }`}
                            >
                              {
                                currentItem.priority
                              }
                            </span>

                            {currentItem.difficulty && (
                              <span className="difficulty-badge">
                                {
                                  currentItem.difficulty
                                }
                              </span>
                            )}

                          </div>

                        </div>

                        <h1 className="question-title">
                          {
                            currentItem.question
                          }
                        </h1>

                        {currentItem.resumeMatched && (
                          <div className="resume-match">
                            ✓ This question is
                            based on your resume
                          </div>
                        )}

                        {!showAnswer ? (
                          <div className="answer-preview">

                            <div className="answer-preview-icon">
                              💡
                            </div>

                            <h3>
                              Prepare your
                              answer first
                            </h3>

                            <p>
                              Think about how you
                              would answer this
                              question in a real
                              interview.
                            </p>

                            <button
                              onClick={() => {
                                setShowAnswer(
                                  true
                                );
                                markAsRead(
                                  currentItem.id
                                );
                              }}
                            >
                              Show Proper Answer
                            </button>

                          </div>
                        ) : (
                          <div className="detailed-answer">

                            <div className="answer-box">

                              <div className="answer-heading">
                                <span>✓</span>

                                <h3>
                                  Proper Interview
                                  Answer
                                </h3>
                              </div>

                              <p>
                                {
                                  currentItem.answer
                                }
                              </p>

                            </div>

                            <div className="interview-tip-box">

                              <div>
                                💡
                              </div>

                              <div>
                                <strong>
                                  How to answer
                                  this in an
                                  interview
                                </strong>

                                <p>
                                  {
                                    currentItem.tip
                                  }
                                </p>
                              </div>

                            </div>

                          </div>
                        )}

                        <div className="question-actions">

                          <button
                            onClick={
                              handlePrevious
                            }
                            disabled={
                              currentQuestion ===
                              0
                            }
                          >
                            ← Previous
                          </button>

                          <button
                            className="next-question"
                            onClick={
                              handleNext
                            }
                          >
                            {currentQuestion ===
                            filteredQuestions.length -
                              1
                              ? "Finish Section ✓"
                              : "Next Question →"}
                          </button>

                        </div>

                      </article>
                    ) : (
                      <div className="empty-filter">
                        No questions found.
                      </div>
                    )}

                  </div>

                  {/* SIDE */}

                  <aside className="notes-sidebar">

                    <div className="sidebar-card">

                      <div className="sidebar-icon">
                        📚
                      </div>

                      <h3>
                        Total Questions
                      </h3>

                      <strong className="big-number">
                        {questions.length}
                      </strong>

                      <p>
                        Personalized notes
                      </p>

                    </div>

                    <div className="sidebar-card">

                      <h3>
                        Your Progress
                      </h3>

                      <div className="progress-circle">
                        <span>
                          {progress}%
                        </span>
                      </div>

                      <p>
                        {completed.length}{" "}
                        questions read
                      </p>

                    </div>

                    <div className="sidebar-card tip-sidebar">

                      <h3>
                        🎯 Preparation Strategy
                      </h3>

                      <ul>
                        <li>
                          First prepare
                          Must Prepare
                          questions.
                        </li>

                        <li>
                          Understand the
                          answer instead of
                          memorizing it.
                        </li>

                        <li>
                          Practice explaining
                          your projects aloud.
                        </li>

                        <li>
                          Prepare follow-up
                          questions yourself.
                        </li>
                      </ul>

                    </div>

                  </aside>

                </div>
              )}

            </section>
          )}

        </main>

        <footer className="interview-footer">

          <strong>
            CareerForge AI
          </strong>

          <span>
            Personalized interview preparation
            from your resume
          </span>

        </footer>

      </div>
    </>
  );
}

export default InterviewPrep;
