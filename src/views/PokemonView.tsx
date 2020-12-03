import React, {useContext} from "react";
import {PokemonContext} from "../shared/provider/PokemonProvider";
import {useLocation} from "react-router-dom";
import {PokemonListView} from "../components/pokemonlist/PokemonList";
import {PokemonDetailsView} from "../components/pokemondetails/PokemonDetails";
import {Search} from "../components/search/Search";

export const PokemonView = () => {
    
    const [chosenPokemon,setChosenPokemon] = useContext(PokemonContext);
    const query = new URLSearchParams(useLocation().search);

    return (
        
        <div className="container">
        <div className="row">

            <div className="col-md-4" style={{borderStyle: "solid",borderWidth:20, borderColor: "#003a70"}}>

                <Search/>
                
                <PokemonListView query={query.get("name")} />
            </div>
            <div className="col-md-8" style={{borderStyle: "solid", borderWidth: 20,borderColor:"#003a70"}}>
                <PokemonDetailsView/>

            </div>

        </div>
    </div>)

}