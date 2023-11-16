import React from 'react'
import './Header.css'
const Header = () => {
  const reload=()=>{
    window.location.reload()
  }
  return (
    <div className='header'>
      <div className='title'>
      <div className='Company-product' >
      <a href="https://dice.tech/" target="_blank" rel="noopener noreferrer">
        <img src='https://dice.tech/static/media/logo.3856741b5559af1c7626.png' height={'50px'} title='https://dice.tech/'/> </a>
        <h1 className='logo'>
        <span onClick={reload} style={{cursor:'pointer'}} title='Reload the app'>| GitHub-Repo-Search </span> </h1>
        </div>
        <a href="https://chinmay-g.netlify.app/" target="_blank" rel="noopener noreferrer"><button className='about'> About Chinmay </button></a>
        
      </div>
    </div>
  )
}

export default Header