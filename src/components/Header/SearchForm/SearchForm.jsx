import React, { useEffect, useState } from 'react';
import './searchForm.scss';
import axios from 'axios';

const SearchForm = () => {
  const [word, setWord] = useState('');
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    //이걸로 뽑아 쓰시면 됩니다
    console.log(movies);
  }, [movies]);

  const searchHandler = async (event) => {
    event.preventDefault();

    return await axios
      .get(`http://localhost:8000/movie?q=${word}`)
      .then((response) => {
        setMovies(response.data);
        setWord('');
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
          value={word}
          onChange={(event) => setWord(event.target.value)}
        />
        <button type='button' className='search_form_btn'>
          검색
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
