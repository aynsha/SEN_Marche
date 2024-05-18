import React from 'react'
// import Product from '../Components/Products/Product'
// import ProtectedRoute from '../Services/ProtectedRoute'
import SideBar from '../Layouts/SideBar'



function Home() {
    // const handleClose = () => {
    //     localStorage.removeItem("token")
    //     window.location = "/"
    // }
    // const handleClick=()=>{
    //     localStorage.removeItem("token")
    //     window.location = "/producers"
    // }
    // const token= localStorage.getItem("token");
    return (
        <div> 
         <SideBar/>
        {/* <ProtectedRoute isAuthenticated={token}>
        <Product />
        </ProtectedRoute>
            <button onClick={handleClose}>
                deconnexion
            </button>
            <button onClick={handleClick} >Nos producteurs</button> */}
        </div>
    )
}

export default Home;