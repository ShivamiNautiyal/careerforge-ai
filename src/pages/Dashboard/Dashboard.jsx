import Navbar from "../../components/Navbar/Navbar";
import DashboardCard from "../../components/DashboardCard/DashboardCard";

import {
 FaFileAlt,
 FaUserTie,
 FaChartBar,
 FaGlobe,
 FaCode,
 FaLaptopCode
} from "react-icons/fa";

import "./Dashboard.css";

function Dashboard(){

return(

<>

<Navbar/>

<div className="dashboard">

<h1>Welcome to CareerForge AI 🚀</h1>

<p>
Build Resume, Portfolio and prepare for Interviews using AI.
</p>

<div className="card-container">

<DashboardCard
  title="Resume Builder"
  description="Create professional ATS friendly resumes."
  icon={<FaFileAlt />}
  path="/resume-builder"
/>
<DashboardCard
  title="Resume Analyzer"
  description="Improve your resume using AI."
  icon={<FaChartBar />}
  path="/resume-analyzer"
/>

<DashboardCard
  title="Portfolio Builder"
  description="Create stunning developer portfolio."
  icon={<FaGlobe />}
  path="/portfolio-builder"
/>

<DashboardCard
  title="Portfolio Analyzer"
  description="Analyze your portfolio."
  icon={<FaLaptopCode />}
  path="/portfolio-analyzer"
/>

<DashboardCard
  title="Interview Prep"
  description="Practice interview questions."
  icon={<FaUserTie />}
  path="/interview-prep"
/>

<DashboardCard
  title="Code Explainer"
  description="Understand code easily."
  icon={<FaCode />}
  path="/code-explainer"
/>
</div>

</div>

</>

)

}

export default Dashboard;