import { useRecoilValue } from 'recoil';
import { favoriteMoviesData } from '../../store/movies';
import Card from '../Movies/Card/Card';
import Modal from '../Modal';

const Favorites = () => {
  const favorites = useRecoilValue(favoriteMoviesData);

  return (
    <>
      <div className='movie_wrap'>
        <div className='movies'>
          {!!favorites.length || <span className='no_favorite_list'>즐겨찾기 내역이 없습니다</span>}
          {favorites?.map((favor) => (
            <Card key={favor.id} movie={favor} role='presentation' />
          ))}
        </div>
      </div>
      <Modal />
    </>
  );
};

export default Favorites;
