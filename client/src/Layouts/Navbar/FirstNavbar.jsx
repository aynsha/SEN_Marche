import React from 'react';
import logo from '../Assets/Imgs/logo.png';
import { useState } from 'react';
// import {Icon} from "@iconify/react";
import {Icon} from "@iconify/react";
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { panierAction } from '../../store/PanierReducer';
import PopUp from '../../Components/PopUp';
 

// Composant de la première barre de navigation
const FirstNavBar = () => {
  const dispatch= useDispatch();

  const canIViewCart= useSelector(
    (state)=> state.Panier.isCartVisible
  );

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

const cartLength= useSelector((state)=>state.Panier.items.length);

const handleClick=()=>{
 dispatch(panierAction.toogleCartView())
}
 
  return (
    <div className="navbar">
      <div className='bg-soft-primary fixed flex z-50 right-0 left-0 top-0 m-0 justify-center p-1.5 ... '>
      <p className='text-xs text-hover ...'>Soldes d'été sur tous nos produits et livraison express gratuite - 50 % de réduction ! <Link to="" className='underline'> Achetez maintenant</Link></p>
      </div>
      <div className=' bg-white h-16 mt-6 fixed z-50 p-3 right-0 left-0 top-0 m-0 flex  justify-around ...'>
        <div className='fixed z-50 p-3 top-2 right-0 left-0  m-0 flex  justify-around ...'>
      <div className="w-32">
        <Link to="/">
        <img src={logo} alt="" className='object-scale-down w-32 -mt-2 ...'/>
        </Link>
      </div>
      <div className="search-category flex justify-center h-10 w-2/5 items-center border border-solid border-gris rounded overflow-hidden mt-4 ...">
      <div className="flex-1 border-r h-10 border-gris">
          <input type="text" placeholder="Catégorie" className='p-1.5 focus:outline-none active:outline-none'/>
        </div>
        <div className="flex-1 h-10">
          <input type="text" placeholder="Localisation" className='p-1.5 focus:outline-none active:outline-none'/>
        </div>
        
        <div className="bg-primary p-2.5 border-0">
          <button className='bg-transparent'>
          <Icon icon="material-symbols-light:search" className='text-white ' style={{fontSize:"25px"}}/>
          </button>
        </div>
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
        <div className="p-2 cursor-pointer" >
        <Icon icon="solar:cart-3-outline"  style={{color: 'black', fontSize:'30px'}}
        onClick={handleClick} />
        <div className="nav-cart-count  w-[22px] h-[22px] flex justify-center -mt-[35px] ml-[15px] rounded-[11px] text-[14px] text-white bg-[#00893A] ">
          {cartLength} 
          </div>
          {canIViewCart && <PopUp/>}
        </div>
      </div>
      
    </div>
    </div>
    </div>
  );
};
export default FirstNavBar;