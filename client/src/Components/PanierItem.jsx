import p1 from '../Layouts/Assets/Imgs/p1.png';
import p2 from '../Layouts/Assets/Imgs/p2.png';
import p3 from '../Layouts/Assets/Imgs/p3.png';
import p4 from '../Layouts/Assets/Imgs/p4.png';
import p5 from '../Layouts/Assets/Imgs/p5.png';
import p6 from '../Layouts/Assets/Imgs/p6.png';
import p7 from '../Layouts/Assets/Imgs/p7.png';
import p8 from '../Layouts/Assets/Imgs/p8.png';
import p9 from '../Layouts/Assets/Imgs/p9.png'
import { useEffect, useState } from 'react';
import axios from 'axios';
import avatarUn from '../Layouts/Assets/Imgs/avatar1-2.jpg';
import avatarD from '../Layouts/Assets/Imgs/avatar2.jpg';
import avatar3 from '../Layouts/Assets/Imgs/avatar3.jpg';
import { Icon } from '@iconify/react';

const PanierItem = ({item}) => {
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
        { image: avatar3, productName: 'Pomme de terre' },
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
        { image: p9, productName: 'Pomme de terre' },
      ]);

    const getProductImage = (productName) => {
        const productImage = productImages.find((item) => item.productName === productName);
        return productImage ? productImage.image : null;
      };
      const getAvatar = (productName) => {
        const avatars = avatar.find((item) => item.productName === productName);
        return avatars ? avatars.image : null;
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
    <div className=' w-[100%] flex '>
    <div className="w-[65%] flex justify-center ml-[5%] ">
        <div className='-mt-[5%] flex w-[100%] '>
        <img
          src={getAvatar(item.productName)}
          alt=""
          className="rounded-[80%] w-[10%] h-[65px]   border-2 border-secondary "
        />
        <div className='w-[100%] h-10 ml-5 '>
        <h3 className=" p-2 w-40 pl-[4%] text-center bg-primary text-white text-[13px] rounded-md flex">
        {item.producerName}</h3>
        </div>
        <div className='w-[46px] h-[30%]  border-l-2 border-b-2 -ml-[108%] border-secondary  mt-[10%] '>
          <Icon icon="material-symbols:circle"  className=' text-secondary mt-[80%] -ml-[20%] ' />
          </div>
      
      </div>
      <table className='border-2  border-gris mb-[15%] mt-[5%] -ml-[88%] w-[80%] '>
    <thead className=''>
    <tr className='border-2 border-gris  '>
      <th className=' text-justify text-[15px] text-main-gray p-3  '>Product</th>
      <th className=' text-justify text-[15px] text-main-gray pr-[100px] '>Prix</th>
      <th className=' text-justify text-[15px] text-main-gray pr-[100px]'>Quantité</th>
      <th className=' text-justify text-[15px] text-main-gray pr-[px]'>Sous total</th>
    </tr>
  </thead>
  <tbody className=' '>
  <tr className=' ' >
        <td className=' w-[100%] p-5 '>
          <img
            src={getProductImage(item.productName)}
            alt=""
            className="w-[55%] h-[55%]"
          />
          
          <p className="text-[13px] text-hover">{item.productName}</p>
        </td>
        <td className="text-[15px] p-5 font-medium">{item.productPrice}Fcf</td>
        <td className="text-[15px] p-5 font-medium">
          <span>-</span>
          <span>{item.productQuantity} </span>
          <span>+</span>
        </td>
        <td className="text-[15px] p-5 font-medium">
          {item.productPrice * item.productQuantity}Fcf
        </td>
      </tr>
  </tbody>
  <thead>
    <tr className='border-2 border-gris  '>
    <th className=' text-justify text-[15px] text-main-gray p-3  '>
        <button className="p-2 pl-8 pr-8 bg-primary text-white text-[13px]  rounded-2xl flex" >Retourner</button>
    </th>
    </tr>
  </thead>
  </table>

  </div>
    </div>
  );
}

export default PanierItem