import { useEffect, useState } from "react";

import api from "../api/axios";

import ProductCard from "./ProductCard";


function Products() {


    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");



    useEffect(() => {

        getProducts();

    }, []);



    const getProducts = async () => {


        try {


            const response = await api.get(
                "products/"
            );


            setProducts(response.data);


        }

        catch(error){


            console.log(error);


            setError(
                "Impossible de charger les produits."
            );


        }

        finally {


            setLoading(false);


        }


    };



    if(loading){


        return (

            <div className="container mt-5">

                <h4>
                    Chargement des produits...
                </h4>

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


            <h2 className="mb-4">

                Nos produits

            </h2>



            <div className="row">


                {

                    products.map((product)=>(


                        <div

                            className="col-md-4 mb-4"

                            key={product.id}

                        >


                            <ProductCard

                                product={product}

                            />


                        </div>


                    ))

                }


            </div>



        </div>


    );

}



export default Products;