import React from 'react';
import { useRecoilState } from 'recoil';
import { useModal } from '../Modal';
import { useUpdateFavorite } from '../../api/useUpdateFavorite';
import { replaceItemAtIndex } from '../../util/replaceItemAtIndex';
import ModalContent from '../ModalContent/ModalContent';
import './card.scss';

const Card = ({ movie, atom }) => {
  const [openModal] = useModal();
  const [movies, setMovies] = useRecoilState(atom);

  const openModalWithData = () =>
    openModal({
      children: <ModalContent movie={movie} />,
      onSubmit: (movie) => toggleFavorite(movie),
    });

  const toggleFavorite = async (movie) => {
    const index = movies.findIndex((movieData) => movieData.id === movie.id);
    let updateMovies = replaceItemAtIndex(movies, index, {
      ...movie,
      like: !movie.like,
    });
    setMovies(updateMovies);

    const { status } = await useUpdateFavorite(movie);

    if (status === 200) return;
    updateMovies = replaceItemAtIndex(movies, index, {
      ...movie,
      like: !movie.like,
    });
    setMovies(updateMovies);
  };

  return (
    <>
      <div className='card'>
        <div className='card_img' onClick={openModalWithData}>
          <img src={movie.medium_cover_image} alt={movie.title} />
        </div>
        <h1 className='card_title' onClick={openModalWithData}>
          {movie.title}
        </h1>
        <div className='card_favor'>
          <input
            type='checkbox'
            name='favor'
            id={`favor${movie.id}`}
            onChange={() => toggleFavorite(movie)}
            checked={movie.like}
          />
          <label htmlFor={`favor${movie.id}`}></label>
        </div>
      </div>
    </>
  );
};

export default React.memo(Card);
