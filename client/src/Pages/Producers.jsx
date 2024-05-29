import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {Icon} from "@iconify/react";
import bg2 from '../Layouts/Assets/Imgs/bg2.png';
import bg3 from '../Layouts/Assets/Imgs/bg3.png';
import {Link} from 'react-router-dom';
import product1 from '../Layouts/Assets/Imgs/Product Image.png';
import product2 from '../Layouts/Assets/Imgs/Product Image1.png';
import rating from '../Layouts/Assets/Imgs/Rating.png';
import breadcrumb from '../Layouts/Assets/Imgs/Breadcrumbs.png';
import Navbar from '../Layouts/Navbar/Navbar';
import Footer from '../Layouts/Footer';
import pagination from '../Layouts/Assets/Imgs/Pagination.png';
import { useDispatch } from 'react-redux';
import { panierAction } from '../store/PanierReducer';


const Producer = () => {
    const dispatch= useDispatch();
    const [listProducer, setListProducer]= useState([]);
  const [error, setError]= useState(null);
  
  useEffect(()=>{
    function fetchData(){
      axios.get('http://localhost:5000/api/all-producers')
      .then(response=> {setListProducer(response.data);})
      .catch(err => setError(err));
    };
  fetchData();
  }, []);

  const handleAddToCart=(product)=>{
    dispatch(panierAction.addItemCart(product))
  }


  return (
    <div>
        <Navbar/>
      <section className='h-auto'>
      <div >
         <img src={breadcrumb} alt="" className='mt'/>
         <div className='-mt-[4%] mb-[5%] ml-[5%] flex  '>
         <Link to='/' className='flex '>
         <Icon icon="material-symbols-light:home-outline"  style={{color: 'white', fontSize:'25px'}} />
         <Icon icon="solar:alt-arrow-left-outline"  style={{color: 'white', fontSize:'25px'}} />
         </Link>
         <Link to=''>
         <p className='text-[14px]  mt-[2%] text-primary'>Nos producteurs</p>
         </Link>
         </div>
       </div>
            <img src={bg2} alt="" className='mt-[30%] ' />
            <img src={bg3} alt="" className=' w-[80%] absolute mt-[50%] ' /> 
            <div className=' block -mt-[45%] ml-[15%]  '>
              {listProducer.map(producer=>(
                 <div className='w-[85%] sm:w-[95%] lg:w-[85%]  bg-white p-2 rounded-md border-2 border-[#80808039] mb-[5%] flex shadow-lg shadow-gris'>
                  <div className='m-[2%] border border-[#80808039] w-[50%] rounded-md '>
                    <img src={producer.imageProducer} alt="" className='w-[100%] rounded-t-md  '/>
                  <h3 className='flex text-[15px] lg:text-[15px] sm:text-[12px] font-semibold w-[100%] ml-[20%] lg:ml-[20%] sm:ml-[7%] p-[3%] '>
                  {producer.producerName} </h3>
                  <p className='flex text-[15px] lg:text-[15px] sm:text-[12px] text-main-gray font-medium w-[100%]  ml-[20%] lg:ml-[20%] sm:ml-[7%] p-[2%]'>
                  <Icon icon="system-uicons:location"  style={{color: '#2C742F',fontSize: '26px'}} />
                    {producer.address.ville} </p>
                    <Link to={`/detail_producer/${producer._id}`}>
                        <button className="p-2 pl-6 pr-6 lg:p-2 lg:pl-6 lg:pr-6 sm:p-1 sm:pl-3 sm:pr-3 bg-primary text-white lg:text-[13px] sm:text-[10px] text-[13px] m-3 ml-[25%] lg:ml-[25%] sm:ml-[15%] rounded-2xl flex">Découvrir<Icon icon="formkit:arrowright"  style={{color: 'white', marginTop: '4px'}} /></button>
                    </Link>
                  </div>
                  {producer.product.map((product, index)=>(
                    <div>
                    <div key={index} className='border h-auto  border-gris p-[1%] m-[3%] mt-[15%] hover:border hover:border-primary hover:shadow-md hover:shadow-hover'>
                    <img src={product.imageProduct} alt="" className='w-[100%] gap-[20px]  ' />
                      <h3 className='text-[13px] lg:text-[13px] sm:text-[11px] ml-[10px] text-hover'>{product.productName}</h3>
                    <p className='flex gap-10 ml-[16px] text-[14px] lg:text-[14px] sm:text-[10px] font-medium'>{product.productPrice} Fcf
                    </p>
                    <Icon icon="solar:cart-3-outline"   className='text-[35px] lg:text-[35px] sm:text-[25px] ml-[70%] -mt-[5%] rounded-[80%] border border-gris cursor-pointer p-1 shadow-lg shadow-gris hover:bg-primary hover:text-white'
                    onClick={() => handleAddToCart(product)} />
                    <img src={rating} alt="" className='w-[70px] lg:w-[70px] sm:w-[50px] ml-[14px] '/> 
                    </div>
                    <div className='flex mt-[30%] gap-[5%] '>
                    <img src={product1} alt="" className='lg:w-[100%] w-[100%] sm:w-[45%] ' />
                    <img src={product2} alt="" className='lg:w-[100%] w-[100%] sm:w-[45%] ' />
                  </div>
                  </div>
                  ))}
                  
                 </div>
              ))}
            </div>
            <img src={pagination} alt="" className='  w-[24%] ml-[37%] mb-5 ' />
          </section>
          <Footer/>
    </div>
  )
}

export default Producer
