import React from 'react';
import Navbar  from '../Layouts/Navbar/Navbar';
import companyLogo from '../Layouts/Assets/Imgs/Company Logo.png'
import Hero from '../Layouts/Hero';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Link } from 'react-router-dom';
import Product from '../Layouts/Product';
import Producer from '../Layouts/Producer';
import video1 from '../Layouts/Assets/video/SEN_Marche video.mp4'
import agriculteur from '../Layouts/Assets/Imgs/agriculteur.png';
import Footer from '../Layouts/Footer';

function Home() {
  
    return (
        <div>
          <Navbar />
          <Hero/>
          <Product/>
          <Producer/>
          <section>
            <div className='w-[100%]  '>
            <video controls autoPlay width="900" height="100" className='mt-[10%] sm:w-[80%] ml-[15%] border-2 border-primary shadow-lg shadow-gris '>
              <source src={video1} type="video/mp4" className=' ' />
            </video>
            </div>
          </section>
          <section className='mt-[10%] flex w-[80%] justify-center ml-[15%] '>
            <div className='  '>
              <img src={agriculteur} alt="" className='w-[80%] lg:w-[80%] sm:w-[55%]  ' />
              </div>
            <div className='w-[70%] p-[2%] -ml-[10%] lg:-ml-[10%] sm:-ml-[30%] '>
              <h2 className='text-[30px] lg:text-[30px] sm:text-[20px] font-semibold '>100% Local <br /> Du Champ à l'assiette</h2>
              <h3 className='text-[15px] lg:text-[15px] sm:text-[10px] font-medium flex leading-10 lg:leading-10 sm:leading-6 '>
              <Icon icon="lets-icons:check-fill"  style={{color: '#00893A', fontSize: '30px'}} />
              Ensemble pour une alimentation saine et naturelle.</h3>
              <p className='text-[12px] lg:text-[12px] sm:text-[8px] font-light text-gris ml-[5%] '>Ut quis tempus erat. Phasellus euismod bibendum magna non tristique.
                 Pellentesque semper vestibulum elit sed condimentum. 
                 Nunc pretium fermentum interdum. </p>
              <h3 className='text-[15px] lg:text-[15px] sm:text-[10px] font-medium flex leading-10 lg:leading-10 sm:leading-6' >
              <Icon icon="lets-icons:check-fill"  style={{color: '#00893A', fontSize: '30px'}} />
              Chaque jour des produits frais et de qualité pour vous.</h3>
              <p className='text-[12px] lg:text-[12px] sm:text-[8px] font-light text-gris ml-[5%]'>Maecenas vehicula a justo quis laoreet. Sed in placerat nibh,
                 a posuere ex. Morbi sem neque, aliquam sed orci et, 
                rhoncus lobortis felis. Sed vestibulum nisl sit amet sapien. </p>
                <Link to="/shop">
                  <button className="p-2 pl-8 pr-8 lg:pr-8 lg:p-2 lg:pl-8 sm:p-1 sm:pl-4 sm:pr-4  bg-primary text-white text-[13px] lg:text-[13px] sm:text-[11px] mt-6 rounded-2xl ml-7 flex">Achetez<Icon icon="formkit:arrowright"  style={{color: 'white', marginTop: '4px'}} /></button>
                </Link>
            </div>
          </section>
          <div className='w-[75%] ml-[15%] mb-[10%] mt-[5%] '>
            <img src={companyLogo} alt=""  />
          </div>
          <Footer/>
        </div>
    )
}

export default Home