import { useEffect, useState } from 'react';
import axios from 'axios';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { panierAction } from '../store/PanierReducer';

const PanierItem = ({ producer, item }) => {
  const dispatch= useDispatch();
    const [productData, setProductData] = useState([]);
    const [error, setError] = useState(null);
    let total = 0;

    useEffect(() => {
        function fetchData() {
            axios.get('http://localhost:5000/api/all-products')
                .then(response => { setProductData(response.data); })
                .catch(err => setError(err));
        };
        fetchData();
    }, []);

    const handleRemoveItem = (id) => {
      dispatch(panierAction.removeItemCart({ _id: id }));
    };
    const handleIncrementBtnClick= (id)=>{
      dispatch(panierAction.incrementQuantity({ _id: id }))
     }
     const handleDecrement = (id) => {
      dispatch(panierAction.decrementQuantity({ _id: id }));
    };

    return (
      <div className="w-[100%] flex">
        <div className="w-[65%] flex justify-center ml-[15%]">
          <div className="-mt-[9%] flex w-[100%]">
            <img
              src={producer.imageProducer}
              alt=""
              className="rounded-[80%] w-[30%] h-[70px] border-2 border-secondary"
            />
            <div className="w-[100%] h-10 ml-5">
              <h3 className="p-2 w-40 pl-[4%] text-center bg-primary text-white text-[13px] rounded-md flex">
                {producer.producerName}
              </h3>
            </div>
            <div className="w-[62px] h-[52%] border-l-2 border-b-2 -ml-[125%] border-secondary mt-[28%]">
              <Icon
                icon="material-symbols:circle"
                className="text-secondary mt-[220%] -ml-[15%]"
              />
            </div>
          </div>
          <table className="border-2  border-[#E6E6E6] mb-[15%] mt-[5%] -ml-[27%] w-[80%]">
            <thead>
              <tr className="border-2 border-[#E6E6E6]">
                <th className="text-justify text-[15px] text-main-gray p-3">
                  Product
                </th>
                <th className="text-justify text-[15px] text-main-gray pr-[100px]">
                  Prix
                </th>
                <th className="text-justify text-[15px] text-main-gray pr-[100px]">
                  Quantité
                </th>
                <th className="text-justify text-[15px] text-main-gray pr-[px]">
                  Sous total
                </th>
              </tr>
            </thead>
            <tbody>
              {producer.products.map((product, index) => {
                total += product.productPrice * product.productQuantity;
                return(<tr key={index}>
                  <td className="w-[100%] p-5">
                    <img
                      src={product.imageProduct}
                      alt=""
                      className="w-[55%] h-[55%]"
                    />
                    <p className="text-[13px] text-hover">
                      {product.productName}
                    </p>
                  </td>
                  <td className="text-[15px] p-5 font-medium">
                    {product.productPrice}Fcf
                  </td>
                  <td className="text-[15px] p-5 font-medium">
                    <span onClick={() => handleDecrement(product._id)} className=' cursor-pointer'>-</span>
                    <span>{product.productQuantity} </span>
                    <span onClick={() => handleIncrementBtnClick(product._id)} className=' cursor-pointer' >+</span>
                  </td>
                  <td className="text-[15px] p-5 font-medium">
                    {product.productPrice * product.productQuantity}Fcf
                  </td>
                  <td className="text-[15px] p-5 font-medium">
                  <Icon icon="typcn:delete-outline"  style={{color: '#666666', fontSize: '25px', cursor:'pointer'}}
                  onClick={() => handleRemoveItem(product._id)}/>
                  </td>
                </tr>)
            })}
            </tbody>
            <thead>
              <tr className="border-2 border-[#E6E6E6]  ">
                <th className=" text-[15px] text-main-gray p-3 ">
                  <Link to='/'>
                  <button className=" h-[30%] p-1 pl-8 pr-8 bg-primary text-white text-[13px] border-none  rounded-2xl ">
                    Retourner
                  </button>
                  </Link>
                </th>
              </tr>
              <th>
                <button className=" flex w-[300%] m-3  p-2 pl-[55%]  h-[15%] bg-secondary text-white text-[15px] font-semibold  rounded-sm ">
                  Total {producer.producerName} <p className='ml-[30%] text-[15px] font-semibold'>{total}  Fcf</p> 
                </button>
              </th>
            </thead>
          </table>
        </div>
      </div>
    );
}

export default PanierItem;
