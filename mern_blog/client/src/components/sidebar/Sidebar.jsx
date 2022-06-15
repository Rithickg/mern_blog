import React from 'react'
import axios from "axios"
import { useEffect } from 'react';
import { useState } from 'react'
import { Link } from 'react-router-dom';
import "./sidebar.css"

export default function Sidebar() {
    const [cats,setCats]=useState([]);
    useEffect(()=>{
        const getCats =async ()=>{
            const res = await axios.get("http://localhost:2002/api/categories")
            setCats(res.data)
        }
        getCats();
    },[])
return (
    <div className='sidebar'>
    <div className="sidebarItem">
        <span className='sidebarTitle'>ABOUT ME</span>
        <img src='https://media.istockphoto.com/photos/big-and-small-picture-id172759822?b=1&k=20&m=172759822&s=170667a&w=0&h=kkmaR2OYuS14rTiEotbzXoBecwnRePNC79Jsgl3M4dY=' alt='person' />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur aspernatur dolores maiores vero. Totam sunt natus.</p>
    </div>
    <div className="sidebarItem">
        <span className='sidebarTitle'>CATEGORIES</span>
        <ul className='sidebarList'>
            {cats.map((c)=>(
                <Link to={`/?cat=${c.name}`} className="link">
                <li className='sidebarListItem'>{c.name}</li>
                </Link>
            ))}
        </ul>
    </div>
    <div className="sidebarItem">
        <span className="sidebarTitle">Follow US</span>
        <div className="sidebarSocial">
        <i className="sidebarIcon fa-brands fa-facebook-square"></i>
        <i className="sidebarIcon fa-brands fa-twitter-square"></i>
        <i className="sidebarIcon fa-brands fa-pinterest-square"></i>
        <i className="sidebarIcon fa-brands fa-instagram-square"></i>
        </div>
    </div>
    </div>
  )
}
