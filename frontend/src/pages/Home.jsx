import HeroBanner from "../components/HeroBanner";

import SearchBar from "../components/SearchBar";

import CategoryList from "../categories/CategoryList";

import ProductList from "../products/ProductList";


function Home(){


return (

<>


<HeroBanner />


<div className="container">

    <SearchBar />

</div>



<section className="section">

    <h2 className="section-title">

        🌸 Nos catégories

    </h2>


    <CategoryList />


</section>


<ProductList

    title="🔥 Produits populaires"

    filter="?ordering=-stock"

/>


<ProductList

    title="🆕 Nouveautés"

    filter="?ordering=-created_at"

/>


<ProductList

    title="🎁 Promotions"

    filter="?discount=true"

/>

</>


);


}


export default Home;