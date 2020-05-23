import React from "react";

export const ProjectCard = ({ singleProject, onClick }) => {
  return (
    <div className="project-card">
      <button className="close-btn" onClick={onClick}>
        <span>X</span>
      </button>
      <div className="project-card-name"> {singleProject.name}</div>
      <div className="project-card-detail">Detail: {singleProject.detail}</div>
    </div>
  );
};
