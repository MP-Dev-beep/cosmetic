import { useEffect, useState } from "react";
import axios from "../api/axios";


function AdminProducts(){


    const [products,setProducts] = useState([]);

    const [categories,setCategories] = useState([]);


    const [editId,setEditId] = useState(null);



    const initialState = {

        name:"",
        brand:"",
        description:"",
        ingredients:"",
        category:"",
        price:"",
        discount:0,
        stock:0,
        image:null,
        rating:0,
        is_featured:false,
        is_new:false

    };


    const [product,setProduct] = useState(initialState);





    useEffect(()=>{

        fetchProducts();

        fetchCategories();

    },[]);





    // =========================
    // GET PRODUITS
    // =========================

    const fetchProducts = async()=>{

        try{

            const res = await axios.get("/products/");

            setProducts(res.data);


        }catch(error){

            console.log(error);

        }

    };






    // =========================
    // GET CATEGORIES
    // =========================

    const fetchCategories = async()=>{


        try{


            const res = await axios.get("/categories/");


            setCategories(res.data);



        }catch(error){

            console.log(error);

        }


    };






    // =========================
    // INPUT CHANGE
    // =========================

    const handleChange=(e)=>{


        const {name,value,type,checked,files}=e.target;



        if(type==="file"){


            setProduct({

                ...product,

                image:files[0]

            });


        }

        else if(type==="checkbox"){


            setProduct({

                ...product,

                [name]:checked

            });



        }

        else{


            setProduct({

                ...product,

                [name]:value

            });


        }


    };








    // =========================
    // CREATE / UPDATE
    // =========================

    const handleSubmit=async(e)=>{


        e.preventDefault();



        const formData=new FormData();



        Object.keys(product).forEach(key=>{


            if(product[key] !== null){

                formData.append(
                    key,
                    product[key]
                );

            }


        });





        try{


            if(editId){


                await axios.patch(

                    `/products/${editId}/`,

                    formData,

                    {

                    headers:{
                        "Content-Type":"multipart/form-data"
                    }

                    }

                );


                alert(
                    "Produit modifié"
                );


            }


            else{


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
                    "Produit ajouté"
                );


            }



            setProduct(initialState);

            setEditId(null);

            fetchProducts();



        }catch(error){


            console.log(error.response?.data);


        }


    };







    // =========================
    // EDIT
    // =========================


    const editProduct=(item)=>{


        setEditId(item.id);


        setProduct({

            name:item.name,

            brand:item.brand || "",

            description:item.description,

            ingredients:item.ingredients || "",

            category:item.category,

            price:item.price,

            discount:item.discount,

            stock:item.stock,

            image:null,

            rating:item.rating,

            is_featured:item.is_featured,

            is_new:item.is_new


        });


    };







    // =========================
    // DELETE
    // =========================


    const deleteProduct=async(id)=>{


        if(!window.confirm(
            "Supprimer ce produit ?"
        )) return;



        try{


            await axios.delete(
                `/products/${id}/`
            );


            fetchProducts();



        }catch(error){

            console.log(error);

        }


    };






return (

<div className="container mt-4">


<h2>
Gestion des produits
</h2>




<form 
onSubmit={handleSubmit}
className="card p-4 mb-5"
>



<input

className="form-control mb-3"

name="name"

placeholder="Nom du produit"

value={product.name}

onChange={handleChange}

/>




<input

className="form-control mb-3"

name="brand"

placeholder="Marque"

value={product.brand}

onChange={handleChange}

/>





<textarea

className="form-control mb-3"

name="description"

placeholder="Description"

value={product.description}

onChange={handleChange}

/>






<textarea

className="form-control mb-3"

name="ingredients"

placeholder="Ingrédients"

value={product.ingredients}

onChange={handleChange}

/>






<select

className="form-select mb-3"

name="category"

value={product.category}

onChange={handleChange}

>


<option value="">

Choisir une catégorie

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

type="number"

name="price"

placeholder="Prix"

value={product.price}

onChange={handleChange}

/>






<input

className="form-control mb-3"

type="number"

name="stock"

placeholder="Stock"

value={product.stock}

onChange={handleChange}

/>






<input

className="form-control mb-3"

type="file"

name="image"

accept="image/*"

onChange={handleChange}

/>







<label>

<input

type="checkbox"

name="is_featured"

checked={product.is_featured}

onChange={handleChange}

/>

 Produit vedette

</label>




<br/>




<label>

<input

type="checkbox"

name="is_new"

checked={product.is_new}

onChange={handleChange}

/>

 Nouveauté

</label>







<button className="btn btn-primary mt-3">


{

editId ?

"Modifier le produit"

:

"Ajouter le produit"

}


</button>



</form>







<table className="table table-bordered">


<thead>


<tr>

<th>Image</th>

<th>Nom</th>

<th>Catégorie</th>

<th>Prix</th>

<th>Stock</th>

<th>Actions</th>

</tr>


</thead>



<tbody>


{

products.map(item=>(


<tr key={item.id}>


<td>


{

item.image &&

<img

src={item.image}

width="70"

alt=""

/>


}


</td>



<td>

{item.name}

</td>



<td>

{item.category_name}

</td>



<td>

{item.price}

</td>


<td>

{item.stock}

</td>



<td>


<button

className="btn btn-warning btn-sm me-2"

onClick={()=>editProduct(item)}

>

Modifier

</button>




<button

className="btn btn-danger btn-sm"

onClick={()=>deleteProduct(item.id)}

>

Supprimer

</button>



</td>



</tr>


))


}


</tbody>



</table>





</div>


);


}



export default AdminProducts;