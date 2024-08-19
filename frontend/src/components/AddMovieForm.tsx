import React, { useState } from 'react';

interface Props {
  onAddMovie: (title: string) => void;
}

const AddMovieForm: React.FC<Props> = ({ onAddMovie }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddMovie(title.trim());
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter movie title"
      />
      <button type="submit">Add Movie</button>
    </form>
  );
};

export default AddMovieForm;