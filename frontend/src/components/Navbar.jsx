import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { useCart } from "../context/CartContext";


function Navbar() {

    const { user, logout } = useAuth();

    const { cartItems } = useCart();


    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

            <div className="container">


                <Link 
                    className="navbar-brand fw-bold"
                    to="/"
                >
                    BeautyGlow
                </Link>



                <div className="navbar-nav">


                    <Link 
                        className="nav-link"
                        to="/"
                    >
                        Accueil
                    </Link>



                    <Link
                        className="nav-link"
                        to="/products"
                    >
                        Produits
                    </Link>



                    <Link
                        className="nav-link"
                        to="/categories"
                    >
                        Catégories
                    </Link>



                    <Link
                        className="nav-link"
                        to="/cart"
                    >
                        Panier ({cartItems})
                    </Link>



                    {
                        user ? (

                            <>


                                <span className="nav-link text-warning">
                                    Bonjour {user.username}
                                </span>



                                {
                                    user.role === "admin" ? (

                                        <>

                                        <Link
                                            className="nav-link"
                                            to="/admin"
                                        >
                                            Dashboard
                                        </Link>


                                        <Link
                                            className="nav-link"
                                            to="/admin/products"
                                        >
                                            Gestion produits
                                        </Link>



                                        <Link
                                            className="nav-link"
                                            to="/admin/orders"
                                        >
                                            Gestion commandes
                                        </Link>



                                        <Link
                                            className="nav-link"
                                            to="/admin/users"
                                        >
                                            Utilisateurs
                                        </Link>


                                        </>


                                    )

                                    :

                                    (

                                        <>

                                        <Link
                                            className="nav-link"
                                            to="/orders"
                                        >
                                            Mes commandes
                                        </Link>


                                        <Link
                                            className="nav-link"
                                            to="/profile"
                                        >
                                            Profil
                                        </Link>


                                        </>


                                    )

                                }



                                <button
                                    className="btn btn-danger btn-sm ms-2"
                                    onClick={logout}
                                >
                                    Déconnexion
                                </button>



                            </>


                        )

                        :

                        (

                            <>


                            <Link
                                className="nav-link"
                                to="/login"
                            >
                                Connexion
                            </Link>



                            <Link
                                className="nav-link"
                                to="/register"
                            >
                                Inscription
                            </Link>


                            </>


                        )

                    }


                </div>


            </div>


        </nav>

    );

}


export default Navbar;