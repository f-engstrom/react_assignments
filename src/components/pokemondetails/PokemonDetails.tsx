import React, {useContext, useEffect, useState} from "react";
import {PokemonContext} from "../../shared/provider/PokemonProvider";
import "./PokemonDetails.css";
import pokeball from '../../shared/images/pokeball.gif'

export const PokemonDetailsView = () => {


    const [pokemon, setPokemon] = useState<Pokemon>();
    const [chosenPokemon, setChosenPokemon] = useContext(PokemonContext);


    const getPokemonData = async (name: string) => {

        try {

            let response = await fetch("https://pokeapi.co/api/v2/pokemon" + `/${name}`);
            let body = await response.json();
            console.log("response", body);
            setPokemon({
                name: body.name,
                speed: body.stats[0].base_stat,
                def: body.stats[3].base_stat,
                atk: body.stats[4].base_stat,
                hp: body.stats[5].base_stat,
                weight: body.weight,
                img: body.sprites.other['official-artwork'].front_default
            });


        } catch (error) {

            console.log("oh no", error);
        }

    };

    useEffect(() => {

        console.log("chosen pokemon in details", chosenPokemon);
        getPokemonData(chosenPokemon);


    }, [chosenPokemon]);


    if (!pokemon) return (<div><img className="center" src={pokeball} alt="loading.."/></div>)

    return (<div>


        <img src={pokemon.img} className="center" alt=""/>

        <table className="table">
            <thead>
            <tr>
                <th scope="col">Base</th>
                <th scope="col">Stats</th>
            
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>Name</td>
                <td>{pokemon.name}</td>
            </tr>
            <tr>
                <td>Attack</td>
                <td>{pokemon.speed}</td>
               
            </tr>
            <tr>
                <td>Defence</td>
                <td>{pokemon.def}</td>
            </tr>
            <tr>
                <td>Hp</td>
                <td>{pokemon.hp}</td>
            </tr>
            <tr>
                <td>Weight</td>
                <td>{pokemon.weight}</td>
            </tr>
            </tbody>
        </table>

    </div>)
}


interface Pokemon {
    name: string,
    speed: string,
    def: string,
    atk: string,
    hp: string,
    weight: string,
    img: string,

}

