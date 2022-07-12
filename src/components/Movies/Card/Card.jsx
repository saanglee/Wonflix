import React from 'react';
import { useRecoilState } from 'recoil';
import ModalContent from '../ModalContent/ModalContent';
import { useModifyModal } from '../../../store/modal';
import { moviesData } from '../../../store/movies';
import { useDebounce } from '../../../hooks/useDebounce';
import { useUpdateFavorite } from '../../../api/useUpdateFavorite';
import { replaceItemAtIndex } from '../../../util/replaceItemAtIndex';
import './card.scss';

const Card = ({ movie }) => {
  const { openModal } = useModifyModal();
  const [movies, setMovies] = useRecoilState(moviesData);

  const openModalWithData = () =>
    openModal({
      children: <ModalContent movie={movie} />,
      onSubmit: (movie) => toggleFavorite(movie),
    });

  // TODO: id를 전달받아 그 값만 갱신하는 selector 찾기
  // => 없으면 그냥 진행
  const toggleFavorite = async (movie) => {
    const index = movies.findIndex((movieData) => movieData.id === movie.id);
    let updateMovies = replaceItemAtIndex(movies, index, {
      ...movie,
      like: !movie.like,
    });
    setMovies(updateMovies);

    const response = await useUpdateFavorite(movie);

    if (response.ok) return;
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

// TODO: recoil에서 특정 값을 변경할 때 사용되는 util함수
// => Object일 때 useRecoilState쓸 때 계속 쓰임 -> util로 이동

// 하지만... 분명 하나만 수정하는 방식이 있을듯한데.. 진짜 selector 없나..?
//  캐싱된다는데 대체 어떻게 캐싱되는거지...?
// function replaceItemAtIndex(arr, index, newValue) {
//   return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
// }
