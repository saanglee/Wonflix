# 프로젝트 소개

원티드 프리온보딩 1주차

영화 검색 기능 서비스 팀프로젝트 입니다.

# 🚀 [배포 링크](https://wonfilx.herokuapp.com/)





# 팀원

| 이름 |팀 구성|기능 구현 및 역할|
|---|:---:|:---:|
| 김수빈 | 팀원 </br> Frontend | - json-server 이용 api구현 </br> - 정렬 select box 추가 <br> - server.js 작성 <br> -  서버 배포 <br> - 영화 목록 UI 작업 |
| 김민주 | 팀원 </br> Frontend |   - 모달 및 카드 즐겨찾기 버튼 활성화 </br> - CSS 수정 </br> - 로고 클릭시 홈으로 이동 및 전체 데이터 출력 </br> - Refactoring: 주석, 죽은 코드 제거 및 함수,변수 naming 최종 정리|
| 이상지 | 팀장 </br> Frontend | - 기획, UI/UX 디자인 및 레이아웃 </br> - 프로젝트 초기세팅 </br> - 헤더 구현 </br> - 드롭다운 연관 검색어 기능 구현 </br> - 스크럼 진행 및 개발일정 관리|
| 이혜림 | 팀원 </br> Frontend |  - 깃 관리, 개발 일정 관리 </br> - Debounce & Throttle 구현  </br> - Infinite Scroll 구현  </br> - 반응형 웹 구현  |
| 홍승연 | 팀원 </br> Frontend | - 영화 카드, 카드 목록 구현  </br> - 즐겨찾기 구현 </br> - 전역 상태 관리 Refactoring |

## src

```text
📦src
 ┣ 📂api
 ┃ ┣ 📜config.js
 ┃ ┣ 📜useGetMovie.js
 ┃ ┣ 📜useSearch.js
 ┃ ┣ 📜useSortMovie.js
 ┃ ┗ 📜useUpdateFavorite.js
 ┣ 📂assets
 ┃ ┗ 📂svgs
 ┃ ┃ ┣ 📜check.svg
 ┃ ┃ ┣ 📜close.svg
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┣ 📜logo.svg
 ┃ ┃ ┣ 📜move_to_top.svg
 ┃ ┃ ┣ 📜search.svg
 ┃ ┃ ┣ 📜search_bold.svg
 ┃ ┃ ┣ 📜star_empty.svg
 ┃ ┃ ┗ 📜star_filled.svg
 ┣ 📂components
 ┃ ┣ 📂Favorites
 ┃ ┃ ┗ 📜Favorites.jsx
 ┃ ┣ 📂Header
 ┃ ┃ ┣ 📂SearchForm
 ┃ ┃ ┃ ┣ 📜SearchForm.jsx
 ┃ ┃ ┃ ┗ 📜searchForm.scss
 ┃ ┃ ┣ 📜Header.jsx
 ┃ ┃ ┣ 📜TopButton.jsx
 ┃ ┃ ┣ 📜header.scss
 ┃ ┃ ┗ 📜topButton.scss
 ┃ ┣ 📂Modal
 ┃ ┃ ┣ 📜index.jsx
 ┃ ┃ ┗ 📜modal.scss
 ┃ ┣ 📂Movies
 ┃ ┃ ┣ 📂Card
 ┃ ┃ ┃ ┣ 📜Card.jsx
 ┃ ┃ ┃ ┗ 📜card.scss
 ┃ ┃ ┣ 📂ModalContent
 ┃ ┃ ┃ ┣ 📜ModalContent.jsx
 ┃ ┃ ┃ ┗ 📜modalContent.scss
 ┃ ┃ ┣ 📂MovieSort
 ┃ ┃ ┃ ┣ 📜MovieSort.jsx
 ┃ ┃ ┃ ┗ 📜movieSort.scss
 ┃ ┃ ┣ 📜index.jsx
 ┃ ┃ ┗ 📜movies.scss
 ┃ ┣ 📂Search
 ┃ ┃ ┣ 📂Dropdown
 ┃ ┃ ┃ ┣ 📜Dropdown.jsx
 ┃ ┃ ┃ ┣ 📜DropdownItems.jsx
 ┃ ┃ ┃ ┣ 📜SearchLog.jsx
 ┃ ┃ ┃ ┗ 📜dropdown.scss
 ┃ ┃ ┣ 📂SearchForm
 ┃ ┃ ┃ ┣ 📜SearchForm.jsx
 ┃ ┃ ┃ ┗ 📜searchForm.scss
 ┃ ┃ ┣ 📜Search.jsx
 ┃ ┃ ┗ 📜search.scss
 ┃ ┗ 📜Portal.jsx
 ┣ 📂data
 ┃ ┗ 📜movies.json
 ┣ 📂hooks
 ┃ ┣ 📜useDebounce.js
 ┃ ┣ 📜useHandleScroll.js
 ┃ ┣ 📜useInfiniteData.js
 ┃ ┣ 📜useObserver.js
 ┃ ┗ 📜useThrottle.js
 ┣ 📂routes
 ┃ ┣ 📂Favorites
 ┃ ┃ ┣ 📜Favorites.jsx
 ┃ ┃ ┗ 📜favorites.scss
 ┃ ┣ 📂Home
 ┃ ┃ ┣ 📜Home.jsx
 ┃ ┃ ┗ 📜home.scss
 ┃ ┣ 📂Layout
 ┃ ┃ ┗ 📜Layout.jsx
 ┃ ┣ 📂NotFound404
 ┃ ┃ ┣ 📜NotFound.jsx
 ┃ ┃ ┗ 📜notFound404.scss
 ┃ ┣ 📜Routes.module.scss
 ┃ ┗ 📜index.jsx
 ┣ 📂store
 ┃ ┣ 📜modal.js
 ┃ ┣ 📜movies.js
 ┃ ┗ 📜search.js
 ┣ 📂styles
 ┃ ┣ 📂base
 ┃ ┃ ┣ 📜_fonts.scss
 ┃ ┃ ┣ 📜_more.scss
 ┃ ┃ ┗ 📜_reset.scss
 ┃ ┣ 📂constants
 ┃ ┃ ┣ 📜_colors.scss
 ┃ ┃ ┗ 📜_sizes.scss
 ┃ ┣ 📂mixins
 ┃ ┃ ┣ 📜_animation.scss
 ┃ ┃ ┗ 📜_responsive.scss
 ┃ ┣ 📜index.js
 ┃ ┗ 📜index.scss
 ┣ 📂util
 ┃ ┗ 📜replaceItemAtIndex.js
 ┣ 📜App.jsx
 ┣ 📜App.scss
 ┣ 📜index.js
 ┗ 📜server.js
```
</br>
</br>

# 기술 스택

`React.js`
`SCSS`

## 라이브러리 

`classnames`
`axois`
`json-server`
`lodash`



# [와이어프레임](https://www.figma.com/file/xuNG7O0WGr30z7zg8vqZha/pre-onboarding-week1-1?node-id=2%3A3)
<img width="1090" alt="image" src="https://user-images.githubusercontent.com/92660097/178669374-932a2e26-ee57-40cc-a9f9-6df9ef276628.png">

</br>
</br>



# 상세 구현 사항

</br>

추가예정

</br>

