import { useEffect} from 'react';
import axios from "axios";
import { usePokemons } from "../providers/PokemonProvider.js"

// make API calls and pass the returned data via dispatch
export default function useFetching(offset, limit, dispatch) {
    const { pokemons, isSearching } = usePokemons();

    useEffect(() => {
        async function fetchData() {
            if (pokemons.length === offset) {
                const res = await axios.get(
                    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
                );
                let fetchedPokemons = [];
                res.data.results.map(result => {
                    axios.get(result.url).then(pokemon => {
                        fetchedPokemons.push(pokemon.data);
                        // Dispatch only when all individual api calls finishes
                        if(fetchedPokemons.length === limit) {
                            dispatch({
                                type: 'fetch',
                                payload: {
                                    data: fetchedPokemons
                                }
                            });
                        }
                    });
                    return null;
                });
            }
        }
        if(!isSearching) {
            fetchData();
        }
    }, [dispatch, offset, limit, isSearching, pokemons])
}