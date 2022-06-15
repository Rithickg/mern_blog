import React, { useContext } from 'react'
import { Context } from '../../context/Context';
import "./topbar.css"
import {Link} from "react-router-dom";

export default function TopBar() {
  const {user,dispatch}=useContext(Context)

  const handleLogout=()=>{
    dispatch({type:"LOGOUT"});
  }
  const PF ="http://localhost:2002/images/";

  return (
    <div className='top'>
      <div className="topLeft">
        <i className="topIcon fa-brands fa-facebook-square"></i>
        <i className="topIcon fa-brands fa-twitter-square"></i>
        <i className="topIcon fa-brands fa-pinterest-square"></i>
        <i className="topIcon fa-brands fa-instagram-square"></i>
      </div>
      <div className="topCenter">
        <ul className='topList'>
          <li className='topListItem'>
            <Link className='link' to="/">HOME</Link>
          </li>
          <li className='topListItem'>
            <Link className='link' to="/about">ABOUT</Link>
          </li>
          <li className='topListItem'>
            <Link className='link' to="/contact">CONTACT</Link>
          </li>
          <li className='topListItem'>
            <Link className='link' to="/write">WRITE</Link>
          </li>
          <li className='topListItem'>
            <Link className='link' onClick={handleLogout}>{user && "LOGOUT"}</Link>
          </li>
        </ul> 
      </div>
      <div className="topRight">
        {user ? (
        <Link to="/settings">
          <img className='topImg' src={PF+user.profilePic} alt='person' />
          </Link>
        ) : (
        <ul className='topList'>
          <li className='topListItem'>
          <Link className='link' to="/login">LOGIN</Link> 
          </li>
          <li className='topListItem'>
          <Link className='link' to="/register">REGISTER</Link> 
          </li>
        </ul>
        )}
        
        <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
        </div>
    </div>
  )
}
