import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import featured from '../Layouts/Assets/Imgs/Featured.png'
import {Icon} from "@iconify/react";
import { Link } from 'react-router-dom';
import p1 from '../Layouts/Assets/Imgs/p1.png';
import p2 from '../Layouts/Assets/Imgs/p2.png';
import p3 from '../Layouts/Assets/Imgs/p3.png';
import p4 from '../Layouts/Assets/Imgs/p4.png';
import p5 from '../Layouts/Assets/Imgs/p5.png';
import p6 from '../Layouts/Assets/Imgs/p6.png';
import p7 from '../Layouts/Assets/Imgs/p7.png';
import p8 from '../Layouts/Assets/Imgs/p8.png';
import bg1 from '../Layouts/Assets/Imgs/bg1.png';
import rating from '../Layouts/Assets/Imgs/Rating.png';
import avatarUn from '../Layouts/Assets/Imgs/avatar1-2.jpg';
import avatarD from '../Layouts/Assets/Imgs/avatar2.jpg';
import { useDispatch } from 'react-redux';
import { panierAction } from '../store/PanierReducer';


const Product = () => {
const dispatch= useDispatch();

    const [product, setProduct]= useState([]);
  const [error, setError]= useState(null);
  const [avatar, setAvatar]= useState([
    { image: avatarUn, productName: 'Tomates' },
    { image: avatarD, productName: 'Obergine' },
    { image: avatarUn, productName: 'Mangues' },
    { image: avatarD, productName: 'Poivron' },
    { image: avatarUn, productName: 'Haricots' },
    { image: avatarD, productName: 'Salade' },
    { image: avatarUn, productName: 'Joux' },
    { image: avatarD, productName: 'Pomme' },
  ])
  const [productImages, setProductImages] = useState([
    { image: p7, productName: 'Tomates' },
    { image: p5, productName: 'Obergine' },
    { image: p6, productName: 'Mangues' },
    { image: p3, productName: 'Poivron' },
    { image: p4, productName: 'Haricots' },
    { image: p2, productName: 'Salade' },
    { image: p8, productName: 'Joux' },
    { image: p1, productName: 'Pomme' },
  ]);
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
  const getProductImage = (productName) => {
    const productImage = productImages.find((item) => item.productName === productName);
    return productImage ? productImage.image : null;
  };
  const getAvatar = (productName) => {
    const avatars = avatar.find((item) => item.productName === productName);
    return avatars ? avatars.image : null;
  };

  const handleAddToCart=(product)=>{
    dispatch(panierAction.addItemCart(product))
  }

  return (
    <div>
      <section className=''>
            <img src={featured} alt="" className=' w-[78%] ml-[12%] ' />
          </section>
          <section className=" bg-bg-soft h-[203vh] -mt-32 justify-center  " >
            <div className='pt-[15%] pl-[15%] flex '>
              <h2 className='text-[25px] font-semibold ' >Présentation de nos produits</h2>
              <Link to="/cat_fruitLegume" className='pl-[43%]'>
              <button className=' pt-2 flex text-primary font-medium'>View all<Icon icon="formkit:arrowright"  style={{color: '#00893A', marginTop: '4px'}} /></button>
            </Link>
            </div>
              <div className=' w-[70%] shadow-lg shadow-gris grid gap-[0px] grid-cols-4 justify-center bg-white ml-[15%]  mt-[5%] rounded-md border-2 border-[#80808039] '>
                {product.slice(0,8).map(product=>(
                <div key={product.productName} className='border border-gris p-[5%] hover:border hover:border-primary hover:shadow-md hover:shadow-hover '>
                 <img src={getProductImage(product.productName)} alt=""/>
                <h3 className='flex text-[14px] font-semibold w-[100%] gap-[8px] '>
                <Icon icon="system-uicons:location"  style={{color: '#2C742F',fontSize: '25px'}} />
                {product.producerName}
                <img src={getAvatar(product.productName)} alt=""  className='rounded-[80%] w-[30%] h-[55px]  -mt-[20px] border-2 border-secondary '/>
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
          </section>
    </div>
  )
}

export default Product
