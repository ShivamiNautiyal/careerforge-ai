function CertificationSection({ resumeData, setResumeData }) {

  const handleCertificationChange = (index, e) => {

    const updatedCertifications = [...resumeData.certifications];

    updatedCertifications[index][e.target.name] = e.target.value;

    setResumeData({
      ...resumeData,
      certifications: updatedCertifications,
    });
  };


  const addCertification = () => {

    setResumeData({
      ...resumeData,

      certifications: [
        ...resumeData.certifications,

        {
          name: "",
          organization: "",
          date: "",
          link: "",
        },
      ],
    });
  };


  const removeCertification = (index) => {

    const updatedCertifications =
      resumeData.certifications.filter(
        (_, i) => i !== index
      );

    setResumeData({
      ...resumeData,
      certifications: updatedCertifications,
    });
  };


  return (
    <div className="certification-section">

      <h2>Certifications</h2>

      {resumeData.certifications.map((certification, index) => (

        <div className="certification-box" key={index}>

          <input
            type="text"
            name="name"
            placeholder="Certification Name"
            value={certification.name}
            onChange={(e) =>
              handleCertificationChange(index, e)
            }
          />

          <input
            type="text"
            name="organization"
            placeholder="Issuing Organization"
            value={certification.organization}
            onChange={(e) =>
              handleCertificationChange(index, e)
            }
          />

          <input
            type="text"
            name="date"
            placeholder="Date (e.g. August 2026)"
            value={certification.date}
            onChange={(e) =>
              handleCertificationChange(index, e)
            }
          />

          <input
            type="url"
            name="link"
            placeholder="Certificate Link"
            value={certification.link}
            onChange={(e) =>
              handleCertificationChange(index, e)
            }
          />

          {resumeData.certifications.length > 1 && (

            <button
              type="button"
              onClick={() => removeCertification(index)}
            >
              Remove
            </button>

          )}

        </div>

      ))}


      <button
        type="button"
        onClick={addCertification}
      >
        + Add Certification
      </button>

    </div>
  );
}

export default CertificationSection;