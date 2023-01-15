import React, { useEffect, useState } from "react";
import './App.css';
import { Weather } from './components'
import axios from 'axios'

function App() {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);
  const[formData, setFormData] = useState([])
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
    }).catch(function (error){
      if(error.response){
        console.log(error.response.data)
        console.log(error.response.status)
        console.log(error.response.headers)
      }
    })
  },[lat,long]);
  
  // const handleSubmit = async event => {
  //   event.preventDefault();
  //   if (formData.name === "" || formData.email === "" ) {
  //     alert("Form is empty, please fill in all fields");
  //     return;
  //   }
  //   const { name, email, message } = formData;
  //   // console.log(JSON.stringify(content))
  //   const msg = { "content": "Hi, someone has just tried to contact you! Here is their information:\nName: " + name + "\nEmail: " + email + "\nMessage: " + message }
  //   try {
  //     const response = await fetch("https://discord.com/api/webhooks/1062606366033858690/g-zZy7dgR7oawrpCHVO5gxyfEA-csoioRBoIFsJByQq9DD_BY7xaPVeijrTNBsv0-pZ7", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       // body: JSON.stringify(content)
  //       body: JSON.stringify(msg)

  //     });
  //     if (response.ok) {
  //       console.log("Successfully sent message to Discord");
  //       alert("Message Sent Successfully, Thanks for using the form!")
  //     } else {
  //       console.error("Error sending message to Discord");
  //     }
  //   } catch (e) {
  //     console.error(e);
  //   }

  //   setFormData({ name: '', email: '', message: '' });
  // };
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