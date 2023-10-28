import React from 'react';
import Navbar from './Navbar';
import MapComponent from './MapComponent';
import Card from './Card';
const HomePage = () => {
  const cardData = [
    { placeName: 'Place 1', latitude: '41.1234', longitude: '-71.5678' },
    { placeName: 'Place 2', latitude: '42.5678', longitude: '-72.1234' },
    // Add more data as needed
  ];
  return (
    <>
      <Navbar />
      <div className="Home">
        <div className="left-Home">
          <div className="cards-container">
            {cardData.map((data, index) => (
              <Card key={index} {...data} />
            ))}
          </div>
        </div>
        <div className="right-Home">
          <MapComponent />
        </div>
      </div>
    </>
  );
};

export default HomePage;
