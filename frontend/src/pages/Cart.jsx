import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";


function Cart() {


    const {

        cart,

        removeFromCart,

        increaseQuantity,

        decreaseQuantity,

        clearCart,

        cartTotal

    } = useCart();




    if(cart.length === 0){


        return (

            <div className="container mt-5">


                <h2>
                    Votre panier est vide
                </h2>


                <Link
                    to="/products"
                    className="btn btn-primary mt-3"
                >

                    Voir les produits

                </Link>


            </div>

        );

    }




    return (


        <div className="container mt-5">


            <h2 className="mb-4">

                Mon panier

            </h2>




            {

                cart.map((item)=>(


                    <div

                        key={item.id}

                        className="card mb-3"

                    >


                        <div className="card-body">


                            <div className="row align-items-center">



                                <div className="col-md-3">


                                    {

                                        item.image &&

                                        <img

                                            src={
                                                item.image.startsWith("http")
                                                ?
                                                item.image
                                                :
                                                `http://127.0.0.1:8000${item.image}`
                                            }

                                            alt={item.name}

                                            className="img-fluid"

                                            style={{
                                                height:"100px",
                                                objectFit:"cover"
                                            }}

                                        />

                                    }


                                </div>




                                <div className="col-md-3">


                                    <h5>

                                        {item.name}

                                    </h5>


                                    <p>

                                        {item.price} FCFA

                                    </p>


                                </div>




                                <div className="col-md-3">


                                    <button

                                        className="btn btn-secondary me-2"

                                        onClick={() =>
                                            decreaseQuantity(item.id)
                                        }

                                    >

                                        -

                                    </button>



                                    <span>

                                        {item.quantity}

                                    </span>



                                    <button

                                        className="btn btn-secondary ms-2"

                                        onClick={() =>
                                            increaseQuantity(item.id)
                                        }

                                    >

                                        +

                                    </button>


                                </div>





                                <div className="col-md-3">


                                    <button

                                        className="btn btn-danger"

                                        onClick={() =>
                                            removeFromCart(item.id)
                                        }

                                    >

                                        Supprimer

                                    </button>


                                </div>



                            </div>



                        </div>


                    </div>


                ))

            }





            <div className="card mt-4">


                <div className="card-body">


                    <h4>

                        Total :

                        {" "}

                        {cartTotal} FCFA

                    </h4>



                    <button

                        className="btn btn-outline-danger me-3"

                        onClick={clearCart}

                    >

                        Vider le panier

                    </button>



                    <Link

                        to="/checkout"

                        className="btn btn-success"

                    >

                        Commander

                    </Link>


                </div>


            </div>



        </div>


    );

}


export default Cart;