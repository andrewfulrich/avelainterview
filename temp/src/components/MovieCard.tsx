import React from 'react';
import { Movie } from '../types';

interface Props {
  movie: Movie;
  onLike: (id: number) => void;
}

const MovieCard: React.FC<Props> = ({ movie, onLike }) => {
  return (
    <div className="movie-card">
      <h2>{movie.title}</h2>
      <button onClick={() => onLike(movie.id)}>
        Likes: {movie.likes}
      </button>
    </div>
  );
};

export default MovieCard;