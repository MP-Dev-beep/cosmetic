import { useEffect, useState } from "react";
import axios from "../api/axios";


function AdminOrders(){


    const [orders,setOrders] = useState([]);




    useEffect(()=>{

        getOrders();

    },[]);





    // ==========================
    // RECUPERATION COMMANDES
    // ==========================

    const getOrders = async()=>{


        try{


            const response = await axios.get(
                "/orders/"
            );


            setOrders(response.data);



        }catch(error){

            console.log(error);

        }


    };








    // ==========================
    // CHANGEMENT STATUT
    // ==========================

    const updateStatus = async(id,status)=>{


        try{


            await axios.patch(

                `/orders/${id}/`,

                {
                    status:status
                }

            );


            getOrders();



        }catch(error){

            console.log(error);

        }


    };








    // ==========================
    // SUPPRESSION
    // ==========================

    const deleteOrder = async(id)=>{


        if(!window.confirm(
            "Supprimer cette commande ?"
        )) return;



        try{


            await axios.delete(

                `/orders/${id}/`

            );


            getOrders();



        }catch(error){

            console.log(error);

        }


    };







return (

<div className="container mt-4">



<h2>

Gestion des commandes

</h2>





<table className="table table-striped table-bordered">


<thead>


<tr>

<th>

Commande

</th>


<th>

Client

</th>



<th>

Produits

</th>



<th>

Montant

</th>



<th>

Statut

</th>



<th>

Actions

</th>


</tr>


</thead>





<tbody>


{

orders.map(order=>(



<tr key={order.id}>


<td>

#{order.id}

</td>




<td>


{

order.user?.username

}


<br/>


{

order.user?.email

}



</td>





<td>


{

order.items?.map(item=>(


<div key={item.id}>


{item.product_name}

 x

 {item.quantity}


</div>


))


}



</td>







<td>

{order.total_price} FCFA

</td>








<td>


<select

className="form-select"

value={order.status}

onChange={(e)=>

updateStatus(

order.id,

e.target.value

)

}

>


<option value="pending">

En attente

</option>



<option value="confirmed">

Confirmée

</option>




<option value="shipped">

Expédiée

</option>




<option value="delivered">

Livrée

</option>




<option value="cancelled">

Annulée

</option>



</select>



</td>








<td>


<button

className="btn btn-danger btn-sm"

onClick={()=>deleteOrder(order.id)}

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



export default AdminOrders;