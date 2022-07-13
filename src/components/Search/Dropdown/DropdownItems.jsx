import { useMemo } from 'react';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { useSearch } from '../../../api/useSearch';
import { keywordState, dropdownState, currentIndexState } from '../../../store/search';
import { moviesData } from '../../../store/movies';
import { SearchIcon } from '../../../assets/svgs';

import './dropdown.scss';
import cx from 'classnames';

const DropdownItems = ({ title, index }) => {
  const [keyword, setKeyword] = useRecoilState(keywordState);
  const setMovies = useSetRecoilState(moviesData);
  const setIsDropdownOpen = useSetRecoilState(dropdownState);
  const currentIndex = useRecoilValue(currentIndexState);

  const handleClickTitle = (event) => {
    useSearch(title).then((title) => setMovies(title));
    setKeyword(title);
    setIsDropdownOpen((current) => !current);
    setKeyword(title);
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
    <li className={cx('dropdown_item', { selectedDropDown: index === currentIndex })}>
      <div onClick={handleClickTitle} role='button' tabIndex={0} data-title={title}>
        {markText}
      </div>
    </li>
  );
};

export default DropdownItems;
