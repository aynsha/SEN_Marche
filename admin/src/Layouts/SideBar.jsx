import React from 'react';
import { Icon } from '@iconify/react';
import {Link} from 'react-router-dom';
import logo from '../Assets/Imgs/logo.png';
import Product from '../Components/Products/Product';
import Dashbord from '../Components/Dashbord';
import Producer from '../Components/Producers/Producer';
import { useState } from 'react';

const SideBar = () => {
    const [activeComponent, setActiveComponent] = useState('profil');

    const renderComponent = () => {
        switch (activeComponent) {
            case 'product':
                return <Product />;
            case 'producer':
                return <Producer />;
            default:
                return <Dashbord/>;
        }
    };
    const handleClose = () => {
            localStorage.removeItem("token")
            window.location = "/"
        }

  return (
    <div className='flex w-[100%] '>
    <div className=" top-0 h-screen z-[1000%] w-64 bg-soft-primary text-black text-[15px] flex flex-col fixed">
        
      <div className="flex items-center justify-center h-20 shadow-md">
      <Link to="/">
        <img src={logo} alt="" className='object-scale-down w-32 -mt-2 ...'/>
        </Link>
      </div>
      <nav className="mt-10">
        <Link to="#" className=" w-full flex py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700  items-center"
        onClick={() => setActiveComponent('dashbord')}>
        <Icon icon="ant-design:product-filled"   style={{color: "#00893A"}} className="w-6 h-6 mr-3"/>
          Dashboard
        </Link>
        <Link to="" className="w-full flex py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700  items-center"
        onClick={() => setActiveComponent('product')}>
        <Icon icon="gridicons:product-downloadable"   style={{color: "#00893A"}} className="w-6 h-6 mr-3"/>
          Gestion des Produits
        </Link>
        <Link to="#" className="w-full flex py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700  items-center"
        onClick={() => setActiveComponent('producer')}>
        <Icon icon="icon-park-outline:avatar"    style={{color: "#00893A"}} className="w-6 h-6 mr-3"/>
          Gestion des Producteurs
        </Link>
        <Link to="#" className="w-full flex py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700  items-center">
        <Icon icon="material-symbols-light:account-circle-outline"  style={{color: "#00893A", fontSize:'30px'}} />
          Profile
        </Link>
        <Link to="#" className="w-full py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 flex items-center">
        <Icon icon="mdi:cog-outline"  style={{color: "#00893A"}} className="w-6 h-6 mr-3"/>
          Settings
        </Link>
        <Link to="#" className="w-full py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 flex items-center"
        onClick={handleClose}>
        <Icon icon="material-symbols:logout"  style={{color: "#00893A"}} className="w-6 h-6 mr-3" />
          Logout
        </Link>
      </nav>
      </div>
      <div className="flex-1 w-[100%] ">
        {renderComponent()}
      </div>
    
    </div>
  );
};

export default SideBar;
