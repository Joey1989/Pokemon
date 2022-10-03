import { useEffect, useCallback } from 'react';
import { usePokemons } from "../providers/PokemonProvider.js"

export default function useInfiniteScroll(scrollRef, dispatch) {
    const { isSearching } = usePokemons();

    const scrollObserver = useCallback(
        node => {
            if (!isSearching) {
                new IntersectionObserver(entries => {
                    entries.forEach(en => {
                        if (en.intersectionRatio > 0) {
                        dispatch({ type: 'ADVANCE_PAGE' });
                        }
                    });
                }).observe(node);
            }
        },
        [dispatch, isSearching]
    );
  
    useEffect(() => {
        if (scrollRef.current) {
            scrollObserver(scrollRef.current);
        }
    }, [scrollObserver, scrollRef]);
}
