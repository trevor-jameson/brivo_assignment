import { AppBar, Typography } from "@mui/material";

import { Link } from "react-router-dom";
import Logout from './Logout';

import './Navbar.css'

const navLinks = [
  {href: '/dashboard', text: 'Dashboard'},
  {href: '/forecasts', text: '5 Day Forecasts'},
  {href: '/settings', text: 'Settings'},
]

export default function Navbar() {

  const isUserLoggedIn = () => {
    return !!window.localStorage.getItem('user-token');
  }

  return (
    <AppBar id='navbar' position='static'>
      <Typography variant="h4" sx={{ my: 2 }}>
        Weather Forecast
      </Typography>
      <>
        {navLinks.map(navLink => <Link 
          className='navlink'
          key={navLink.text} 
          to={navLink.href}>
            {navLink.text}
          </Link>
        )}
      </>
      <Logout/>
    </AppBar>
  )
}