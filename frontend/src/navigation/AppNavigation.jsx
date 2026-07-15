import { Routes, Route } from "react-router-dom";


// Pages
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";


// Auth
import Login from "../auth/Login";
import Register from "../auth/Register";


// Protection
import ProtectedRoute from "../auth/ProtectedRoute";
import AdminRoute from "../auth/AdminRoute";


// Produits
import Products from "../products/Products";
import ProductDetail from "../products/ProductDetail";
import AdminProducts from "../products/AdminProducts";


// Catégories
import Categories from "../categories/Categories";
import CategoryProducts from "../categories/CategoryProducts";


// Commandes
import Checkout from "../orders/Checkout";
import MyOrders from "../orders/MyOrders";
import AdminOrders from "../orders/AdminOrders";


// Admin
import Dashboard from "../admin/Dashboard";
import Users from "../admin/Users";
import Statistics from "../admin/Statistics";



function AppNavigation() {


    return (

        <Routes>


            {/* PUBLIC */}


            <Route 
                path="/" 
                element={<Home />} 
            />


            <Route 
                path="/login" 
                element={<Login />} 
            />


            <Route 
                path="/register" 
                element={<Register />} 
            />



            {/* PRODUITS */}


            <Route 
                path="/products" 
                element={<Products />} 
            />


            <Route 
                path="/products/:id" 
                element={<ProductDetail />} 
            />



            {/* CATEGORIES */}


            <Route 
                path="/categories" 
                element={<Categories />} 
            />


            <Route 
                path="/categories/:id" 
                element={<CategoryProducts />} 
            />



            {/* CLIENT */}


            <Route

                path="/cart"

                element={
                    <ProtectedRoute>
                        <Cart />
                    </ProtectedRoute>
                }

            />


            <Route

                path="/checkout"

                element={
                    <ProtectedRoute>
                        <Checkout />
                    </ProtectedRoute>
                }

            />


            <Route

                path="/my-orders"

                element={
                    <ProtectedRoute>
                        <MyOrders />
                    </ProtectedRoute>
                }

            />


            <Route

                path="/profile"

                element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                }

            />



            {/* ADMIN */}



            <Route

                path="/dashboard"

                element={
                    <AdminRoute>
                        <Dashboard />
                    </AdminRoute>
                }

            />


            <Route

                path="/admin/products"

                element={
                    <AdminRoute>
                        <AdminProducts />
                    </AdminRoute>
                }

            />


            <Route

                path="/admin/orders"

                element={
                    <AdminRoute>
                        <AdminOrders />
                    </AdminRoute>
                }

            />


            <Route

                path="/admin/users"

                element={
                    <AdminRoute>
                        <Users />
                    </AdminRoute>
                }

            />


            <Route

                path="/admin/statistics"

                element={
                    <AdminRoute>
                        <Statistics />
                    </AdminRoute>
                }

            />



            {/* 404 */}


            <Route

                path="*"

                element={<NotFound />}

            />


        </Routes>

    );

}


export default AppNavigation;