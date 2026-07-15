import { useEffect, useState } from "react";

import api from "../api/axios";


function MyOrders(){


    const [orders,setOrders] = useState([]);

    const [loading,setLoading] = useState(true);



    useEffect(()=>{

        getOrders();

    },[]);




    const getOrders = async()=>{


        try{

            const response = await api.get(
            "orders/"
            );


            setOrders(response.data);


        }


        catch(error){


            console.log(error);


        }


        finally{


            setLoading(false);


        }


    };





    if(loading){


        return (

            <div className="container mt-5">

                Chargement...

            </div>

        );

    }




    return (


        <div className="container mt-5">


            <h2>

                Mes commandes

            </h2>




            {

                orders.length === 0

                ?

                <p>

                    Aucune commande.

                </p>


                :


                orders.map((order)=>(


                    <div

                        className="card mb-3"

                        key={order.id}

                    >


                        <div className="card-body">


                            <h5>

                                Commande #{order.id}

                            </h5>



                            <p>

                                Date :

                                {" "}

                                {order.date}

                            </p>



                            <p>

                                Total :

                                {" "}

                                {order.total}

                                FCFA

                            </p>



                            <p>

                                Statut :

                                {" "}

                                {order.status}

                            </p>


                        </div>


                    </div>


                ))

            }



        </div>


    );


}


export default MyOrders;