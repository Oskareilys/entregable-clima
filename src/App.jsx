import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";
import LoaderCard from "./components/LoaderCard";
import DeniedCard from "./components/DeniedCard";
import CityInputCard from "./components/CityInputCard";
import clearDay from "/clearDay.jpg";
import rainDay from "/rainDay.jpg"
import mistDay from "/mistDay.jpg"
import snowDay from "/snowDay.jpg"
import background1 from "/background.jpg"
import cloudsDay from "/cloudsDay.jpg"


function App() {
  const [coords, setCoords] = useState();
  const [weather, setWeather] = useState();
  const [temp, setTemp] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isDenied, setIsDenied] = useState(false);
  const [cityInput, setCityInput] = useState("");
  const [backgroundWeather, setBackgroundWeather] = useState(true)

  const success = (info) => {
    setCoords({
      lat: info.coords.latitude,
      lon: info.coords.longitude,
    });
  };

  const error = (err) => {
    if (err.code === 1) {
      setIsLoading(false);
    } else {
      setIsDenied(true);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  useEffect(() => {
    if (coords) {
      const APIKEY = "79eba2d5ba4f80d4c6558a76fe7f7171";
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${APIKEY}`;

      axios
        .get(url)
        .then((res) => {
          setWeather(res.data);
          const celsius = (res.data.main.temp - 273.15).toFixed(1);
          const fahrenheit = ((9 / 5) * celsius + 32).toFixed(0);
          setTemp({ celsius, fahrenheit });
          bgImage(res.data.weather[0].main);
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
       
    }
  }, [coords]);

  useEffect(() => {
    if (cityInput) {
      const APIKEY = "79eba2d5ba4f80d4c6558a76fe7f7171";
      const url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=${1}&appid=${APIKEY}`;
      axios
        .get(url)
        .then((res) => {
          setCoords({
            lat: res.data[0].lat,
            lon: res.data[0].lon,
          });
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    }
    document.body.style.backgroundImage = `url(${background1})`;
  }, [cityInput]);



  const bgImage = (backgroundWeather) => {
    if (!backgroundWeather) {
      document.body.style.backgroundImage = `url(${background1})`;
      return;
    }
    switch (backgroundWeather) {
      case "Clear":
        document.body.style.backgroundImage = `url(${clearDay})`; 
        break;
      case "Clouds":
        document.body.style.backgroundImage = `url(${cloudsDay})`; 
        break;
      case "Rain":
        document.body.style.backgroundImage = `url(${rainDay})`; 
        break;
      case "Snow":
        document.body.style.backgroundImage = `url(${snowDay})`; 
        break;
      case "Mist":
        document.body.style.backgroundImage = `url(${mistDay})`; 
      case ' ':
        document.body.style.backgroundImage = `url(${background})`;
        break;

   
    }

  };

  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = 'center';

  return (
    <div className="app">
      {isLoading ? (
        <LoaderCard />
      ) : weather && temp ? (
        <WeatherCard weather={weather} temp={temp} />
      ) : (
        <DeniedCard />
      )}
      <CityInputCard setCityInput={setCityInput} />
    </div>
  );
}

export default App;




