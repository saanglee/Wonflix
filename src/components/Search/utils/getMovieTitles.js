import { useSearch } from '../../../api/useSearch';
import { useDebounce } from '../../../hooks/useDebounce';
import { moviesData } from '../../../store/movies';
import { keywordState } from '../../../store/search';
import { useRecoilState } from 'recoil';

const [movies, setMovies] = useRecoilState(moviesData);
const [keyword, setKeyword] = useRecoilState(keywordState);
