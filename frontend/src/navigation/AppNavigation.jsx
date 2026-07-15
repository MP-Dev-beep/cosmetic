import React from "react";


import {
    Routes,
    Route
} from "react-router-dom";


import Navbar from "../components/Navbar";


import Home from "../pages/Home";

import Cart from "../pages/Cart";


import Login from "../auth/Login";

import Register from "../auth/Register";


import ProductList from "../products/ProductList";

import ProductDetail from "../products/ProductDetail";


import MyOrders from "../orders/MyOrders";


import Dashboard from "../pages/Dashboard";


import useAuth from "./ProtectedRoute";
import useAuth from "./AdminRoute";




function AppNavigation(){


return (

<>


<Navbar/>


<Routes>


<Route 
path="/"
element={<Home/>}
/>


<Route
path="/login"
element={<Login/>}
/>


<Route
path="/register"
element={<Register/>}
/>


<Route
path="/products"
element={<ProductList/>}
/>


<Route
path="/products/:id"
element={<ProductDetail/>}
/>





<Route
path="/cart"
element={
<ProtectedRoute>

<Cart/>

</ProtectedRoute>
}
/>





<Route
path="/my-orders"
element={
<ProtectedRoute>

<MyOrders/>

</ProtectedRoute>
}
/>






<Route
path="/dashboard"
element={
<AdminRoute>

<Dashboard/>

</AdminRoute>
}
/>





</Routes>


</>

);


}


export default AppNavigation;