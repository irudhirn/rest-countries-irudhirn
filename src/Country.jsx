import React from "react";
import { useContext } from "react";
import { DarkContext } from "./contextStore/DarkModeProvider";

import classes from "./Country.module.css";
import { Link } from "react-router-dom";

const Country = ({ country, getCountryByName }) => {
  const darkCtx = useContext(DarkContext);
  const { name, flags, population, region, capital } = country;

  const style = flags ? { backgroundImage: `url('${flags.png}')` } : {};

  return (
    <Link to={`/countryName/${name.common.toLowerCase().split(" ").join("-")}`}>
      <div
        className={`${classes["country"]} ${darkCtx.isDark ? classes.dark : ""}`}
        // onClick={() => getCountryByName(name.common.toLowerCase())}
      >
        <div className={classes["country__flag"]} style={style}></div>
        <div className={classes["country__overview"]}>
          <h2 className={classes["country__overview--name"]}>{name.common}</h2>
          <p className={classes["country__overview--population"]}>
            <span>Population</span>: {population}
          </p>
          <p className={classes["country__overview--region"]}>
            <span>Region</span>: {region}
          </p>
          <p className={classes["country__overview--capital"]}>
            <span>Capital</span>: {capital}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Country;

/*

      <div className={`${classes["country"]} ${isDark ? classes.dark : ""}`}>
        <div className={classes["country__flag"]}></div>
        <div className={classes["country__overview"]}>
          <h2 className={classes["country__overview--name"]}>Germany</h2>
          <p className={classes["country__overview--population"]}>
            <span>Population</span>: 81,770,900
          </p>
          <p className={classes["country__overview--region"]}>
            <span>Region</span>: Europe
          </p>
          <p className={classes["country__overview--capital"]}>
            <span>Capital</span>: Berlin
          </p>
        </div>
      </div>
      <div className={`${classes["country"]} ${isDark ? classes.dark : ""}`}>
        <div className={classes["country__flag"]}></div>
        <div className={classes["country__overview"]}>
          <h2 className={classes["country__overview--name"]}>Germany</h2>
          <p className={classes["country__overview--population"]}>
            <span>Population</span>: 81,770,900
          </p>
          <p className={classes["country__overview--region"]}>
            <span>Region</span>: Europe
          </p>
          <p className={classes["country__overview--capital"]}>
            <span>Capital</span>: Berlin
          </p>
        </div>
      </div>
      <div className={`${classes["country"]} ${isDark ? classes.dark : ""}`}>
        <div className={classes["country__flag"]}></div>
        <div className={classes["country__overview"]}>
          <h2 className={classes["country__overview--name"]}>Germany</h2>
          <p className={classes["country__overview--population"]}>
            <span>Population</span>: 81,770,900
          </p>
          <p className={classes["country__overview--region"]}>
            <span>Region</span>: Europe
          </p>
          <p className={classes["country__overview--capital"]}>
            <span>Capital</span>: Berlin
          </p>
        </div>
      </div>
      <div className={`${classes["country"]} ${isDark ? classes.dark : ""}`}>
        <div className={classes["country__flag"]}></div>
        <div className={classes["country__overview"]}>
          <h2 className={classes["country__overview--name"]}>Germany</h2>
          <p className={classes["country__overview--population"]}>
            <span>Population</span>: 81,770,900
          </p>
          <p className={classes["country__overview--region"]}>
            <span>Region</span>: Europe
          </p>
          <p className={classes["country__overview--capital"]}>
            <span>Capital</span>: Berlin
          </p>
        </div>
      </div>


*/
