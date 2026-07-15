import { Link } from "react-router-dom";

function HeroBanner() {

    return (

        <section className="hero">

            <div className="container hero-content">

                <h1>BeautyGlow ✨</h1>

                <h2>Révélez votre beauté naturelle</h2>

                <p>
                    Découvrez notre sélection de soins,
                    maquillages, parfums et produits capillaires
                    pour révéler votre éclat au quotidien.
                </p>

                <Link
                    to="/products"
                    className="hero-btn"
                >
                    Découvrir nos produits
                </Link>

            </div>

        </section>

    );

}

export default HeroBanner;