import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";


function Register(){


const navigate = useNavigate();


const [form,setForm] = useState({

    username:"",
    email:"",
    password:"",
    phone:""

});



const handleChange = (e)=>{

    setForm({

        ...form,

        [e.target.name]: e.target.value

    });

};




const register = async(e)=>{

    e.preventDefault();


    try{


        const response = await api.post(
            "/users/register/",
            form
        );


        console.log(response.data);


        alert(
            "Inscription réussie"
        );


        navigate("/login");


    }

    catch(error){


        console.log(
            error.response?.data
        );


        alert(
            "Erreur inscription"
        );


    }


};





return (

<div className="container mt-5">


<div className="card shadow p-4">


<h2>
Créer un compte
</h2>



<form onSubmit={register}>


<input

className="form-control mb-3"

name="username"

placeholder="Nom utilisateur"

value={form.username}

onChange={handleChange}

/>



<input

className="form-control mb-3"

name="email"

type="email"

placeholder="Email"

value={form.email}

onChange={handleChange}

/>




<input

className="form-control mb-3"

name="phone"

placeholder="Téléphone"

value={form.phone}

onChange={handleChange}

/>





<input

className="form-control mb-3"

name="password"

type="password"

placeholder="Mot de passe"

value={form.password}

onChange={handleChange}

/>





<button

className="btn btn-primary w-100"

type="submit"

>

S'inscrire

</button>



</form>


</div>


</div>


);


}


export default Register;