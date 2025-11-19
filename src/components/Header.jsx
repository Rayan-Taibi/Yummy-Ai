import React from 'react'
import logo from '../assets/yummyai-logo.png'
import '../styles/Header.css'

export default function Header() {
  return (
    <nav className="header">
       
         <img src={logo} alt="YummyAi Logo" className="logo" />  
        <h1 className="name">Yummy Ai</h1>
    </nav>
  )
}
