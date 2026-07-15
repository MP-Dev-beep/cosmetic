import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";


function ProductCard({ product }) {


    const { addToCart } = useCart();



    return (

        <div className="card h-100 shadow-sm">


            {
                product.image && (

                    <img

                        src={
                            product.image.startsWith("http")
                            ? product.image
                            : `http://127.0.0.1:8000${product.image}`
                        }

                        className="card-img-top"

                        alt={product.name}

                        style={{
                            height:"220px",
                            objectFit:"cover"
                        }}

                    />

                )
            }



            <div className="card-body">


                <h5 className="card-title">

                    {product.name}

                </h5>



                <p className="card-text">

                    {product.description?.substring(0,80)}

                    ...

                </p>



                <h6 className="text-success">

                    {product.price} FCFA

                </h6>



                <p>

                    Stock :

                    <strong>
                        {" "}
                        {product.stock}
                    </strong>

                </p>



                <div className="d-flex gap-2">


                    <Link

                        to={`/products/${product.id}`}

                        className="btn btn-outline-primary"

                    >

                        Voir

                    </Link>



                    <button

                        className="btn btn-success"

                        onClick={() => addToCart(product)}

                    >

                        Ajouter

                    </button>


                </div>



            </div>


        </div>

    );

}


export default ProductCard;