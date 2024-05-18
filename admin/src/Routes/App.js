import React from 'react';
import {createBrowserRouter} from 'react-router-dom';
import Home from '../Pages/Home';
import ProtectedRoute from '../Services/ProtectedRoute';
import SignIn from '../Components/Connection/SignIn';
import Producer from '../Components/Producers/Producer';
import Upload from '../Components/Upload.jsx';
import './App.css';
import Product from '../Components/Products/Product.jsx';

const token= localStorage.getItem("token");
const router = createBrowserRouter([
  //Espace pour créer nos routes

  {path: '/producers',  element: 
  <Producer />
},
  {path: '/products',  element: 
  <Product />
},
  
  {path: '/upload',  element: 
  <Upload />
},
  {path: '/',  element: 
  <SignIn />
},
  { path: "/home/", element:
  <ProtectedRoute isAuthenticated={token}>
      <Home />
  </ProtectedRoute>
}
  
])
export default router;