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
      <section className='h-auto'>
          <div className='mt-[10%] pl-[15%] flex '>
              <h2 className='text-[25px] lg:text-[25px] sm:text-[15px] md:text-[20px] font-semibold ' >Nos Producteurs</h2>
              <Link to='/producers' className='pl-[55%]'>
              <button className=' pt-2 lg:pt-2 sm:p-1 flex sm:text-[10px] lg:text-[17px] text-[17px] text-primary font-medium'>
                View all
              <Icon icon="formkit:arrowright"  style={{color: '#00893A', marginTop: '4px'}} />
              </button>
              </Link>
            </div>
            <img src={bg2} alt="" className='mt-[20%] ' />
            {/* <img src={bg3} alt="" className=' w-[60%] absolute mt-10 ml-[5%] ' />  */}
            <div className=' block -mt-[45%] ml-[15%]  '>
              {listProducer.slice(0,2).map(producer=>(
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
                  {producer.product.slice(0,3).map((product, index)=>(
                    <div>
                    <div key={index} className='border h-auto border-gris p-[1%] m-[3%] mt-[15%] hover:border hover:border-primary hover:shadow-md hover:shadow-hover'>
                    <img src={product.imageProduct} alt="" className='w-[100%] gap-[20px]  ' />
                      <h3 className='text-[13px] lg:text-[13px] sm:text-[11px] ml-[10px] text-hover'>{product.productName}</h3>
                    <p className='flex gap-10 ml-[16px] text-[14px] lg:text-[14px] sm:text-[10px] font-medium'>{product.productPrice} Fcf
                    </p>
                    <Icon icon="solar:cart-3-outline"   className='text-[35px] lg:text-[35px] sm:text-[25px] ml-[70%] -mt-[5%] rounded-[80%] border border-gris cursor-pointer p-1 shadow-lg shadow-gris hover:bg-primary hover:text-white' 
                    onClick={() => handleAddToCart(product)}
                    />
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
          </section>
    </div>
  )
}

export default Producer
