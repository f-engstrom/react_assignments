import React, {useContext, useEffect, useState} from "react";
import Fuse from "fuse.js";
import BrowserCache from "../../shared/utils/BrowserCache";
import {PokemonContext} from "../../shared/provider/PokemonProvider";
import "./PokemonList.css";

interface pokemonListResponse {
    name: string,
    url: string
}

export const PokemonListView = (props: any) => {

    const [pokemon, setPokemon] = useState<pokemonListResponse[]>();
    const [chosenPokemon, setChosenPokemon] = useContext(PokemonContext);
    const allPokemonString = localStorage.getItem(BrowserCache.allPokemon);
    const [page, setPage] = useState(1);
    let allPokemon: [] = [];
    allPokemon = JSON.parse(allPokemonString as string);
    const fuse = new Fuse(allPokemon, {keys: ['name']})

    console.log("list view props", props);

    let query = props.query;


    const paginator = (pokemon: any) => {


        console.log("pagina",pokemon);
        return pokemon.slice(page, page+15);

        

    }


    const getPokemon = async (query: string) => {


        let page:[] =[];
        
        if (query) {


            const foundPokemon = fuse.search(query) as {refIndex:number,item: { name:string,url:string }}[];
            let found:{item:object, refIndex:number}[] =[];
            found = foundPokemon as [];
            console.log("found pokemon", foundPokemon);
         
            const res = foundPokemon.map(({item, ...r}) => (
                {
                    name: item.name,
                    url:item.url
                }
            ));

            console.log("res",res);
            page = paginator(res);
            
        } else {

            console.log("all pkmn", allPokemon);
            console.log("page", page);
            page = paginator(allPokemon);
            
        }
         setPokemon(page);


    };

    useEffect(() => {

        console.log("list query", query);
        console.log("page",page);
        getPokemon(query);


    }, [props.query, page]);

    if (!pokemon) return (<div>loading</div>)

    return (
        <div>

            <ul className="list-group">
                {(pokemon || []).map((pokemon: any) => {
                    return <li onClick={(e: any) => {
                        setChosenPokemon(e.target.innerHTML)
                    }} className="list-group-item">
                        {pokemon.name}
                    </li>
                })}
            </ul>
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item">
                        <button onClick={() => {
                            if (page > 1) setPage(page - 1)
                        }} className="page-link">Previous
                        </button>
                    </li>
                    <li className="page-item">
                        <button onClick={() => {
                            setPage(page + 1)
                        }} className="page-link">Next
                        </button>
                    </li>
                </ul>
            </nav>
        </div>

    )

}