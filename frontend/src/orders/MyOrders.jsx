import { useEffect, useState } from "react";

import api from "../api/axios";


function MyOrders(){


    const [orders,setOrders] = useState([]);

    const [loading,setLoading] = useState(true);



    useEffect(()=>{


        api.get("/orders/my-orders/")

        .then(res=>{


            setOrders(res.data);


        })

        .catch(error=>{


            console.log(error);


        })

        .finally(()=>{


            setLoading(false);


        });



    },[]);





    if(loading){

        return (

            <h2>

                Chargement des commandes...

            </h2>

        );

    }





    return(


        <div className="container orders-page">



            <h1>

                Mes commandes 🛍️

            </h1>




            {

                orders.length === 0 ?

                (

                    <p>

                        Vous n'avez aucune commande.

                    </p>

                )


                :


                orders.map(order=>(



                    <div

                        className="order-card"

                        key={order.id}

                    >



                        <div className="order-header">


                            <h3>

                                Commande #{order.id}

                            </h3>


                            <span className="status">


                                {order.status}


                            </span>



                        </div>





                        <p>

                            Date :

                            {" "}

                            {order.created_at}

                        </p>





                        <hr/>





                        {

                            order.items?.map(item=>(


                                <div

                                    className="order-item"

                                    key={item.id}

                                >


                                    <p>

                                        {item.product_name}

                                        {" x "}

                                        {item.quantity}

                                    </p>


                                    <p>

                                        {item.price}

                                        FCFA

                                    </p>



                                </div>


                            ))

                        }





                        <h3>


                            Total :

                            {" "}

                            {order.total}

                            FCFA


                        </h3>



                    </div>



                ))

            }




        </div>


    );


}


export default MyOrders;