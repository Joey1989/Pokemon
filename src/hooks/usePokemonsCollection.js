import { useReducer } from 'react'

export default function usePokemonsCollection() {
    const dispatcher = function(pokemonsState, action) {
        let newFilteredResults = [];
        switch(action.type) {
            case 'fetch':
                return {
                    ...pokemonsState,
                    pokemons: [...pokemonsState.pokemons, ...action.payload.data],
                    filteredResults: [...pokemonsState.pokemons, ...action.payload.data]
                };
            case 'filterType':
                if (action.payload.data === 'reset') {
                    return {...pokemonsState, filteredResults: [...pokemonsState.pokemons], filterType: action.payload.data, isSearching: action.payload.data === 'reset' ? false : true};
                } else {
                    newFilteredResults = pokemonsState.pokemons.filter(pokemon => {
                        for(let i = 0; i < pokemon.types.length; i++) {
                            if(pokemon.types[i].type.name === action.payload.data) return true;
                        }
                        return false;
                    });
                    return {...pokemonsState, filteredResults: newFilteredResults, filterType: action.payload.data, isSearching: action.payload.data === 'reset' ? false : true};
                }
            case 'filterSearching':
                newFilteredResults = pokemonsState.filteredResults.filter(pokemon => {
                    return pokemon.name.toLowerCase().includes(action.payload.data);
                });
                return {...pokemonsState, filteredResults: newFilteredResults, isSearching: action.payload.data ? true : false, searchingKeyword: action.payload.data};
            case 'sortPokemon':
                switch(action.payload.data) {
                    case 'ID_DSC':
                        newFilteredResults = [...pokemonsState.filteredResults].sort((a, b) => {
                            return Number(b.id) - Number(a.id);
                        });
                        break;
                    case 'NAME_ASC':
                        newFilteredResults = [...pokemonsState.filteredResults].sort((a, b) => {
                            return a.name.localeCompare(b.name);
                        });
                        break;
                    case 'NAME_DSC':
                        newFilteredResults = [...pokemonsState.filteredResults].sort((a, b) => {
                            return b.name.localeCompare(a.name);
                        });
                        break;
                    default:
                        newFilteredResults = [...pokemonsState.filteredResults].sort((a, b) => {
                            return Number(a.id) - Number(b.id);
                        });
                }
                return {...pokemonsState, filteredResults: newFilteredResults, sortAlpha: action.payload.data};
            case 'setDetails':
                const newMap = new Map([...pokemonsState.pokemonDetailsMap]);
                newMap.set(action.payload.id, action.payload.data)
                return {...pokemonsState, pokemonDetailsMap: newMap};
            default:
                return {...pokemonsState};
        }
    }

    const [pokemonsState, dispatch] = useReducer(dispatcher, {
        pokemons: [],
        filteredResults: [],
        sortAlpha: 'ID_ASC',
        filterType: 'reset',
        isSearching: false,
        searchingKeyword: '',
        pokemonDetailsMap: new Map()
    });

    return [pokemonsState, dispatch];
}
