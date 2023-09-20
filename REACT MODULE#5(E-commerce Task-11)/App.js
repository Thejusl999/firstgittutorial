import React, { useState,useEffect,useCallback } from "react";
import MoviesList from "./components/MoviesList";
import "./App.css";
import InputForm from "./components/InputForm";

const App=()=>{
  const [movies, setMovies] = useState([]);
  const [isLoading,setIsLoading]=useState(false);
  const [error,setError]=useState(null);
  
  const fetchMoviesHandler=useCallback(async()=>{
    setIsLoading(true);
    setError(null);
    try{
      const response = await fetch("https://react-http-a5c75-default-rtdb.firebaseio.com/movies.json");
      if(!response.ok){
        throw new Error('Something went wrong!');
      }
      const data = await response.json();
      const loadedMovies=[];
      for(const key in data){
        loadedMovies.push({
          id:key,
          title:data[key].title,
          openingText:data[key].openingText,
          releaseDate:data[key].date,
        });
      }
      setMovies(loadedMovies);
    }catch(error){
      setError(error.message);
    }
    setIsLoading(false);
  },[]);
  useEffect(()=>{
    fetchMoviesHandler();
  },[fetchMoviesHandler])

  async function addMovieHandler(movie){
    await fetch('https://react-http-a5c75-default-rtdb.firebaseio.com/movies.json',{
      method:'POST',
      body: JSON.stringify(movie),
      headers:{
        'Content-Type':'application/json'
      }
    });
    fetchMoviesHandler();
  }

  function deleteMovieHandler(title){
    movies.map(async(movie)=>{
      if(movie.title===title){
        await fetch(`https://react-http-a5c75-default-rtdb.firebaseio.com/movies/${movie.id}.json`,{
          method:'DELETE',
          headers:{
            'Content-Type':'application/json'
          }
        });
        fetchMoviesHandler();
      }
    })
  }
  let content=<p>Found no movies.</p>
  if(movies.length>0)
    content=<MoviesList movies={movies} onDeleteMovie={deleteMovieHandler}/>;
  if(error)
    content=<p>{error}</p>
  if(isLoading)
    content=<p>Loading...</p>;

  return (
    <React.Fragment>
      <section>
        <InputForm onAddMovie={addMovieHandler}/>
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}
export default App;