import { useEffect, useState } from "react";
import axios from "../api/axios";


function AdminOrders(){


    const [orders,setOrders] = useState([]);




    useEffect(()=>{

        getOrders();

    },[]);





    const getOrders = async()=>{

        try{


            const res = await axios.get(
                "/orders/"
            );


            setOrders(res.data);


        }catch(error){

            console.log(error);

        }

    };








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




<table className="table table-bordered table-hover">


<thead>

<tr>

<th>
N°
</th>


<th>
Client
</th>


<th>
Adresse
</th>


<th>
Téléphone
</th>


<th>
Produits
</th>


<th>
Paiement
</th>


<th>
Total
</th>


<th>
Statut
</th>


<th>
Action
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

{order.user?.username}

</td>






<td>

{order.address}

</td>






<td>

{order.phone}

</td>







<td>


{

order.items?.map(item=>(


<div key={item.id}>


{item.product?.name}


<br/>


Quantité : {item.quantity}


<br/>


Prix : {item.price} FCFA


<hr/>

</div>


))


}



</td>







<td>

{order.payment_method}

</td>







<td>

{order.total} FCFA

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


<option value="paid">

Payée

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