import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { DarkContext } from "./contextStore/DarkModeProvider";
import { RegionContext } from "./contextStore/RegionProvider";

import classes from "./Header.module.css";

const Header = ({
  // region,
  getAllCountries,
  getCountryByName,
  getCountryByRegion,
}) => {
  const navigate = useNavigate();

  const darkCtx = useContext(DarkContext);
  const regionCtx = useContext(RegionContext);
  
  const [countryName, setCountryName] = useState("");
  const [isRegionActive, setIsRegionActive] = useState(false);
  const [regionText, setRegionText] = useState("Filter by Region");
  const [region, setRegion] = useState("All");

  useEffect(() => {
    if (region === "All") setRegionText(() => "Filter by Region");
    if (region !== "All") setRegionText(() => region);
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    if (countryName === "") return;

    navigate("/countryName/" + countryName);

    // getCountryByName(countryName.trim());
    // setTimeout(() => navigate("/country-details"), 100);
  };

  return (
    <header className={`${classes.header} ${darkCtx.isDark ? classes.dark : ""}`}>
      <form className={classes.formEl} onSubmit={submitHandler}>
        <div
          className={`${classes["search__input"]} ${
            darkCtx.isDark ? classes.dark : ""
          }`}
        >
          <span className={classes["search__input--search"]}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </span>
          <input
            type="text"
            className={classes.inputEl}
            placeholder="Search for a country..."
            value={countryName}
            onChange={(e) => setCountryName(e.target.value)}
          />
        </div>
        <div className={`${classes["filter__input"]} ${darkCtx.isDark ? classes.dark : ""}`}>
          <div className={classes["filter__by__region"]} onClick={() => setIsRegionActive((prev) => !prev)}>
            {/* {regionText} */}
            {regionText === "All" ? "Filter by Region" : regionText}
          </div>
          <div className={`${classes.regions} ${isRegionActive ? classes.active : ""}`} onClick={() => setIsRegionActive(() => false)}>
            <Link to="/" style={{color: "inherit"}} onClick={() => { setRegionText(() => "All"); }}>
              <p className={classes.region}>
                All
              </p>
            </Link>
            <Link to="/region/Africa" style={{color: "inherit"}} onClick={() => { setRegionText(() => "Africa"); }}>
              <p className={classes.region}>
                Africa
              </p>
            </Link>
            <Link to="/region/Americas" style={{color: "inherit"}} onClick={() => { setRegionText(() => "America"); }}>
              <p className={classes.region}>
                America
              </p>
            </Link>
            <Link to="/region/Asia" style={{color: "inherit"}} onClick={() => { setRegionText(() => "Asia"); }}>
              <p className={classes.region}>
                Asia
              </p>
            </Link>
            <Link to="/region/Europe" style={{color: "inherit"}} onClick={() => { setRegionText(() => "Europe"); }}>
              <p className={classes.region}>
                Europe
              </p>
            </Link>
            <Link to="/region/Oceania" style={{color: "inherit"}} onClick={() => { setRegionText(() => "Oceania"); }}>
              <p className={classes.region}>
                Oceania
              </p>
            </Link>
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
