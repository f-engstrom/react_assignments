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
    const [clickedListItem, setClickedListItem] =useState();
    let allPokemon: [] = [];
    allPokemon = JSON.parse(allPokemonString as string);
    const fuse = new Fuse(allPokemon, {keys: ['name']})


    let query = props.query;


    const paginator = (pokemon: any) => {


        return pokemon.slice(page, page + 15);


    }

    const toggleActive = (e:any)=>{
        
        
        
        if(clickedListItem){ // @ts-ignore
            clickedListItem.classList.remove("active")
        }
        
        e.target.className += " active";
        
        setClickedListItem(e.target);
        
        
    }

    const getPokemon = async (query: string) => {


        let page: [] = [];

        if (query) {


            const foundPokemon = fuse.search(query) as { refIndex: number, item: { name: string, url: string } }[];
            let found: { item: object, refIndex: number }[] = [];
            found = foundPokemon as [];
            console.log("found pokemon", foundPokemon);

            const res = foundPokemon.map(({item, ...r}) => (
                {
                    name: item.name,
                    url: item.url
                }
            ));

            console.log("res", res);
            page = paginator(res);

        } else {

            console.log("all pkmn", allPokemon);
            console.log("page", page);
            page = paginator(allPokemon);

        }
        setPokemon(page);


    };

    useEffect(() => {

       
        getPokemon(query);


    }, [props.query, page]);

    if (!pokemon) return (<div>loading</div>)

    return (
        <div className="">

            <ul className="list-group" onClick={((e:any) => {toggleActive(e)})} >
                {(pokemon || []).map((pokemon: any) => {
                    return <li key={pokemon.name} id={pokemon.name} onClick={(e: any) => {
                        setChosenPokemon(e.target.innerHTML)
                    }} className="list-group-item " >
                        {pokemon.name}
                    </li>
                })}
            </ul>
            <nav aria-label="Page navigation ">

                <button onClick={() => {
                    if (page > 1) setPage(page - 1)
                }} className="btn ">Previous
                </button>


                <button onClick={() => {
                    setPage(page + 1)
                }} className="btn ">Next
                </button>

            </nav>
        </div>

    )

}