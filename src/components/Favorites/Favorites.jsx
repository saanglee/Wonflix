import { useRecoilState } from 'recoil';
import { favoriteMoviesData } from '../../store/movies';
import { useGetFavoriteMovies } from '../../api/useGetMovie';
import Card from '../Card/Card';

const Favorites = () => {
  const [favorites, setFavorites] = useRecoilState(favoriteMoviesData);
  useGetFavoriteMovies().then((result) => setFavorites(result));

  return (
    <>
      <div className='movie_wrap'>
        <div className='movies'>
          {!!favorites.length || <span className='no_favorite_list'>즐겨찾기 내역이 없습니다</span>}
          {favorites?.map((favor) => (
            <Card key={favor.id} movie={favor} atom={favoriteMoviesData} role='presentation' />
          ))}
        </div>
      </div>
    </>
  );
};

export default Favorites;
