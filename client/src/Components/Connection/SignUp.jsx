import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import Footer from '../../Layouts/Footer';
import Navbar from '../../Layouts/Navbar/Navbar';
import breadcrumb from '../../Layouts/Assets/Imgs/Breadcrumbs.png';
import { Icon } from '@iconify/react';

const SignUp = () => {
 
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    numberPhone:'',
    email: '',
    password: ''
  });
  const[error, setError]=useState('')

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/signup', data);
     setError(response.data);

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        // Rediriger l'utilisateur vers une page après inscription réussie
        window.location = "/";
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      setError(error.response.data.message);
    }
  };


  return (
    <div className='content-login'>
      <Navbar/>
      <div >
         <img src={breadcrumb} alt="" className=''/>
         <div className='-mt-[4%] mb-[5%] ml-[5%] flex  '>
         <Link to='/' className='flex '>
         <Icon icon="material-symbols-light:home-outline"  style={{color: 'white', fontSize:'25px'}} />
         <Icon icon="solar:alt-arrow-left-outline"  style={{color: 'white', fontSize:'25px'}} />
         </Link>
         <Link to='' className='flex '>
         <p className='text-[12px] text-white mt-[4%]'>Compte</p>
         <Icon icon="solar:alt-arrow-left-outline"  style={{color: 'white', fontSize:'25px'}} />
         </Link>
         <Link to='/inscription'>
         <p className='text-[12px]  mt-[4%] text-primary'>S'inscrire</p>
         </Link>
         </div>
       </div>
       <div className='w-[35%] m-[7%] ml-[33%]  p-[3%] bg-white shadow-lg shadow-gris rounded-md border-2 border-[#80808039] '>
      <h2 className=' text-center  text-[23px] font-semibold '>S'inscrire</h2>
      <form action="" onSubmit={handleSubmit}>
        <input type="text" className='border border-gris w-[100%] rounded-sm text-[12px] p-2 mb-5'
        name="firstName" 
        value={data.firstName} 
        id="firstName"
         placeholder='Prénom'
         onChange={handleChange} 
         required /><br/>

        <input type="text" className='border border-gris w-[100%] rounded-sm text-[12px] p-2 mb-5'
        name="lastName" 
        value={data.lastName} 
        id="lastName"
         placeholder='Nom'
         onChange={handleChange} 
         required /><br/>

        <input type="text" className='border border-gris w-[100%] rounded-sm text-[12px] p-2 mb-5'
        name="numberPhone" 
        value={data.numberPhone} 
        id="numberPhone"
         placeholder='Tél'
         onChange={handleChange}
         required /><br/>
         
        <input type="email" className='border border-gris w-[100%] rounded-sm text-[12px] p-2 mb-5'
        name="email" 
        value={data.email} 
        id="email"
         placeholder='Email'
         onChange={handleChange}
         required /><br/>

        <input type="password" className='border border-gris w-[100%] rounded-sm text-[12px] p-2 mb-5'
        name="password" 
        value={data.password} 
        id="password"
        onChange={handleChange}
         placeholder='Mot de Passe'
         required /><br/>
      <button type="submit" className='w-[100%] bg-primary rounded-full text-[15px] text-white p-2 '>S'inscrire</button>
    </form>
    {error && <p style={{ color: "#E2B633" }}>{error}</p>}
    <p className='text-[14px] m-2'>
      Dejà un compte ? 
      <Link to="/connexion"><span className='text-[14px] font-medium text-secondary m-2 '>Connectez-vous</span></Link>
    </p>
    </div>
    <Footer/>
    </div>
  )
}

export default SignUp
