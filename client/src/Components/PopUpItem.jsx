import React from 'react';
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { panierAction } from '../store/PanierReducer';


const PopUpItem = ({item}) => {
  const dispatch= useDispatch();

    const [product, setProduct]= useState([]);
  const [error, setError]= useState(null);
    
  const handleRemoveItem = () => {
    dispatch(panierAction.removeItemCart(item._id));
  };

  const handleIncrementBtnClick = () => {
    dispatch(panierAction.incrementQuantity(item._id));
  };

  const handleDecrement = () => {
    dispatch(panierAction.decrementQuantity(item._id));
  };

     
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
        <img src={item.imageProduct} alt="" className='w-[20%]'/>
    </div>
    <div className='block -ml-[30%]'>
        <p className='text-[13px] mt-[30%] text-hover'>{item.productName}</p> 
        <p className='flex  ml-[3px] text-[14px] font-medium '>  {item.productQuantity} X {item.productPrice}Fcf</p>
    </div>
    <div className='flex text-[16px] mt-[6%] ml-[15%] font-medium text-secondary'>
        <span onClick={handleDecrement}>-</span>
        <span>{item.productQuantity} </span>
        <span onClick={handleIncrementBtnClick}>+</span>
    </div>
    <div className='block mt-[14%] -ml-[5%] text-[14px] font-medium '>
        {item.productPrice * item.productQuantity}
    </div>
    <div className='flex mt-[5%] p-3 text-[14px] font-medium '>
    <Icon icon="typcn:delete-outline" style={{color: '#666666', fontSize: '25px'}} 
    onClick={handleRemoveItem}/>
    </div>
    </div>
  )
}

export default PopUpItem
