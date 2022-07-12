import React, { useMemo } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useSearch } from '../../../api/useSearch';
import { keywordState } from '../../../store/search';
import { moviesData } from '../../../store/movies';
import { SearchIcon } from '../../../assets/svgs';
import './dropdown.scss';

const DropdownItems = ({ title }) => {
  // TODO: title공백 제거한걸로 비교
  const navigate = useNavigate();
  const [keyword, setKeyword] = useRecoilState(keywordState);
  const [movies, setMovies] = useRecoilState(moviesData);

  const handleClickTitle = (event) => {
    setKeyword(title);
    useSearch(title).then((result) => setMovies(result));
  };

  const markText = useMemo(() => {
    if (!keyword.length) {
      return <span />;
    }
    const splitKeyword = keyword.split('');
    const splitTitle = title.split('');

    const markStr = [];
    const spanStr = [];

    splitTitle.forEach((character, idx) => {
      if (!splitKeyword[idx]) {
        spanStr.push(character);
        return;
      }
      if (String(splitKeyword[idx]).toLowerCase() === title[idx].toLowerCase()) {
        markStr.push(character);
        return;
      }
      spanStr.push(character);
    });

    return (
      <>
        <span className='search_icon'>
          <SearchIcon style={{ width: '20px' }} />
        </span>
        <mark>{markStr.join('')}</mark>
        <span>{spanStr.join('')}</span>
      </>
    );
  }, [keyword, title]);

  return (
    // TODO: 돋보기 아이콘 넣기
    // TODO: 글자 수 넘어가면 ... 으로 보이게 하기
    <li className='dropdown_item' onClick={handleClickTitle} title={title}>
      {markText}
    </li>
  );
};

export default DropdownItems;

// TODO: title에 해당하는 영화 카드들만 화면에 띄우도록 하기
// TODO: dropdown 아이템 1개 클릭하면 해당 모달로 연결하기
