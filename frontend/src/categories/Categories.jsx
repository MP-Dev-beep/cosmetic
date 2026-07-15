import { useEffect, useState } from "react";
import api from "../api/axios";


function Categories() {


    const [categories, setCategories] = useState([]);


    useEffect(() => {


        api.get("/categories/")

        .then((response)=>{

            setCategories(response.data);

        })

        .catch((error)=>{

            console.log(error);

        });


    }, []);




    return (

        <div className="container mt-4">


            <h2>
                Catégories
            </h2>



            <div className="row mt-4">


                {
                    categories.map((category)=>(


                        <div

                            className="col-md-4 mb-3"

                            key={category.id}

                        >


                            <div className="card p-3">


                                <h5>
                                    {category.name}
                                </h5>


                            </div>


                        </div>


                    ))
                }


            </div>



        </div>

    );


}



export default Categories;