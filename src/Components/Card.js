// src/Card.js

import React from 'react';

const Card = ({ placeName, latitude, longitude }) => {
  return (
    <div className="card">
      <h3>{placeName}</h3>
      <p>Latitude: {latitude}</p>
      <p>Longitude: {longitude}</p>
    </div>
  );
};

export default Card;
