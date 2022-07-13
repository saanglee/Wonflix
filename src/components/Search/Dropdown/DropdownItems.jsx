import React, { useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { useSearch } from '../../../api/useSearch';
import { keywordState, dropdownState, curIdxState } from '../../../store/search';
import { moviesData } from '../../../store/movies';
import { SearchIcon } from '../../../assets/svgs';
import './dropdown.scss';
import cx from 'classnames';

const DropdownItems = ({ title, index }) => {
  const [keyword, setKeyword] = useRecoilState(keywordState);
  const [movies, setMovies] = useRecoilState(moviesData);
  const [isDropdownOpen, setIsDropdownOpen] = useRecoilState(dropdownState);
  const [currentIdx, setCurrentIdx] = useRecoilState(curIdxState);

  const handleClickTitle = (event) => {
    useSearch(title).then((title) => setMovies(title));
    setKeyword(title);
    setIsDropdownOpen((current) => !current);
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
          <SearchIcon style={{ width: '30px', paddingRight: '10px' }} />
        </span>
        <mark>{markStr.join('')}</mark>
        <span>{spanStr.join('')}</span>
      </>
    );
  }, [keyword, title]);

  return (
    <li className={cx('dropdown_item', { selectedDropDown: index === currentIdx })}>
      <div onClick={handleClickTitle} role='button' tabIndex={0} data-title={title}>
        {markText}
      </div>
    </li>
  );
};

export default DropdownItems;
