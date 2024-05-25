import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { panierAction } from '../store/PanierReducer';
import Navbar from './Navbar/Navbar';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import breadcrumb from '../Layouts/Assets/Imgs/Breadcrumbs.png';
import rating from '../Layouts/Assets/Imgs/Rating.png';
import Footer from './Footer';

const DetailProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [producerAddress, setProducerAddress] = useState('');
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/show-product/${id}`);
                const productData = response.data;
                setProduct(productData);
                fetchAllProducts(productData.productType);
                fetchProducerAddress(productData.producer.producerName);
            } catch (err) {
                setError(err);
            }
        };

        const fetchAllProducts = async (productType) => {
            try {
                const response = await axios.get('http://localhost:5000/api/all-products');
                const allProducts = response.data;
                filterSimilarProducts(allProducts, productType);
            } catch (err) {
                setError(err);
            }
        };

        const fetchProducerAddress = async (producerName) => {
            try {
                const response = await axios.get('http://localhost:5000/api/all-producers');
                const producers = response.data;
                const producer = producers.find(p => p.producerName === producerName);
                if (producer) {
                    setProducerAddress(producer.address.ville);
                }
            } catch (err) {
                setError(err);
            }
        };

        const filterSimilarProducts = (products, productType) => {
            const filteredProducts = products.filter(p => p.productType === productType && p.id !== id);
            setSimilarProducts(filteredProducts);
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = (product) => {
        dispatch(panierAction.addItemCart(product));
    };

    if (error) return <p>Erreur lors du chargement des détails du produit</p>;
    if (!product) return <p>Chargement...</p>;

    return (
        <div>
            <Navbar/>
            <section>
                <div className='h-auto'>
                    <img src={breadcrumb} alt="" className='mt'/>
                    <div className='-mt-[4%] mb-[5%] ml-[5%] flex'>
                        <Link to='/' className='flex'>
                            <Icon icon="material-symbols-light:home-outline" style={{color: 'white', fontSize:'25px'}} />
                            <Icon icon="solar:alt-arrow-left-outline" style={{color: 'white', fontSize:'25px'}} />
                        </Link>
                        <Link to='/'>
                            <p className='text-[14px] mt-[2%] text-primary'>Nos produits</p>
                        </Link>
                    </div>
                </div>
            </section>
            <div className='w-[100%] flex'>
                <div className='w-[40%] float-left h-[80vh] flex shadow-lg justify-center ml-20 shadow-gris border border-soft-primary'>
                    <img src={product.imageProduct} alt={product.productName} />
                </div>
                <div className='w-[70%] block '>
                    <div className='mr-[45%] float-right h-[40vh] block justify-center border border-[#80808039] w-[20%] rounded-md'>
                    <img src={product.producer.imageProducer} alt={product.producer.producerName} className='w-[100%]  rounded-t-md'/>
                    <h3 className='flex text-[10px] font-semibold w-[100%] ml-[15%] p-[3%]'>
                        {product.producer.producerName}
                    </h3>
                    <p className='flex text-[10px] text-main-gray font-medium w-[100%] ml-[20%] p-[2%]'>
                        <Icon icon="system-uicons:location" style={{color: '#2C742F', fontSize: '15px'}} />
                        {producerAddress}
                    </p>
                    {/* <Link to="">
                        <button className="p-1 pl-2 pr-2 bg-primary text-white text-[7px] m-3 ml-[25%] rounded-2xl flex">
                            Découvrir
                            <Icon icon="formkit:arrowright" style={{color: 'white', marginTop: '2px'}} />
                        </button>
                    </Link> */}
                    <img src={rating} alt="rating" className='w-[55px] ml-[25px] mt-2 ' />
                    </div>
                    <div>
                    <h2>{product.productName} </h2>
                    </div>
                </div>
                
            </div>
            <div>
                <h2 className='text-[25px] text-center font-semibold mt-[10%]'>Produits Similaires</h2>
                <div className='w-[70%] shadow-lg shadow-gris grid gap-[0px] grid-cols-4 justify-center bg-white ml-[15%] mb-10 mt-[5%] rounded-md border-2 border-[#80808039]'>
                    {similarProducts.slice(0, 4).map(similarProduct => (
                        <div key={similarProduct.id} className='border border-gris p-[5%] hover:border hover:border-primary hover:shadow-md hover:shadow-hover'>
                            <Link to={`/detail_product/${product._id}`} >
                            <img src={similarProduct.imageProduct} alt={similarProduct.productName} />
                            <h3 className='flex text-[14px] font-semibold w-[100%] gap-[8px] mt-[25px]'>
                                <Icon icon="system-uicons:location" style={{color: '#2C742F', fontSize: '29px'}} />
                                {similarProduct.producer.producerName}
                                <img src={similarProduct.producer.imageProducer} alt={similarProduct.producer.producerName} className='rounded-[80%] w-[30%] h-[55px] border-2 border-secondary'/>
                            </h3>
                            <p className='text-[13px] ml-[10px] text-hover'>{similarProduct.productName}</p>
                            <p className='flex gap-20 ml-[16px] text-[14px] font-medium'>
                                {similarProduct.productPrice}Fcf
                                <Icon icon="solar:cart-3-outline" className='text-[35px] rounded-[80%] border border-gris cursor-pointer p-1 shadow-lg shadow-gris hover:bg-primary hover:text-white' 
                                    onClick={() => handleAddToCart(similarProduct)}
                                />
                            </p>
                            <img src={rating} alt="rating" className='w-[70px] ml-[14px]' />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default DetailProduct;
