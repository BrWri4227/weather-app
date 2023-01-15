import React, { useEffect, useState } from "react";
import './App.css';
import { Weather } from './components'
import axios from 'axios'

function App() {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
      // navigator.geolocation.getCurrentPosition(function(position) {
      //   setLat(position.coords.latitude);
      //   setLong(position.coords.longitude);
      // });

  //     await fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
  //     .then(res => res.json())
  //     .then(result => {
  //       setData(result)
  //       console.log(result);
  //     });
  //   }
  //   fetchData();
  // }, [lat,long]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function(position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
    axios.get(`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`).then((response) =>{
      setData(response.data)
      console.log(response.data)
    })
  },[lat,long]);
  return (
    <div className="App">
        {(typeof data.main != 'undefined') ? (
        <Weather weatherData={data}/>
      ): (
     [])}
        {/* <Weather weatherData={data}/> */}
    </div>
  );
}

export default App;