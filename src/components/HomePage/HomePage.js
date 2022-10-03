import React from 'react';
import PokemonFilterSection from '../PokemonFilterSection/PokemonFilterSection';
import PokemonList from '../PokemonList/PokemonList';

export default function HomePage() {
  return (
    <>
        <PokemonFilterSection />
        <PokemonList />
    </>
  )
}
