import React, { useEffect, useState } from 'react';
import { useGetFavoriteMovies } from '../../api/useGetMovie';

const Favorites = () => {
  const { data } = useGetFavoriteMovies();
  const [favorites, setFvorites] = useState(null);

  useEffect(() => {
    if (data === null || data === undefined) return;
    setFvorites(data);
  }, [data]);

  return (
      <div>
          {favorites?.map((favor, index) => (
              <div key={index}>
                  <img src={favor.medium_cover_image} alt={favor.title} />
                  {favor.title}
              </div>
      ))}
      </div>
  );
};

export default Favorites;
