import React, { useEffect, useMemo } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { moviesData, keywordState, dropdownState } from '../../../store/search';
import DropdownItems from './DropdownItems';
import './dropdown.scss';
import cx from 'classnames';

const Dropdown = () => {
  const keyword = useRecoilValue(keywordState);
  const movies = useRecoilValue(moviesData);
  const [openDropdown, setOpenDropdown] = useRecoilState(dropdownState);
  const movieTitles = movies.map((movie) => movie.title);

  const filteredTitles = useMemo(
    (element) => {
      return movieTitles.filter((title) => title.toLowerCase().startsWith(keyword.toLowerCase()));
    },
    [keyword]
  );

  return (
    <section className={cx('dropdown', { false_hidden: openDropdown })}>
      {/*FIXME: 추천 검색어 끄기 */}
      <div className='dropdown_list'>
        {keyword.length === 0 ? (
          <span>검색 기록이 없습니다.</span>
        ) : (
          <div>
            {filteredTitles.map((title) => {
              return (
                <ul key={title}>
                  <DropdownItems title={title} />
                </ul>
              );
            })}
          </div>
        )}
      </div>
      <button
        type='button'
        className='dropdown_close'
        onClick={() => {
          setOpenDropdown(false);
        }}
      >
        추천 검색어 끄기
      </button>
    </section>
  );
};

export default Dropdown;
