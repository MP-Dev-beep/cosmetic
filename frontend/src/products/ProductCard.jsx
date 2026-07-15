import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";


function ProductCard({product}){


    const { addToCart } = useCart();




    return (

        <div className="card h-100 shadow-sm">


            {


            product.image &&

            <img

            src={product.image}

            className="card-img-top"

            alt={product.name}

            style={{

                height:"250px",

                objectFit:"cover"

            }}

            />

            }





            <div className="card-body">


                <h5 className="card-title">

                    {product.name}

                </h5>




                <p>

                    {product.brand}

                </p>




                <p>

                    ⭐ {product.rating}

                </p>





                {

                product.discount > 0 &&

                <span className="badge bg-danger">

                    -{product.discount}%

                </span>

                }





                <h5 className="mt-3 text-primary">

                    {product.price} FCFA

                </h5>





                <div className="d-flex gap-2 mt-3">


                    <Link

                    className="btn btn-outline-dark"

                    to={`/products/${product.id}`}

                    >

                        Voir

                    </Link>





                    <button

                    className="btn btn-success"

                    onClick={()=>addToCart(product)}

                    >

                        Panier

                    </button>


                </div>



            </div>



        </div>


    );


}


export default ProductCard;