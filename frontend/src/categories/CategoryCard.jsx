import { Link } from "react-router-dom";


function CategoryCard({ category }) {


    return (

        <div className="category-card">


            <div className="category-icon">

                🌸

            </div>


            <h3>

                {category.name}

            </h3>


            <p>

                Découvrez nos produits de cette catégorie.

            </p>


            <Link

                to={`/categories/${category.id}`}

                className="category-btn"

            >

                Voir les produits

            </Link>


        </div>

    );


}


export default CategoryCard;