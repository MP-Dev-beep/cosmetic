import { useEffect, useState } from "react";
import axios from "../api/axios";


function AdminProducts(){

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(false);


    const [product, setProduct] = useState({

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
        is_new:true

    });



    // ==========================
    // CHARGER CATEGORIES
    // ==========================

    useEffect(()=>{

        getCategories();
        getProducts();

    },[]);



    const getCategories = async()=>{

        try{

            const response = await axios.get(
                "/categories/"
            );

            setCategories(response.data);


        }catch(error){

            console.log(
                "Erreur catégories",
                error
            );

        }

    };





    // ==========================
    // CHARGER PRODUITS
    // ==========================


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
                "Erreur produits",
                error
            );

        }

    };





    // ==========================
    // INPUT CHANGE
    // ==========================


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





    // ==========================
    // CREATION PRODUIT
    // ==========================


    const handleSubmit=async(e)=>{

        e.preventDefault();


        setLoading(true);



        const formData = new FormData();



        Object.keys(product).forEach(key=>{


            if(product[key] !== null){

                formData.append(
                    key,
                    product[key]
                );

            }


        });

        





        try{


            await axios.post(

                "/products/",

                formData,

                {

                    headers:{

                        "Content-Type":
                        "multipart/form-data"

                    }

                }

            );



            alert(
                "Produit ajouté avec succès"
            );



            getProducts();




            setProduct({

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
                is_new:true

            });



        }

        catch(error){


            console.log(
                error.response?.data || error
            );


        }


        finally{

            setLoading(false);

        }


    };


    // ==========================
// SUPPRIMER PRODUIT
// ==========================

const deleteProduct = async(id)=>{


    if(!window.confirm(
        "Voulez-vous supprimer ce produit ?"
    )) return;



    try{


        await axios.delete(
            `/products/${id}/`
        );


        alert(
            "Produit supprimé"
        );


        getProducts();



    }catch(error){

        console.log(error);

    }


};





// ==========================
// MODIFIER PRODUIT
// ==========================

const editProduct = (item)=>{


    setProduct({

        id:item.id,

        name:item.name || "",

        brand:item.brand || "",

        description:item.description || "",

        ingredients:item.ingredients || "",

        category:item.category || "",

        price:item.price || "",

        discount:item.discount || 0,

        stock:item.stock || 0,

        image:null,

        rating:item.rating || 0,

        is_featured:item.is_featured,

        is_new:item.is_new


    });



    window.scrollTo({

        top:0,

        behavior:"smooth"

    });



};





// ==========================
// UPDATE PRODUIT
// ==========================

const updateProduct = async()=>{


    const formData = new FormData();



    Object.keys(product).forEach(key=>{


        if(

            product[key] !== null &&

            key !== "id"

        ){

            formData.append(

                key,

                product[key]

            );

        }


    });




    try{


        await axios.patch(

            `/products/${product.id}/`,

            formData,

            {

                headers:{

                    "Content-Type":
                    "multipart/form-data"

                }

            }

        );



        alert(
            "Produit modifié"
        );



        getProducts();



        setProduct({

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
            is_new:true

        });



    }catch(error){


        console.log(error.response?.data);


    }


};





return (

<div className="container mt-4">


<h2 className="mb-4">
Gestion des produits
</h2>



<form 
onSubmit={handleSubmit}
className="card p-4 shadow"
>



<div className="row">


<div className="col-md-6">


<label>
Nom du produit
</label>


<input

className="form-control mb-3"

name="name"

value={product.name}

onChange={handleChange}

/>



<label>
Marque
</label>


<input

className="form-control mb-3"

name="brand"

value={product.brand}

onChange={handleChange}

/>



<label>
Catégorie
</label>


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


</div>



<div className="col-md-6">


<label>
Prix
</label>


<input

type="number"

className="form-control mb-3"

name="price"

value={product.price}

onChange={handleChange}

/>



<label>
Remise (%)
</label>


<input

type="number"

className="form-control mb-3"

name="discount"

value={product.discount}

onChange={handleChange}

/>



<label>
Stock
</label>


<input

type="number"

className="form-control mb-3"

name="stock"

value={product.stock}

onChange={handleChange}

/>



</div>


</div>

<label>
Description
</label>


<textarea

className="form-control mb-3"

name="description"

rows="4"

value={product.description}

onChange={handleChange}

/>




<label>
Ingrédients
</label>


<textarea

className="form-control mb-3"

name="ingredients"

rows="3"

value={product.ingredients}

onChange={handleChange}

/>





<label>
Image du produit
</label>


<input

type="file"

className="form-control mb-3"

name="image"

accept="image/*"

onChange={handleChange}

/>





{

product.image &&

<div className="mb-3">


<p>
Aperçu :
</p>


<img

src={
URL.createObjectURL(product.image)
}

alt="preview"

width="150"

className="rounded"

/>


</div>


}





<label>
Note
</label>


<input

type="number"

step="0.1"

className="form-control mb-3"

name="rating"

value={product.rating}

onChange={handleChange}

/>





<div className="form-check mb-3">


<input

className="form-check-input"

type="checkbox"

name="is_featured"

checked={product.is_featured}

onChange={handleChange}

/>


<label className="form-check-label">

Produit vedette

</label>


</div>





<div className="form-check mb-3">


<input

className="form-check-input"

type="checkbox"

name="is_new"

checked={product.is_new}

onChange={handleChange}

/>


<label className="form-check-label">

Nouveauté

</label>


</div>





<button

type="button"

className="btn btn-success"

onClick={
product.id 
?
updateProduct 
:
handleSubmit
}

>

{

product.id

?

"Modifier le produit"

:

"Ajouter le produit"

}


</button>




</form>





<hr className="my-5"/>





<h3>
Liste des produits
</h3>





<div className="table-responsive">


<table className="table table-bordered table-striped">


<thead className="table-dark">


<tr>


<th>
Image
</th>


<th>
Nom
</th>


<th>
Catégorie
</th>


<th>
Prix
</th>


<th>
Stock
</th>


<th>
Actions
</th>


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

alt={item.name}

width="70"

height="70"

style={{

objectFit:"cover"

}}

/>


}


</td>





<td>

{item.name}

</td>





<td>

{

item.category_name ||

item.category

}


</td>





<td>

{item.price} FCFA

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



</div>


);


}



export default AdminProducts;