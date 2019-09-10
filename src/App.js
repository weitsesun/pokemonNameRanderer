import React, { useState, useEffect } from 'react';
import PokemonList from './PokemonList';
import Pagination from './Pagination';
import axios from 'axios';


function App() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setPageUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [prevPageUrl, setPrevPageUrl] = useState(null);
  const [nextPageUrl, setNextPageUrl] = useState(null);

  useEffect(() => {
    axios.get(currentPageUrl)
    .then(res => {
      setPrevPageUrl(res.data.previous);
      setNextPageUrl(res.data.next);
      setPokemon(res.data.results.map(p => p.name));
    })
  }, [currentPageUrl]);
  

  return (
    <PokemonList pokemon={pokemon} />
  );
}

export default App;
