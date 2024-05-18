import React from 'react';
import logo from '../Assets/Imgs/logo.png';
import { useState } from 'react';
// import {Icon} from "@iconify/react";
import {Icon} from "@iconify/react";
import {Link} from 'react-router-dom';

 

// Composant de la première barre de navigation
const NavBar = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
  }; 
  const handleClose = () => {
    localStorage.removeItem("token")
    window.location = "/"
}


 
  return (
    <div className="navbar">
      
      <div className=' bg-bg-soft h-20 fixed z-50 p-3 right-0 left-0 top-0 m-0 flex  justify-around ...'>
        <div className='fixed z-50  top-2 right-0 left-0  m-0 flex  justify-around ...'>
      <div className="w-32">
        <Link to="/">
        <img src={logo} alt="" className='object-scale-down w-32 -mt-2 ...'/>
        </Link>
      </div>
      
      <div className="flex justify-around w-24 mt-2  ...">
        <div className="p-2">
        <Icon icon="ph:heart-light"  style={{color: 'black', fontSize:'30px'}} />
        </div>

        <div className="menu-login p-2 cursor-pointer " onClick={toggleMenu}>
        <Icon icon="material-symbols-light:account-circle-outline"  style={{color: 'black', fontSize:'30px'}} />
          </div>
          {isMenuOpen && (
        <div className="menu absolute mt-[4%] right-10 bg-[#e2b633] border-2 border-none border-yellow-100 rounded p-3">
          <Icon icon="emojione-monotone:large-orange-diamond"  className='absolute text-[32px] -top-4 left-[27%] text-[#e2b633] '/>
          <ul className="text-white text-[13px] ">
          <Link to='/connexion' className="link-login "  ><li onClick={closeMenu}>Se connecter</li></Link>
          <Link to='/inscription'><li>S’inscrire</li></Link>  
            <li>Mes commandes</li>
            <li>Messages</li>
            <li>Paiements</li>
            <li>Upgrade compte</li>
            <li onClick={handleClose} className=' cursor-pointer'>Se déconnecter</li>
          </ul>
        </div>
      )}   
        
      </div>
      
    </div>
    </div>
    </div>
  );
};
export default NavBar;