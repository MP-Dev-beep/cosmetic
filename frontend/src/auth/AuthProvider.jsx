import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (username, password) => {
    try {
      const response = await api.post("users/login/", {
        username,
        password,
      });

      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);

      await getProfile();

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setUser(null);
  };

  const getProfile = async () => {

    try {

        const response = await api.get("/users/profile/");

        console.log("USER CONNECTE :", response.data);

        setUser(response.data);

    } catch(error){

        console.log(error);

        logout();

    }

};
  // Une seule fonction d'initialisation propre au montage du composant
 useEffect(()=>{


    const token = localStorage.getItem("access");


    if(token){


        api.get("/users/profile/")

        .then((response)=>{


            setUser(response.data);


        })


        .catch((error)=>{


            console.log("Erreur profil :", error.response?.data);


            localStorage.removeItem("access");

            localStorage.removeItem("refresh");

            setUser(null);


        });


    }


},[]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        getProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);