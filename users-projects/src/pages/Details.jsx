import React, { useEffect, useState } from "react";
import { getAllData, getData } from "../redux/data";
import { connect } from "react-redux";
import { ProjectCard } from "./ProjectCard";

import { logOut } from "../redux/auth";

const mapStateToProps = (state) => ({
  data: getAllData(state),
});

export const Details = connect(mapStateToProps, { getData,logOut })(
  ({history,

    match: {
      params: { userNumber },
    },
    getData,
logOut,
    data,
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [state, setstate] = useState({});
    const filteredData = data.filter((item) => item.userNumber == userNumber);
const handleLogOut = () => {
  logOut();
  history.push('/')
}
    useEffect(() => {
      getData();
    }, []);
    return (
      <div className="detail-container">
        <div className="buttons">
          <button className="btn" onClick={()=>history.push('/search')}>Go Back</button>
          <button className="btn" onClick={handleLogOut}>Log Out</button>
        </div>
        {filteredData.map((item) => (
          <div>
            <div className="detail-userName">{item.userName}'s Projects</div>

            <div>
              {item.projects.map((project) => (
                <div className="project-container">
                  <button
                    className="single-project"
                    onClick={() => {
                      setstate(project);
                      setIsOpen(true);
                    }}
                  >
                    <div className="detail-projectName">{project.name}</div>
                  </button>
                </div>
              ))}
              {isOpen && (
                <ProjectCard
                  onClick={() => setIsOpen(false)}
                  singleProject={state}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }
);
