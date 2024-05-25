import React from 'react';
import logo from '../Assets/Imgs/logo.png';
import { useState } from 'react';
// import {Icon} from "@iconify/react";
import {Icon} from "@iconify/react";
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { panierAction } from '../../store/PanierReducer';
import PopUp from '../../Components/PopUp';
import axios from 'axios';
import { logout } from '../../store/userReducer';
 

// Composant de la première barre de navigation
const FirstNavBar = () => {
const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [categorySuggestions, setCategorySuggestions] = useState([]);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const dispatch = useDispatch();
  const canIViewCart = useSelector((state) => state.Panier.isCartVisible);
  const cartLength = useSelector((state) => state.Panier.items.length);

  useEffect(() => {
    if (category || location) {
      axios.get('http://localhost:5000/api/all-products')
        .then(response => {
          const products = response.data;
          const categories = [...new Set(products.map(product => product.productName))];
          const locations = [...new Set(products.map(product => product.producer.producerName))];
          
          if (category) {
            setCategorySuggestions(categories.filter(c => c.toLowerCase().startsWith(category.toLowerCase())));
          } else {
            setCategorySuggestions([]);
          }

          if (location) {
            setLocationSuggestions(locations.filter(l => l.toLowerCase().startsWith(location.toLowerCase())));
          } else {
            setLocationSuggestions([]);
          }
        })
        .catch(err => console.error(err));
    }
  }, [category, location]);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:5000/api/all-products', {
        params: { category, location }
      });
      const data = response.data;
      setLoading(false);
      // Naviguer vers la page Products avec les résultats de recherche dans l'URL
      navigate(`/products?productName=${category}&producerName=${location}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // const handleLogout = () => {
  //   dispatch(logout());
  //   closeMenu();
  // };

  const handleClose = () => {
    localStorage.removeItem("token");
    window.location = "/";
  };

  const handleClick = () => {
    dispatch(panierAction.toogleCartView());
  };
 
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
          <input type="text" 
          placeholder="Catégorie" 
          className='p-1.5 focus:outline-none active:outline-none'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          />
          {categorySuggestions.length > 0 && (
            <ul className="absolute bg-white border border-gray-300 w-full max-h-40 overflow-y-auto">
              {categorySuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="cursor-pointer p-2 hover:bg-gray-200"
                  onClick={() => setCategory(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex-1 h-10">
          <input type="text" 
          placeholder="Localisation" 
          className='p-1.5 focus:outline-none active:outline-none'
          value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          {locationSuggestions.length > 0 && (
            <ul className="absolute bg-white border border-gray-300 w-full max-h-40 overflow-y-auto">
              {locationSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="cursor-pointer p-2 hover:bg-gray-200"
                  onClick={() => setLocation(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
        
        <div className="bg-primary p-2.5 border-0">
          <button className='bg-transparent' onClick={handleSearch}>
          <Icon icon="material-symbols-light:search" className='text-white ' style={{fontSize:"25px"}}/>
          </button>
        </div>
        {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
        </div>
      <div className="flex justify-around w-24 mt-2  ...">
        <div className="p-2">
        <Icon icon="ph:heart-light"  style={{color: 'black', fontSize:'30px'}} />
        </div>

        <div
        className="menu-login p-2 cursor-pointer"
        onClick={toggleMenu}
         // Changer la couleur en fonction de l'état de connexion
      >
        <Icon 
          icon={isLoggedIn ?  "ic:baseline-account-circle": "material-symbols-light:account-circle-outline"} 
          style={{ fontSize: '30px', color: isLoggedIn ? 'green' : 'black' }} 
        />
      </div>
      {isMenuOpen && (
        <div className="menu absolute mt-[4%] right-10 bg-[#e2b633] border-2 border-none border-yellow-100 rounded p-3">
          <Icon
            icon="emojione-monotone:large-orange-diamond"
            className="absolute text-[32px] -top-4 left-[27%] text-[#e2b633]"
          />
          <ul className="text-white text-[13px]">
            {!isLoggedIn ? (
              <>
                <Link to="/connexion" className="link-login">
                  <li onClick={closeMenu}>Se connecter</li>
                </Link>
                <Link to="/inscription">
                  <li onClick={closeMenu}>S’inscrire</li>
                </Link>
              </>
            ) : (
              <>
                <Link to="/mes-commandes">
                  <li onClick={closeMenu}>Mes commandes</li>
                </Link>
                <Link to="/messages">
                  <li onClick={closeMenu}>Messages</li>
                </Link>
                <Link to="/paiements">
                  <li onClick={closeMenu}>Paiements</li>
                </Link>
                <Link to="/upgrade-compte">
                  <li onClick={closeMenu}>Upgrade compte</li>
                </Link>
                <li onClick={handleClose} className="cursor-pointer">
                  Se déconnecter
                </li>
              </>
            )}
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