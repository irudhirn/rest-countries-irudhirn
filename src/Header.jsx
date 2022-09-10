import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import classes from "./Header.module.css";

const Header = ({
  isDark,
  setIsDark,
  region,
  setRegion,
  getAllCountries,
  getCountryByName,
  getCountryByRegion,
}) => {
  // const navigate = useNavigate();
  const [cityVal, setCityVal] = useState("");
  const [isRegionActive, setIsRegionActive] = useState(false);
  const [regionText, setRegionText] = useState("Filter by Region");

  useEffect(() => {
    if (region === "All") setRegionText(() => "Filter by Region");
    if (region !== "All") setRegionText(() => region);
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    if (cityVal === "") return;

    getCountryByName(cityVal.trim());
    // setTimeout(() => navigate("/country-details"), 100);
  };

  return (
    <header className={`${classes.header} ${isDark ? classes.dark : ""}`}>
      <form className={classes.formEl} onSubmit={submitHandler}>
        <div
          className={`${classes["search__input"]} ${
            isDark ? classes.dark : ""
          }`}
        >
          <span className={classes["search__input--search"]}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </span>
          <input
            type="text"
            className={classes.inputEl}
            placeholder="Search for a country..."
            value={cityVal}
            onChange={(e) => setCityVal(() => e.target.value)}
          />
        </div>
        <div
          className={`${classes["filter__input"]} ${
            isDark ? classes.dark : ""
          }`}
        >
          <div
            className={classes["filter__by__region"]}
            onClick={() => setIsRegionActive((prev) => !prev)}
          >
            {regionText}
          </div>
          <div
            className={`${classes.regions} ${
              isRegionActive ? classes.active : ""
            }`}
            onClick={() => setIsRegionActive(() => false)}
          >
            <p
              className={classes.region}
              onClick={() => {
                getAllCountries("all");
                setRegionText(() => "Filter by Region");
              }}
            >
              All
            </p>
            <p
              className={classes.region}
              onClick={() => {
                getCountryByRegion("Africa");
                setRegionText(() => "Africa");
              }}
            >
              Africa
            </p>
            <p
              className={classes.region}
              onClick={() => {
                getCountryByRegion("Americas");
                setRegionText(() => "America");
              }}
            >
              America
            </p>
            <p
              className={classes.region}
              onClick={() => {
                getCountryByRegion("Asia");
                setRegionText(() => "Asia");
              }}
            >
              Asia
            </p>
            <p
              className={classes.region}
              onClick={() => {
                getCountryByRegion("Europe");
                setRegionText(() => "Europe");
              }}
            >
              Europe
            </p>
            <p
              className={classes.region}
              onClick={() => {
                getCountryByRegion("Oceania");
                setRegionText(() => "Oceania");
              }}
            >
              Oceania
            </p>
          </div>
        </div>
      </form>
    </header>
  );
};

export default Header;

/*

Africa, America, Europe, America, Oceania

*/

/*

          <fieldset>
            <select
              name="continents"
              id="region"
              className={`${classes["filter__input--search"]} ${
                isDark ? classes.dark : ""
              }`}
            >
              <option value="">Filter by Region </option>
              <option value="Africa" className={classes.opt}>
                Africa
              </option>
              <option value="America">America</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
            </select>
          </fieldset>

*/
