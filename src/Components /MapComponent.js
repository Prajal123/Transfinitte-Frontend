import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from "leaflet";


const markerIcon=new L.icon({
  iconUrl:require("./marker.png"),
  iconSize:[23,30],
  iconAnchor:[17,45]
})

const userMarkerIcon=new L.icon({
  iconUrl:require("./user_marker.png"),
  iconSize:[23,30],
  iconAnchor:[17,45]
})

const MapComponent = ({latitude,longitude,data}) => {
  console.log(data);
  return (
    // <div className="map">
      <MapContainer
        center={[latitude, longitude]}
        zoom={800}
        scrollWheelZoom={false}
        style={{ width: '80%', height: '800px' }}
      >
        <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
        <Marker position={[latitude, longitude]} icon={markerIcon}>
        </Marker>
        {data?.map((coord)=>{
           if(coord.latitude && coord.longitude && coord.latitude !== latitude && coord.longitude !== longitude)
          return <Marker position={[coord.latitude,coord.longitude]} icon={userMarkerIcon} />
        })}
      </MapContainer>
    // </div>
  );
};

export default MapComponent;
