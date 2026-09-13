import { HashRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import ResumeBuilder from "./pages/ResumeBuilder/ResumeBuilder";
import ResumeAnalyzer from "./pages/ResumeAnalyzer/ResumeAnalyzer";
import PortfolioBuilder from "./pages/PortfolioBuilder/PortfolioBuilder";
import PortfolioAnalyzer from "./pages/PortfolioAnalyzer/PortfolioAnalyzer";
import InterviewPrep from "./pages/InterviewPrep/InterviewPrep";
import CodeExplainer from "./pages/CodeExplainer/CodeExplainer";


function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
         <Route path="/resume-builder" element={<ResumeBuilder />} /> 
        <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />
        <Route path="/portfolio-builder" element={<PortfolioBuilder />} />
        <Route path="/portfolio-analyzer" element={<PortfolioAnalyzer />} />
        <Route path="/interview-prep" element={<InterviewPrep />} />
        <Route path="/code-explainer" element={<CodeExplainer />} /> 
      </Routes>
    </HashRouter>
  );
}

export default App;