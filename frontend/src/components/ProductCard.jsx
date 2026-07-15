import {
    Link
} from "react-router-dom";


import {
    useCart
}
from "../context/CartContext";



export default function ProductCard({product}){


    const {
        addToCart
    } = useCart();




    return (

        <div className="card">


            <h3>

                {product.name}

            </h3>



            <p>

                Prix :
                {product.price}

                FCFA

            </p>




            <Link
            to={`/products/${product.id}`}
            >

                Voir

            </Link>





            <button

            onClick={()=>addToCart(product)}

            >

                Ajouter au panier

            </button>



        </div>

    );

}