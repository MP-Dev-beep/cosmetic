import { useContext } from "react";
import { useAuth } from "../auth/AuthProvider";


function Dashboard(){

    const {user} = useAuth();


    return (

        <div>

            <h1>
                Dashboard BeautyShop
            </h1>


            {user && (

                <div>

                   <p>
                        Bonjour {user?.username}
                    </p>

                    <p>
                        Bienvenue dans votre espace client.
                    </p>


                    <button onClick={logout}>
                        Déconnexion
                    </button>

                </div>

            )}

        </div>

    );

}


export default Dashboard;