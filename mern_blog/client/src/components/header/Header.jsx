import React from 'react'
import "./header.css";

export default function Header() {
  return (
    <div className='header'>
        <div className="headerTitles">
            <span className='headerTitleSm'>React & Node</span>
            <span className='headerTitleLg'>Blog</span>
        </div>
        <img className='headerImg' src='https://cdn.pixabay.com/photo/2017/11/04/08/14/tree-2916763_960_720.jpg' alt='nature' />
    </div>
  )
}
