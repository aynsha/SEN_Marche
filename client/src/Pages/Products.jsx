import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import breadcrumb from '../Layouts/Assets/Imgs/Breadcrumbs.png';
import {Icon} from "@iconify/react";
import { Link } from 'react-router-dom';
import bg1 from '../Layouts/Assets/Imgs/bg1.png';
import rating from '../Layouts/Assets/Imgs/Rating.png';
import { useDispatch } from 'react-redux';
import { panierAction } from '../store/PanierReducer';
import Navbar from '../Layouts/Navbar/Navbar';
import Footer from '../Layouts/Footer';
import pagination from '../Layouts/Assets/Imgs/Pagination.png';

const Products = () => {
const dispatch= useDispatch();

    const [product, setProduct]= useState([]);
  const [error, setError]= useState(null);
  
  // Fetch data from the API
  useEffect(()=>{
    function fetchData(){
      axios.get('http://localhost:5000/api/all-products')
      .then(response=> {setProduct(response.data);})
      .catch(err => setError(err));
    };
  fetchData();
  }, []);

  // Utilisez une fonction pour récupérer l'image correspondante à un produit
  

  const handleAddToCart=(product)=>{
    dispatch(panierAction.addItemCart(product))
  }

  return (
    <div className=' h-[370vh] '>
        <Navbar/>
         <section>
         <div >
         <img src={breadcrumb} alt="" className='mt'/>
         <div className='-mt-[4%] mb-[5%] ml-[5%] flex  '>
         <Link to='/' className='flex '>
         <Icon icon="material-symbols-light:home-outline"  style={{color: 'white', fontSize:'25px'}} />
         <Icon icon="solar:alt-arrow-left-outline"  style={{color: 'white', fontSize:'25px'}} />
         </Link>
         <Link to='/inscription'>
         <p className='text-[14px]  mt-[2%] text-primary'>Nos produits</p>
         </Link>
         </div>
       </div>
         </section>
          <section className="  pt-[4%] justify-center  " >
              <div className=' w-[70%] shadow-lg shadow-gris grid gap-[0px] grid-cols-4 justify-center bg-white ml-[15%]  mt-[5%] rounded-md border-2 border-[#80808039] '>
                {product.map(product=>(
                <div key={product.productName} className='border border-gris p-[5%] hover:border hover:border-primary hover:shadow-md hover:shadow-hover '>
                 <img src={product.imageProduct} alt=""/>
                <h3 className='flex text-[14px] font-semibold w-[100%] gap-[8px] mt-[25px]'>
                <Icon icon="system-uicons:location"  style={{color: '#2C742F',fontSize: '29px'}} />
                {product.producer.producerName}
                <img src={product.producer.imageProducer} alt=""  className='rounded-[80%] w-[30%] h-[55px]   border-2 border-secondary '/>
                </h3>
                <p className='text-[13px] ml-[10px] text-hover'>{product.productName}</p> 
                <p className='flex gap-20 ml-[16px] text-[14px] font-medium'>{product.productPrice}Fcf
                <Icon icon="solar:cart-3-outline"   className='text-[35px]  rounded-[80%] border border-gris cursor-pointer p-1 shadow-lg shadow-gris hover:bg-primary hover:text-white' 
                onClick={() => handleAddToCart(product)}
                />
                </p>
                <img src={rating} alt="" className='w-[70px] ml-[14px] ' /> 
                </div>
                ))}
              </div>
              <img src={bg1} alt=""  className='w-[10%]  '/>
              <img src={pagination} alt="" className='  w-[24%] ml-[37%] ' />
          </section>
          <Footer/>
    </div>
  )
}

export default Products
