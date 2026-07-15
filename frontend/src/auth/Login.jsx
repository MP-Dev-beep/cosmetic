import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";


function Login() {

    const { login } = useAuth();

    const navigate = useNavigate();


    const [form, setForm] = useState({

        username: "",
        password: ""

    });


    const [error, setError] = useState("");


    const handleChange = (e)=>{

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };


    const handleSubmit = async(e)=>{

        e.preventDefault();


        const result = await login(
            form.username,
            form.password
        );


        if(result.success){

            navigate("/");

        }
        else{

            setError(
                "Identifiants incorrects"
            );

        }

    };


    return (

        <div className="container mt-5"
             style={{maxWidth:"450px"}}>


            <h2>
                Connexion
            </h2>


            {
                error &&

                <div className="alert alert-danger">

                    {error}

                </div>

            }



            <form onSubmit={handleSubmit}>


                <div className="mb-3">

                    <label>
                        Nom utilisateur
                    </label>


                    <input

                        className="form-control"

                        name="username"

                        value={form.username}

                        onChange={handleChange}

                    />

                </div>




                <div className="mb-3">


                    <label>
                        Mot de passe
                    </label>


                    <input

                        type="password"

                        className="form-control"

                        name="password"

                        value={form.password}

                        onChange={handleChange}

                    />


                </div>




                <button className="btn btn-primary w-100">

                    Se connecter

                </button>


            </form>


        </div>

    );

}


export default Login;