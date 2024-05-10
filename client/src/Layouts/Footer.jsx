import React from 'react';
import logo from '../Layouts/Assets/Imgs/logo.png';
import right from '../Layouts/Assets/Imgs/right.png';
import left from '../Layouts/Assets/Imgs/Left.png';
import instagram from '../Layouts/Assets/Imgs/Instagram.png';
import socialLink from '../Layouts/Assets/Imgs/Social Links.png';
import payment from '../Layouts/Assets/Imgs/Payment Method.png';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div>
      <div className='w-[100%] flex bg-soft-primary p-[1%] gap-[50px] justify-center '>
        <img src={logo} alt="" className='w-[12%] ' />
        <div className='mt-[3%] '>
            <h3 className='text-[14px] font-medium text-[#003603] '>S'inscrire à notre NewsLetter</h3>
            <p className='text-[10px] font-light text-[#7A997C] '>Pellentesque eu nibh eget mauris congue mattis matti.</p>
        </div>
        <form action="#" className='flex mt-[3%]'>
            <input type="email" name="Email" placeholder="Votre adresse email" className=' w-[330px] rounded-full h-[60%] text-[10px] p-5 ' required/><br/>
            <button type="submit" className="w-[100px] -ml-[15%] rounded-full h-[70%]  bg-[#002603] text-white text-[13px]  ">Envoyer</button><br/>
        </form>
      </div>
      <div className='bg-[#002603] pl-[10%] pt-[3%] pr-[10%] pb-[2%] bottom-0 w-[100%] '>
        <div className="grid grid-cols-5 gap-x-[3%] justify-center w-[100%] ml-[8%]  ">
          <div className='p-[2%] '>
          <h3 className='text-[14px] font-medium text-white leading-10'>A Propos de SEN Marche</h3>
          <p className='text-[10px] font-light text-[#618062] ' >Morbi cursus porttitor enim lobortis molestie. Duis gravida turpis dui, eget bibendum magna congue nec.</p>
          <div className=' leading-5'>
            <p className='text-[10px] font-medium text-white'>(219)555-0114 </p> 
            {/* <span className='text-[10px] font-light text-[#618062]'> or</span> */}
            <p className='text-[10px] font-medium text-white'>senmarche@gmail.com</p>
          </div>
          </div>
          <div className=''>
          <h3 className='text-[14px] font-medium text-white leading-10'>Mon Compte</h3>
          <p className='text-[10px] font-light text-[#618062] ' >Mon compte</p>
          <p className='text-[10px] font-light text-[#618062] ' >Mes commandes</p>
            <p className='text-[10px] font-medium text-white'>Shopping cart</p> 
            <p className='text-[10px] font-light text-[#618062] ' >Wishlist</p>
          <p className='text-[10px] font-light text-[#618062] ' >Settings</p>
          </div>
          <div className=''>
          <h3 className='text-[14px] font-medium text-white leading-10'>Aide</h3>
          <p className='text-[10px] font-light text-[#618062] ' >Contact</p>
          <p className='text-[10px] font-light text-[#618062] ' >Faqs</p>
            <p className='text-[10px] font-light text-[#618062] ' >Terms & Conditions</p>
          <p className='text-[10px] font-light text-[#618062] ' >Privacy Policy</p>
          </div>
          <div className=''>
          <h3 className='text-[14px] font-medium text-white leading-10'>Proxy</h3>
          <p className='text-[10px] font-light text-[#618062] ' >A Propos</p>
          <p className='text-[10px] font-light text-[#618062] ' >Shop</p>
            <p className='text-[10px] font-light text-[#618062] ' >Produit</p>
          <p className='text-[10px] font-light text-[#618062] ' >Details Produit </p>
          <p className='text-[10px] font-light text-[#618062] ' >Track Order </p>
          </div>
          <div>
            <img src={instagram} alt="" />
          </div>
          </div>
          <img src={left} alt="" className=' float-left absolute w-[13%] -mt-[12%] left-0'  />
        <img src={right} alt="" className=' float-right absolute w-[13%] -mt-[15%] right-0  ' />
        <div className='flex w-[80%] pt-3 gap-[100px] bottom-0 mt-[3%] ml-[10%] border-t border-[#618062] '>
            <img src={socialLink} alt="" className='w-[15%] h-[5%] '/>
            <p className='text-[10px] font-light text-[#618062] '>SEN Marche e-commerce @2024 ALL RIGHTS RESERVED</p>
            <img src={payment} alt="" className='w-[25%] h-[5%] ' />
        </div>
        </div>
        
      </div>
  )
}

export default Footer
