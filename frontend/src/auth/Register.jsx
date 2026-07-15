import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";


function Register(){

    const navigate = useNavigate();


    const [form,setForm]=useState({

        username:"",
        email:"",
        phone:"",
        password:""

    });


    const [message,setMessage]=useState("");



    const handleChange=(e)=>{

        setForm({

            ...form,

            [e.target.name]:e.target.value

        });

    };



    const handleSubmit=async(e)=>{

        e.preventDefault();


        try{


            await api.post(
                "users/register/",
                form
            );


            setMessage(
                "Compte créé avec succès"
            );


            setTimeout(()=>{

                navigate("/login");

            },1500);



        }

        catch(error){


            setMessage(
                "Erreur lors de l'inscription"
            );


        }


    };



    return (

        <div className="container mt-5"
             style={{maxWidth:"450px"}}>


            <h2>
                Inscription
            </h2>


            {
                message &&

                <div className="alert alert-info">

                    {message}

                </div>

            }



            <form onSubmit={handleSubmit}>


                <input

                    className="form-control mb-3"

                    placeholder="Nom"

                    name="username"

                    onChange={handleChange}

                />



                <input

                    className="form-control mb-3"

                    placeholder="Email"

                    name="email"

                    onChange={handleChange}

                />



                <input

                    className="form-control mb-3"

                    placeholder="Téléphone"

                    name="phone"

                    onChange={handleChange}

                />



                <input

                    type="password"

                    className="form-control mb-3"

                    placeholder="Mot de passe"

                    name="password"

                    onChange={handleChange}

                />



                <button className="btn btn-success w-100">

                    Créer mon compte

                </button>


            </form>


        </div>

    );

}


export default Register;