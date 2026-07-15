import React from "react";


import { BrowserRouter } from "react-router-dom";

import AppNavigation from "./navigation/AppNavigation";

import useAuth from "./auth/AuthProvider";

import { CartProvider } from "./context/CartContext";



function App(){


    return (

        <BrowserRouter>


            <AuthProvider>


                <CartProvider>


                    <AppNavigation/>


                </CartProvider>


            </AuthProvider>


        </BrowserRouter>

    );

}


export default App;