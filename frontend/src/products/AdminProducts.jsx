import { useEffect, useState } from "react";
import axios from "../api/axios";


function AdminProducts(){


    const [categories, setCategories] = useState([]);

    const [product, setProduct] = useState({

        name:"",
        description:"",
        price:"",
        category:"",
        image:null

    });



    // récupérer les catégories

    useEffect(()=>{

        axios.get("/categories/")
        .then(res=>{

            setCategories(res.data);

        })
        .catch(err=>{

            console.log(err);

        });


    },[]);




    const handleChange = (e)=>{


        if(e.target.name === "image"){

            setProduct({

                ...product,

                image:e.target.files[0]

            });


        }else{


            setProduct({

                ...product,

                [e.target.name]:e.target.value

            });


        }


    };





    const handleSubmit = async(e)=>{

        e.preventDefault();



        const formData = new FormData();


        formData.append(
            "name",
            product.name
        );


        formData.append(
            "description",
            product.description
        );


        formData.append(
            "price",
            product.price
        );


        formData.append(
            "category",
            product.category
        );


        formData.append(
            "image",
            product.image
        );




        try{


            await axios.post(

                "/products/",

                formData,

                {

                    headers:{

                        "Content-Type":"multipart/form-data"

                    }

                }

            );


            alert(
                "Produit créé avec succès"
            );



        }catch(error){

            console.log(error);

        }


    };




    return (

        <div className="container mt-4">


            <h2>
                Ajouter un produit
            </h2>



            <form onSubmit={handleSubmit}>


                <input

                    className="form-control mb-3"

                    type="text"

                    name="name"

                    placeholder="Nom du produit"

                    onChange={handleChange}

                />




                <textarea

                    className="form-control mb-3"

                    name="description"

                    placeholder="Description"

                    onChange={handleChange}

                />




                <input

                    className="form-control mb-3"

                    type="number"

                    name="price"

                    placeholder="Prix"

                    onChange={handleChange}

                />





                <select

                    className="form-select mb-3"

                    name="category"

                    value={product.category}

                    onChange={handleChange}

                >


                    <option value="">

                        -- Choisir une catégorie --

                    </option>



                    {

                        categories.map(cat=>(

                            <option

                                key={cat.id}

                                value={cat.id}

                            >

                                {cat.name}

                            </option>


                        ))

                    }



                </select>





                <input

                    className="form-control mb-3"

                    type="file"

                    name="image"

                    accept="image/*"

                    onChange={handleChange}

                />





                <button

                    className="btn btn-success"

                    type="submit"

                >

                    Ajouter le produit

                </button>



            </form>


        </div>

    );

}


export default AdminProducts;