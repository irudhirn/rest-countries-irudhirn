import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

import Error from "./Error";

import classes from "./CountryDetails.module.css";

const CountryDetails = ({
  isDark,
  countryDetail,
  setCountryDetail,
  getCountryByName,
  getCountryByCode,
}) => {
  const navigate = useNavigate();
  // console.log(countryDetail);

  // console.log(JSON.parse(localStorage.getItem("country")));

  const {
    flags,
    name,
    population,
    region,
    subregion,
    capital,
    tld,
    currencies,
    languages,
    borders,
  } = countryDetail || JSON.parse(localStorage.getItem("country"));

  // console.log(countryDetail);
  if (!name) {
    // navigate("*");
    getCountryByName(
      JSON.parse(localStorage.getItem("country"))["name"].common
    );
    return;
  }
  const nativeName =
    name["nativeName"][`${Object.keys(name["nativeName"])[0]}`]["common"];
  const currency = currencies
    ? currencies[`${Object.keys(currencies)[0]}`].name
    : "No currency found";
  const language = Object.values(languages).join(", ");
  const style = flags ? { backgroundImage: `url('${flags.png}')` } : {};

  return (
    <div className={classes["details"]}>
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
      {countryDetail === undefined && <Error isDark={isDark} />}
      {countryDetail !== undefined && (
        <div className={classes["details__container"]}>
          <div className={classes["details__flag"]} style={style}></div>
          <div className={classes["details__text"]}>
            <h2 className={classes["details__name"]}>{name.official}</h2>
            <div className={classes["details__overview"]}>
              <div className={classes["details__overview--main"]}>
                <p className={classes["main__native-name"]}>
                  <span>Native Name: </span>
                  {nativeName}
                </p>
                <p className={classes["main__population"]}>
                  <span>Population: </span>
                  {population}
                </p>
                <p className={classes["main__region"]}>
                  <span>Region: </span>
                  {region}
                </p>
                <p className={classes["main__sub-region"]}>
                  <span>Sub Region: </span>
                  {subregion}
                </p>
                <p className={classes["main__capital"]}>
                  <span>Capital: </span>
                  {capital}
                </p>
              </div>
              <div className={classes["details__overview--extras"]}>
                <p className={classes["extras__domain"]}>
                  <span>Top Level Domain: </span>
                  {tld}
                </p>
                <p className={classes["extras__currencies"]}>
                  <span>Currencies: </span>
                  {currency}
                </p>
                <p className={classes["extras__languages"]}>
                  <span>Languages: </span>
                  {language}
                </p>
              </div>
            </div>
            <div className={classes["details__borders"]}>
              <h3>Border Countries:</h3>
              <div className={classes["details__border--countries"]}>
                {borders ? (
                  borders.map((border, i) => {
                    return (
                      <button
                        key={i}
                        className={`${classes["border-country"]} ${
                          isDark ? classes.dark : ""
                        } ${classes.button}`}
                        onClick={() => getCountryByCode(border)}
                      >
                        {border}
                      </button>
                    );
                  })
                ) : (
                  <button
                    className={`${classes["border-country"]} ${
                      isDark ? classes.dark : ""
                    } ${classes.button}`}
                  >
                    No bordering country.
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountryDetails;

/*

<a href="">
<button
className={`${classes["border-country"]} ${
  isDark ? classes.dark : ""
} ${classes.button}`}
>
France
</button>
</a>
<a href="">
<button
className={`${classes["border-country"]} ${
  isDark ? classes.dark : ""
} ${classes.button}`}
>
Germany
</button>
</a>
<a href="">
<button
className={`${classes["border-country"]} ${
  isDark ? classes.dark : ""
} ${classes.button}`}
>
Netherlands
</button>
</a>

*/

/* <button
                className={`${classes["border-country"]} ${
                  isDark ? classes.dark : ""
                } ${classes.button}`}
              >
                Germany
              </button>
              <button
                className={`${classes["border-country"]} ${
                  isDark ? classes.dark : ""
                } ${classes.button}`}
              >
                Netherlands
              </button> */

/*


  // console.log(name["nativeName"]);
  // console.log(Object.keys(name["nativeName"])[0]);
  // console.log(
  //   name["nativeName"][`${Object.keys(name["nativeName"])[0]}`].common
  // );
  // console.log(
  //   name["nativeName"][`${Object.keys(name["nativeName"])[0]}`]["common"]
  // );

  // const nativeName =
  //   name["nativeName"][`${Object.keys(name["nativeName"])}`].common;

*/
