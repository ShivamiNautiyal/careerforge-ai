import "./CareerObjective.css";
function CareerObjective({ resumeData, setResumeData }) {

  const handleChange = (e) => {
    setResumeData({
      ...resumeData,
      careerObjective: e.target.value,
    });
  };

  return (
    <div className="career-objective-section">

      <h2>Career Objective</h2>

      <textarea
        rows="5"
        placeholder="Write your career objective..."
        value={resumeData.careerObjective}
        onChange={handleChange}
      />

    </div>
  );
}

export default CareerObjective;