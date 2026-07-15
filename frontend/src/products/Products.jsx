import { useEffect, useState } from "react";
import axios from "../api/axios";
import ProductCard from "../components/ProductCard";


function Products(){


    const [products,setProducts] = useState([]);

    const [loading,setLoading] = useState(true);




    useEffect(()=>{

        getProducts();

    },[]);





    const getProducts = async()=>{


        try{


            const response = await axios.get(
                "/products/"
            );


            setProducts(
                response.data
            );



        }catch(error){


            console.log(
                "Erreur chargement produits",
                error
            );


        }


        finally{

            setLoading(false);

        }


    };






    if(loading){


        return (

            <div className="container mt-5">

                <h3>
                    Chargement des produits...
                </h3>

            </div>

        );


    }





    return (

        <div className="container mt-5">


            <h1 className="mb-4 text-center">

                Nos produits beauté

            </h1>





            <div className="row">


            {


            products.length === 0 ?

            (

                <div className="text-center">

                    Aucun produit disponible

                </div>


            )

            :

            (


            products.map(product=>(


                <div

                className="col-md-4 mb-4"

                key={product.id}

                >


                    <ProductCard

                    product={product}

                    />


                </div>


            ))


            )


            }


            </div>



        </div>

    );


}


export default Products;