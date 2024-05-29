import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { panierAction } from '../store/PanierReducer';
import Navbar from '../Layouts/Navbar/Navbar';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import breadcrumb from '../Layouts/Assets/Imgs/Breadcrumbs.png';
import rating from '../Layouts/Assets/Imgs/Rating.png';
import Footer from '../Layouts/Footer';
import bannar from '../Layouts/Assets/Imgs/Discount Bannar.png'

const DetailsProducer = () => {
    const { id } = useParams();
    const [producer, setProducer] = useState(null);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/show-producer/${id}`);
                const productData = response.data;
                setProducer(productData);
                // fetchAllProducts(productData.productType);
                // fetchProducerAddress(productData.producer.producerName);
            } catch (err) {
                setError(err);
            }
        };
        
        fetchProduct();
    }, [id]);
    const handleAddToCart = (product) => {
        dispatch(panierAction.addItemCart(product));
    };

    if (error) return <p>Erreur lors du chargement des détails du produit</p>;
    if (!producer) return <p>Chargement...</p>;

  return (
    <div>
      <Navbar />
        <section>
          <div className="h-auto">
            <img src={breadcrumb} alt="" className="mt" />
            <div className="-mt-[4%] mb-[5%] ml-[5%] flex">
              <Link to="/" className="flex">
                <Icon
                  icon="material-symbols-light:home-outline"
                  style={{ color: "white", fontSize: "25px" }}
                />
                <Icon
                  icon="solar:alt-arrow-left-outline"
                  style={{ color: "white", fontSize: "25px" }}
                />
              </Link>
              <Link to="/">
                <p className="text-[14px] mt-[2%] text-primary">Nos producteurs</p>
              </Link>
            </div>
          </div>
        </section>
        <div className='w-[100%] h-[500vh] justify-center gap-[3%] bottom-[20%] flex '>
            <div className=' align-top sticky mb-10 top-[100px] w-[20%] p-5 ml-3 bg-soft-primary  h-[75vh] '>
               <div className=' bg-white  border border-[#80808039] w-[100%] rounded-md h-auto '>
                    <img src={producer.imageProducer} alt="" className='w-[100%] rounded-t-md  '/>
                  <h3 className='flex text-[14px] font-semibold w-[100%] ml-[0%] pl-[5%] pr-[10%] pt-[10%] '>
                  <Icon icon="ph:farm"  style={{color: '#2C742F',fontSize: '26px', marginRight:'5px'}} />
                  {producer.producerName} </h3>
                  <p className='flex text-[12px] text-main-gray  w-[100%]  ml-[0%] p-[5%]'>
                  <Icon icon="system-uicons:location"  style={{color: '#2C742F',fontSize: '26px'}} />
                    {producer.address.codePostal} {producer.address.addressRue} <br /> {producer.address.ville} </p>
                    <p className=' flex text-[12px] text-main-gray  w-[100%]  ml-[0%] pr-[5%] pl-[5%] pb-[5%]'>
                    <Icon icon="mdi:telephone-outline"  style={{color: '#2C742F',fontSize: '26px'}} />  
                    {producer.phoneNumber}
                    </p>
                    <p className=' flex text-[12px] text-main-gray  w-[100%]  ml-[0%] pr-[5%] pl-[5%] pb-[5%]'>
                    <Icon icon="material-symbols:mail-outline" style={{color: '#2C742F',fontSize: '26px', marginRight:'5px'}} />
                     {producer.email}
                    </p> 
                </div>
              </div>
              <div className='w-[70%] justify-center block bg-soft-primary h-[200vh] '>
                <div className='w-[100%] h-[90vh] bg-bg-soft  '>
                  <img src={bannar} alt=""  className='w-[100%]  '/>
                  <p className='text-white absolute text-[25px] -mt-[15%] m-5 '>Bienvenue chez <br /> <span className="text-[25px] mt-[2%] text-primary">{producer.producerName} </span></p>
                  <h2 className='m-5 font-medium text-secondary text-[20px] '>Description</h2>
                  <p className='m-5 text-[15px] pt-0 p-5 '>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum quo libero, hic enim porro omnis magni commodi temporibus labore dignissimos, aspernatur repellendus vitae nulla earum quidem? Enim animi harum repellendus?</p>
                </div>
                <div  className='w-[85%] align-top mt-[10%] ml-[7%]  p-2  mb-[5%] flex justify-center ' >
                  {producer.product.map((product, index)=>(
                    <div >
                      <div key={index} className='border h-auto justify-center bg-white  border-gris p-[3%] m-[3%] mt-[15%] hover:border hover:border-primary hover:shadow-md hover:shadow-hover'>
                    <img src={product.imageProduct} alt="" className='w-[100%] gap-[20px]  ' />
                      <h3 className='text-[13px] ml-[10px] text-hover'>{product.productName}</h3>
                    <p className='flex gap-10 ml-[16px] text-[14px] font-medium'>{product.productPrice} Fcf
                    </p>
                    <Icon icon="solar:cart-3-outline"   className='text-[35px] lg:text-[35px] sm:text-[20px] ml-[70%] -mt-[5%] rounded-[80%] border border-gris cursor-pointer p-1 shadow-lg shadow-gris hover:bg-primary hover:text-white' 
                    onClick={() => handleAddToCart(product)}
                    />
                    <img src={rating} alt="" className='w-[70px] ml-[14px] '/> 
                    </div>
                    </div>
                  ))}
                </div>
              </div>
        </div>
        <Footer/>
    </div>
  )
}

export default DetailsProducer
