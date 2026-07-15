import { useEffect, useState } from "react";
import api from "../api/axios";


function AdminOrders() {


    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);



    useEffect(() => {


        api.get("/orders/")

        .then((response)=>{

            setOrders(response.data);

        })

        .catch((error)=>{

            console.log(error);

        })

        .finally(()=>{

            setLoading(false);

        });


    }, []);





    if(loading){

        return (

            <h3 className="text-center mt-5">
                Chargement des commandes...
            </h3>

        );

    }





    return (

        <div className="container mt-4">


            <h2>
                Gestion des commandes
            </h2>



            <table className="table table-bordered mt-4">


                <thead>

                    <tr>

                        <th>ID</th>

                        <th>Client</th>

                        <th>Total</th>

                        <th>Status</th>

                    </tr>

                </thead>



                <tbody>


                {
                    orders.map(order=>(

                        <tr key={order.id}>

                            <td>
                                {order.id}
                            </td>


                            <td>
                                {order.user}
                            </td>


                            <td>
                                {order.total} FCFA
                            </td>


                            <td>
                                {order.status}
                            </td>


                        </tr>


                    ))
                }


                </tbody>


            </table>


        </div>

    );


}



export default AdminOrders;