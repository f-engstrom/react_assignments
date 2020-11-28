import React, {useState, createContext} from "react";

const value: any = [];

export const PokemonContext = createContext(value);

export const PokemonProvider = (props: any) => {

    const [chosenPokemon, setChosenPokemon] = useState();
    
    return (
        <PokemonContext.Provider value={[chosenPokemon, setChosenPokemon]}>
            {props.children}
        </PokemonContext.Provider>
    );
};