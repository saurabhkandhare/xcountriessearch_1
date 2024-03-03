import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Countries.css";

export default function Countries() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://restcountries.com/v3.1/all");
        setCountries(res.data);
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };

    fetchData();
  }, []);

  const filterCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="Countries">
      <input
        type="text"
        value={search}
        placeholder="Search for countries..."
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="country-grid">
        {filterCountries.map((country) => (
          <div key={country.cca2} className="countryCard">
            <img src={country.flags.svg} alt={country.flags.alt} />
            <p>{country.name.common}</p>
          </div>
        ))}
      </div>
    </div>
  );
}