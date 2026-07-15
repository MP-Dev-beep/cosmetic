import { useEffect, useState } from "react";
import api from "../api/axios";
import CategoryCard from "./CategoryCard";

function CategoryList() {

    const [categories, setCategories] = useState([]);

    useEffect(() => {

        api.get("/categories/")
            .then((res) => {
                setCategories(res.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);

    return (

        <div className="container">

            <h1 className="title">
                Nos catégories
            </h1>

            <div className="categories-grid">

                {categories.map(category => (

                    <CategoryCard
                        key={category.id}
                        category={category}
                    />

                ))}

            </div>

        </div>

    );

}

export default CategoryList;