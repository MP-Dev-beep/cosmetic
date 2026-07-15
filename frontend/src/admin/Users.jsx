import { useEffect, useState } from "react";
import api from "../api/axios";


function Users() {


    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(true);



    useEffect(() => {


        api.get("/users/")

        .then((response)=>{


            setUsers(response.data);


        })

        .catch((error)=>{


            console.log(error);


        })

        .finally(()=>{


            setLoading(false);


        });



    }, []);





    if(loading){


        return (

            <h3 className="text-center mt-5">

                Chargement des utilisateurs...

            </h3>

        );

    }





    return (


        <div className="container mt-4">


            <h2>
                Gestion des utilisateurs
            </h2>




            <table className="table table-striped mt-4">


                <thead>


                    <tr>

                        <th>
                            ID
                        </th>

                        <th>
                            Nom utilisateur
                        </th>


                        <th>
                            Email
                        </th>


                        <th>
                            Rôle
                        </th>


                    </tr>


                </thead>




                <tbody>


                    {


                    users.map((user)=>(


                        <tr key={user.id}>


                            <td>
                                {user.id}
                            </td>


                            <td>
                                {user.username}
                            </td>


                            <td>
                                {user.email}
                            </td>


                            <td>
                                {user.role}
                            </td>



                        </tr>


                    ))


                    }



                </tbody>



            </table>



        </div>


    );


}



export default Users;