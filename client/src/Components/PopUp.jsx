import React from 'react'
import { useSelector } from 'react-redux'
import PopUpItem from './PopUpItem';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';


const PopUp = () => {
    const items= useSelector(state=> state.Panier.items);

    let content = <p className='relative z-[1000%] overflow-auto w-[450%] p-4 block bg-white top-8 right-0 h-[85vh] -ml-[250%] bottom-0 shadow-lg shadow-gris '>
        Panier vide</p>
    if (items.length>0) {
      content=(
        <div className='relative z-[1000%] overflow-auto w-[170%] p-4 block bg-white top-8 right-0 h-[85vh] -ml-[120%] bottom-0 shadow-lg shadow-gris '>
            {items.map((item)=>(
                <PopUpItem key={item._id} item={item} />
            ))}
            <Link to="/panier">
            <button className="p-2 pl-8 pr-8 bg-primary text-white text-[13px] ml-[25%] mt-6 rounded-2xl flex">Acceder au Panier</button>
            </Link>
        </div>
        
        )
    }
  return (
    <div >
      {/* <h2>Panier({items.length}) </h2> */}
      {content}
    </div>
  )
}

export default PopUp
