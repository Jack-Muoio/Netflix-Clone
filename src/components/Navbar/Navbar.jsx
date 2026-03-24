import React, { useEffect, useRef } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import search_icon from '../../assets/search_icon.svg'
import bell_icon from '../../assets/bell_icon.svg'
import caret_icon from '../../assets/caret_icon.svg'
import profile_img from '../../assets/profile_img.png'
import { logout } from '../../firebase'
import { toast } from 'react-toastify'

const Navbar = () => {

    const navRef = useRef()

    const notifyUnderConstruction = (featureName) => {
    toast.info(`🎬 ${featureName} is not implemented yet! Check back soon.`, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark", 
    });
  };

useEffect(() => {
    const handleScroll = () => {
        const screenWidth = window.innerWidth;
        let scrollThreshold = 460; 

        if (screenWidth < 768) {
            scrollThreshold = 200;
        } else if (screenWidth < 1024) {
            scrollThreshold = 350;
        }

        if (window.scrollY >= scrollThreshold) {
            navRef.current.classList.add('nav-dark');
        } else {
            navRef.current.classList.remove('nav-dark');
        }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
}, []);

  return (
    <div ref={navRef} className='navbar'>
        <div className="navbar-left">
            <img src={logo} alt="" />
            <ul>
                <li>Home</li>
                <li onClick={() => notifyUnderConstruction("TV Shows")}>TV Shows</li>
                <li onClick={() => notifyUnderConstruction("Movies")}>Movies</li>
                <li onClick={() => notifyUnderConstruction("New & Popular")}>New & Popular</li>
                <li onClick={() => notifyUnderConstruction("My List")}>My List</li>
                <li onClick={() => notifyUnderConstruction("Browse by Languages")}>Browse by Languages</li>
            </ul>
        </div>
        <div className="navbar-right">
            <img src={search_icon} alt="" className='icons' onClick={() => notifyUnderConstruction("Search")}/>
            <p>Children</p>
            <img src={bell_icon} alt="" className='icons' onClick={() => notifyUnderConstruction("Notifications")}/>
            <div className="navbar-profile">
                <img src={profile_img} alt="" className='profile' />
                <img src={caret_icon} alt="" />
                <div className="dropdown">
                    <p onClick={() => {logout()}}>Sign Out of Netflix</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar