import React from "react";
import "./ExperienceForm.css";

function ExperienceForm({ resumeData, setResumeData }) {
  const experiences = resumeData.experiences;

  const handleChange = (index, e) => {
  const updated = [...resumeData.experiences];

  updated[index][e.target.name] = e.target.value;

  setResumeData({
    ...resumeData,
    experiences: updated,
  });
};

 const addExperience = () => {
  setResumeData({
    ...resumeData,
    experiences: [
      ...resumeData.experiences,
      {
        company: "",
        role: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
  });
};

  const removeExperience = (index) => {
  const updated = resumeData.experiences.filter((_, i) => i !== index);

  setResumeData({
    ...resumeData,
    experiences: updated,
  });
};
  return (
    <div className="experience-container">
      <h2>Work Experience</h2>

      {experiences.map((exp, index) => (
        <div className="experience-card" key={index}>
          <input
            type="text"
            name="company"
            placeholder="Company Name"
            value={exp.company}
            onChange={(e) => handleChange(index, e)}
          />

          <input
            type="text"
            name="role"
            placeholder="Role"
            value={exp.role}
            onChange={(e) => handleChange(index, e)}
          />

          <input
            type="date"
            name="startDate"
            value={exp.startDate}
            onChange={(e) => handleChange(index, e)}
          />

          <input
            type="date"
            name="endDate"
            value={exp.endDate}
            onChange={(e) => handleChange(index, e)}
          />

          <textarea
            name="description"
            placeholder="Description"
            value={exp.description}
            onChange={(e) => handleChange(index, e)}
          />

          <button
            className="delete-btn"
            onClick={() => removeExperience(index)}
          >
            Delete
          </button>
        </div>
      ))}

      <button className="add-btn" onClick={addExperience}>
        + Add Experience
      </button>
    </div>
  );
}

export default ExperienceForm;