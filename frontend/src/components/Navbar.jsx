import React from "react";

import {
    Link
} from "react-router-dom";


import {
    useAuth
} from "../auth/AuthProvider";



function Navbar(){


    const {
        user,
        logout
    } = useAuth();




    return (

        <nav>


            <Link to="/">
                BeautyGlow
            </Link>


            <Link to="/products">
                Produits
            </Link>


            <Link to="/categories">
                Catégories
            </Link>



            {
                !user && (

                    <>

                    <Link to="/login">
                        Connexion
                    </Link>


                    <Link to="/register">
                        Inscription
                    </Link>

                    </>

                )
            }



            {
                user && user.role==="client" && (

                    <>

                    <span>
                        Bonjour {user.username}
                    </span>


                    <Link to="/cart">
                        Panier
                    </Link>


                    <Link to="/my-orders">
                        Commandes
                    </Link>


                    <button onClick={logout}>
                        Déconnexion
                    </button>


                    </>

                )
            }




            {
                user && user.role==="admin" && (

                    <>

                    <span>
                        Admin {user.username}
                    </span>


                    <Link to="/dashboard">
                        Dashboard
                    </Link>


                    <Link to="/admin/products">
                        Produits
                    </Link>


                    <Link to="/admin/orders">
                        Commandes
                    </Link>


                    <button onClick={logout}>
                        Déconnexion
                    </button>


                    </>

                )
            }



        </nav>

    );

}


export default Navbar;