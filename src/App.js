import React, { useState, useEffect } from 'react';
import PokemonList from './PokemonList';
import Pagination from './Pagination';
import axios from 'axios';


function App() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setPageUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [prevPageUrl, setPrevPageUrl] = useState(null);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let cancel;
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    })
    .then(res => {
      setLoading(false);
      setPrevPageUrl(res.data.previous);
      setNextPageUrl(res.data.next);
      setPokemon(res.data.results.map(p => p.name));
    })

    return () => cancel(); //avoid race condition
  }, [currentPageUrl]);
  
  if(loading) return "Loading..."

  return (
    <>
    <PokemonList pokemon={pokemon} />
    <Pagination prevPageUrl={prevPageUrl} nextPageUrl={nextPageUrl} />
    </>
  );
}

export default App;
