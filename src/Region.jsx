import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useContext } from "react";
import { RegionContext } from "./contextStore/RegionProvider";
import Countries from './Countries';

const Region = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const regionCtx = useContext(RegionContext);

  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);

  const getCountryByRegion = async (region) => {
    setCountries([]);
    setLoading(true);

    try{
      const res = await fetch(`https://restcountries.com/v3.1/region/${region}`);

      if(!res.ok){
        navigate("*");
        return;
      }

      const data = await res.json();

      setCountries(() => data);
    }catch(err){
      console.log(err)
    }finally{
      setLoading(false);
    }

    regionCtx.setRegion(region);
  };

  useEffect(() => {
    if(id){
      getCountryByRegion(id);
      return;
    }
    navigate("*");
  }, [id]);

  if(loading){
    return (
      <img
        src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif"
        alt="spinner"
        className="spinner"
      />
    )
  }

  if(!loading && countries?.length === 0){
    <h2 style={{textAlign: "center"}}>No countries found.</h2>
  }

  return (
    <Countries countries={countries}/>
  )
}

export default Region