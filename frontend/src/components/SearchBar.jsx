import { useState } from "react";

function SearchBar() {

    const [search, setSearch] = useState("");

    return (

        <div className="search-bar">

            <input
                type="text"
                placeholder="Rechercher un produit..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <button>
                Rechercher
            </button>

        </div>

    );

}

export default SearchBar;