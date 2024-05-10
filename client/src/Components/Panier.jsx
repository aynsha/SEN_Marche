import React from 'react';
import  Navbar  from '../Layouts/Navbar/Navbar';
import Footer from '../Layouts/Footer';
import { useSelector } from 'react-redux'
import PanierItem from './PanierItem';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

const Panier = () => {
  const items= useSelector(state=> state.Panier.items);


    let content = 
    <p>Panier vide</p>
    if (items.length>0) {
      content=(
        <div className=' w-[80%] p-4 block  bottom-0'>
          <h1 className='text-[30px] font-semibold text-center p-[3%] mb-[5%] '>Panier</h1>
            {items.map((item)=>(
                <PanierItem key={item._id} item={item} />
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
