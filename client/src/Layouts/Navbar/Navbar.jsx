import React from 'react';
import FirstNavBar from './FirstNavbar';
import SecondNavBar from './SecondNavbar';
import './navbar.css';

// Composant principal qui assemble les deux barres de navigation
const Navbar = () => {
  return (
    <div>
      <SecondNavBar />
      <FirstNavBar />
      
    </div>
  );
};

export default Navbar;
