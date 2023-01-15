import React, { useEffect, useState } from "react";


const Weather = ({weatherData}) => {
  const [direction, setDir] = useState([]);
  useEffect(() => {
    const val = Math.round((weatherData?.wind?.deg / 22.5) + 0.5)
    console.log(weatherData?.wind?.deg)
    const arr= ["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"]
    console.log(weatherData?.wind?.deg /22.5 + 0.5)
    setDir(arr[val % 16])
  },[weatherData]);
  return (

    <div>
      <div className="container">
        <div className="location">
          <p>{weatherData?.name}</p>
        </div>
        <div className='temp'>
          <h1>{(weatherData?.main?.temp).toFixed(0)}&deg;C</h1>
        </div>
        <div className='description'>
          <p>{weatherData?.weather[0]?.description}</p>
        </div>
        <div className='feelsLike'>
          <p>Feels Like: {(weatherData?.main?.feels_like).toFixed(0)}&deg;C</p>
        </div>
        <div className='humidity'>
          <p>Humidity: {weatherData?.main?.humidity}%</p>
        </div>
        <div className='wind'>
          {/* <p>Wind: {weatherData?.wind?.speed * 3.6} km/h at {weatherData?.wind?.deg}° with Gusts of: {(weatherData?.wind?.gust * 3.6).toFixed(0)} km/h</p> */}
        </div>
        <div className='gust'>
          <p>Wind: {(weatherData?.wind?.speed * 3.6).toFixed(0)} km/h at {direction} with Gusts of: {(weatherData?.wind?.gust * 3.6).toFixed(0)} km/h</p>
        </div>
      </div>
    </div>
  )
}

export default Weather;