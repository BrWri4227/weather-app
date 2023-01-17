import React, { useEffect, useState } from "react";
import './App.css';
import { Weather, Error } from './components'
import axios from 'axios'

function App() {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({ name: '' });

  const handleChange = event => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    if (formData.name === "") {
      alert("Form is empty, please fill in any city name or city named followed by country code. (EX. 'London, GB' vs 'London, ON')");
      return;
    }
    // console.log(JSON.stringify(content))
    console.log(formData.name);
    // http://api.openweathermap.org/geo/1.0/direct?q=${formData.name},ON,CAN&limit={limit}&appid={API key}
    axios.get(`${process.env.REACT_APP_API_URL}/weather?q=${formData.name}&appid=${process.env.REACT_APP_API_KEY}&units=metric`).then((response) => {
      setData(response.data)
      console.log(response.data)
    }).catch(function (error) {
      if (error.response) {
        console.log(error.response.data)
        console.log(error.response.status)
        if (error.response.status === 400) {
          alert("Bad Request. Try again and ensure the city name is valid followed by its country code (Ex: Toronto, CA) for Canada, replace CA with GB for Great Britain.");
        }else if(error.response.status === 404){
          alert("Invalid City/Country. Please enter any city followed by its country code (Ex: Toronto, CA) or Toronto, GB.")
        }
        console.log(error.response.headers)
      }
    })

    setFormData({});
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
    axios.get(`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`).then((response) => {
      setData(response.data)
      console.log(response.data)
    }).catch(function (error) {
      if (error.response) {
        console.log(error.response.data)
        console.log(error.response.status)
        console.log(error.response.headers)
      }
    })
  }, [lat, long]);

  return (
    <div className="App">
      
        {(typeof data.main != 'undefined') ? (
          <div className="wrapper">
          <div className="inputForm">
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Toronto, CA" name='name' value={formData.name} onChange={handleChange}></input>
              <button type="submit">SUBMIT</button>
              <span class="msg"></span>
            </form>
          </div>
          
          <Weather weatherData={data} />
          </div>
        ) : (
          [<Error />])}
      
    </div>
  );
}

export default App;