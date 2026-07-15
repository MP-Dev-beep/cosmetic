import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import api from "../api/axios";
import { CartContext } from "../context/CartContext";


function ProductDetail() {


    const { id } = useParams();

    const navigate = useNavigate();


    const { addToCart } = useContext(CartContext);


    const [product, setProduct] = useState(null);

    const [loading, setLoading] = useState(true);



    useEffect(() => {


        api.get(`/products/${id}/`)

        .then(res => {

            setProduct(res.data);

        })

        .catch(error => {

            console.log(error);

        })

        .finally(() => {

            setLoading(false);

        });


    }, [id]);




    if (loading) {

        return <h2>Chargement...</h2>;

    }



    if (!product) {

        return <h2>Produit introuvable</h2>;

    }




    const buyNow = () => {

        addToCart(product);

        navigate("/checkout");

    };




    return (


        <div className="container product-detail">


            <div className="product-detail-image">


                <img

                    src={product.image}

                    alt={product.name}

                />


            </div>




            <div className="product-detail-info">


                <h1>

                    {product.name}

                </h1>




                <h2 className="price">

                    {product.price} FCFA

                </h2>




                <p>

                    {product.description}

                </p>




                <p>

                    <strong>

                        Disponibilité :

                    </strong>


                    {" "}


                    {

                        product.stock > 0

                        ?

                        "En stock"

                        :

                        "Rupture de stock"

                    }


                </p>




                <button

                    onClick={() => addToCart(product)}

                    disabled={product.stock === 0}

                >

                    Ajouter au panier

                </button>




                <button

                    className="buy-btn"

                    onClick={buyNow}

                    disabled={product.stock === 0}

                >

                    Acheter maintenant

                </button>



            </div>



        </div>


    );


}


export default ProductDetail;