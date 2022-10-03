import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";
import { usePokemons } from "../../providers/PokemonProvider.js"
import StatBar from './components/StatBar';
import GoBackLink from './components/GoBackLink';

export default function PokemonDetail() {
    const { id } = useParams();
    const { pokemonDetailsMap, pokemonDispatch } = usePokemons();
    const [ pokemonData, setPokemonData ] = useState({});
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        // Load the pokemon details data from the state if it exists
        if (pokemonDetailsMap.has(id)) {
            setPokemonData(pokemonDetailsMap.get(id));
            setLoading(false);
        } else {// Load the pokemon details data from api if not it exists in state
            axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
            .then(pokemon => {
                if(pokemon.status !== 200) throw Error('Cannot load pokemon details.');
                setPokemonData(pokemon.data);
                setLoading(false);
                // Save the pokemon details data into the state if it's new
                pokemonDispatch({
                    type: 'setDetails',
                    payload: {
                        id: id,
                        data: pokemon.data
                    }
                });
            });
        }
    },[id, pokemonDetailsMap, pokemonDispatch]);

    if(loading) {
        return (<div>Loading...</div>)
    } else {
        return (
            <div className='PokemonDetailPage'>
                <GoBackLink destination={`<- Go back to homepage page`} url={`/home`} />
                <div className='InfoSection'>
                    <div className='ImageSection'>
                        {!pokemonData.sprites.other['official-artwork'].front_default && <img
                            alt='pokemon placeholder'
                            src={pokemonData.sprites.other.home.front_default}
                            data-src={pokemonData.sprites.other.home.front_default}
                            className='detail-img'
                        />}
                        {pokemonData.sprites.other['official-artwork'].front_default && <img
                            alt='pokemon bio'
                            src={pokemonData.sprites.other['official-artwork'].front_default}
                            data-src={pokemonData.sprites.other['official-artwork'].front_default}
                            className='detail-img'
                        />}
                    </div>
                    <div className='DataSection'>
                        <h1>{pokemonData.name}</h1>
                        <table className='InfoTable'>
                            <tbody>
                                <tr>
                                    <td>National No.</td>
                                    <td>{pokemonData.id}</td>
                                </tr>
                                <tr>
                                    <td>Type</td>
                                    <td className='CardType'>
                                        {pokemonData.types.map((type, index) => (
                                            <div key={index} className={`bg-${type.type.name}`}>{type.type.name}</div>
                                        ))}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Height</td>
                                    <td>{pokemonData.height/10} m</td>
                                </tr>
                                <tr>
                                    <td>Weight</td>
                                    <td>{pokemonData.weight/10} kg</td>
                                </tr>
                                <tr>
                                    <td>Abilities</td>
                                    <td>
                                        <ol>
                                            {pokemonData.abilities.map((ability, index) => (
                                                <li key={index}>
                                                    {ability.ability.name}
                                                    {ability.is_hidden && (
                                                        <span>(hidden ability)</span>
                                                    )}
                                                </li>
                                            ))}
                                        </ol>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Base EXP</td>
                                    <td>{pokemonData.base_experience}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='StatsSection'>
                    <h1>Base Stats</h1>
                    <table className='StatsTable'>
                        <tbody>
                            {pokemonData.stats.map((stat, index) => (
                                <tr className='StatRow' key={index}>
                                    <td className='StatName'>{stat.stat.name}</td>
                                    <td>{stat.base_stat}</td>
                                    <td>
                                        <StatBar size={stat.base_stat} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
