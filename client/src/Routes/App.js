import React from 'react';
import {createBrowserRouter} from 'react-router-dom';
import Home from '../Pages/Home';
import './App.css';
import SignUp from '../Components/Connection/SignUp'
import SignIn from '../Components/Connection/SignIn';
import FruitLegume from '../Pages/Categorie/FruitLegume.jsx';
import CatFruiLegum from '../Pages/SousCategories/CatFruiLegum.jsx';
import Panier from '../Components/Panier';
import Products from '../Pages/Products.jsx';
import Producers from '../Pages/Producers.jsx';
import PrivateRoute from '../Services/PrivateRoute.js';
import DetailProduct from '../Layouts/DetailProduct.jsx';

const router = createBrowserRouter([
  //Espace pour créer nos routes
  {path: '/',  element: <Home />},
  {path: '/products',  element: <Products />},
  {path: '/producers',  element: <Producers />},
  {path:'/inscription', element: <SignUp />},
  {path:'/detail_product/:id' , element: <DetailProduct/>} ,
  {path:'/connexion', element: <SignIn />},
  {path:'/prodc_fruitLegume', element: <FruitLegume />},
  {path:'/cat_fruitLegume', element: <CatFruiLegum />},
  {path:'/panier', element: <Panier />},

])
export default router;
