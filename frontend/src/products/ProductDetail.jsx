import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../api/axios";
import { useCart } from "../context/CartContext";


function ProductDetail() {


    const { id } = useParams();


    const { addToCart } = useCart();


    const [product, setProduct] = useState(null);


    const [loading, setLoading] = useState(true);


    const [error, setError] = useState("");



    useEffect(() => {

        getProduct();

    }, [id]);



    const getProduct = async () => {


        try {


            const response = await api.get(
                `products/${id}/`
            );


            setProduct(response.data);


        }

        catch(error){


            console.log(error);


            setError(
                "Produit introuvable."
            );


        }

        finally{


            setLoading(false);


        }


    };




    if(loading){


        return (

            <div className="container mt-5">

                Chargement...

            </div>

        );

    }




    if(error){


        return (

            <div className="container mt-5">

                <div className="alert alert-danger">

                    {error}

                </div>

            </div>

        );

    }




    return (


        <div className="container mt-5">


            <div className="row">


                <div className="col-md-6">


                    {
                        product.image &&

                        <img

                            src={
                                product.image.startsWith("http")
                                ?
                                product.image
                                :
                                `http://127.0.0.1:8000${product.image}`
                            }

                            alt={product.name}

                            className="img-fluid rounded"

                        />

                    }


                </div>



                <div className="col-md-6">


                    <h2>

                        {product.name}

                    </h2>



                    <h4 className="text-success">

                        {product.price} FCFA

                    </h4>



                    <p>

                        {product.description}

                    </p>



                    <p>

                        Stock :

                        <strong>
                            {" "}
                            {product.stock}
                        </strong>

                    </p>



                    {
                        product.category &&

                        <p>

                            Catégorie :

                            {" "}

                            {product.category.name}

                        </p>

                    }



                    <button

                        className="btn btn-success btn-lg"

                        onClick={() => addToCart(product)}

                    >

                        Ajouter au panier

                    </button>



                </div>


            </div>


        </div>


    );

}



export default ProductDetail;