import React, { useState, useEffect } from 'react';
import MovieList from './components/MovieList';
import AddMovieForm from './components/AddMovieForm';
import { Movie } from './types';

const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const response = await fetch('http://localhost:3001/api/movies');
    const data = await response.json();
    setMovies(data);
  };

  const handleAddMovie = async (title: string) => {
    const response = await fetch('http://localhost:3001/api/movies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    });
    const newMovie = await response.json();
    setMovies([...movies, newMovie]);
  };

  const handleLike = async (id: number) => {
    const response = await fetch(`http://localhost:3001/api/movies/${id}/like`, {
      method: 'PUT',
    });
    const updatedMovie = await response.json();
    setMovies(movies.map(movie => movie.id === id ? updatedMovie : movie));
  };

  return (
    <div className="App">
      <h1>Movie List</h1>
      <AddMovieForm onAddMovie={handleAddMovie} />
      <MovieList movies={movies} onLike={handleLike} />
    </div>
  );
};

export default App;