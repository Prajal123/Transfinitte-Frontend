import Navbar from './Navbar';
import MapComponent from './MapComponent';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  // const cardData = [
  //   { placeName: 'Place 1', latitude: '41.1234', longitude: '-71.5678' },
  //   { placeName: 'Place 2', latitude: '42.5678', longitude: '-72.1234' },
  //   // Add more data as needed
  // ];
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [watchId, setWatchId] = useState(null);
  const [velocity,setVelocity]=useState(null);
  const [data,setData]=useState([]);

const navigate=useNavigate();

  const updateLocation = (position) => {
    // Format latitude and longitude to 14 decimal points
    setLatitude(position.coords.latitude.toFixed(14));
    setLongitude(position.coords.longitude.toFixed(14));
    setVelocity(position.coords.speed);
  };

  const handleGeolocationError = (error) => {
    console.error("Geolocation error:", error);
  };
  const startTracking = () => {
    if ("geolocation" in navigator) {
      const id = navigator.geolocation.watchPosition(updateLocation, handleGeolocationError);
      setWatchId(id);
    } else {
      alert("Geolocation is not supported in your browser.");
    }
  };

  const allCoordinates=async(token)=>{
    console.log(token);
    try{
      const positions=await axios.get("/api/users/getdetails",{
        headers:{
           Authorization:"Bearer "+token
        }
      });

      setData(positions.data);
      

    }catch(err){
      console.log(err);
    }
  }

  const updateCoord=async(mobileNumber)=>{
    try{
      const res= await axios.post('/api/users/update',{
         mobileNumber:mobileNumber,
         latitude:latitude,
         longitude:longitude,
         velocity:velocity
       })
       console.log(res);
    }catch(err){
      console.log(err);
    }
  }
  useEffect(() => {
    const token=localStorage.getItem('token');
    if(!token){
       navigate('/');
    }

    startTracking();
    
    allCoordinates(token);
    
    return () => {
      // Clean up the tracking when the component unmounts
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  useEffect(()=>{
    const token=localStorage.getItem('token');
    if(!token){
       navigate('/');
    }
    const mobileNumber=localStorage.getItem('mobileNumber');
    if(latitude && longitude)
    updateCoord(mobileNumber);
  },[latitude,longitude]);

  return (
    <>
      <Navbar />
      <div className="Home">
        <div className="left-Home">
          <div className="cards-container">
            <h3>Your Coordinates:</h3>
            <p>Latitude :{latitude}</p>
            <p>Longitude: {longitude}</p>
          </div>
        </div>
        {/* <div className="right-Home"> */}
          {latitude && longitude && <MapComponent  latitude={latitude} longitude={longitude}  data={data} style={{ marginTop:'60px'}}/> }
        {/* </div> */}
      </div>
    </>
  );
};

export default HomePage;
