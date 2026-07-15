import { useEffect, useState } from "react";

import api from "../api/axios";

import ProductCard from "../components/ProductCard";


function ProductList({ title, filter }) {


    const [products, setProducts] = useState([]);



    useEffect(() => {

        let url = "/products/";


        if (filter) {

            url += filter;

        }


        api.get(url)

        .then(res => {

            setProducts(res.data.results || res.data);

        })

        .catch(error => {

            console.log(error);

        });


    }, [filter]);



    return (

        <section className="section">


            <div className="container">


                {

                    title &&

                    <h2 className="section-title">

                        {title}

                    </h2>

                }



                <div className="products-grid">


                    {

                    products.map(product => (

                        <ProductCard

                            key={product.id}

                            product={product}

                        />

                    ))

                    }


                </div>


            </div>


        </section>

    );


}


export default ProductList;