import React from 'react';
import styles from './Routes.module.scss';
import { Route, Routes } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { useGetAllMovies } from '../api/useGetMovie';
import { moviesData } from '../store/movies';

import Layout from './Layout/Layout';
import Home from '../pages/Home/Home';
import Favorites from '../pages/Favorites/Favorites';
import NotFound from '../pages/NotFound404/NotFound';

const App = () => {
  const { data } = useGetAllMovies();
  const setMovies = useSetRecoilState(moviesData);

  React.useEffect(() => {
    if (data === undefined || data === null) return;
    setMovies(data);
  }, [data]);

  return (
    <div className={styles.app}>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='favorites' element={<Favorites />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
