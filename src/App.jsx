import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Error from "./Error";
import Nav from "./Nav";
import Countries from "./Countries";
import CountryDetails from "./CountryDetails";
import classes from "./App.module.css";

function App() {
  const navigate = useNavigate();

  // const [isDark, setIsDark] = useState(true);
  const [isDark, setIsDark] = useState(false);
  const [allCountries, setAllCountries] = useState([]);
  const [countryDetail, setCountryDetail] = useState({});
  const [region, setRegion] = useState("All");

  useEffect(() => {
    getAllCountries();
  }, []);

  const getAllCountries = async () => {
    setAllCountries(() => []);

    const res = await fetch("https://restcountries.com/v3.1/all");

    if (!res.ok) return;

    const data = await res.json();

    setAllCountries(() => data);
    setRegion(() => "All");
    // console.log(data.slice(0, 5));
  };

  const getCountryByName = async (country) => {
    const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);

    if (!res.ok) {
      // console.log(country);
      navigate("*");
      return;
    }

    const data = await res.json();

    if (!Array.isArray(data)) {
      setCountryDetail(() => data);
      localStorage.setItem("country", JSON.stringify(data));
      setTimeout(() => navigate("/country-details"), 1);
      return;
    }

    if (Array.isArray(data)) {
      const countryName = data.filter(
        (state) => state["name"].common.toLowerCase() === country.toLowerCase()
      );

      if (countryName[0] === undefined) {
        navigate("*");
        return;
      }
      setCountryDetail(() => countryName[0]);
      localStorage.setItem("country", JSON.stringify(countryName[0]));

      setTimeout(() => navigate("/country-details"), 1);
    }
  };

  const getCountryByCode = async (code) => {
    const res = await fetch(`https://restcountries.com/v2/alpha/${code}`);

    if (!res.ok) {
      navigate("*");
      return;
    }

    const data = await res.json();

    getCountryByName(data.name);
  };

  const getCountryByRegion = async (region) => {
    setAllCountries(() => []);

    const res = await fetch(`https://restcountries.com/v3.1/region/${region}`);

    if (!res.ok) {
      navigate("*");
      return;
    }

    const data = await res.json();

    setAllCountries(() => data);
    setRegion(() => region);
    // console.log(data);
  };

  return (
    <div className={`${classes.section} ${isDark ? classes["dark"] : ""}`}>
      <Nav isDark={isDark} setIsDark={setIsDark} />
      <div className="container">
        <Routes>
          <Route path="*" element={<Error isDark={isDark} />}></Route>
          <Route
            path="/"
            element={
              <Countries
                isDark={isDark}
                setIsDark={setIsDark}
                region={region}
                setRegion={setRegion}
                allCountries={allCountries}
                getAllCountries={getAllCountries}
                getCountryByName={getCountryByName}
                setCountryDetail={setCountryDetail}
                getCountryByRegion={getCountryByRegion}
              />
            }
          ></Route>
          <Route
            path="/country-details"
            element={
              <CountryDetails
                isDark={isDark}
                setIsDark={setIsDark}
                countryDetail={countryDetail}
                setCountryDetail={setCountryDetail}
                getCountryByName={getCountryByName}
                getCountryByCode={getCountryByCode}
              />
            }
          ></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
