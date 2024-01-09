import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DarkContext } from "./contextStore/DarkModeProvider";

import Error from "./Error";
import Nav from "./Nav";
import Countries from "./Countries";
import CountryDetails from "./CountryDetails";
import classes from "./App.module.css";
import Region from "./Region";

function App() {
  const navigate = useNavigate();

  const darkCtx = useContext(DarkContext);
  const [loading, setLoading] = useState(false);
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
  };

  const getCountryByName = async (country) => {
    const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    console.log(country);
    if (!res.ok) {
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
    <div className={`${classes.section} ${darkCtx.isDark ? classes["dark"] : ""}`}>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="*" element={<Error />}></Route>
          {/* <Route
            path="/"
            element={
              <Countries
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
                countryDetail={countryDetail}
                setCountryDetail={setCountryDetail}
                getCountryByName={getCountryByName}
                getCountryByCode={getCountryByCode}
              />
            }
          ></Route> */}
          <Route path="/" element={<Countries countries={allCountries} />} />
          <Route path="/countryName/:name" element={<CountryDetails />} />
          <Route path="/countryCode/:code" element={<CountryDetails />} />
          <Route path="/region/:id" element={<Region />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
