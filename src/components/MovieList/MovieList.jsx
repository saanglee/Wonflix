import React, { useEffect, useState } from 'react';
import { useGetAllMovies } from '../../api/useGetMovie';

function MovieList() {
  const { data } = useGetAllMovies();
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    if (data === undefined || data === null) return;
    setMovies(data);
  }, [data]);

  return (
    <div>
      {movies?.map((movie, index) => (
        <div key={index}>
          <p>{movie.title}</p>
        </div>
      ))}
    </div>
  );
}

export default MovieList;
