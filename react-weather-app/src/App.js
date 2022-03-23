import React, { useState, useEffect } from "react";
import './App.css';

const api = {
  key: "6beab0a3cac16744d415f22df557ce4a",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {

  const [searchInput, setSearchInput] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

    useEffect(() => {
      /*console.log("Searching");*/
      const fetchWeatherData = async () => {
        if(!searchCity) return;
        /*console.log("Searching");*/
        setLoading(true);
        /*Process */
        try {
          const url = `${api.base}weather?q=${searchCity}&units=metrics&APPID=${api.key}`;
          const response = await fetch(url);
          const data = await response.json();
          if(response.ok) {
            setWeatherInfo(
            `${data.name},
            ${data.sys.country} ${data.weather[0].description},
             ${data.main.temp}`
            );
            setErrorMessage("");
          } else {
            setErrorMessage(data.message);
          }
        } catch (error) {
          setErrorMessage(error.message);
        }
        setLoading(false);
      };
      fetchWeatherData();
    },[searchCity]);

    const handleSubmit = (e) => {
      e.preventDefault();
      setSearchCity(searchInput);
    };

  return (
    <>
  
    <form onSubmit ={handleSubmit}>
      <input 
      type="text" 
      placeholder="enter city name"
      value={searchInput}
      onChange={(e)=> setSearchInput(e.target.value)}
      />
      <button>Search</button>

      </form>
       {loading? (<div>Loading...</div>) : (
      <>
      {errorMessage ? (
        <div style={{color:"red"}}>{errorMessage}</div>
              ) : (
              <div>{weatherInfo}</div>
              )}
            </>
      )}
    </>    
  );
}

export default App;
