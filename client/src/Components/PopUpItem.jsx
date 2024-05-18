import React from 'react';

import { useEffect, useState } from 'react';
import axios from 'axios';


const PopUpItem = ({item}) => {
    const [product, setProduct]= useState([]);
  const [error, setError]= useState(null);
    
      
     
      useEffect(()=>{
        function fetchData(){
          axios.get('http://localhost:5000/api/all-products')
          .then(response=> {setProduct(response.data);})
          .catch(err => setError(err));
        };
      fetchData();
      }, []);

  return (
    <div className='w-[100%]   flex justify-center '>
      <div className='block w-[100%] -mr-[30%] '> 
        <h3 className=' text-[10px] font-semibold w-[100%] gap-[8px] mt-[20px] '>
        {item.producerName}
        </h3> 
        <img src={item.imageProduct} alt="" className='w-[25%]'/>
    </div>
    <div className='block -ml-[30%]'>
        <p className='text-[13px] mt-[30%] text-hover'>{item.productName}</p> 
        <p className='flex  ml-[3px] text-[14px] font-medium '>  {item.productQuantity} X {item.productPrice}Fcf</p>
    </div>
    <div className='flex text-[16px] mt-[6%] ml-[15%] font-medium text-secondary'>
        <span>-</span>
        <span>{item.productQuantity} </span>
        <span>+</span>
    </div>
    <div className='block mt-[14%] -ml-[5%] text-[14px] font-medium '>
        {item.productPrice * item.productQuantity}
    </div>
    </div>
  )
}

export default PopUpItem
