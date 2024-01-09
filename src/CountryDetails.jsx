import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { DarkContext } from "./contextStore/DarkModeProvider";
import { Link, useNavigate, useParams } from "react-router-dom";

import Error from "./Error";

import classes from "./CountryDetails.module.css";

// const CountryDetails = ({ countryDetail, getCountryByName, getCountryByCode }) => {
const CountryDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  // console.log(params);
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState({
    name: "",
    nativeName: "",
    population: "",
    region: "",
    subregion: "",
    capital: "",
    tld: "",
    currencies: "",
    language: "",
    borders: [],
    flags: ""
  });

  const darkCtx = useContext(DarkContext);

  const fetchCountryDetail = async () => {
    setLoading(true);

    const url = params?.name ? `https://restcountries.com/v3.1/name/${params?.name?.split("-").join(" ")}` : params?.code ? `https://restcountries.com/v2/alpha/${params?.code}` : null;

    try{
      const res = await fetch(url);
      if (!res.ok) {
        navigate("*");
        return;
      }
      
      const data = await res.json();
      // console.log(data);
      // console.log(Array.isArray(data));

      if (!Array.isArray(data)) {
        setCountry((prev) => ({
          ...prev,
          name: data?.name || data?.name?.official,
          nativeName: data?.nativeName || data?.name?.["nativeName"]?.[`${Object.keys(data?.name?.["nativeName"])[0]}`]?.["common"],
          population: data?.population,
          region: data?.region,
          subregion: data?.subregion,
          capital: data?.capital,
          tld: data?.tld,
          currencies: data?.currencies ? data?.currencies?.[`${Object.keys(data?.currencies)[0]}`]?.name : "No currency found",
          language: data?.language,
          borders: data?.borders,
          flags: data?.flags?.png
        }));
        return;
      }
      if (Array.isArray(data)) {
        setCountry((prev) => ({
          ...prev,
          name: data[0]?.name?.official || data[0]?.name,
          nativeName: data[0]?.name?.["nativeName"]?.[`${Object.keys(data[0]?.name?.["nativeName"])[0]}`]?.["common"] || data[0]?.nativeName,
          population: data[0]?.population,
          region: data[0]?.region,
          subregion: data[0]?.subregion,
          capital: data[0]?.capital,
          tld: data[0]?.tld,
          currencies: data[0]?.currencies ? data[0]?.currencies?.[`${Object.keys(data[0]?.currencies)[0]}`]?.name : "No currency found",
          language: data[0]?.language,
          borders: data[0]?.borders,
          flags: data[0]?.flags?.png
        }));
      }
    }catch(err){
      console.log(err)
    }finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCountryDetail();
  }, [params]);

  // const {
  //   flags,
  //   name,
  //   population,
  //   region,
  //   subregion,
  //   capital,
  //   tld,
  //   currencies,
  //   languages,
  //   borders,
  // } = countryDetail || JSON.parse(localStorage.getItem("country"));

  // if (!name) {
  //   // navigate("*");
  //   getCountryByName(
  //     JSON.parse(localStorage.getItem("country"))["name"].common
  //   );
  //   return;
  // }
  // const nativeName =
  //   name["nativeName"][`${Object.keys(name["nativeName"])[0]}`]["common"];
  // const currency = currencies ? currencies[`${Object.keys(currencies)[0]}`].name : "No currency found";
  // const language = Object.values(languages).join(", ");
  // const style = flags ? { backgroundImage: `url('${flags.png}')` } : {};


  if(loading){
    <img
      src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif"
      alt="spinner"
      className="spinner"
    />
  }
  if(!loading && !country?.name){
    <h2>No data dound</h2>
  }
  const style = country?.flags ? { backgroundImage: `url('${country?.flags}')` } : {};

  return (
    <div className={classes["details"]}>
      <Link to="/">
        <button type="button" className={`${classes.back} ${darkCtx.isDark ? classes.dark : ""} ${classes.button}`}>
          <span>&#8592;</span>Back
        </button>
      </Link>
      {/* {countryDetail === undefined && <Error />} */}
      {/* {countryDetail !== undefined && ( */}
        <div className={classes["details__container"]}>
          <div className={classes["details__flag"]} style={style}></div>
          <div className={classes["details__text"]}>
            <h2 className={classes["details__name"]}>{country?.name}</h2>
            <div className={classes["details__overview"]}>
              <div className={classes["details__overview--main"]}>
                <p className={classes["main__native-name"]}>
                  <span>Native Name: </span>
                  {/* {nativeName} */}
                  {country?.nativeName}
                </p>
                <p className={classes["main__population"]}>
                  <span>Population: </span>
                  {country?.population}
                </p>
                <p className={classes["main__region"]}>
                  <span>Region: </span>
                  {country?.region}
                </p>
                <p className={classes["main__sub-region"]}>
                  <span>Sub Region: </span>
                  {country?.subregion}
                </p>
                <p className={classes["main__capital"]}>
                  <span>Capital: </span>
                  {country?.capital}
                </p>
              </div>
              <div className={classes["details__overview--extras"]}>
                <p className={classes["extras__domain"]}>
                  <span>Top Level Domain: </span>
                  {country?.tld}
                </p>
                <p className={classes["extras__currencies"]}>
                  <span>Currencies: </span>
                  {/* {currency} */}
                  {country?.currencies}
                </p>
                <p className={classes["extras__languages"]}>
                  <span>Languages: </span>
                  {country?.language}
                </p>
              </div>
            </div>
            <div className={classes["details__borders"]}>
              <h3>Border Countries:</h3>
              <div className={classes["details__border--countries"]}>
                {country?.borders ? (
                  country?.borders?.map((border, i) => {
                    return (
                      <Link key={border} to={`/countryCode/${border}`}>
                        <button
                          className={`${classes["border-country"]} ${darkCtx.isDark ? classes.dark : ""} ${classes.button}`}
                          // onClick={() => getCountryByCode(border)}
                        >
                          {border}
                        </button>
                      </Link>
                    );
                  })
                ) : (
                  <button className={`${classes["border-country"]} ${darkCtx.isDark ? classes.dark : ""} ${classes.button}`}>
                    No bordering country.
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      {/* )} */}
    </div>
  );
};

export default CountryDetails;

/*

    <div className={classes["details"]}>
      <Link to="/">
        <button type="button" className={`${classes.back} ${darkCtx.isDark ? classes.dark : ""} ${classes.button}`}>
          <span>&#8592;</span>Back
        </button>
      </Link>
      {countryDetail === undefined && <Error />}
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
                          darkCtx.isDark ? classes.dark : ""
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
                      darkCtx.isDark ? classes.dark : ""
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

*/