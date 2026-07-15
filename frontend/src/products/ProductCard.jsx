import { Link } from "react-router-dom";

import { useContext } from "react";

import { CartContext } from "../context/CartContext";



function ProductCard({product}){


    const { addToCart } = useContext(CartContext);



    return (

        <div className="product-card">


            <img

                src={product.image}

                alt={product.name}

            />



            <div className="product-body">


                <h3 className="product-name">

                    {product.name}

                </h3>



                <p className="product-price">

                    {product.prix || product.price} FCFA

                </p>



                <div className="product-actions">


                    <Link

                        className="btn-details"

                        to={`/products/${product.id}`}

                    >

                        Voir détails

                    </Link>



                    <button

                        className="btn-cart"

                        onClick={()=>addToCart(product)}

                    >

                        Ajouter 🛒

                    </button>


                </div>


            </div>


        </div>

    );


}


export default ProductCard;