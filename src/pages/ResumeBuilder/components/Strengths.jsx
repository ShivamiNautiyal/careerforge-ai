import "./Strengths.css";
function Strengths({ resumeData, setResumeData }) {

  const addStrength = () => {

    if (resumeData.currentStrength.trim() === "") {
      return;
    }

    setResumeData({
      ...resumeData,
      strengths: [
        ...resumeData.strengths,
        resumeData.currentStrength,
      ],
      currentStrength: "",
    });
  };

  const removeStrength = (index) => {

    const updatedStrengths =
      resumeData.strengths.filter(
        (_, i) => i !== index
      );

    setResumeData({
      ...resumeData,
      strengths: updatedStrengths,
    });
  };

  return (
    <div className="strengths-section">

      <h2>Strengths</h2>

      <input
        type="text"
        placeholder="Enter your strength"
        value={resumeData.currentStrength}
        onChange={(e) =>
          setResumeData({
            ...resumeData,
            currentStrength: e.target.value,
          })
        }
      />

      <button
        type="button"
        onClick={addStrength}
      >
        Add Strength
      </button>

      <div>
        {resumeData.strengths.map((strength, index) => (
          <span
            key={index}
            onClick={() => removeStrength(index)}
          >
            {strength} ✖
          </span>
        ))}
      </div>

    </div>
  );
}

export default Strengths;