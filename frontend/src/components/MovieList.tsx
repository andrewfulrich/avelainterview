import React from 'react';
import MovieCard from './MovieCard';
import { Movie } from '../types';

interface Props {
  movies: Movie[];
  onLike: (id: number) => void;
}

const MovieList: React.FC<Props> = ({ movies, onLike }) => {
  return (
    <div className="movie-list">
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} onLike={onLike} />
      ))}
    </div>
  );
};

export default MovieList;
