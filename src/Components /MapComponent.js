// src/MapComponent.js

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const MapComponent = () => {
  return (
    <div className="map">
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        style={{ width: '60%', height: '400px' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A sample popup with additional information.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
