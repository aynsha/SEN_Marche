import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {Icon} from "@iconify/react";
import p1 from '../Layouts/Assets/Imgs/p1.png';
import p2 from '../Layouts/Assets/Imgs/p1.png';
import p3 from '../Layouts/Assets/Imgs/p1.png';
import p4 from '../Layouts/Assets/Imgs/p1.png';
import p5 from '../Layouts/Assets/Imgs/p1.png';
import p6 from '../Layouts/Assets/Imgs/p1.png';
import p7 from '../Layouts/Assets/Imgs/p1.png';
import p8 from '../Layouts/Assets/Imgs/p1.png';
import p9 from '../Layouts/Assets/Imgs/p1.png'
import bg1 from '../Layouts/Assets/Imgs/bg1.png';
import rating from '../Layouts/Assets/Imgs/Rating.png';
import avatarUn from '../Layouts/Assets/Imgs/avatar1-2.jpg';
import avatarD from '../Layouts/Assets/Imgs/avatar2-2.jpg';
import avatar3 from '../Layouts/Assets/Imgs/avatar3.jpg'
import { Link } from 'react-router-dom';
import breadcrumb from '../Layouts/Assets/Imgs/Breadcrumbs.png';
import pagination from '../Layouts/Assets/Imgs/Pagination.png';
import  Navbar  from '../Layouts/Navbar/Navbar';
import Footer from '../Layouts/Footer';
import { useDispatch } from 'react-redux';
import { panierAction } from '../store/PanierReducer';

const CatFruiLegum = () => {
  const dispatch= useDispatch();
    const [listProduct, setProduct]= useState([]);
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
      { image: avatar3, productName: 'Pomme de terre' },
    ])
    const [productImages, setProductImages] = useState([
      { image: p1, productName: 'Tomates' },
      { image: p2, productName: 'Obergine' },
      { image: p3, productName: 'Mangues' },
      { image: p4, productName: 'Poivron' },
      { image: p5, productName: 'Haricots' },
      { image: p6, productName: 'Salade' },
      { image: p7, productName: 'Joux' },
      { image: p8, productName: 'Pomme de terre' },
      { image: p9, productName: 'Pomme' },
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
      <Navbar/>
      <section className="  h-[250vh]  justify-center  " >
      <div >
         <img src={breadcrumb} alt="" className='mt'/>
         <div className='-mt-[4%] mb-[5%] ml-[5%] flex  '>
         <Link to='/' className='flex '>
         <Icon icon="material-symbols-light:home-outline"  style={{color: 'white', fontSize:'25px'}} />
         <Icon icon="solar:alt-arrow-left-outline"  style={{color: 'white', fontSize:'25px'}} />
         </Link>
         <Link to='/inscription'>
         <p className='text-[14px]  mt-[2%] text-primary'>Fruits</p>
         </Link>
         </div>
       </div> 
              <div className=' w-[70%] shadow-lg shadow-gris grid gap-[0px] grid-cols-4 justify-center bg-white ml-[15%]  mt-[5%] rounded-md border-2 border-[#80808039] '>
                {listProduct.map(product=>(
                <div key={product.productName} className='border border-gris p-[5%] hover:border hover:border-primary hover:shadow-md hover:shadow-hover '>
                 <img src={getProductImage(product.productName)} alt=""/>
                <h3 className='flex text-[14px] font-semibold w-[100%] gap-[8px] '>
                <Icon icon="system-uicons:location"  style={{color: '#2C742F',fontSize: '25px'}} />
                {product.producerName}
                <img src={getAvatar(product.productName)} alt=""  className='rounded-[80%] w-[30%] h-[50px]  -mt-[20px] border-2 border-secondary '/>
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

export default CatFruiLegum
