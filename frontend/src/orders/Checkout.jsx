import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";
import { useCart } from "../context/CartContext";


function Checkout() {


    const {

        cart,

        cartTotal,

        clearCart

    } = useCart();



    const navigate = useNavigate();



    const [loading,setLoading] = useState(false);

    const [message,setMessage] = useState("");




    const createOrder = async()=>{


        try{


            setLoading(true);



         const orderData = {

    address: "Yaoundé",

    phone: "000000000",

    payment_method: "cash",

    total: cartTotal,


    items: cart.map((item)=>({

        product:item.id,

        quantity:item.quantity,

        price:item.price

    }))

};



           await api.post(
                "orders/create/",
                 orderData
            );


            setMessage(
                "Commande créée avec succès"
            );



            clearCart();



            setTimeout(()=>{


                navigate("/my-orders");


            },1500);



        }


        catch(error){

    console.log(
        error.response.data
    );


    setMessage(
        JSON.stringify(error.response.data)
    );

}


        finally{


            setLoading(false);


        }


    };





    return (


        <div className="container mt-5">


            <h2>

                Confirmation commande

            </h2>



            {

                message &&

                <div className="alert alert-info">

                    {message}

                </div>

            }





            <div className="card p-4">


                <h4>

                    Total :

                    {" "}

                    {cartTotal}

                    FCFA

                </h4>



                <button

                    className="btn btn-success"

                    onClick={createOrder}

                    disabled={loading}

                >


                    {

                        loading

                        ?

                        "Traitement..."

                        :

                        "Confirmer la commande"

                    }


                </button>



            </div>



        </div>


    );

}


export default Checkout;