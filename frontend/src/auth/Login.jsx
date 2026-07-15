import { useState, useContext } from "react";
import api from "../api/axios";

import { useNavigate } from "react-router-dom";
import React from "react";
import { useAuth } from "./AuthProvider";


function Login(){

const [username,setUsername] = useState("");
const [password,setPassword] = useState("");

const navigate = useNavigate();

const {login} = useAuth();



const handleLogin = async(e)=>{

e.preventDefault();


try{

const response = await api.post(
    "/users/login/",
    {
        username,
        password
    }
);


login(
    response.data.access,
    response.data.refresh,
    response.data.user
);



if(response.data.user.role === "admin"){

    navigate("/admin/dashboard");

}
else{

    navigate("/");

}



}
catch(error){

console.log(
    error.response?.data
);

}


};



return (

<form onSubmit={handleLogin}>

<h1>
Connexion
</h1>


<input

placeholder="username"

value={username}

onChange={
e=>setUsername(e.target.value)
}

/>


<input

type="password"

placeholder="password"

value={password}

onChange={
e=>setPassword(e.target.value)
}

/>


<button>
Connexion
</button>


</form>

);


}


export default Login;