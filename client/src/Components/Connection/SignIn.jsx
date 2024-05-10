import React from 'react';
import { useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../Layouts/Navbar/Navbar';
import Footer from '../../Layouts/Footer';
import breadcrumb from '../../Layouts/Assets/Imgs/Breadcrumbs.png';
import { Icon } from '@iconify/react';

const SignIn = () => {
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        numberPhone:'',
        email: '',
        password: ''
      });
      const[error, setError]=useState('');

      const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
      };
      const handleSignIn = async (e) => {
            e.preventDefault();
        
            try {
              const { data: response } = await axios.post("http://localhost:5000/api/signin", data);
              console.log(response);
        
              if (response) {
                const user = response.user;
        
                if (user) {
                  localStorage.setItem("token", response.token);
                  window.location = "/";
                }
              } else {
                setError(response.data.message);
              }
            } catch (error) {
              console.error("Erreur lors de la connexion:", error);
              setError(error.response.data.message);
            }
          };
  return (
    <div>
      <Navbar/>
      <div>
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
         <Link to='/connexion'>
         <p className='text-[12px]  mt-[4%] text-primary'>Se Connecter</p>
         </Link>
         </div>
       </div>
       <div className='w-[35%] m-[7%] ml-[33%]  p-[3%] bg-white shadow-lg shadow-gris rounded-md border-2 border-[#80808039] '>
      <h2 className=' text-center  text-[23px] font-semibold ' >Se Connecter</h2>
      <form action="" onSubmit={handleSignIn}>
        <input type="email" className='border border-gris w-[100%] rounded-sm text-[12px] p-2 mb-5'
        name='email'
        value={data.email}
        id='email' 
        onChange={handleChange}
        placeholder='Email'/> <br />

       <input type="password" className='border border-gris w-[100%] rounded-sm text-[12px] p-2 mb-5'
        name="password" 
        value={data.password} 
        id="password"
        onChange={handleChange}
         placeholder='Mot de Passe'
         required /><br/>
        <Link to="#" className='update-pwd'>
         <p className='text-[14px] mb-2'>Mot de passe oublié ? </p>        
         </Link>
         < button type="submit" className='w-[100%] bg-primary rounded-full text-[15px] text-white p-2 '>Se connecter</button> <br />
      </form>
      {error && <p style={{ color: "#E2B633" }}>{error}</p>}
      <p className='text-[14px] m-2'>
       Pas encore de compte ?
      <Link to='/inscription'> <span className='text-[14px] font-medium text-secondary m-2 '> Inscrivez-vous</span></Link>.
     </p>
     </div>
     <Footer/>
    </div>
  )
}

export default SignIn

// import React from 'react';
// import { useState } from 'react';
// import {Link} from 'react-router-dom';
// import axios from 'axios';
// import Navbar from '../../Layouts/Navbar/Navbar';
// import Footer from '../../Layouts/Footer';
// import breadcrumb from '../../Layouts/Assets/Imgs/Breadcrumbs.png';
// import { Icon } from '@iconify/react';

// const SignIn = () => {
//     const [data, setData] = useState({
//         firstName: '',
//         lastName: '',
//         numberPhone:'',
//         email: '',
//         password: ''
//       });
//       const[error, setError]=useState('');

//       const handleChange = (e) => {
//         setData({ ...data, [e.target.name]: e.target.value });
//       };
//       const handleSignIn = async (e) => {
//             e.preventDefault();
        
//             try {
//               const { data: response } = await axios.post("http://localhost:5000/api/signin", data);
//               console.log(response);
        
//               if (response) {
//                 const user = response.user;
        
//                 if (user) {
//                   localStorage.setItem("token", response.token);
//                   window.location = "/";
//                 }
//               } else {
//                 setError(response.data.message);
//               }
//             } catch (error) {
//               console.error("Erreur lors de la connexion:", error);
//               setError(error.response.data.message);
//             }
//           };
//   return (
//     <div>
//       <Navbar/>
//       <div>
//         <img src={breadcrumb} alt="" className=''/>
//         <div className='-mt-[4%] mb-[5%] ml-[5%] flex  '>
//         <Link to='/' className='flex '>
//         <Icon icon="material-symbols-light:home-outline"  style={{color: 'white', fontSize:'25px'}} />
//         <Icon icon="solar:alt-arrow-left-outline"  style={{color: 'white', fontSize:'25px'}} />
//         </Link>
//         <Link to='' className='flex '>
//         <p className='text-[12px] text-white mt-[4%]'>Compte</p>
//         <Icon icon="solar:alt-arrow-left-outline"  style={{color: 'white', fontSize:'25px'}} />
//         </Link>
//         <Link to='/connexion'>
//         <p className='text-[12px]  mt-[4%] text-primary'>Se Connecter</p>
//         </Link>
//         </div>
//       </div>
//       <div className='w-[35%] m-[7%] ml-[35%]  p-[3%] bg-white shadow-lg shadow-gris rounded-md border-2 border-[#80808039] '>
//       <h2 className=' text-center  text-[23px] font-semibold '>Se Connecter</h2>
//       <form action="" onSubmit={handleSignIn}>
//         <input type="email" className='border border-gris w-[100%] rounded-sm text-[12px] p-2 mb-5'
//         name='email'
//         value={data.email}
//         id='email' 
//         onChange={handleChange}
//         placeholder='Email'/> <br />

//        <input type="password" className='border border-gris w-[100%] rounded-sm text-[12px] p-2'
//         name="password" 
//         value={data.password} 
//         id="password"
//         onChange={handleChange}
//          placeholder='Mot de Passe'
//          required /><br/>
//          <Link to="#" className='update-pwd text-[14px] m-2' >
//          Mot de passe oublié ?         
//          </Link>
//          <Link to='/'>
//         < button type="submit" >Se connecter</button> <br />
//         </Link>
//         <p>
//         Pas encore de compte ?
//          <Link to='/inscription'> Inscrivez-vous</Link>.
//         </p>
        
//       </form>
//       </div>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       <Footer/>
//     </div>
//   )
// }

// export default SignIn