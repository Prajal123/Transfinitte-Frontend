import React from 'react';
// import './main-style.css';
const Navbar = () => {
  return (
    <>
      <div className="navigation-items">
        <div className="navigation">
          <div className="left-section">
            <h3>GPS Finder</h3> {/* Name "GPS Finder" */}
          </div>
          <div className="items">
            <ul>Home</ul>
            <ul>Dashboard</ul>
            <ul>Account</ul>
          </div>
          <div className="search-section">
            <input type="text" placeholder="Search..." />
            <input type="text" placeholder="Search..." />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
