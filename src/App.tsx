import React, {useEffect} from 'react';
import {Routes} from "./Routes/Routes";
import 'bootstrap/dist/css/bootstrap.min.css';
import {PokemonProvider} from "./shared/provider/PokemonProvider";
import BrowserCache from "./shared/utils/BrowserCache";
import { NavBar } from './components/navbar/NavBar';
import "./shared/css/GlobalCss.css"



function App() {


    const getPokemonData = async () => {

        let href = "https://pokeapi.co/api/v2/pokemon?limit=1117";
        
        try {

            let response = await fetch(href);
            let body = await response.json();
            console.log("getting all pokemon", body);
            localStorage.setItem("allPokemon",JSON.stringify(body.results));


        } catch (error) {

            console.log("oh no", error);
        }

    };
    
    useEffect(()=>{

        if(!localStorage.getItem(BrowserCache.allPokemon)) getPokemonData();
        
    },[]);
    
    return (

        <div className="container">
            
            <PokemonProvider>
                <Routes>
                    <NavBar/>

                </Routes>
            </PokemonProvider>

        </div>
    );
}

export default App;
