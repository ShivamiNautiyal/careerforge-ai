import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./CodeExplainer.css";

const languages = [
  { value: "javascript", label: "JavaScript", icon: "🟨" },
  { value: "react", label: "React / JSX", icon: "⚛️" },
  { value: "java", label: "Java", icon: "☕" },
  { value: "html", label: "HTML", icon: "🌐" },
  { value: "css", label: "CSS", icon: "🎨" }
];

/* =========================================================
   EXAMPLE CODE
========================================================= */

const examples = {
  javascript: `const numbers = [1, 2, 3, 4, 5];

const evenNumbers = numbers.filter(
  (number) => number % 2 === 0
);

console.log(evenNumbers);`,

  react: `import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  const increaseCount = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <h2>{count}</h2>

      <button onClick={increaseCount}>
        Increase
      </button>
    </div>
  );
}

export default Counter;`,

  java: `public class Main {

  public static void main(String[] args) {

    int[] numbers = {1, 2, 3, 4, 5};

    for (int number : numbers) {
      System.out.println(number);
    }
  }
}`,

  html: `<section class="profile">
  <h1>My Portfolio</h1>

  <p>
    Welcome to my developer portfolio.
  </p>

  <button>View Projects</button>
</section>`,

  css: `.card {
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin: 10px;
  border-radius: 12px;
}

@media (max-width: 600px) {
  .card {
    padding: 12px;
  }
}`
};

/* =========================================================
   HELPER - LANGUAGE NAME
========================================================= */

function getLanguageName(language) {
  const found = languages.find(
    (item) => item.value === language
  );

  return found ? found.label : language;
}

/* =========================================================
   REMOVE COMMENTS FOR BASIC ANALYSIS
========================================================= */

function cleanLine(line) {
  return line.trim();
}

/* =========================================================
   JAVASCRIPT LINE EXPLANATION
========================================================= */

function explainJavaScriptLine(line, index, lines) {
  const explanations = [];

  if (!line) {
    return {
      title: "Blank Line",
      explanation:
        "This is a blank line. It does not execute any operation. It is used to make the code easier to read."
    };
  }

  if (
    line.startsWith("//") ||
    line.startsWith("/*") ||
    line.startsWith("*") ||
    line.endsWith("*/")
  ) {
    return {
      title: "Comment",
      explanation:
        "This is a comment. Comments are ignored by JavaScript during execution and are mainly used to explain code to developers."
    };
  }

  if (/^import\s/.test(line)) {
    return {
      title: "Import Statement",
      explanation:
        "This line imports functionality from another module or package so that it can be used in the current file."
    };
  }

  if (/^export\s+default/.test(line)) {
    return {
      title: "Default Export",
      explanation:
        "This line exports a value as the default export of the current module. Another file can import this value using its own name."
    };
  }

  if (/^export\s/.test(line)) {
    return {
      title: "Export Statement",
      explanation:
        "This line makes a variable, function or component available to other JavaScript modules."
    };
  }

  if (/\bconst\b/.test(line)) {
    explanations.push(
      "`const` is used to declare a variable that cannot be reassigned."
    );
  }

  if (/\blet\b/.test(line)) {
    explanations.push(
      "`let` declares a block-scoped variable whose value can be changed later."
    );
  }

  if (/\bvar\b/.test(line)) {
    explanations.push(
      "`var` declares a variable. In modern JavaScript, `let` and `const` are generally preferred because of their block-scoping behavior."
    );
  }

  if (/=>/.test(line)) {
    explanations.push(
      "This line uses an arrow function. Arrow functions provide a shorter syntax for writing functions."
    );
  }

  if (/function\s+\w+/.test(line)) {
    explanations.push(
      "This line defines a function. A function groups reusable instructions that can be executed when the function is called."
    );
  }

  if (/\.map\s*\(/.test(line)) {
    explanations.push(
      "`map()` goes through array elements and creates a new array by transforming each element."
    );
  }

  if (/\.filter\s*\(/.test(line)) {
    explanations.push(
      "`filter()` checks array elements against a condition and returns a new array containing only the elements that satisfy that condition."
    );
  }

  if (/\.reduce\s*\(/.test(line)) {
    explanations.push(
      "`reduce()` processes array elements and combines them into a single accumulated result."
    );
  }

  if (/\.forEach\s*\(/.test(line)) {
    explanations.push(
      "`forEach()` executes a function once for every element of an array."
    );
  }

  if (/console\.log/.test(line)) {
    explanations.push(
      "`console.log()` prints a value in the browser or JavaScript console. It is commonly used for debugging."
    );
  }

  if (/\bif\s*\(/.test(line)) {
    explanations.push(
      "This is an `if` condition. The code inside its block executes only when the condition is true."
    );
  }

  if (/\belse\b/.test(line)) {
    explanations.push(
      "`else` provides an alternative block that executes when the previous condition is false."
    );
  }

  if (/\bfor\s*\(/.test(line)) {
    explanations.push(
      "This line starts a `for` loop. The loop repeatedly executes code according to its initialization, condition and update expression."
    );
  }

  if (/\bwhile\s*\(/.test(line)) {
    explanations.push(
      "This line starts a `while` loop. The block continues executing while the condition remains true."
    );
  }

  if (/\breturn\b/.test(line)) {
    explanations.push(
      "`return` sends a value back from the current function and stops that function's execution."
    );
  }

  if (/async\s/.test(line)) {
    explanations.push(
      "`async` marks a function as asynchronous. An async function returns a Promise."
    );
  }

  if (/await\s/.test(line)) {
    explanations.push(
      "`await` pauses the execution of the async function until the Promise settles, making asynchronous code easier to read."
    );
  }

  if (/new\s+\w+/.test(line)) {
    explanations.push(
      "`new` is used to create an object instance from a constructor or class."
    );
  }

  if (/\btry\b/.test(line)) {
    explanations.push(
      "`try` starts a block of code where runtime errors can be handled using `catch`."
    );
  }

  if (/\bcatch\b/.test(line)) {
    explanations.push(
      "`catch` handles an error thrown from the corresponding `try` block."
    );
  }

  if (/localStorage/.test(line)) {
    explanations.push(
      "`localStorage` stores key-value data in the browser so that it can remain available across page reloads."
    );
  }

  if (/\?\?|\?/.test(line)) {
    explanations.push(
      "This line uses a conditional or nullish-related operator to decide which value or expression should be used."
    );
  }

  if (/===|!==|==|!=|>=|<=|>|</.test(line)) {
    explanations.push(
      "This line contains a comparison operator. The comparison produces a boolean result such as true or false."
    );
  }

  if (/%/.test(line)) {
    explanations.push(
      "The `%` operator calculates the remainder after division. It is commonly used for checking even/odd numbers."
    );
  }

  if (/\+\+|--/.test(line)) {
    explanations.push(
      "This line uses an increment or decrement operator to increase or decrease a numeric value by one."
    );
  }

  if (line === "{" || line === "}") {
    return {
      title: "Code Block",
      explanation:
        "This curly bracket marks the beginning or end of a code block. Code blocks group statements belonging to a function, condition, loop or component."
    };
  }

  if (
    line.startsWith("(") ||
    line.startsWith(")") ||
    line === ");" ||
    line === ");"
  ) {
    explanations.push(
      "This line continues or closes the expression started on the previous line. It helps JavaScript complete the function call or expression."
    );
  }

  if (
    explanations.length === 0 &&
    /\w+\s*=/.test(line)
  ) {
    explanations.push(
      "This line assigns a value to a variable or property. The expression on the right side is evaluated and its result is stored on the left side."
    );
  }

  if (explanations.length === 0) {
    explanations.push(
      "This line is part of the program's logic. Its exact purpose depends on the surrounding statements, variables and functions."
    );
  }

  return {
    title: getJavaScriptLineTitle(line),
    explanation: explanations.join(" ")
  };
}

function getJavaScriptLineTitle(line) {
  if (/\bconst\b|\blet\b|\bvar\b/.test(line)) {
    return "Variable Declaration";
  }

  if (/function|=>/.test(line)) {
    return "Function";
  }

  if (/map|filter|reduce|forEach/.test(line)) {
    return "Array Operation";
  }

  if (/if|else/.test(line)) {
    return "Condition";
  }

  if (/for|while/.test(line)) {
    return "Loop";
  }

  if (/return/.test(line)) {
    return "Return Statement";
  }

  if (/console\.log/.test(line)) {
    return "Console Output";
  }

  return "JavaScript Statement";
}

/* =========================================================
   REACT LINE EXPLANATION
========================================================= */

function explainReactLine(line) {
  if (/import\s+React/.test(line)) {
    return {
      title: "React Import",
      explanation:
        "This line imports React-related functionality so that it can be used in the current React file."
    };
  }

  if (/useState/.test(line)) {
    return {
      title: "useState Hook",
      explanation:
        "`useState` creates state inside a functional React component. The returned setter function is used to update that state, which can cause the component to re-render."
    };
  }

  if (/useEffect/.test(line)) {
    return {
      title: "useEffect Hook",
      explanation:
        "`useEffect` is used for side effects such as fetching data, updating localStorage, subscriptions or interacting with external systems."
    };
  }

  if (/function\s+\w+/.test(line)) {
    return {
      title: "React Component",
      explanation:
        "This line defines a functional React component. A component is a reusable piece of UI that returns JSX."
    };
  }

  if (/const\s+\w+\s*=\s*\(.*\)\s*=>/.test(line)) {
    return {
      title: "Event Handler / Function",
      explanation:
        "This line creates a function using arrow-function syntax. In React, such functions are often used as event handlers or helper functions."
    };
  }

  if (/set[A-Z]\w*\s*\(/.test(line)) {
    return {
      title: "State Update",
      explanation:
        "This line calls a state setter function. React schedules an update and re-renders the component with the new state."
    };
  }

  if (/className=/.test(line)) {
    return {
      title: "CSS Class",
      explanation:
        "`className` attaches a CSS class to the React element so that it can be styled using CSS."
    };
  }

  if (/onClick=/.test(line)) {
    return {
      title: "Click Event",
      explanation:
        "`onClick` tells React which function should run when the user clicks this element."
    };
  }

  if (/{.*}/.test(line)) {
    return {
      title: "JSX Expression",
      explanation:
        "Curly braces inside JSX allow JavaScript expressions or variables to be inserted into the rendered UI."
    };
  }

  if (/<[A-Za-z]/.test(line)) {
    return {
      title: "JSX Element",
      explanation:
        "This line contains JSX markup. React uses JSX to describe the UI that should be rendered."
    };
  }

  if (/return/.test(line)) {
    return {
      title: "Component Return",
      explanation:
        "The component returns JSX. React uses this returned JSX to determine what should appear in the UI."
    };
  }

  if (/export default/.test(line)) {
    return {
      title: "Component Export",
      explanation:
        "This exports the React component as the default export so another file can import and use it."
    };
  }

  if (line === "{" || line === "}") {
    return {
      title: "Code Block",
      explanation:
        "This curly bracket starts or ends a block belonging to a component, function, condition or another JavaScript structure."
    };
  }

  return {
    title: "React / JavaScript Statement",
    explanation:
      "This line contributes to the React component or its JavaScript logic. Its exact behavior depends on the surrounding code."
  };
}

/* =========================================================
   JAVA LINE EXPLANATION
========================================================= */

function explainJavaLine(line) {
  if (/public\s+class/.test(line)) {
    return {
      title: "Class Declaration",
      explanation:
        "This line declares a public Java class. A class acts as a blueprint for objects and contains fields and methods."
    };
  }

  if (/public\s+static\s+void\s+main/.test(line)) {
    return {
      title: "Main Method",
      explanation:
        "This is Java's main method. Program execution starts from this method when the class is run."
    };
  }

  if (/int\[\]/.test(line)) {
    return {
      title: "Integer Array",
      explanation:
        "This line declares an integer array. An array stores multiple values of the same data type."
    };
  }

  if (/for\s*\(/.test(line)) {
    return {
      title: "For Loop",
      explanation:
        "This line starts a for loop. The loop repeatedly executes its block for each required iteration."
    };
  }

  if (/for\s*\(\s*\w+\s+\w+\s*:/.test(line)) {
    return {
      title: "Enhanced For Loop",
      explanation:
        "This is an enhanced for loop, also called a for-each loop. It visits each element of an array or iterable collection without manually managing an index."
    };
  }

  if (/System\.out\.println/.test(line)) {
    return {
      title: "Console Output",
      explanation:
        "`System.out.println()` prints the supplied value to the console and then moves to the next line."
    };
  }

  if (/if\s*\(/.test(line)) {
    return {
      title: "Condition",
      explanation:
        "This if statement checks a condition. Its block executes only when that condition is true."
    };
  }

  if (/return/.test(line)) {
    return {
      title: "Return Statement",
      explanation:
        "The return statement sends a value back from the current method or exits the method when no value is required."
    };
  }

  if (/extends/.test(line)) {
    return {
      title: "Inheritance",
      explanation:
        "`extends` establishes inheritance. The child class can inherit accessible members from the parent class."
    };
  }

  if (/ArrayList/.test(line)) {
    return {
      title: "ArrayList",
      explanation:
        "ArrayList is a resizable collection that stores objects and can grow or shrink dynamically."
    };
  }

  if (line === "{" || line === "}") {
    return {
      title: "Code Block",
      explanation:
        "This curly bracket starts or ends a Java code block such as a class, method, loop or condition."
    };
  }

  return {
    title: "Java Statement",
    explanation:
      "This line is part of the Java program. Its exact behavior depends on the surrounding class, method and variables."
  };
}

/* =========================================================
   HTML LINE EXPLANATION
========================================================= */

function explainHTMLLine(line) {
  const lower = line.toLowerCase();

  if (lower.includes("<!doctype")) {
    return {
      title: "DOCTYPE Declaration",
      explanation:
        "DOCTYPE tells the browser which HTML document standard is being used. `<!DOCTYPE html>` indicates modern HTML5."
    };
  }

  if (/<html/.test(lower)) {
    return {
      title: "HTML Root Element",
      explanation:
        "`html` is the root element of an HTML document. All other HTML content is placed inside it."
    };
  }

  if (/<head/.test(lower)) {
    return {
      title: "Head Section",
      explanation:
        "The head contains metadata and resources used by the browser, such as the page title, stylesheets and meta information."
    };
  }

  if (/<body/.test(lower)) {
    return {
      title: "Body Section",
      explanation:
        "The body contains the visible content of the webpage."
    };
  }

  if (/<h[1-6]/.test(lower)) {
    return {
      title: "Heading",
      explanation:
        "This is a heading element. Headings create a hierarchy for page content, with h1 generally representing the main heading."
    };
  }

  if (/<p[\s>]/.test(lower)) {
    return {
      title: "Paragraph",
      explanation:
        "`p` represents a paragraph of text."
    };
  }

  if (/<button/.test(lower)) {
    return {
      title: "Button",
      explanation:
        "`button` creates an interactive button. JavaScript can be used to respond to user clicks."
    };
  }

  if (/<a[\s>]/.test(lower)) {
    return {
      title: "Anchor / Link",
      explanation:
        "`a` creates a hyperlink. Its `href` attribute normally specifies the destination."
    };
  }

  if (/<img/.test(lower)) {
    return {
      title: "Image",
      explanation:
        "`img` displays an image. The `src` attribute provides the image source and `alt` should describe the image for accessibility."
    };
  }

  if (/<form/.test(lower)) {
    return {
      title: "Form",
      explanation:
        "`form` groups controls used to collect user input."
    };
  }

  if (/<input/.test(lower)) {
    return {
      title: "Input",
      explanation:
        "`input` creates a form control that allows the user to enter or select data."
    };
  }

  if (/<section/.test(lower)) {
    return {
      title: "Semantic Section",
      explanation:
        "`section` represents a thematic section of content and provides better semantic structure than using generic containers everywhere."
    };
  }

  if (/<div/.test(lower)) {
    return {
      title: "Division Container",
      explanation:
        "`div` is a generic container used to group HTML elements for structure or styling."
    };
  }

  if (/class=/.test(lower)) {
    return {
      title: "CSS Class",
      explanation:
        "The `class` attribute assigns one or more CSS classes to the HTML element so that it can be styled or selected using JavaScript."
    };
  }

  if (line.startsWith("</")) {
    return {
      title: "Closing Tag",
      explanation:
        "This line closes the HTML element that was previously opened. It tells the browser where that element's content ends."
    };
  }

  return {
    title: "HTML Element",
    explanation:
      "This line contains HTML markup that contributes structure or content to the webpage."
  };
}

/* =========================================================
   CSS LINE EXPLANATION
========================================================= */

function explainCSSLine(line) {
  if (line.startsWith("@media")) {
    return {
      title: "Media Query",
      explanation:
        "This media query applies CSS rules when the viewport matches the specified condition, commonly used for responsive design."
    };
  }

  if (line.includes("{") && !line.includes(":")) {
    return {
      title: "CSS Selector",
      explanation:
        "This line defines a CSS selector. The declarations inside its curly brackets will be applied to elements matching this selector."
    };
  }

  if (line.includes("display: flex")) {
    return {
      title: "Flexbox",
      explanation:
        "`display: flex` turns the element into a flex container, allowing its children to be arranged using Flexbox."
    };
  }

  if (line.includes("display: grid")) {
    return {
      title: "CSS Grid",
      explanation:
        "`display: grid` turns the element into a grid container, allowing its children to be arranged using rows and columns."
    };
  }

  if (line.includes("flex-direction")) {
    return {
      title: "Flex Direction",
      explanation:
        "`flex-direction` controls the main direction in which flex items are arranged, such as row or column."
    };
  }

  if (line.includes("padding")) {
    return {
      title: "Padding",
      explanation:
        "`padding` creates space inside an element, between its content and its border."
    };
  }

  if (line.includes("margin")) {
    return {
      title: "Margin",
      explanation:
        "`margin` creates space outside an element's border."
    };
  }

  if (line.includes("color:")) {
    return {
      title: "Text Color",
      explanation:
        "The `color` property controls the color of text inside the element."
    };
  }

  if (line.includes("background")) {
    return {
      title: "Background",
      explanation:
        "This declaration controls the background of the selected element."
    };
  }

  if (line.includes("border-radius")) {
    return {
      title: "Rounded Corners",
      explanation:
        "`border-radius` rounds the corners of an element."
    };
  }

  if (line.includes("position:")) {
    return {
      title: "Position",
      explanation:
        "`position` controls how an element is positioned relative to the normal document flow or another positioning context."
    };
  }

  if (line.includes("width:")) {
    return {
      title: "Width",
      explanation:
        "`width` controls the horizontal size of the element."
    };
  }

  if (line.includes("height:")) {
    return {
      title: "Height",
      explanation:
        "`height` controls the vertical size of the element."
    };
  }

  if (line.includes("font-size")) {
    return {
      title: "Font Size",
      explanation:
        "`font-size` controls the size of the text."
    };
  }

  if (line.includes("justify-content")) {
    return {
      title: "Horizontal/Main Alignment",
      explanation:
        "`justify-content` controls how flex or grid items are distributed along the relevant axis."
    };
  }

  if (line.includes("align-items")) {
    return {
      title: "Cross Axis Alignment",
      explanation:
        "`align-items` controls the alignment of flex items along the cross axis."
    };
  }

  if (line === "}" || line.endsWith("}")) {
    return {
      title: "CSS Block Closing",
      explanation:
        "This curly bracket closes the current CSS rule or media-query block."
    };
  }

  return {
    title: "CSS Declaration",
    explanation:
      "This line defines a CSS property and value that controls the appearance or layout of an element."
  };
}

/* =========================================================
   MAIN LINE EXPLANATION FUNCTION
========================================================= */

function explainLine(line, index, lines, language) {
  const trimmed = cleanLine(line);

  if (language === "javascript") {
    return explainJavaScriptLine(
      trimmed,
      index,
      lines
    );
  }

  if (language === "react") {
    return explainReactLine(
      trimmed,
      index,
      lines
    );
  }

  if (language === "java") {
    return explainJavaLine(trimmed);
  }

  if (language === "html") {
    return explainHTMLLine(trimmed);
  }

  if (language === "css") {
    return explainCSSLine(trimmed);
  }

  return {
    title: "Code Line",
    explanation:
      "This line is part of the provided code."
  };
}

/* =========================================================
   COMPLEXITY
========================================================= */

function calculateComplexity(code) {
  const nestedLoop =
    /for[\s\S]*for\s*\(/.test(code) ||
    /while[\s\S]*while\s*\(/.test(code);

  const hasLoop =
    /\bfor\b|\bwhile\b|\.map\(|\.filter\(|\.forEach\(/.test(
      code
    );

  const hasBinarySearch =
    /mid\s*=|Math\.floor.*2|start.*end|left.*right/i.test(
      code
    );

  if (nestedLoop) {
    return {
      time: "O(n²)",
      description:
        "Nested iteration has been detected. If both loops depend on the input size, the algorithm can take quadratic time.",
      space: "O(1)",
      spaceDescription:
        "No obvious input-sized auxiliary data structure was detected."
    };
  }

  if (hasBinarySearch) {
    return {
      time: "Possibly O(log n)",
      description:
        "The code contains patterns commonly associated with binary search.",
      space: "O(1)",
      spaceDescription:
        "The detected approach appears to use constant auxiliary space."
    };
  }

  if (hasLoop) {
    return {
      time: "O(n)",
      description:
        "A main iteration over the input appears to be present.",
      space: "O(1)",
      spaceDescription:
        "No obvious additional structure proportional to input size was detected."
    };
  }

  return {
    time: "O(1)",
    description:
      "No obvious input-sized loop or repeated traversal was detected.",
    space: "O(1)",
    spaceDescription:
      "The code appears to use approximately constant auxiliary space."
  };
}

/* =========================================================
   CODE SUMMARY
========================================================= */

function createSummary(code, language, lineCount) {
  const name = getLanguageName(language);

  if (language === "javascript") {
    if (code.includes("filter")) {
      return `This ${name} code works with an array and uses filter() to select elements that satisfy a condition. The resulting array is then stored or displayed.`;
    }

    if (code.includes("map")) {
      return `This ${name} code processes an array using map(). Each element is transformed according to the callback function and a new array is produced.`;
    }

    if (code.includes("function")) {
      return `This ${name} code defines and uses reusable function-based logic. The function receives data, performs operations and may return a result.`;
    }
  }

  if (language === "react") {
    if (code.includes("useState")) {
      return `This React code creates a functional component and manages changing UI data using the useState Hook. Updating the state causes React to render the updated UI.`;
    }

    return `This React code defines a functional component that returns JSX to create part of the user interface.`;
  }

  if (language === "java") {
    if (code.includes("for")) {
      return `This Java code defines a program structure and uses iteration to process data. The loop executes its block repeatedly according to the provided condition or collection.`;
    }

    return `This Java code defines a class and contains Java statements that perform the program's required operations.`;
  }

  if (language === "html") {
    return `This HTML code creates the structure of a webpage using HTML elements. The elements define headings, text, sections, buttons or other page content.`;
  }

  if (language === "css") {
    return `This CSS code defines styling and layout rules for webpage elements. It controls properties such as spacing, alignment, colors and responsive behavior.`;
  }

  return `The provided ${name} code contains ${lineCount} meaningful lines.`;
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

function CodeExplainer() {
  const [language, setLanguage] =
    useState("javascript");

  const [code, setCode] =
    useState("");

  const [result, setResult] =
    useState(null);

  const [activeTab, setActiveTab] =
    useState("overview");

  const [copied, setCopied] =
    useState(false);

  /* =======================================================
     ANALYZE
  ======================================================= */

  const analyzeCode = () => {
    if (!code.trim()) {
      alert(
        "Please paste some code first."
      );
      return;
    }

    const allLines =
      code.split("\n");

    const meaningfulLines =
      allLines.filter(
        (line) => line.trim() !== ""
      );

    const lineExplanations =
      allLines.map(
        (line, index) => ({
          lineNumber: index + 1,
          code: line,
          ...explainLine(
            line,
            index,
            allLines,
            language
          )
        })
      );

    const complexity =
      calculateComplexity(code);

    const summary =
      createSummary(
        code,
        language,
        meaningfulLines.length
      );

    setResult({
      summary,
      lineExplanations,
      complexity,
      totalLines: allLines.length,
      meaningfulLines:
        meaningfulLines.length
    });

    setActiveTab("overview");

    setTimeout(() => {
      document
        .getElementById(
          "code-analysis-result"
        )
        ?.scrollIntoView({
          behavior: "smooth"
        });
    }, 100);
  };

  /* =======================================================
     EXAMPLE
  ======================================================= */

  const loadExample = () => {
    setCode(
      examples[language]
    );
    setResult(null);
  };

  /* =======================================================
     CLEAR
  ======================================================= */

  const clearCode = () => {
    setCode("");
    setResult(null);
    setCopied(false);
  };

  /* =======================================================
     COPY
  ======================================================= */

  const copyExplanation = async () => {
    if (!result) return;

    let text =
      `CAREERFORGE AI - CODE EXPLANATION\n\n`;

    text += `Language: ${getLanguageName(
      language
    )}\n\n`;

    text += `WHAT DOES THIS CODE DO?\n`;
    text += `${result.summary}\n\n`;

    text += `LINE-BY-LINE EXPLANATION\n\n`;

    result.lineExplanations.forEach(
      (item) => {
        if (item.code.trim()) {
          text += `Line ${item.lineNumber}: ${item.code}\n`;
          text += `${item.explanation}\n\n`;
        }
      }
    );

    text += `COMPLEXITY\n`;
    text += `Time: ${result.complexity.time}\n`;
    text += `${result.complexity.description}\n`;
    text += `Space: ${result.complexity.space}\n`;
    text += `${result.complexity.spaceDescription}\n`;

    try {
      await navigator.clipboard.writeText(
        text
      );

      setCopied(true);

      setTimeout(
        () => setCopied(false),
        2000
      );
    } catch {
      alert(
        "Copy failed. Please copy manually."
      );
    }
  };

  const selectedLanguage =
    languages.find(
      (item) =>
        item.value === language
    );

  return (
    <>
      <Navbar />

      <div className="code-explainer-page">

        {/* HERO */}

        <section className="code-hero">

          <div className="code-hero-inner">

            <div className="code-badge">
              🧠 Code Learning Assistant
            </div>

            <h1>
              Understand Every Line
              <span>
                of Your Code.
              </span>
            </h1>

            <p>
              Paste your code and get a
              simple, beginner-friendly
              line-by-line explanation with
              concepts and complexity.
            </p>

            <div className="hero-points">
              <span>✓ Every line explained</span>
              <span>✓ Simple language</span>
              <span>✓ Complexity analysis</span>
              <span>✓ Interview preparation</span>
            </div>

          </div>

        </section>

        <main className="code-main">

          {/* EDITOR */}

          <section className="editor-card">

            <div className="editor-top">

              <div>
                <span className="step-label">
                  STEP 01
                </span>

                <h2>
                  Paste Your Code
                </h2>

                <p>
                  Select your programming
                  language and paste the code
                  you want to understand.
                </p>
              </div>

              <div className="language-box">

                <span>
                  {selectedLanguage.icon}
                </span>

                <select
                  value={language}
                  onChange={(e) => {
                    setLanguage(
                      e.target.value
                    );
                    setResult(null);
                  }}
                >
                  {languages.map(
                    (item) => (
                      <option
                        value={item.value}
                        key={item.value}
                      >
                        {item.label}
                      </option>
                    )
                  )}
                </select>

              </div>

            </div>

            <div className="editor-toolbar">

              <span>
                {selectedLanguage.icon}{" "}
                {selectedLanguage.label}
              </span>

              <div>

                <button
                  onClick={loadExample}
                >
                  ✨ Example
                </button>

                <button
                  onClick={clearCode}
                >
                  🗑 Clear
                </button>

              </div>

            </div>

            <div className="code-editor-wrapper">

              <div className="line-number-column">

                {code
                  ? code.split("\n").map(
                      (_, index) => (
                        <span
                          key={index}
                        >
                          {index + 1}
                        </span>
                      )
                    )
                  : Array.from(
                      { length: 15 },
                      (_, index) => (
                        <span
                          key={index}
                        >
                          {index + 1}
                        </span>
                      )
                    )}

              </div>

              <textarea
                value={code}
                onChange={(e) =>
                  setCode(
                    e.target.value
                  )
                }
                placeholder={`Paste your ${selectedLanguage.label} code here...`}
                spellCheck="false"
              />

            </div>

            <div className="editor-footer">

              <span>
                {code.split("\n").length} lines
              </span>

              <button
                className="analyze-button"
                onClick={analyzeCode}
              >
                🚀 Explain Line by Line
              </button>

            </div>

          </section>

          {/* RESULTS */}

          {result && (
            <section
              className="analysis-card"
              id="code-analysis-result"
            >

              <div className="analysis-header">

                <div>
                  <span className="step-label">
                    STEP 02
                  </span>

                  <h2>
                    Code Explanation
                  </h2>

                  <p>
                    Your code has been broken
                    down line by line.
                  </p>
                </div>

                <button
                  className="copy-button"
                  onClick={
                    copyExplanation
                  }
                >
                  {copied
                    ? "✓ Copied"
                    : "📋 Copy Notes"}
                </button>

              </div>

              {/* TABS */}

              <div className="analysis-tabs">

                <button
                  className={
                    activeTab ===
                    "overview"
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setActiveTab(
                      "overview"
                    )
                  }
                >
                  📋 Overview
                </button>

                <button
                  className={
                    activeTab ===
                    "linebyline"
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setActiveTab(
                      "linebyline"
                    )
                  }
                >
                  🔍 Line by Line
                </button>

                <button
                  className={
                    activeTab ===
                    "complexity"
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setActiveTab(
                      "complexity"
                    )
                  }
                >
                  ⚡ Complexity
                </button>

              </div>

              {/* OVERVIEW */}

              {activeTab ===
                "overview" && (
                <div className="overview-content">

                  <div className="summary-box">

                    <div className="box-icon">
                      💡
                    </div>

                    <div>
                      <h3>
                        What does this
                        code do?
                      </h3>

                      <p>
                        {result.summary}
                      </p>
                    </div>

                  </div>

                  <div className="stats-grid">

                    <div className="stat-card">
                      <span>
                        Total Lines
                      </span>

                      <strong>
                        {result.totalLines}
                      </strong>
                    </div>

                    <div className="stat-card">
                      <span>
                        Meaningful Lines
                      </span>

                      <strong>
                        {
                          result.meaningfulLines
                        }
                      </strong>
                    </div>

                    <div className="stat-card">
                      <span>
                        Language
                      </span>

                      <strong>
                        {
                          selectedLanguage.label
                        }
                      </strong>
                    </div>

                  </div>

                  <button
                    className="start-line-button"
                    onClick={() =>
                      setActiveTab(
                        "linebyline"
                      )
                    }
                  >
                    🔍 Start Line-by-Line
                    Explanation →
                  </button>

                </div>
              )}

              {/* LINE BY LINE */}

              {activeTab ===
                "linebyline" && (
                <div className="line-by-line">

                  <div className="line-intro">

                    <div>
                      <h3>
                        🔍 Line-by-Line
                        Explanation
                      </h3>

                      <p>
                        Every line of your
                        code is explained
                        below in simple
                        language.
                      </p>
                    </div>

                    <span>
                      {
                        result.meaningfulLines
                      }{" "}
                      meaningful lines
                    </span>

                  </div>

                  <div className="explanation-list">

                    {result.lineExplanations.map(
                      (item) => (
                        <div
                          className={
                            item.code.trim()
                              ? "line-card"
                              : "line-card blank-line"
                          }
                          key={
                            item.lineNumber
                          }
                        >

                          <div className="line-number">
                            {item.lineNumber}
                          </div>

                          <div className="line-details">

                            <div className="line-title">
                              {item.title}
                            </div>

                            {item.code.trim() ? (
                              <>
                                <div className="actual-code">
                                  <span>
                                    {selectedLanguage.icon}
                                  </span>

                                  <code>
                                    {item.code}
                                  </code>
                                </div>

                                <div className="line-explanation">

                                  <strong>
                                    Explanation:
                                  </strong>

                                  <p>
                                    {
                                      item.explanation
                                    }
                                  </p>

                                </div>
                              </>
                            ) : (
                              <p className="blank-text">
                                Blank line used
                                for code
                                readability.
                              </p>
                            )}

                          </div>

                        </div>
                      )
                    )}

                  </div>

                </div>
              )}

              {/* COMPLEXITY */}

              {activeTab ===
                "complexity" && (
                <div className="complexity-content">

                  <div className="complexity-heading">
                    <h3>
                      ⚡ Complexity Analysis
                    </h3>

                    <p>
                      Based on the visible
                      structure of the code.
                    </p>
                  </div>

                  <div className="complexity-grid">

                    <div className="complexity-card">

                      <div className="complexity-icon">
                        ⏱️
                      </div>

                      <span>
                        Time Complexity
                      </span>

                      <strong>
                        {
                          result
                            .complexity
                            .time
                        }
                      </strong>

                      <p>
                        {
                          result
                            .complexity
                            .description
                        }
                      </p>

                    </div>

                    <div className="complexity-card">

                      <div className="complexity-icon">
                        💾
                      </div>

                      <span>
                        Space Complexity
                      </span>

                      <strong>
                        {
                          result
                            .complexity
                            .space
                        }
                      </strong>

                      <p>
                        {
                          result
                            .complexity
                            .spaceDescription
                        }
                      </p>

                    </div>

                  </div>

                  <div className="complexity-note">
                    💡 Complexity detection is
                    rule-based. For advanced
                    algorithms, manually verify
                    the complexity before using it
                    in an interview.
                  </div>

                </div>
              )}

            </section>
          )}

          {/* EMPTY STATE */}

          {!result && (
            <section className="empty-code-state">

              <div className="empty-code-icon">
                💻
              </div>

              <h2>
                Ready to Understand Your Code?
              </h2>

              <p>
                Paste your code above and click
                <strong>
                  {" "}
                  "Explain Line by Line"
                </strong>
                .
              </p>

              <div className="empty-items">

                <span>
                  🔍 Every line
                </span>

                <span>
                  💡 Simple explanation
                </span>

                <span>
                  ⚡ Complexity
                </span>

                <span>
                  🎯 Interview ready
                </span>

              </div>

            </section>
          )}

        </main>

        <footer className="code-footer">
          <strong>
            CareerForge AI
          </strong>

          <span>
            Learn the logic, not just the syntax.
          </span>
        </footer>

      </div>
    </>
  );
}

export default CodeExplainer;