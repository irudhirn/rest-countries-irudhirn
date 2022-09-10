import React from "react";

import classes from "./Nav.module.css";

const Nav = ({ isDark, setIsDark }) => {
  return (
    <nav className={`${classes.nav} ${isDark ? classes["dark"] : ""}`}>
      <div className={classes["nav__elements"]}>
        <div className={classes.where}>Where in the world?</div>
        <div
          className={classes["dark-mode"]}
          onClick={() => {
            setIsDark((prev) => !prev);
          }}
        >
          <span className={classes.moon}>
            <i className="fa-solid fa-moon"></i>
          </span>
          Dark Mode
        </div>
      </div>
    </nav>
  );
};

export default Nav;
