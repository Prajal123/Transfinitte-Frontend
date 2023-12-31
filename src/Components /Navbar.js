import { TextField, Badge, IconButton, Popover, List, ListItem, ListItemText, Alert } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const [notificationCount, setNotificationCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentNotification, setCurrentNotification] = useState(null);
  const [severity, setSeverity] = useState('success')
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setNotificationCount(0); // Reset notification count when the dropdown is opened
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    // Clear local storage and redirect to the home page
    localStorage.clear();
    navigate('/');
  };

  // Simulate notifications every 30 seconds
  useEffect(() => {
    const intervalId = setInterval(async() => {
      const email=localStorage.getItem('email');
      const token=localStorage.getItem('token');
   
      const resp=await axios.post("/api/users/detectCollision",{
        toEmail:email
      },{
        headers:{
          Authorization:"Bearer "+token
        }
      })
      
      const newNotification = resp.data.message;
      if(newNotification === "You are in red zone, please stop the vehicle"){
        setSeverity("error");
      }else if(newNotification === "You are in the orange zone, please go slow"){
        setSeverity("error");
      }else if(newNotification === "You are in the yellow zone, move carefully"){
        setSeverity("warning");
      }else{
        setSeverity("success");
      }
      setNotifications([newNotification, ...notifications]);
      setNotificationCount(notificationCount + 1);

      // Display the notification for 2 seconds
      setCurrentNotification(newNotification);
      setTimeout(() => {
        setCurrentNotification(null);
      }, 4000);
    }, 10000);

    return () => clearInterval(intervalId);
  }, [notifications, notificationCount]);

  return (
    <>
      <div className="navigation-items" style={{ marginBottom: '40px' }}>
        <div className="navigation">
          <div className="left-section">
            <h3>Collision Detector</h3>
          </div>

          <div className="search-section">
            <TextField id="standard-search" label="Search field" type="search" variant="standard" />
          </div>

          <div className="items">
            <div className="button-items">
              
              <ul className="button-item" onClick={handleSignOut}>Sign Out</ul>
              <IconButton onClick={handleClick}>
                <Badge badgeContent={notificationCount} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <List>
                  {notifications.map((notification, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={notification} />
                    </ListItem>
                  ))}
                </List>
              </Popover>
            </div>
          </div>
        </div>
      </div>
      <div className='alert-placeholder'>
      {currentNotification && (
        <Alert variant='filled' severity={severity} style={{display:'flex', justifyContent: 'center', alignItems:'center'}}>
          {currentNotification}
        </Alert>
      )}
      </div>
    </>
  );
};

export default Navbar;
