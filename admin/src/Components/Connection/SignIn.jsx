import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from "axios";
import Navbar from '../../Layouts/Navbar';
import breadcrumb from '../../Assets/Imgs/Breadcrumbs.png';
import { Icon } from '@iconify/react';

const SignIn = () => {
    
    const [data, setData] = useState({ email: '', password: '', role: 1});
    const [error, setError] = useState('');
    const[errorRole, setErrorRole]= useState('');

    // Vérifie l'expiration du token lors du chargement initial du composant
    useEffect(() => {
        checkTokenExpiration();
    }, []);

    // Fonction pour vérifier l'expiration du token
    const checkTokenExpiration = () => {
        const tokenExpiration = localStorage.getItem('tokenExpiration');
        if (tokenExpiration) {
            const expirationTime = parseInt(tokenExpiration);
            const currentTime = new Date().getTime();
            if (currentTime > expirationTime) {
                // Supprimer le token et déconnecter l'utilisateur
                localStorage.removeItem('token');
                localStorage.removeItem('tokenExpiration');
                localStorage.removeItem('user');
            }
        }
    };

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // const url = `${config.api_url}/signin`;
            // const { data: response } = await Instance.post(url, data);
            const {data : response} = await axios.post('http://localhost:5000/api/signin',data)
            console.log(response);
            if (response) {
                const user = response.user;

                if (user) {
                    if(user.role===1){
                    localStorage.setItem("token", response.token);
                    // localStorage.setItem("user", JSON.stringify(user));
                    // Stocker l'heure d'expiration du token
                    // const expiresIn = 86400; // 1 jour en secondes
                    // const expirationTime = new Date().getTime() + expiresIn * 1000;
                    // localStorage.setItem("tokenExpiration", expirationTime);
                    window.location = "/home";
                }  else {
                    // Afficher un message d'erreur ou rediriger vers une autre page si l'utilisateur n'a pas le rôle requis
                    setErrorRole("Vous n'avez pas la permission de vous connecter.", errorRole);
        
                }
            }
            } else {
                setError("Réponse invalide du serveur");
            }
        } catch (error) {
            console.error('Erreur lors de la connexion:', error);
            setError(error);
        }
    };
    return (
        <div>
        <Navbar/>
        <div className='mt-[5%] '>
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
         <h2 className='text-[12px]  mt-[4%] text-primary'>Se Connecter</h2>
         </Link>
         </div>
       </div>
        <div className='layout-signin'> 
            <div className='form-signin mt-[10%] w-[35%] m-[7%] ml-[33%]  p-[3%] bg-white shadow-lg shadow-gris rounded-md border-2 border-[#80808039] '>
            <h2 className=' text-center  text-[23px] font-semibold ' >Se Connecter</h2>
                <form onSubmit={handleSubmit}>
                    <div className='parent-form-input'>
                        <input
                            className='border border-gris w-[100%] rounded-sm text-[12px] p-2 mb-5'
                            type='email'
                            name='email'
                            id='email'
                            value={data.email}
                            onChange={handleChange}
                            required
                            placeholder='Email'
                        />
                    </div>
                    <div className='parent-form-input'>
                        <input
                            className='border border-gris w-[100%] rounded-sm text-[12px] p-2 mb-5'
                            type='password'
                            name='password'
                            id='password'
                            value={data.password}
                            onChange={handleChange}
                            placeholder='Mot de Passe'
                            required
                        />
                    </div>
                    <button onClick={handleSubmit} className='btn-form-connection w-[100%] bg-primary rounded-full text-[15px] text-white p-2' id='btn-signin'>
                        Se connecter
                    </button>
                </form>

                <div className='container-right-signin'>
                    <div className='card-title-signup sign-in'>
                       {/* <p id='new-user' className='text-[14px] m-2'>Vous N’avez pas de compte ? </p>
                         <Link className='btn-form-connection' to='/signup'>
                            Inscrivez-vous
                        </Link> */}
                    </div>
                </div>
            </div>
            <div>
                {error && <p style={{ color: "#E2B633" }}>{error.response.data.message}</p>}
            </div>
        </div>
        </div>
    );
}

export default SignIn
