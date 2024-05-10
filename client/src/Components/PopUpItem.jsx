import React from 'react';
import p1 from '../Layouts/Assets/Imgs/p1.png';
import p2 from '../Layouts/Assets/Imgs/p2.png';
import p3 from '../Layouts/Assets/Imgs/p3.png';
import p4 from '../Layouts/Assets/Imgs/p4.png';
import p5 from '../Layouts/Assets/Imgs/p5.png';
import p6 from '../Layouts/Assets/Imgs/p6.png';
import p7 from '../Layouts/Assets/Imgs/p7.png';
import p8 from '../Layouts/Assets/Imgs/p8.png';
import p9 from '../Layouts/Assets/Imgs/p9.png'; 
import { useEffect, useState } from 'react';
import axios from 'axios';


const PopUpItem = ({item}) => {
    const [product, setProduct]= useState([]);
  const [error, setError]= useState(null);
    
      const [productImages, setProductImages] = useState([
        { image: p7, productName: 'Tomates' },
        { image: p5, productName: 'Obergine' },
        { image: p6, productName: 'Mangues' },
        { image: p3, productName: 'Poivron' },
        { image: p4, productName: 'Haricots' },
        { image: p2, productName: 'Salade' },
        { image: p8, productName: 'Joux' },
        { image: p1, productName: 'Pomme' },
        { image: p9, productName: 'Pomme de terre' },
      ]);

    const getProductImage = (productName) => {
        const productImage = productImages.find((item) => item.productName === productName);
        return productImage ? productImage.image : null;
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
        <img src={getProductImage(item.productName)} alt="" className='w-[25%]'/>
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
