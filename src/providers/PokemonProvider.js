import React, { useContext } from 'react'
import usePokemonsCollection from '../hooks/usePokemonsCollection';

export const PokemonContext = React.createContext(undefined);

export const PokemonProvider = ({ children }) => {
    const [{
        pokemons,
        filteredResults,
        sortAlpha,
        filterType,
        isSearching,
        searchingKeyword,
        pokemonDetailsMap},
        pokemonDispatch
    ] = usePokemonsCollection();

    return (
        <PokemonContext.Provider value={{
            pokemons,
            filteredResults,
            sortAlpha,
            filterType,
            isSearching,
            searchingKeyword,
            pokemonDetailsMap,
            pokemonDispatch,
        }} >
            {children}
        </PokemonContext.Provider>
    )
}

export const usePokemons = () => {
    const pokemonCtx = useContext(PokemonContext);
    if (!pokemonCtx) {
        throw new Error('Pokemons cannot be loaded.');
    }
    return pokemonCtx;
}
