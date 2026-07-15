import React from "react";

import {
    Navigate
} from "react-router-dom";


import { useAuth } from "../auth/AuthProvider";



function AdminRoute({children}){


    const {
        user,
        loading
    } = useAuth();



    if(loading){

        return <p>Chargement...</p>;

    }



    if(!user){

        return <Navigate to="/login"/>;

    }



    if(user.role !== "admin"){

        return <Navigate to="/"/>;

    }



    return children;


}


export default AdminRoute;