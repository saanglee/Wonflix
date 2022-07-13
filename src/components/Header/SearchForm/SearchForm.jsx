import { useEffect, useState } from 'react';
import './searchForm.scss';
import axios from 'axios';

const SearchForm = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [movies, setMovies] = useState(null);

  useEffect(() => {}, [movies]);

  const searchHandler = async (event) => {
    event.preventDefault();

    return await axios
      .get(`http://localhost:8000/movie?q=${searchKeyword}`)
      .then((response) => {
        setMovies(response.data);
        setSearchKeyword('');
      })
      .catch((error) => console.log(error));
  };

  return (
    <form onSubmit={searchHandler}>
      <div className='search_form'>
        <input
          type='text'
          className='search_form_input'
          placeholder='검색어를 입력해주세요.'
          value={searchKeyword}
          onChange={(event) => setSearchKeyword(event.target.value)}
          autoFocus
        />
        <button type='button' className='search_form_btn'>
          검색
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
