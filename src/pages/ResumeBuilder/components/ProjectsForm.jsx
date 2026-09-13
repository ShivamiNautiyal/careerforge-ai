import React from "react";
import "./ProjectsForm.css";

function ProjectsForm({ resumeData, setResumeData }) {
  const projects = resumeData.projects;

  const handleChange = (index, e) => {
    const updated = [...projects];
    updated[index][e.target.name] = e.target.value;

    setResumeData({
      ...resumeData,
      projects: updated,
    });
  };

  const addProject = () => {
    setResumeData({
      ...resumeData,
      projects: [
        ...projects,
        {
          projectName: "",
          technologies: "",
          github: "",
          liveDemo: "",
          description: "",
        },
      ],
    });
  };

  const removeProject = (index) => {
    const updated = projects.filter((_, i) => i !== index);

    setResumeData({
      ...resumeData,
      projects: updated,
    });
  };

  return (
    <div className="projects-container">
      <h2>Projects</h2>

      {projects.map((project, index) => (
        <div className="project-card" key={index}>

          <input
            type="text"
            name="projectName"
            placeholder="Project Name"
            value={project.projectName}
            onChange={(e) => handleChange(index, e)}
          />

          <input
            type="text"
            name="technologies"
            placeholder="Technologies Used"
            value={project.technologies}
            onChange={(e) => handleChange(index, e)}
          />

          <input
            type="text"
            name="github"
            placeholder="GitHub Link"
            value={project.github}
            onChange={(e) => handleChange(index, e)}
          />

          <input
            type="text"
            name="liveDemo"
            placeholder="Live Demo Link"
            value={project.liveDemo}
            onChange={(e) => handleChange(index, e)}
          />

          <textarea
            name="description"
            placeholder="Project Description"
            value={project.description}
            onChange={(e) => handleChange(index, e)}
          />

          <button
            className="delete-btn"
            onClick={() => removeProject(index)}
          >
            Delete
          </button>
        </div>
      ))}

      <button className="add-btn" onClick={addProject}>
        + Add Project
      </button>
    </div>
  );
}

export default ProjectsForm;