import { useEffect, useState } from "react";
import api from "../api/axios";


function Statistics() {


    const [stats, setStats] = useState(null);


    useEffect(() => {


        api.get("/admin/statistics/")

        .then((response)=>{

            setStats(response.data);

        })

        .catch((error)=>{

            console.log(error);

        });


    }, []);




    return (

        <div className="container mt-4">


            <h2>
                Statistiques
            </h2>



            {
                stats ? (


                    <div className="row mt-4">


                        <div className="col-md-4">

                            <div className="card p-3">

                                <h5>
                                    Utilisateurs
                                </h5>

                                <h3>
                                    {stats.users || 0}
                                </h3>

                            </div>

                        </div>




                        <div className="col-md-4">

                            <div className="card p-3">

                                <h5>
                                    Produits
                                </h5>

                                <h3>
                                    {stats.products || 0}
                                </h3>

                            </div>

                        </div>





                        <div className="col-md-4">

                            <div className="card p-3">

                                <h5>
                                    Commandes
                                </h5>

                                <h3>
                                    {stats.orders || 0}
                                </h3>

                            </div>

                        </div>



                    </div>


                )


                :


                <p>
                    Chargement des statistiques...
                </p>


            }



        </div>

    );


}



export default Statistics;