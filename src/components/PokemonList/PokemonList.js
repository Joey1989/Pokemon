import React, { useRef, useEffect } from "react";
import useFetching from "../../hooks/useFetching";
import useLazyLoading from "../../hooks/useLazyLoading";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { usePager } from "../../providers/PagerProvider";
import { usePokemons } from "../../providers/PokemonProvider.js"
import PokemonCard from "../PokemonCard/PokemonCard";

export default function PokemonList() {
  const { pager, pagerDispatch } = usePager();
  const { pokemons, filteredResults, sortAlpha, pokemonDispatch } = usePokemons();

  let bottomBoundaryRef = useRef(null);
  useFetching(pager.page, 30, pokemonDispatch);
  useLazyLoading('.card-img', filteredResults)
  useInfiniteScroll(bottomBoundaryRef, pagerDispatch);

  useEffect(() => {
    if (pokemons.length > 0) {
      pokemonDispatch({
        type: 'sortPokemon',
        payload: {
          data: sortAlpha
        }
      });
    }
  }, [pokemons, pokemonDispatch, sortAlpha]);

  return (
    <div className="">
      <div className="ListWrapper">
        {filteredResults.length > 0 && (
          <p>Showing {filteredResults.length} results:</p>
        )}
        {filteredResults.length === 0 && (
          <p>There's no matching results. Please search and filter again.</p>
        )}
        {filteredResults.map((item, i) => (
          <PokemonCard
            key={i}
            url={item.sprites.front_default}
            name={item.name}
            id={item.id}
            exp={item.base_experience}
            types={item.types}
          />
        ))}
      </div>
      <div ref={bottomBoundaryRef} />
    </div>
  );
}
