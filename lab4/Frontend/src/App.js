import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Header } from './components/Header'
import { DisplayBoard } from './components/DisplayBoard'

//----------------
import { Movies } from './components/Movies'
import CreateMovie from './components/CreateMovie'
import SearchMovie from './components/SearchMovie'
import DeleteMovie from './components/DeleteMovie';
import { getAllMovies, createMovie, searchMovie, deleteMovie } from
  './services/MovieService'

function App() {

  //--------------
  const [delete_data, setDelete_data] = useState({})
  const [search_data, setSearch_data] = useState({})
  const [movie, setMovie] = useState({})
  const [movies, setMovies] = useState([])
  const [numberOfMovies, setNumberOfMovies] = useState(0)

  const movieDelete = (e) =>{
    console.log(delete_data.delete_text);
    deleteMovie(delete_data.delete_text)
      .then(movies => {
        console.log(movies.data);
        setNumberOfMovies(numberOfMovies - 1)
      });

    fetchAllMovies(); /* */
  }
  const movieCreate = (e) => {

    createMovie(movie)
      .then(response => {
        console.log(response);
        setNumberOfMovies(numberOfMovies + 1)
      });

    fetchAllMovies(); /* */
  }


  const movieSearch = (e) => {

    console.log(search_data.search_text);

    searchMovie(search_data.search_text)
      .then(movies => {
        console.log(movies.data);
        setMovies(movies.data);
        setNumberOfMovies(movies.data.length);

      });

  }


  const fetchAllMovies = () => {
    getAllMovies()
      .then(movies => {
        console.log(movies);
        setMovies(movies);
        setNumberOfMovies(movies.length);
      });
  }


  useEffect(() => {

    getAllMovies()
      .then(movies => {
        console.log(movies)
        setMovies(movies);
        setNumberOfMovies(movies.length)
      });


  }, [])

  const onChangeForm = (e) => {
    if (e.target.name === 'title') {
      movie.title = e.target.value;
    } else if (e.target.name === 'genre') {
      movie.genre = e.target.value;
    } else if (e.target.name === 'director') {
      movie.director = e.target.value;
    } else if (e.target.name === 'release_year') {
      movie.release_year = e.target.value;
    }
    setMovie(movie)
  }


  const onChangeForm2 = (e) => {
    if (e.target.name === 'search_text') {
      search_data.search_text = e.target.value;
    }
    setSearch_data(search_data)
  }
  const onChangeForm3 = (e) => {
    if (e.target.name === 'delete_text') {
      delete_data.delete_text = e.target.value;
    }
    setDelete_data(delete_data)
  }


  return (
    <div className="App">
      <Header></Header>
      <div className="container mrgnbtm">
        <div className="row">
          <div className="col-md-8">
            <CreateMovie
              // user={user}
              movie={movie}
              onChangeForm={onChangeForm}
              createMovie={movieCreate}
            >
            </CreateMovie>
          </div>
          <div className="col-md-4">
            <DisplayBoard
              numberOfMovies={numberOfMovies}
              getAllMovies={fetchAllMovies}
            >
            </DisplayBoard>
          </div>
        </div>
      </div>
      <div className="row mrgnbtm">

        <SearchMovie
          // user={user}
          movie={movie}
          onChangeForm={onChangeForm2}
          searchMovie={movieSearch}
        >
        </SearchMovie>
        
        <DeleteMovie
          movie={movie}
          onChangeForm={onChangeForm3}
          deleteMovie={movieDelete}>
        </DeleteMovie>

        {/* <SearchBoard
          // user={user}
          search_data={search_data}
          onChangeForm2={onChangeForm2}
          searchMovies={searchMovie}
        >
        </SearchBoard> */}

      </div>
      <div className="row mrgnbtm">
        <Movies movies={movies}></Movies>
      </div>

    </div>
  );
}

export default App;
