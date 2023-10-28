import { TextField } from '@mui/material';
import React from 'react';
// import './main-style.css';
const Navbar = () => {
  return (
    <>
      <div className="navigation-items" style={{ marginBottom: '40px' }}>
        <div className="navigation">
          <div className="left-section">
            <h3>Collision Detector</h3> {/* Name "GPS Finder" */}
          </div>

          <div className="search-section">
            <TextField id="standard-search" label="Search field" type="search" variant="standard" />
          </div>
          <div className="items">
            <div className="button-items">
              <ul className="button-item">Home</ul>
              <ul className="button-item">Dashboard</ul>
              <ul className="button-item">Account</ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
