import {
    useCart
}
from "../context/CartContext";



export default function Cart(){



    const {

        cartItems,

        removeFromCart,

        increaseQuantity,

        decreaseQuantity,

        clearCart,

        cartTotal


    } = useCart();





    return (

        <div>


            <h1>
                Mon panier
            </h1>





            {
            cartItems.length === 0

            ?

            (

                <p>
                    Votre panier est vide
                </p>

            )


            :

            (

                cartItems.map(item=>(


                    <div
                    key={item.id}
                    >


                        <h3>

                            {item.name}

                        </h3>



                        <p>

                            Prix :
                            {item.price}
                            FCFA

                        </p>



                        <p>

                            Quantité :
                            {item.quantity}

                        </p>





                        <button

                        onClick={()=>
                        decreaseQuantity(item.id)}

                        >

                        -

                        </button>





                        <button

                        onClick={()=>
                        increaseQuantity(item.id)}

                        >

                        +

                        </button>





                        <button

                        onClick={()=>
                        removeFromCart(item.id)}

                        >

                            Supprimer

                        </button>



                    </div>


                ))


            )

            }





            <h3>

                Total :
                {cartTotal}
                FCFA

            </h3>





            <button

            onClick={clearCart}

            >

                Vider panier

            </button>



        </div>

    );


}