# Header
```jsx
import React, { useEffect, useState, useRef } from 'react';
import './header.scss';
import Search from '../Search/Search';
import { useRecoilState } from 'recoil';

import { useNavigate } from 'react-router-dom';
import { useThrottle } from '../../hooks/useThrottle';

const Header = () => {
  const navigate = useNavigate();
  const throttleScroll = useThrottle(handleScroll, 200);

  // scrolls
  const [hide, setHide] = useState(false);
  const [pageY, setPageY] = useState(0);

  // console.log(pageY);

  const documentRef = useRef(document);

  function handleScroll(event) {
    event.stopPropagation();
    const { pageYOffset } = window;
    const deltaY = pageYOffset - pageY;
    const hide = pageYOffset !== 0 && deltaY >= 0;
    setHide(hide);
    setPageY(pageYOffset);
  }

  useEffect(() => {
    documentRef.current.addEventListener('scroll', throttleScroll);
    return () => documentRef.current.removeEventListener('scroll', throttleScroll);
  }, [pageY]);

  return (
    <header className='header'>
      <h1 className='logo'>
        <span
          onClick={() => {
            navigate('/');
          }}
        >
          Wonflix
        </span>
      </h1>

      <div className='header_btn_wrapper'>
        <Search />
        <button
          type='button'
          className='header_favorites_btn'
          onClick={() => {
            navigate('/favorites');
          }}
        >
          즐겨찾기
        </button>
      </div>
    </header>
  );
};
```
```css
@import 'src/styles/constants/_colors.scss';
@import 'src/styles/base/_fonts.scss';
@import 'src/styles/mixins/_responsive.scss';

.header {
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5.75rem;
  z-index: 10;
  padding: 20px 40px 0 40px;
  top: 0;
  cursor: pointer;
  width: 100%;
  background-color: $BLACK;
  transition: 0.4s ease;
  &.hide {
    transform: translateY(-80px);
    visibility: hidden;
  }

  .logo {
    color: $RED1;
    font-size: 2.9rem;
    transition: all 0.1s linear;
  }

  .logo:hover {
    transform: scale(1.1);
  }

  .header_btn_wrapper {
    display: flex;
    align-items: center;

    .search_btn {
      padding-right: 20px;
    }

    .header_favorites_btn {
      padding: 10px;
      margin: 0 0 0 20px;
      font-size: 1rem;
      border: 1px solid $WHITE;
      border-radius: 20px;
      width: 7rem;
      transition: all 0.2s linear;
    }

    .header_favorites_btn:hover {
      background-color: $GRAY3;
    }
  }
}

.md {
  display: none;
  @media only screen and (min-width: getMinBreakpoint(SD)) {
    display: contents;
  }
}

```

export default Header;


# Search

import React from 'react';
import SearchForm from './SearchForm/SearchForm';
import { dropdownState, searchState } from '../../store/search';
import { HeaderSearchIcon } from '../../assets/svgs';

import { useRecoilState } from 'recoil';
import './search.scss';
import cx from 'classnames';

const Search = () => {
  const [isSearchOpen, setIsSearchOpen] = useRecoilState(searchState);

  const handleClickSearchToggle = (event) => {
    setIsSearchOpen((currnt) => !currnt);
  };
  console.log(isSearchOpen);
  return (
    <div className='search'>
      <SearchForm />
      <button className='search_icon_btn' type='button' onClick={handleClickSearchToggle}>
        <HeaderSearchIcon />
      </button>
    </div>
  );
};

export default Search;

```css
@import 'src/styles/constants/_colors.scss';

.search {
  width: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

```

# SearchForm

```jsx
import React, { useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { searchState, keywordState, dropdownState, focusedInput, curIdxState } from '../../../store/search';
import { moviesData } from '../../../store/movies';
import './searchForm.scss';
import { useSearch } from '../../../api/useSearch';
import { useDebounce } from '../../../hooks/useDebounce';
import Dropdown from '../Dropdown/Dropdown';
import cx from 'classnames';

const SearchForm = () => {
  const [isSearchOpen, setIsSearchOpen] = useRecoilState(searchState);
  const [movies, setMovies] = useRecoilState(moviesData);
  const [keyword, setKeyword] = useRecoilState(keywordState);
  const [isDropdownOpen, setIsDropdownOpen] = useRecoilState(dropdownState);
  const [isInputFocused, setIsInputFocused] = useRecoilState(focusedInput);
  const [curIdx, setCurIdx] = useRecoilState(curIdxState);

  const debouncedKeyword = useDebounce(keyword, 100);

  const handleSearchResult = async (event) => {
    event.preventDefault();
    useSearch(debouncedKeyword).then((result) => setMovies(result));
  };

  useEffect(() => {}, [movies]);

  const movieTitles = movies.map((movie) => movie.title);
  // FIXME: recoil movies에서 가져오면 안됨

  const filteredTitles = useMemo(
    (element) => {
      return movieTitles.filter((title) => title.toLowerCase().startsWith(keyword.toLowerCase()));
    },
    [keyword]
  );

  const handleInputChange = (event) => {
    const { value } = event.target;
    setKeyword(value);
  };

  const handleInputFocused = () => {
    setIsInputFocused((prev) => !prev);
    // setIsDropdownOpen((current) => !current);
  };

  const handleInputBlur = () => {
    setIsInputFocused((current) => !current);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Tab') return;
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      curIdx <= 0 ? setCurIdx(filteredTitles.length - 1) : setCurIdx((prev) => prev - 1);
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      curIdx === filteredTitles.length - 1 ? setCurIdx(0) : setCurIdx((prev) => prev + 1);
    }

    if (event.key === 'Enter') {
      if (!filteredTitles[curIdx]) return;
      setKeyword(filteredTitles[curIdx]); // selectedItem이 keyword
    }
  };

  return (
    <>
      <form onSubmit={handleSearchResult} className={cx('search_form', { search_form_active: isSearchOpen })}>
        <input
          type='text'
          value={keyword}
          onChange={handleInputChange}
          onFocus={handleInputFocused}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          className='search_form_input'
          placeholder='검색어를 입력해주세요.'
        />
        <button type='button' className='search_form_btn'>
          검색
        </button>
        <Dropdown filteredTitles={filteredTitles} />
      </form>
    </>
  );
};

export default SearchForm;

// TODO: 검색어 input focus시 검색창 with 길어지도록 하기

```

```css
@import '/src/styles/constants/colors';

.search_form {
  margin-right: 20px;
  display: flex;
  width: 400px;
  visibility: hidden;

  .search_form_input {
    height: 35px;
    width: 100%;
    color: $WHITE;
    border-radius: 10px 0 0 10px;

    padding: 20px 22px;
    font-size: 18px;
    line-height: 1.6;
  }
  .search_form_input::placeholder {
    color: $GRAY6;
  }

  .search_form_btn {
    padding-right: 7px;
    font-size: 1rem;
    height: 44px;
    width: 77px;
    color: $WHITE;
    background-color: transparent;
    border: 1.5px solid $WHITE;
    border-radius: 0 10px 10px 0;
    transition: all 0.2s linear;
  }
  .search_form_btn:hover {
    background-color: $GRAY3;
  }
}

.search_form_active {
  visibility: visible;
  animation: show_input 1s;
}

@keyframes show_input {
  from {
    opacity: 0;
    // width: 0;
    transform: translateX(40%);
  }

  to {
    opacity: 1;
    // width: 100%;
    transform: translateX(0);
  }
}

```
---



# Dropdown
```jsx
import React, { useEffect, useMemo } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { keywordState, dropdownState, focusedInput } from '../../../store/search';
import { useGetAllMovies } from '../../../api/useGetMovie';
import DropdownItems from './DropdownItems';
import './dropdown.scss';
import cx from 'classnames';
import { filter } from 'lodash';

const Dropdown = ({ filteredTitles }) => {
  const keyword = useRecoilValue(keywordState);
  const [openDropdown, setOpenDropdown] = useRecoilState(dropdownState);
  const [isInputFocused, setIsInputFocused] = useRecoilState(focusedInput);

  const handleClickClose = () => {
    setOpenDropdown((current) => !current);
  };

  const titlesLength = filteredTitles.length;

  return (
    <section className={cx('dropdown', { dropdown_open: isInputFocused })}>
      {/*FIXME: 추천 검색어 끄기 */}
      <div className='dropdown_list'>
        {!keyword || !filteredTitles ? (
          <div className='no_result'>검색 결과가 없습니다.</div>
        ) : (
          <div>
            <div className='dropdown_result'>{titlesLength}개의 검색 결과가 있습니다.</div>
            {filteredTitles.map((title, idx) => {
              return (
                <DropdownItems key={`${title}_${idx}`} title={title} index={idx} />
                // curIdx={curIdx}
              );
            })}
          </div>
        )}
      </div>
      <button type='button' className='dropdown_close' onClick={handleClickClose}>
        추천 검색어 끄기
      </button>
    </section>
  );
};

export default Dropdown;
```

# DropdownItems
```jsx
import React, { useMemo } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useSearch } from '../../../api/useSearch';
import { keywordState, dropdownState, curIdxState } from '../../../store/search';
import { moviesData } from '../../../store/movies';
import { SearchIcon } from '../../../assets/svgs';
import './dropdown.scss';
import cx from 'classnames';

const DropdownItems = ({ title, index }) => {
  // TODO: title공백 제거한걸로 비교
  const [keyword, setKeyword] = useRecoilState(keywordState);
  const [movies, setMovies] = useRecoilState(moviesData);
  const [isDropdownOpen, setIsDropdownOpen] = useRecoilState(dropdownState);
  const [curIdx, setCurIdx] = useRecoilState(curIdxState);

  const handleClickTitle = (event) => {
    useSearch(title).then((title) => setMovies(title));
    console.log('handleClickTitle', title, movies);
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
    // TODO: 글자 수 넘어가면 ... 으로 보이게 하기
    <li className={cx('dropdown_item', { selectedDropDown: index === curIdx })}>
      <div onClick={handleClickTitle} role='button' tabIndex={0} data-title={title}>
        {markText}
      </div>
    </li>
  );
};

export default DropdownItems;

// TODO: title에 해당하는 영화 카드들만 화면에 띄우도록 하기
// TODO: dropdown 아이템 1개 클릭하면 해당 모달로 연결하기

```
```css
@import 'src/styles/constants/_colors.scss';

.dropdown {
  border: 2px solid;
  border-radius: 8px;
  background-color: $GRAY3;
  margin-top: 50px;
  height: auto;
  width: inherit;
  position: absolute;
  cursor: default;
  white-space: nowrap;
  visibility: hidden;

  .dropdown_list {
    padding-top: 10px;
    font-size: 17px;
    .no_result {
      padding-top: 10px;
      padding-left: 20px;
    }

    .dropdown_result {
      padding: 10px 10px 10px 16px;
    }

    .dropdown_item {
      font-size: 18px;
      padding-top: 6px;
      padding-bottom: 6px;
      padding-left: 10px;
      white-space: nowrap;
      cursor: pointer;

      .search_icon {
        width: 100%;
        height: 100%;
      }

      mark {
        background-color: transparent;
        font-weight: bold;
        color: $WHITE;
      }
      span {
        font-weight: lighter;
      }
    }
  }
}

// .false_hidden {
//   visibility: hidden;
// }

.close_button {
  height: 10px;
  cursor: pointer;
}

.dropdown_close {
  padding: 3px 10px;
  font-size: 12px;
  height: auto;
  float: right;
  cursor: pointer;
}

.selectedDropDown {
  background-color: rgba($WHITE, 0.4);
}

.dropdown_item:hover {
  background-color: rgba($WHITE, 0.4);
}

.dropdown_open {
  visibility: visible;
}

```