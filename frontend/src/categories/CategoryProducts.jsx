import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import ProductCard from "../components/ProductCard";


function CategoryProducts(){


    const { id } = useParams();


    const [products,setProducts] = useState([]);

    const [category,setCategory] = useState(null);

    const [loading,setLoading] = useState(true);





    useEffect(()=>{


        getCategoryProducts();


    },[id]);







    const getCategoryProducts = async()=>{


        try{


            const categoryResponse = await axios.get(

                `/categories/${id}/`

            );


            setCategory(

                categoryResponse.data

            );






            const productsResponse = await axios.get(

                `/products/?category=${id}`

            );



            setProducts(

                productsResponse.data

            );





        }

        catch(error){


            console.log(

                "Erreur catégorie",

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

                    Chargement...

                </h3>

            </div>

        );


    }







    return (


        <div className="container mt-5">



            <h1 className="mb-4">


                {

                category ?

                category.name

                :

                "Produits"

                }


            </h1>






            <div className="row">



            {


            products.length === 0 ?


            (

                <div>

                    Aucun produit dans cette catégorie

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



export default CategoryProducts;