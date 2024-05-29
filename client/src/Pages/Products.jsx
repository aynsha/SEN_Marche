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
import { useLocation } from 'react-router-dom';

const Products = () => {
//Pour la Barre de recherche
const localisation = useLocation();
const { results } = localisation.state || { results: [] };

//Pour le PAnier
const dispatch= useDispatch();

    const [product, setProduct]= useState([]);
  const [error, setError]= useState(null);
  const location = useLocation();
  

  // Fetch data from the API
  const query = new URLSearchParams(location.search);
    const productType = query.get('productType');
    const productName= query.get('productName')
    const producerName= query.get('producerName');

    useEffect(() => {
        function fetchData() {
            axios.get('http://localhost:5000/api/all-products')
            .then(response => {
              let filteredProducts = response.data;
              
              if (productType) {
                  filteredProducts = filteredProducts.filter(product => product.productType.toLowerCase() === productType.toLowerCase());
              }
              if (productName) {
                filteredProducts = filteredProducts.filter(product => product.productName.toLowerCase().startsWith(productName.toLowerCase()));
            }
            if (producerName) {
              filteredProducts = filteredProducts.filter(product => product.producer.producerName.toLowerCase() === producerName.toLowerCase());
            }
            
              setProduct(filteredProducts);
                })
                .catch(err => setError(err));
        }
        fetchData();
    }, [productType, productName, producerName]);

  // Utilisez une fonction pour récupérer l'image correspondante à un produit
  

  const handleAddToCart=(product)=>{
    dispatch(panierAction.addItemCart(product))
  }

  return (
    <div className=' h-auto'>
        <Navbar/>
         <section>
         <div >
         <img src={breadcrumb} alt="" className='mt'/>
         <div className='-mt-[4%] mb-[5%] ml-[5%] flex  '>
         <Link to='/' className='flex '>
         <Icon icon="material-symbols-light:home-outline"  style={{color: 'white', fontSize:'25px'}} />
         <Icon icon="solar:alt-arrow-left-outline"  style={{color: 'white', fontSize:'25px'}} />
         </Link>
         <Link to='/'>
         <p className='text-[14px]  mt-[2%] text-primary'>Nos produits</p>
         </Link>
         </div>
       </div>
         </section>
          <section className="  pt-[4%] justify-center  " >
              <div className=' w-[70%] shadow-lg shadow-gris grid gap-[0px] grid-cols-4 justify-center bg-white ml-[15%]  mt-[5%] rounded-md border-2 border-[#80808039] '>
                {product.map(product=>(
                <div key={product._id} className='border border-gris p-[5%] hover:border hover:border-primary hover:shadow-md hover:shadow-hover '>
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
              <img src={pagination} alt="" className='  w-[24%] ml-[37%] mb-10 ' />
          </section>

          <Footer/>
    </div>
  )
}

export default Products
