import React, { useEffect, useState } from "react";
import moment from 'moment';

const Weather = ({ weatherData }) => {
  const [direction, setDir] = useState([]);
  const [time, setTime] = useState(new Date());
  const [gust, setGust] = useState([Math.round(weatherData?.wind?.gust * 3.6)]);
  useEffect(() => {
    const val = Math.round((weatherData?.wind?.deg / 45) + 0.5)
    console.log(weatherData?.wind?.deg)
    const arr = ["N","NE","E", "SE","S","SW","W","NW"];
    console.log(weatherData?.wind?.deg / 22.5 + 0.5)
    setDir(arr[val % 16])
    setGust(Math.round(weatherData?.wind?.gust * 3.6))
  }, [weatherData]);
  useEffect(() => {

    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (

    <div className="backdrop">
      <h1></h1>
      <div className="container">
        <div className="location">
          <p>{weatherData?.name}</p>
          <div className="time">
          <p>{time.toLocaleTimeString('en-IN')}</p>
          </div>
        </div>
        <div className="flex">
          <div className='temp'>
            <h1>{(weatherData?.main?.temp).toFixed(0)}&deg;C</h1>
          </div>
          <div className='description'>
            <p>{weatherData?.weather[0]?.description}</p>
          </div>
        </div>
        <div className="flex">
          <div className='feelsLike'>
            <p>Feels Like: {(weatherData?.main?.feels_like).toFixed(0)}&deg;C</p>
          </div>
          <div className='humidity'>
            <p>Humidity: {weatherData?.main?.humidity}%</p>
          </div>
        </div>
        <div className="flex">
        <div className='wind'>
          <p>Wind: {(weatherData?.wind?.speed * 3.6).toFixed(0)} km/h <sup style={{fontWeight: "600", fontSize: "0.75rem"}}>{direction}</sup></p>
        
        </div>
        <div className='gust'>
          <p>Gust: {gust > 0 ? gust : '0'} km/h</p>
        </div>
        </div>
        <div className="flex">
          <div className='sunrise'>
            <p>Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-IN')}</p>
          </div>
          <div className='sunset'>
            <p>Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-IN')}</p>
          </div>
        </div>
        <div className='date'>
          <p>Date: {moment().format('LL')}</p>
        </div>
      </div>
    </div >
  )
}

export default Weather;