import React, { useState, useEffect } from "react";
import { getData, getAllData } from "../redux/data";
import { connect } from "react-redux";
import { logOut } from "../redux/auth";

const mapStateToProps = (state) => ({
  data: getAllData(state),
});
export const Search = connect(mapStateToProps, { getData,logOut })(
  ({ getData, data, history,logOut }) => {
    const [field, setField] = useState("");
    const [error, setError] = useState("");
    const handleTextChange = (value) => {
      setField(value);
    };
    const handleLogOut = () => {
      logOut();
      history.push('/')
    }
    const submitHandler = () => {
      const userNumbers = data.map((item) => item.userNumber);
      if (field.trim() !== "") {
        if (userNumbers.includes(+field)) {
          let userNumber = field;

          history.push(`/details/${userNumber}`);
        } else {
          setError("Sorry, no data found");
        }
      }
    };
    useEffect(() => {
      getData();
    }, []);
    return (
      <div className="search-container">
  <button className="btn" onClick={handleLogOut}>Log Out</button>
        <div className="search-section">
     
          <input
            className="input-searching"
            type="number"
            value={field}
            onChange={(e) => {
              handleTextChange(e.target.value);
            }}
          />

          <button className="search-btn" onClick={submitHandler}>
            Search
          </button>
        </div>
        <div className="error-text">
          <span>{error}</span>
        </div>
      </div>
    );
  }
);
