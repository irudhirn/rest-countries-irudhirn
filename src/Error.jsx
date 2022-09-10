import React from "react";

import { Link } from "react-router-dom";

import classes from "./Error.module.css";

const Error = ({ isDark }) => {
  return (
    <div className={classes.error}>
      <Link to="/">
        <button
          type="button"
          className={`${classes.back} ${isDark ? classes.dark : ""} ${
            classes.button
          }`}
        >
          <span>&#8592;</span>Back
        </button>
      </Link>
      <p className={classes["error__text"]}>Error 404.</p>
      <p className={classes["error__text"]}>Country not found.</p>
    </div>
  );
};

export default Error;
