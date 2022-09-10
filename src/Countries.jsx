import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import Header from "./Header";
import Country from "./Country";
import classes from "./Countries.module.css";

const Countries = ({
  isDark,
  setIsDark,
  region,
  setRegion,
  allCountries,
  getAllCountries,
  getCountryByName,
  getCountryByRegion,
  setCountryDetail,
}) => {
  return (
    <>
      <Header
        isDark={isDark}
        setIsDark={setIsDark}
        region={region}
        setRegion={setRegion}
        getAllCountries={getAllCountries}
        getCountryByName={getCountryByName}
        getCountryByRegion={getCountryByRegion}
      />
      <div className={classes.countries}>
        {!allCountries.length && (
          <img
            src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif"
            alt="spinner"
            className={classes.spinner}
          />
        )}
        {allCountries.length !== 0 &&
          allCountries.map((country, i) => {
            return (
              <Country
                key={i}
                isDark={isDark}
                setIsDark={setIsDark}
                country={country}
                setCountryDetail={setCountryDetail}
                getCountryByName={getCountryByName}
              />
            );
          })}
      </div>
    </>
  );
};

export default Countries;

/*

https://restcountries.com/v3.1/all

https://restcountries.com/v3.1/name/{name}

https://restcountries.com/v3.1/region/{region}

https://restcountries.com/v3.1/subregion/{region}

https://restcountries.com/v2/alpha/{code}

https://restcountries.com/v2/name/{name}?fullText=true

*/

/*

http://1.bp.blogspot.com/-IAn4KHik7Hs/VBBjYuoKKXI/AAAAAAAAAns/k0qTs42kLCU/s1600/loading.gif

*/
