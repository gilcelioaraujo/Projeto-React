import { useState,useEffect } from "react";
import {useSearchParams} from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import "./MovieGrid.css"

const searchURL = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

const Search = () => {
  const [searchParams] = useSearchParams();
  const [movies,setMovies] = useState([]);
  const query = searchParams.get("q");

  const getMovies = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setMovies(data.results);
    
  }
  useEffect (() => {
    const url = `${searchURL}?${apiKey}&query=${query}`;
    
    getMovies(url);
  },[query]);

  return (
    <div className="container">
      <h2 className="title">
        Resultados para:
        <spa className= "query-text">{query}</spa>
      </h2>
      <div className="movies-container">
        {movies.map ((movie) =><MovieCard key={movie.id} movie={movie}/>)}
      </div>

    </div>

  )
}

export default Search