import { Link } from "react-router-dom";

import { useAuth } from "../auth/AuthProvider";


function Dashboard() {


    const { user } = useAuth();



    return (

        <div className="container mt-5">


            <h2>

                Dashboard Admin

            </h2>


            <p className="text-muted">

                Bienvenue {user?.username}

            </p>



            <div className="row mt-4">


                <div className="col-md-3">


                    <div className="card shadow-sm">

                        <div className="card-body">


                            <h5>

                                Produits

                            </h5>


                            <p>

                                Gestion du catalogue

                            </p>


                            <Link

                                to="/admin/products"

                                className="btn btn-primary"

                            >

                                Gérer

                            </Link>


                        </div>

                    </div>


                </div>





                <div className="col-md-3">


                    <div className="card shadow-sm">

                        <div className="card-body">


                            <h5>

                                Commandes

                            </h5>


                            <p>

                                Voir les commandes

                            </p>


                            <Link

                                to="/admin/orders"

                                className="btn btn-success"

                            >

                                Gérer

                            </Link>


                        </div>

                    </div>


                </div>





                <div className="col-md-3">


                    <div className="card shadow-sm">


                        <div className="card-body">


                            <h5>

                                Utilisateurs

                            </h5>


                            <p>

                                Gestion clients

                            </p>


                            <Link

                                to="/admin/users"

                                className="btn btn-warning"

                            >

                                Gérer

                            </Link>


                        </div>


                    </div>


                </div>





                <div className="col-md-3">


                    <div className="card shadow-sm">


                        <div className="card-body">


                            <h5>

                                Statistiques

                            </h5>


                            <p>

                                Vue générale

                            </p>


                            <button

                                className="btn btn-dark"

                            >

                                Voir

                            </button>


                        </div>


                    </div>


                </div>



            </div>



        </div>

    );

}


export default Dashboard;