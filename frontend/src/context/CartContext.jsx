import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";


// Création du contexte
export const CartContext = createContext();



export function useCart(){

    return useContext(CartContext);

}




export function CartProvider({children}){


    const [cartItems, setCartItems] = useState(()=>{


        const savedCart =
        localStorage.getItem("cart");


        return savedCart
        ?
        JSON.parse(savedCart)
        :
        [];

    });




    // Sauvegarde automatique

    useEffect(()=>{


        localStorage.setItem(
            "cart",
            JSON.stringify(cartItems)
        );


    },[cartItems]);







    // Ajouter produit

    const addToCart = (product)=>{


        setCartItems(prev=>{


            const existing =
            prev.find(
                item =>
                item.id === product.id
            );



            if(existing){


                return prev.map(item=>

                    item.id === product.id

                    ?

                    {
                        ...item,
                        quantity:
                        item.quantity + 1
                    }

                    :

                    item

                );


            }



            return [

                ...prev,

                {

                    ...product,

                    quantity:1

                }

            ];


        });


    };







    // Supprimer produit

    const removeFromCart = (id)=>{


        setCartItems(

            prev=>

            prev.filter(

                item=>

                item.id !== id

            )

        );


    };







    // Augmenter quantité

    const increaseQuantity=(id)=>{


        setCartItems(

            prev=>

            prev.map(item=>


                item.id === id

                ?

                {

                    ...item,

                    quantity:
                    item.quantity + 1

                }

                :

                item


            )

        );


    };








    // Diminuer quantité

    const decreaseQuantity=(id)=>{


        setCartItems(

            prev=>

            prev.map(item=>{


                if(
                    item.id === id
                    &&
                    item.quantity > 1
                ){

                    return {

                        ...item,

                        quantity:
                        item.quantity - 1

                    };

                }


                return item;


            })

        );


    };








    // Vider panier

    const clearCart=()=>{


        setCartItems([]);


    };








    // Total panier

    const cartTotal = cartItems.reduce(

        (total,item)=>

        total +

        Number(item.price)
        *
        item.quantity

        ,

        0

    );







    return (

        <CartContext.Provider


        value={{

            cartItems,

            addToCart,

            removeFromCart,

            increaseQuantity,

            decreaseQuantity,

            clearCart,

            cartTotal

        }}


        >

            {children}


        </CartContext.Provider>


    );


}