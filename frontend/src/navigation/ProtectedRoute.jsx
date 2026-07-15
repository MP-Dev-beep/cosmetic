import React from "react";

import {
    Navigate
} from "react-router-dom";

import { useAuth } from "../auth/AuthProvider";


function ProtectedRoute({children}){

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


    return children;
}


export default ProtectedRoute;