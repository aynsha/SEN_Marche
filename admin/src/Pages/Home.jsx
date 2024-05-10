import React from 'react'
import Product from '../Components/Products/Product'
import ProtectedRoute from '../Services/ProtectedRoute'

function Home() {
    const handleClose = () => {
        localStorage.removeItem("token")
        window.location = "/"
    }
    const handleClick=()=>{
        localStorage.removeItem("token")
        window.location = "/producers"
    }
    const token= localStorage.getItem("token");
    return (
        <div>  
        <ProtectedRoute isAuthenticated={token}>
        <Product />
        </ProtectedRoute>
            <button onClick={handleClose}>
                deconnexion
            </button>
            <button onClick={handleClick} >Nos producteurs</button>
        </div>
    )
}

export default Home;