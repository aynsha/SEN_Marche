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

    let content = 
    <p className='w-[100%] h-[70vh] text-[30px] font-semibold text-center p-[3%] '>Panier vide</p>
    if (items.length>0) {
      content=(
        <div className=' w-[80%] p-4 block  bottom-0'>
          <h1 className='text-[30px] font-semibold text-center p-[3%] mb-[5%] '>Panier</h1>
            {producers.map((producer, index)=>(
                <PanierItem key={index} producer={producer} />
            ))}
            
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
