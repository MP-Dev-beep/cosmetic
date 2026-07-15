import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../api/axios";
import ProductCard from "../components/ProductCard";


function CategoryProducts() {


    const { id } = useParams();


    const [products, setProducts] = useState([]);

    const [category, setCategory] = useState(null);

    const [loading, setLoading] = useState(true);




    useEffect(() => {


        // récupérer les informations de la catégorie

        api.get(`/categories/${id}/`)

        .then((response)=>{

            setCategory(response.data);

        })

        .catch((error)=>{

            console.log(error);

        });




        // récupérer les produits de cette catégorie

        api.get(`/products/?category=${id}`)

        .then((response)=>{

            setProducts(response.data);

        })

        .catch((error)=>{

            console.log(error);

        })

        .finally(()=>{

            setLoading(false);

        });



    }, [id]);






    if(loading){


        return (

            <h3 className="text-center mt-5">

                Chargement...

            </h3>

        );


    }





    return (


        <div className="container mt-4">


            <h2 className="mb-4">


                {category ? category.name : "Produits"}


            </h2>




            <div className="row">


                {


                products.length > 0 ?


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



                :



                <p>

                    Aucun produit trouvé dans cette catégorie.

                </p>


                }



            </div>



        </div>


    );


}



export default CategoryProducts;