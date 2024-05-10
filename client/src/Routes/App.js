import React from 'react';
import {createBrowserRouter} from 'react-router-dom';
import Home from '../Pages/Home';
import './App.css';
import SignUp from '../Components/Connection/SignUp'
import SignIn from '../Components/Connection/SignIn';
import FruitLegume from '../Components/FruitLegume';
import CatFruiLegum from '../Components/CatFruiLegum';
import Panier from '../Components/Panier';

const router = createBrowserRouter([
  //Espace pour créer nos routes
  {path: '/',  element: <Home />},
  {path:'/inscription', element: <SignUp />},
  {path:'/connexion', element: <SignIn />},
  {path:'/prodc_fruitLegume', element: <FruitLegume />},
  {path:'/cat_fruitLegume', element: <CatFruiLegum />},
  {path:'/panier', element: <Panier />},

])
export default router;
