import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import featured from '../Layouts/Assets/Imgs/Featured.png'
import {Icon} from "@iconify/react";
import { Link } from 'react-router-dom';
import bg1 from '../Layouts/Assets/Imgs/bg1.png';
import rating from '../Layouts/Assets/Imgs/Rating.png';
import { useDispatch } from 'react-redux';
import { panierAction } from '../store/PanierReducer';


const Product = () => {
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
    <div>
      <section className=''>
            <img src={featured} alt="" className=' w-[78%] ml-[12%] ' />
          </section>
          <section className=" bg-bg-soft h-auto -mt-32 lg:-mt-32 sm:-mt-16 justify-center  " >
            <div className='pt-[15%] pl-[15%] flex '>
              <h2 className='text-[25px] lg:text-[25px] sm:text-[15px] md:text-[20px] font-semibold ' >Présentation de nos produits</h2>
              <Link to="/products" className='pl-[43%]'>
              <button className=' pt-2 lg:pt-2 sm:p-1 flex sm:text-[10px] lg:text-[17px] text-[17px] text-primary font-medium'>View all<Icon icon="formkit:arrowright"  style={{color: '#00893A', marginTop: '4px'}} /></button>
            </Link>
            </div>
              <div className=' w-[70%] shadow-lg shadow-gris grid gap-[0px] grid-cols-4 justify-center bg-white ml-[15%]  mt-[5%] rounded-md border-2 border-[#80808039] '>
                {product.slice(0,8).map(product=>(
                <div key={product.productName} className='border border-gris p-[5%] hover:border hover:border-primary hover:shadow-md hover:shadow-hover '>
                 <Link to={`/detail_product/${product._id}`}>
                 <img src={product.imageProduct} alt=""/>
                <h3 className='flex text-[14px] lg:text-[14px] sm:text-[8px] font-semibold w-[100%] gap-[8px] mt-[25px]'>
                <Icon icon="system-uicons:location"  style={{color: '#2C742F',fontSize: '29px'}} />
                {product.producer.producerName}
                <img src={product.producer.imageProducer} alt=""  className='rounded-[80%] w-[30%] lg:w-[30%] sm:w-[30%] h-[55px] lg:h-[55px] sm:h-[35px]   border-2 border-secondary '/>
                </h3>
                <p className='text-[13px] lg:text-[13px] sm:text-[9px] ml-[10px] text-hover'>{product.productName}</p> 
                </Link>
                <p className='flex gap-20 ml-[16px] text-[14px] lg:text-[14px] sm:text-[9px] font-medium'>{product.productPrice}Fcf
                </p>
                <Icon icon="solar:cart-3-outline"   className='text-[35px] lg:text-[35px] sm:text-[20px] ml-[70%] -mt-[5%] rounded-[80%] border border-gris cursor-pointer p-1 shadow-lg shadow-gris hover:bg-primary hover:text-white' 
                onClick={() => handleAddToCart(product)}
                />
                <img src={rating} alt="" className='w-[70px] lg:w-[70px] sm:w-[40px] ml-[14px] ' /> 
                
                </div>
                ))}
              </div>
              <img src={bg1} alt=""  className='w-[10%]  '/>
          </section>
    </div>
  )
}

export default Product
