import React, { useState } from "react";
import MoviesList from "./components/MoviesList";
import "./App.css";
var retryCancelled=false;
const App=()=>{
  const [movies, setMovies] = useState([]);
  const [isLoading,setIsLoading]=useState(false);
  const [error,setError]=useState(null);
  let retryTimer;
  const fetchHandler=()=>{
    retryCancelled=false;
    content=<p>Loading...</p>;
    fetchMoviesHandler();
  }
  async function fetchMoviesHandler() {
    clearTimeout(retryTimer);
    setIsLoading(true);
    setError(null);
    try{
      const response = await fetch("https://swapi.dev/api/filmss/");
      if(!response.ok){
        throw new Error('Something went wrong ....Retrying');
      }
      const data = await response.json();
      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedMovies);
    }catch(error){
      setError(error.message);
      if(!retryCancelled)
        retryTimer=setTimeout(fetchMoviesHandler,5000);
    }
    setIsLoading(false);
  }
  
  let content=<p>Found no movies.</p>;
  const cancelRetrying=()=>{
    retryCancelled=true;
    clearTimeout(retryTimer);
  }
  if(movies.length>0)
    content=<MoviesList movies={movies}/>;
  if(error){
    content=<p>{error} <button onClick={cancelRetrying}>Cancel</button></p>
  }
  if(isLoading)
    content=<p>Loading...</p>;

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchHandler}>Fetch Movies</button>
      </section>
      <section>
        {!retryCancelled?content:<p>Found no movies.</p>}
      </section>
    </React.Fragment>
  );
}
export default App;