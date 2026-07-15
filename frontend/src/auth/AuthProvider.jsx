import React, {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import api from "../api/axios";


const AuthContext = createContext();


export const AuthProvider = ({children}) => {


    const [user,setUser] = useState(null);

    const [loading,setLoading] = useState(true);



    // récupérer utilisateur connecté

    const loadUser = async()=>{

        const token = localStorage.getItem("access");


        if(token){

            try{

                const response = await api.get(
                    "users/profile/"
                );


                setUser(response.data);


            }catch(error){

                logout();

            }

        }


        setLoading(false);

    };



    useEffect(()=>{

        loadUser();

    },[]);





    // Connexion

    const login = async(email,password)=>{


        const response = await api.post(
            "users/login/",
            {
                email,
                password
            }
        );


        localStorage.setItem(
            "access",
            response.data.access
        );


        localStorage.setItem(
            "refresh",
            response.data.refresh
        );


        await loadUser();

    };





    // Inscription

    const register = async(data)=>{


        await api.post(
            "users/register/",
            data
        );


    };






    // Déconnexion

    const logout = ()=>{


        localStorage.removeItem("access");

        localStorage.removeItem("refresh");


        setUser(null);


    };





    return (

        <AuthContext.Provider

            value={{
                user,
                login,
                register,
                logout,
                loading
            }}

        >

            {children}

        </AuthContext.Provider>

    );

};





export const useAuth = ()=>{

    return useContext(AuthContext);

};