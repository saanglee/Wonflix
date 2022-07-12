import { useRecoilState } from 'recoil';
import { sortData, pageData, isFilterData } from '../../../store/movies';
import './movieSort.scss';

const MovieSort = () => {
  const [values, setValues] = useRecoilState(sortData);
  const [pageNum, setPageNum] = useRecoilState(pageData);
  const [isFilter, setIsFilter] = useRecoilState(isFilterData);
  const sortOptions = [
    { name: '전체', value: '' },
    { name: '평점순', value: 'rating' },
    { name: '최신순', value: 'year' },
  ];

  const onHandleSort = (event) => {
    setValues(event.target.value);
    setPageNum(1);
    setIsFilter(true);
  };

  return (
    <div className='movie_sort'>
      <div className='select_wrap'>
        <select name='movieSort' id='movieSort' onChange={onHandleSort}>
          {sortOptions.map((option) => (
            <option key={`movies-option-${option.name}`} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default MovieSort;
