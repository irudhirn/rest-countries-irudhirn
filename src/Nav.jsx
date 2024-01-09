import React from "react";
import { useContext } from "react";
import { DarkContext } from "./contextStore/DarkModeProvider";

import classes from "./Nav.module.css";

const Nav = () => {
  const darkCtx = useContext(DarkContext);

  return (
    <nav className={`${classes.nav} ${darkCtx.isDark ? classes["dark"] : ""}`}>
      <div className={classes["nav__elements"]}>
        <div className={classes.where}>Where in the world?</div>
        <div className={classes["dark-mode"]} onClick={() => darkCtx.setIsDark()}>
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
