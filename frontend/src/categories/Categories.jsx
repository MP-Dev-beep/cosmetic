import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";


function Categories(){


    const [categories,setCategories] = useState([]);

    const [loading,setLoading] = useState(true);





    useEffect(()=>{


        getCategories();


    },[]);






    const getCategories = async()=>{


        try{


            const response = await axios.get(
                "/categories/"
            );


            setCategories(
                response.data
            );



        }catch(error){


            console.log(
                "Erreur chargement catégories",
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

                    Chargement des catégories...

                </h3>

            </div>

        );


    }







    return (


        <div className="container mt-5">


            <h1 className="text-center mb-5">

                Nos catégories

            </h1>





            <div className="row">





            {


            categories.length === 0 ?


            (

                <p>

                    Aucune catégorie disponible

                </p>

            )


            :



            categories.map(category=>(



                <div

                className="col-md-4 mb-4"

                key={category.id}

                >




                    <div className="card shadow h-100">





                    {

                    category.image &&


                    <img

                    src={category.image}

                    className="card-img-top"

                    alt={category.name}

                    style={{

                        height:"220px",

                        objectFit:"cover"

                    }}

                    />

                    }







                    <div className="card-body text-center">



                        <h4>

                            {category.name}

                        </h4>





                        {

                        category.description &&


                        <p>

                            {category.description}

                        </p>

                        }







                        {

                        category.products_count !== undefined &&


                        <p>

                            {category.products_count} produits

                        </p>

                        }







                        <Link

                        to={`/categories/${category.id}`}

                        className="btn btn-primary"

                        >

                            Voir les produits

                        </Link>





                    </div>




                    </div>




                </div>



            ))



            }





            </div>





        </div>


    );


}



export default Categories;