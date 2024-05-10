import React from 'react'
import  Navbar  from '../Layouts/Navbar/Navbar';
import Footer from '../Layouts/Footer';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {Icon} from "@iconify/react";
import avatar1 from '../Layouts/Assets/Imgs/avatar1.jpg';
import avatar2 from '../Layouts/Assets/Imgs/avatar2.jpg';
import avatar3 from '../Layouts/Assets/Imgs/avatar3.jpg';
import bg2 from '../Layouts/Assets/Imgs/bg2.png';
import bg3 from '../Layouts/Assets/Imgs/bg3.png';
import {Link} from 'react-router-dom';
import p6 from '../Layouts/Assets/Imgs/p6.png';
import p7 from '../Layouts/Assets/Imgs/p7.png';
import p5 from '../Layouts/Assets/Imgs/p5.png';
import p2 from '../Layouts/Assets/Imgs/p2.png';
import p8 from '../Layouts/Assets/Imgs/p8.png';
import p4 from '../Layouts/Assets/Imgs/p4.png';
import p9 from '../Layouts/Assets/Imgs/p9.png';
import p1 from '../Layouts/Assets/Imgs/p1.png';
import rating from '../Layouts/Assets/Imgs/Rating.png';
import product1 from '../Layouts/Assets/Imgs/Product Image.png'; 
import product2 from '../Layouts/Assets/Imgs/Product Image1.png';
import pagination from '../Layouts/Assets/Imgs/Pagination.png';
import breadcrumb from '../Layouts/Assets/Imgs/Breadcrumbs.png';

const FruitLegume = () => {
  const [listProducer, setListProducer]= useState([]);
  const [error, setError]= useState(null);
  const [avatar, setAvatar]= useState([
    { image: avatar1, producerName: 'Ferme Goodies' },
    { image: avatar2, producerName: 'Ferme Ndar' },
    { image: avatar3, producerName: 'Ndiaye Legumes' },
  ])

  const [productImages, setProductImages] = useState([
    { image: p7, product: 'Tomates' },
    { image: p5, product: 'Obergine' },
    { image: p6, product: 'Mangue' },
    { image: p2, product: 'Salade' },
    { image: p8, product: 'Joux' },
    { image: p4, product: 'Piment' },
    { image: p9, product: 'Pomme de Terre' },
    { image: p1, product: 'Pomme'}
   
  ]);

  const getAvatar = (producerName) => {
    const avatars = avatar.find((item) => item.producerName === producerName);
    return avatars ? avatars.image : null;
  };
  const getProductImage = (product) => {
    const productImage = productImages.find((item) => item.product === product);
    return productImage ? productImage.image : null;
  };

  useEffect(()=>{
    function fetchData(){
      axios.get('http://localhost:5000/api/all-producers')
      .then(response=> {setListProducer(response.data);})
      .catch(err => setError(err));
    };
  fetchData();
  }, []);

  return (
    <div>
      <Navbar/>
      <section className='h-[300vh]'>
      <div >
         <img src={breadcrumb} alt="" className=''/>
         <div className='-mt-[4%] mb-[5%] ml-[5%] flex  '>
         <Link to='/' className='flex '>
         <Icon icon="material-symbols-light:home-outline"  style={{color: 'white', fontSize:'25px'}} />
         <Icon icon="solar:alt-arrow-left-outline"  style={{color: 'white', fontSize:'25px'}} />
         </Link>
         <Link to='/inscription'>
         <p className='text-[14px]  mt-[2%] text-primary'>Nos Producteurs</p>
         </Link>
         </div>
       </div>
            <img src={bg2} alt="" className='mt-[20%] ' />
            <div className=' block -mt-[45%] ml-[6%]  '>
              {listProducer.slice(1,4).map(producer=>(
                 <div className='w-[95%]  bg-white rounded-md border-2 border-[#80808039] mb-[5%] flex shadow-lg shadow-gris justify-center '>
                  <div className='m-[2%] border border-[#80808039] w-[30%] rounded-md '>
                    <img src={getAvatar(producer.producerName)} alt="" className='w-[100%] rounded-t-md  '/>
                  <h3 className='flex text-[15px] font-semibold w-[100%] ml-[20%] p-[3%] '>
                  {producer.producerName} </h3>
                  <p className='flex text-[15px] text-main-gray font-medium w-[100%]  ml-[20%] p-[2%]'>
                  <Icon icon="system-uicons:location"  style={{color: '#2C742F',fontSize: '26px'}} />
                    {producer.address.ville} </p>
                    <Link to="/shop">
                        <button className="p-3 pl-6 pr-6 bg-primary text-white text-[13px] m-3 ml-[10%] rounded-2xl flex">Voir ces produits<Icon icon="formkit:arrowright"  style={{color: 'white', marginTop: '4px'}} /></button>
                    </Link>
                  </div>
                  <Icon icon="ic:round-keyboard-arrow-right"  style={{color: '#00893A', fontSize:'55px'}} className='absolute ml-[85%] mt-[10%] ' />
                  {producer.productName.slice(0,4).map((product, index)=>(
                    <div>  
                    <div key={index} className='border w-[] h-[250px] border-gris p-[1%] m-[3%] mt-[15%]  hover:border hover:border-primary hover:shadow-md hover:shadow-hover'>
                    <img src={getProductImage(product.product)} alt="" className='w-[70%] gap-[20px]  ' />
                      <h3 className='text-[13px] ml-[10px] text-hover'>{product.product}</h3>
                    <p className='flex gap-10 ml-[16px] text-[14px] font-medium'>2000Fcf
                    <Icon icon="solar:cart-3-outline"   className='text-[30px] ml-[10%]  rounded-[80%] border cursor-pointer border-gris p-1 shadow-lg shadow-gris hover:bg-primary hover:text-white' />
                    </p>
                    <img src={rating} alt="" className='w-[70px] ml-[14px] '/> 
                    </div>
                    <div className='flex mt-[25%] gap-[5%] '>
                    <img src={product1} alt="" />
                    <img src={product2} alt="" />
                  </div>
                  </div>
                  ))}
                  
                 </div>
              ))}
              {/* <img src={bg3} alt="" className='-mt-[20%] w-[100%] ' /> */}
              <img src={pagination} alt="" className='  w-[24%] ml-[37%] ' />
            </div>
          </section>
      <Footer/>
    </div>
  )
}

export default FruitLegume
