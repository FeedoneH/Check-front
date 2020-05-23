import React, { useState } from "react";
import { connect } from "react-redux";

import { sign, getAuthStatus } from "../redux/auth";

const mapStateToProps = (state) => ({
  status: getAuthStatus(state),
});

export const Auth = connect(mapStateToProps, { sign })(
  ({ sign, status, history }) => {
    const [fields, setFields] = useState({
      email: "",
      password: "",
      rePassword: "",
    });

    const [isSignIn, setIsSignIn] = useState(true);
    const handleFieldChange = (e) => {
      const { name, value } = e.target;
      setFields((fields) => ({
        ...fields,
        [name]: value,
      }));
    };

    const handleAuth = (e) => {
      e.preventDefault();
      if (fields.email.trim() !== "" && fields.password !== "") {
        if (isSignIn) {
          history.push("/search");

          sign(fields);
        } else {
          if (fields.password === fields.rePassword) {
            sign(fields, false);
            setIsSignIn(true);
          }
        }
      }
    };

    return (
      <div className="auth-container">
        <button
          className="switch-sign-btn"
          onClick={() => setIsSignIn((v) => !v)}
        >
          <span>
            {isSignIn ? "I do not have an account" : "I have an account"}
          </span>
        </button>
        <div className="form-container">
          <form className="form">
            <label>Email:</label>
            <input
              className="auth-input"
              name="email"
              type="text"
              value={fields.email}
              onChange={handleFieldChange}
            />

            <label>Password:</label>
            <input
              className="auth-input"
              name="password"
              type="password"
              value={fields.password}
              onChange={handleFieldChange}
            />

            {!isSignIn && (
              <>
                <label> Enter Password Again:</label>
                <input
                  className="auth-input"
                  name="rePassword"
                  type="password"
                  value={fields.rePassword}
                  onChange={handleFieldChange}
                />
              </>
            )}
          </form>
        </div>

        <button className="submit-btn" onClick={(e) => handleAuth(e)}>
          <span>{isSignIn ? "Sign In" : "Sign Up"}</span>
        </button>
      </div>
    );
  }
);
