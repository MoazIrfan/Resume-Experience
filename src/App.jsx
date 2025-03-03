import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [experiences, setExperiences] = useState({});

  const [openItems, setOpenItems] = useState({});

  const toggleItem = (expId) => {
    setOpenItems((prev) => ({ ...prev, [expId]: !prev[expId] }));
  };

  const addExperience = () => {
    const id = `Experience ${Object.keys(experiences).length + 1}`;
    setExperiences((prev) => ({
      ...prev,
      [id]: { title: "", company: "", highlights: [], startDate: "", endDate: "" },
    }));
  };

  const updateField = (expId, field, value) => {
    setExperiences((prev) => ({
      ...prev,
      [expId]: { ...prev[expId], [field]: value },
    }));
  };

  const addHighlight = (expId) => {
    setExperiences((prev) => ({
      ...prev,
      [expId]: { ...prev[expId], highlights: [...prev[expId].highlights, ""] },
    }));
  };

  const updateHighlight = (expId, index, value) => {
    setExperiences((prev) => ({
      ...prev,
      [expId]: {
        ...prev[expId],
        highlights: prev[expId].highlights.map((hl, i) => (i === index ? value : hl)),
      },
    }));
  };

  const isTitleEmpty = Object.values(experiences).some((exp) => exp.title === "");

  return (
    <div className="app">
      <div className="container">

        {/* Editor Section */}
        <div className="editor-section">
          <div className="editor-header">
            <h2>Experience</h2>
            <button
              onClick={addExperience}
              disabled={isTitleEmpty}
            >
              <span>+</span> Add
            </button>
          </div>

          {Object.entries(experiences).map(([expId, exp]) => (
            <div key={expId} className="experience-item">
              <h3 className="experience-header" onClick={() => toggleItem(expId)}>
                <span className={`arrow ${openItems[expId] ? "open" : ""}`}>&#9660;</span>
                {expId}
              </h3>

              {openItems[expId] && (
              <>
              <input
                type="text"
                placeholder="Title"
                value={exp.title}
                onChange={(e) => updateField(expId, "title", e.target.value)}
              />
              <input
                type="text"
                placeholder="Company"
                value={exp.company}
                onChange={(e) => updateField(expId, "company", e.target.value)}
              />
              
              <div className="highlights-header">
                <h4>Highlights</h4>
                <button
                  onClick={() => addHighlight(expId)}
                >
                  <span>+</span> Add a new item
                </button>
              </div>
              {exp.highlights.map((hl, index) => (
                <input
                  key={index}
                  type="text"
                  value={hl}
                  onChange={(e) => updateHighlight(expId, index, e.target.value)}
                  placeholder={`Highlight ${index + 1}`}
                  className="highlights-input"
                />
              ))}
              
              <div className="date-inputs">
                <input
                  type="date"
                  value={exp.startDate}
                  onChange={(e) => updateField(expId, "startDate", e.target.value)}
                />
                <input
                  type="date"
                  value={exp.endDate}
                  onChange={(e) => updateField(expId, "endDate", e.target.value)}
                />
              </div>
              </>
              )}
            </div>
          ))}
        </div>

        {/* Live Preview Section */}
        <div className="preview-section">
          <div className="preview-header">
            <span>Home</span> <span>/</span> <span>Resume</span>
          </div>
          <div className="preview-body">
            <h2>Experience</h2>
            <hr />
            {Object.entries(experiences).map(([expId, exp]) => (
              <div key={expId} className="preview-item">
                <h3>{exp.title || "Title"}</h3>
                <p><strong>{exp.company || "Company Name"}</strong></p>
                <ul>
                  {exp.highlights.map((hl, index) => (
                    <li key={index}>{hl || "Highlight"}</li>
                  ))}
                </ul>
                <p>{exp.startDate || "Start Date"} - {exp.endDate || "End Date"}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
