import React from "react";

import { Link } from "react-router-dom";

import classes from "./Country.module.css";

const Country = ({ isDark, country, setCountryDetail, getCountryByName }) => {
  const { name, flags, population, region, capital } = country;

  const style = flags ? { backgroundImage: `url('${flags.png}')` } : {};

  return (
    // <Link to="/country-details" style={{ display: "inline-flex" }}>
    <div
      className={`${classes["country"]} ${isDark ? classes.dark : ""}`}
      onClick={() => {
        // setCountryDetail(() => country);
        getCountryByName(name.common.toLowerCase());
      }}
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
    // </Link>
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
