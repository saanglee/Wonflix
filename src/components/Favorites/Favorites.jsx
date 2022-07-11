import React, { useEffect, useState } from 'react';
import { useGetFavoriteMovies } from '../../api/useGetMovie';
import Card from '../Movies/Card/Card';
import Modal from '../Modal';

const Favorites = () => {
  const { data } = useGetFavoriteMovies();
  const [favorites, setFvorites] = useState(null);

  useEffect(() => {
    if (data === null || data === undefined) return;
    setFvorites(data);
  }, [data]);
  return (
    <>
    <div className='movies'>
      {favorites?.map((favor) => (
        <Card key={favor.id} movie={favor} role='presentation' />
      ))}
    </div>
       <Modal />
       </>
  );
};

export default Favorites;
