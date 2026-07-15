import {
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";


import api from "../api/axios";


import {
    useCart
}
from "../context/CartContext";



export default function Checkout(){


    const navigate = useNavigate();


    const {

        cartItems,

        clearCart

    } = useCart();




    const [form,setForm] = useState({

        address:"",

        phone:"",

        payment_method:"cash"

    });



    const [loading,setLoading] = useState(false);





    const handleChange = (e)=>{


        setForm({

            ...form,

            [e.target.name]:
            e.target.value

        });


    };







    const handleSubmit = async(e)=>{


        e.preventDefault();



        setLoading(true);



        try{


            const orderData = {


                ...form,


                items:

                cartItems.map(item=>({


                    product:item.id,


                    quantity:item.quantity


                }))


            };





            await api.post(

                "/orders/create/",

                orderData

            );





            clearCart();



            navigate(
                "/my-orders"
            );



        }

        catch(error){


            console.log(
                error.response?.data
            );


            alert(
                "Erreur lors de la création de la commande"
            );


        }


        finally{


            setLoading(false);


        }



    };







    return (

        <div>


            <h1>
                Finaliser la commande
            </h1>





            <form
            onSubmit={handleSubmit}
            >



                <input

                type="text"

                name="address"

                placeholder="Adresse"

                value={form.address}

                onChange={handleChange}

                required

                />





                <input

                type="text"

                name="phone"

                placeholder="Téléphone"

                value={form.phone}

                onChange={handleChange}

                required

                />







                <select

                name="payment_method"

                value={
                    form.payment_method
                }

                onChange={handleChange}

                >


                    <option value="cash">

                        Paiement à la livraison

                    </option>



                    <option value="mobile_money">

                        Mobile Money

                    </option>



                    <option value="card">

                        Carte bancaire

                    </option>



                    <option value="paypal">

                        PayPal

                    </option>


                </select>







                <button

                type="submit"

                disabled={loading}

                >

                {
                loading
                ?
                "Création..."
                :
                "Commander"
                }


                </button>




            </form>


        </div>

    );

}