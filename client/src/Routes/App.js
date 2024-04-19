import React from 'react';
import {createBrowserRouter} from 'react-router-dom';
import Home from '../Pages/Home';

const router = createBrowserRouter([
  //Espace pour créer nos routes
  {path: '/',  element: <Home />},
  
])
export default router;