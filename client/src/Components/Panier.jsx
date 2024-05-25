import React from 'react';
import  Navbar  from '../Layouts/Navbar/Navbar';
import Footer from '../Layouts/Footer';
import { useSelector } from 'react-redux'
import PanierItem from './PanierItem';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

const Panier = () => {
  const items= useSelector(state=> state.Panier.items);
  const groupedItems = items.reduce((acc, item) => {
    
    if (!acc[item.producerName]) {
        acc[item.producerName] = {
            producerName: item.producerName,
            imageProducer: item.imageProducer,
            products: []
        };
    }
    acc[item.producerName].products.push(item);
    return acc;
}, {});

const producers = Object.values(groupedItems);
// Calculer le total des prix
const total = items.reduce((sum, item) => sum + item.productPrice * item.productQuantity, 0);

    let content = 
    <p className='w-[100%] h-[70vh] text-[30px] font-semibold text-center p-[3%] '>Panier vide</p>
    if (items.length>0) {
      content=(
        <div className='w-[100%] flex mt-[3%] ' >
        <div className=' w-[80%] p-4 block  bottom-0'>
        <h1 className='text-[30px] font-semibold text-center p-[3%] mb-[10%] '>Panier</h1>
            {producers.map((producer, item)=>(
                <PanierItem key={item._id} producer={producer}  />
            ))} 
        </div>
        <div className='w-[50%] rounded-md leading-10 mt-[18%] h-[15%] border-2 p-5 -ml-[5%] mr-[5%] border-[#E6E6E6] '>
          <h4 className="font-bold mt-3 ">Total Panier</h4>
          <h6 className="border-b-2 border-[#E6E6E6] pb-2 flex "> Subtotal: <span className='font-bold ml-[35%] ' >{total.toFixed(2)}  Fcf </span></h6>
          <h6 className="border-b-2 border-[#E6E6E6] pb-2 ">Expédition <span className=' ml-[55%] '>Free</span></h6>
          <h6>Total <span className='font-bold ml-[45%] '> {total.toFixed(2)} Fcf</span></h6>
          <button className=" p-1 pl-8 pr-8 bg-primary text-white text-[13px]  rounded-2xl ">Commander</button>
        </div>
        </div>
        )
    }
  return (
    <div>
      <Navbar/>
       {content}
      <Footer/>
    </div>
  )
}

export default Panier
