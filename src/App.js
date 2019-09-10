import React, { useState, useEffect } from 'react';
import PokemonList from './PokemonList';
import Pagination from './Pagination';
import axios from 'axios';
import './App.css';


function App() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
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
      setPokemon(res.data.results.map(p => {
        return p.name[0].toUpperCase() + p.name.slice(1);
      }));
    })

    return () => cancel(); //avoid race condition
  }, [currentPageUrl]);

  function gotoPreviousPage() {
    setCurrentPageUrl(prevPageUrl);
  }

  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl);
  }
  
  if(loading) return <div className="loading">Loading...</div>

  return (
    <div className="app">
      <PokemonList pokemon={pokemon} />
      <Pagination 
        gotoPreviousPage={prevPageUrl ? gotoPreviousPage : null} 
        gotoNextPage={nextPageUrl ? gotoNextPage : null}
      />
    </div>
  );
}

export default App;
