function SkillsSection({ resumeData, setResumeData }) {

  const addSkill = () => {

    if (resumeData.currentSkill.trim() === "") return;

    setResumeData({
      ...resumeData,
      skills: [...resumeData.skills, resumeData.currentSkill],
      currentSkill: "",
    });
  };

  const removeSkill = (index) => {

    const updatedSkills = resumeData.skills.filter(
      (_, i) => i !== index
    );

    setResumeData({
      ...resumeData,
      skills: updatedSkills,
    });
  };

  return (
    <div>

      <h2>Skills</h2>

      <input
        type="text"
        placeholder="Enter Skill"
        value={resumeData.currentSkill}
        onChange={(e) =>
          setResumeData({
            ...resumeData,
            currentSkill: e.target.value,
          })
        }
      />

      <button type="button" onClick={addSkill}>
        Add Skill
      </button>

      <div style={{ marginTop: "20px" }}>

        {resumeData.skills.map((skill, index) => (

          <span
            key={index}
            style={{
              display: "inline-block",
              background: "#2563eb",
              color: "white",
              padding: "8px 15px",
              borderRadius: "20px",
              margin: "5px",
              cursor: "pointer",
            }}
            onClick={() => removeSkill(index)}
          >
            {skill} ✖
          </span>

        ))}

      </div>

    </div>
  );
}

export default SkillsSection;