import React, { useEffect, useState } from 'react';
import { usePokemons } from '../../providers/PokemonProvider.js';
import { InputField } from '../../shared/components/InputField';
import { SelectField } from '../../shared/components/SelectField';
import { RadioButtonGroup } from '../../shared/components/RadioButtonGroup';
import SORTING_OPTIONS from '../../shared/constants/sortingOptions';
import POKEMON_TYPES from '../../shared/constants/pokemonTypes';

export default function PokemonFilterSection() {
    const { filterType, sortAlpha, searchingKeyword, pokemonDispatch } = usePokemons();
    const [ sortOrder, setSortOrder ] = useState(sortAlpha);
    const [ filteringType, setFilteringType ] = useState(filterType);
    const [ searchField, setSearchField ] = useState(searchingKeyword);

    useEffect(() => {
        pokemonDispatch({
            type: 'filterType',
            payload: {
                data: filteringType
            }
        });
        if (searchField.length) {
            pokemonDispatch({
                type: 'filterSearching',
                payload: {
                    data: searchField
                }
            });
        }
        pokemonDispatch({
            type: 'sortPokemon',
            payload: {
                data: sortOrder
            }
        });
    }, [sortOrder, filteringType, searchField, pokemonDispatch]);

    return (
        <div className='FilterComponent'>
            <div className='SearchSection'>
                <div className='SearchWrapper'>
                    <InputField
                        name=' Search pokemon'
                        value={searchField}
                        setter={setSearchField}
                    />
                    <label>Use this input to search for any pokemon, in an instant.</label>
                </div>
            </div>
            <div className='FilterSection'>
                <div className='TypeWrapper'>
                    <RadioButtonGroup
                        name='sortType'
                        label='Filter by type:'
                        options={POKEMON_TYPES}
                        selected={filteringType}
                        setter={setFilteringType}
                    />
                </div>
                <div className='SortWrapper'>
                    <SelectField
                        name='sort by id'
                        value={sortOrder}
                        setter={setSortOrder}
                        options={SORTING_OPTIONS}
                    />
                </div>
            </div>
        </div>
    )
}
