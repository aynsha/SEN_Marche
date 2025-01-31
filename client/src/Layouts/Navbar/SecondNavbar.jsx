import React from 'react';
import  { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import legumes from '../Assets/Imgs/legume.png';
import charcuterie from '../Assets/Imgs/charcuteries.png';
import epicerie from '../Assets/Imgs/epices.png';
import poisson from '../Assets/Imgs/poisson.png';
import axios from 'axios';

const SecondNavbar = () => {
   const [showSubcategories, setShowSubcategories] = useState(null);
   const [product, setProduct]= useState([]);
   const [error, setError]= useState(null); 
   // Fetch data from the API
  useEffect(()=>{
    function fetchData(){
      axios.get('http://localhost:5000/api/all-products')
      .then(response=> {setProduct(response.data);})
      .catch(err => setError(err));
    };
  fetchData();
  }, []);
    
  return (
    <div>
      <div id="navbar-category" className='  flex mt-24 left-0 right-0 w-auto bg-bg-gray  items-center justify-center h-11 pt-6 pb-[25px] ' >
      <div
                    className={`cat-legumes border-r-2 border-white w-36 lg:w-36 sm:w-28 md:w-32 xl:w-40  z-50 relative ${showSubcategories==='legumes' ? 'active' : ''}`}
                    onMouseEnter={() => setShowSubcategories('legumes')}
                    onMouseLeave={() => setShowSubcategories(null)}
                >
                    <Link to="/producers">
                        <img src={legumes} alt="" className=' w-9 ml-12' />
                        <p className=' text-xs ml-8 text-white'>Fruit&Légumes</p>
                    </Link>
                    {showSubcategories=== 'legumes' && (
                        <div className='absolute top-full w-[800%] ml-[30%] p-4 h-[815%] z-50 border-t-4 border-secondary   left-0 right-0 bg-soft-primary'>
                            <Link to='/products?productType=Fruits'><h3 className='text-[16px] font-semibold '>Fruits</h3></Link>
                            <Link to="/products?productName=Pom">
                              <p className=' hover:decoration-solid hover:text-[15px] ml-4'>Pomme</p>
                              </Link>
                            <Link to="/products?productName=Mangue"><p className=' hover:decoration-solid hover:text-[15px] ml-4'>Mangue</p></Link>
                            <Link to='/products?productType=Légumes'>
                            <h3 className='text-[16px] font-semibold '>Légumes</h3>
                            </Link>
                            <Link to="/products?productName=joux"><p className=' hover:decoration-solid hover:text-[15px] ml-4'>Joux</p></Link>
                            <Link to="/products?productName=obergine"><p className=' hover:decoration-solid hover:text-[15px] ml-4'>Obergine</p></Link>
                            
                        </div>
                    )}
                </div>
        <div 
        className={`cat-charcut border-r-2 border-white w-36 z-50 relative ${showSubcategories==='charcuterie' ? 'active' : ''}`}
        onMouseEnter={() => setShowSubcategories('charcuterie')}
        onMouseLeave={() => setShowSubcategories(null)}
        >
          
          <Link>
          <img src={charcuterie} alt="" className=' w-9 ml-12 '/>
          <p className=' text-xs ml-10 text-white'>Charcuterie</p>
          </Link>
          {showSubcategories=== 'charcuterie' && (
                        <div className='absolute top-full w-[800%] -ml-[45%] p-4 h-[815%] z-50 border-t-4 border-secondary   left-0 right-0 bg-soft-primary'>
                            <Link to=""><p>Viande Boeuf</p></Link>
                            <Link to=""><p>Poulet</p></Link>
                            <Link to=""><p>Viande Mouton</p></Link>
                            <Link to=""><p>Viande Chévre</p></Link>
                            
                        </div>
          )}
        </div>
        <div 
        className={`cat-poisson border-r-2 border-white w-36 z-50 relative ${showSubcategories==='poisson' ? 'active' : ''}`}
        onMouseEnter={() => setShowSubcategories('poisson')}
        onMouseLeave={() => setShowSubcategories(null)}
        >
          <Link>
          <img src={poisson} alt="" className=' w-9 ml-12 '/>
          <p className=' text-xs ml-10 text-white'>Poisonnerie</p>
          </Link>
          {showSubcategories=== 'poisson' && (
          <div className='absolute top-full w-[800%] -ml-[150%] p-4 h-[815%] z-50 border-t-4 border-secondary   left-0 right-0 bg-soft-primary'>
              <Link to=""><p>Viande Boeuf</p></Link>
              <Link to=""><p>Poulet</p></Link>
              <Link to=""><p>Viande Mouton</p></Link>
              <Link to=""><p>Viande Chévre</p></Link>
              
          </div>
          )}
        </div>
        <div 
        className={`cat-epic border-r-2 border-white w-36 z-50 relative ${showSubcategories==='epicerie' ? 'active' : ''}`}
        onMouseEnter={() => setShowSubcategories('epicerie')}
        onMouseLeave={() => setShowSubcategories(null)}
        >
          <Link>
          <img src={epicerie} alt="" className=' w-9 ml-12 '/>
          <p className=' text-xs ml-10 text-white'>Epicerie</p>
          </Link>
          {showSubcategories=== 'epicerie' && (
          <div className='absolute top-full w-[800%] -ml-[250%] p-4 h-[815%] z-50 border-t-4 border-secondary   left-0 right-0 bg-soft-primary'>
              <Link to=""><p>Viande Boeuf</p></Link>
              <Link to=""><p>Poulet</p></Link>
              <Link to=""><p>Viande Mouton</p></Link>
              <Link to=""><p>Viande Chévre</p></Link>
              
          </div>
          )}
        </div>
        <div
                    className={`cat-legumes border-r-2 border-white w-36 z-50 relative ${showSubcategories==='legum' ? 'active' : ''}`}
                    onMouseEnter={() => setShowSubcategories('legum')}
                    onMouseLeave={() => setShowSubcategories(null)}
                >
                    <Link to="/prodc_fruitLegume">
                        <img src={legumes} alt="" className=' w-9 ml-12' />
                        <p className=' text-xs ml-8 text-white'>Fruit&Légumes</p>
                    </Link>
                    {showSubcategories=== 'legum' && (
                        <div className='absolute top-full w-[800%] -ml-[350%] p-4 h-[815%] z-50 border-t-4 border-secondary   left-0 right-0 bg-soft-primary'>
                            <Link to=""><p>Pomme</p></Link>
                            <Link to=""><p>Mangue</p></Link>
                            <Link to=""><p>Joux</p></Link>
                            <Link to=""><p>Obergine</p></Link>
                            
                        </div>
                    )}
                </div>
                <div 
        className={`cat-charcut border-r-2 border-white w-36 z-50 relative ${showSubcategories==='charcute' ? 'active' : ''}`}
        onMouseEnter={() => setShowSubcategories('charcute')}
        onMouseLeave={() => setShowSubcategories(null)}
        >
          
          <Link>
          <img src={charcuterie} alt="" className=' w-9 ml-12 '/>
          <p className=' text-xs ml-10 text-white'>Charcuterie</p>
          </Link>
          {showSubcategories=== 'charcute' && (
                        <div className='absolute top-full w-[800%] -ml-[450%] p-4 h-[815%] z-50 border-t-4 border-secondary   left-0 right-0 bg-soft-primary'>
                            <Link to=""><p>Viande Boeuf</p></Link>
                            <Link to=""><p>Poulet</p></Link>
                            <Link to=""><p>Viande Mouton</p></Link>
                            <Link to=""><p>Viande Chévre</p></Link>
                            
                        </div>
          )}
        </div>
        <div 
        className={`cat-poisson border-r-2 border-white w-36 z-50 relative ${showSubcategories==='poiss' ? 'active' : ''}`}
        onMouseEnter={() => setShowSubcategories('poiss')}
        onMouseLeave={() => setShowSubcategories(null)}
        >
          <Link>
          <img src={poisson} alt="" className=' w-9 ml-12 '/>
          <p className=' text-xs ml-10 text-white'>Poisonnerie</p>
          </Link>
          {showSubcategories=== 'poiss' && (
          <div className='absolute top-full w-[800%] -ml-[550%] p-4 h-[815%] z-50 border-t-4 border-secondary   left-0 right-0 bg-soft-primary'>
              <Link to=""><p>Viande Boeuf</p></Link>
              <Link to=""><p>Poulet</p></Link>
              <Link to=""><p>Viande Mouton</p></Link>
              <Link to=""><p>Viande Chévre</p></Link>
              
          </div>
          )}
        </div>
        <div 
        className={`cat-epic border-r-2 border-white w-36 z-50 relative ${showSubcategories==='epicer' ? 'active' : ''}`}
        onMouseEnter={() => setShowSubcategories('epicer')}
        onMouseLeave={() => setShowSubcategories(null)}
        >
          <Link>
          <img src={epicerie} alt="" className=' w-9 ml-12 '/>
          <p className=' text-xs ml-10 text-white'>Epicerie</p>
          </Link>
          {showSubcategories=== 'epicer' && (
          <div className='absolute top-full w-[800%] -ml-[650%] p-4 h-[815%] z-50 border-t-4 border-secondary   left-0 right-0 bg-soft-primary'>
              <Link to=""><p>Viande Boeuf</p></Link>
              <Link to=""><p>Poulet</p></Link>
              <Link to=""><p>Viande Mouton</p></Link>
              <Link to=""><p>Viande Chévre</p></Link>
              
          </div>
          )}
        </div>
        <div
                    className={`cat-legumes  w-36 z-50 relative ${showSubcategories==='legums' ? 'active' : ''}`}
                    onMouseEnter={() => setShowSubcategories('legums')}
                    onMouseLeave={() => setShowSubcategories(null)}
                >
                    <Link to="/prodc_fruitLegume">
                        <img src={legumes} alt="" className=' w-9 ml-12' />
                        <p className=' text-xs ml-8 text-white'>Fruit&Légumes</p>
                    </Link>
                    {showSubcategories=== 'legums' && (
                        <div className='absolute top-full w-[800%] -ml-[750%] p-4 h-[815%] z-50 border-t-4 border-secondary   left-0 right-0 bg-soft-primary'>
                            <Link to=""><p>Pomme</p></Link>
                            <Link to=""><p>Mangue</p></Link>
                            <Link to=""><p>Joux</p></Link>
                            <Link to=""><p>Obergine</p></Link>
                            
                        </div>
                    )}
                </div>
      </div>
    </div>
  )
}

export default SecondNavbar
