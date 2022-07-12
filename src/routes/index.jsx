import React from 'react';
import styles from './Routes.module.scss';
import { Route, Routes } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { useGetAllMovies } from '../api/useGetMovie';
import { ModalContextProvider } from '../store/modal';
import { moviesData } from '../store/movies';

import Layout from './Layout/Layout';
import Home from './Home/Home';
import Favorites from '../components/Favorites/Favorites';
import NotFound from './NotFound404/NotFound';

const App = () => {
  const { data } = useGetAllMovies();
  const setMovies = useSetRecoilState(moviesData);

  React.useEffect(() => {
    if (data === undefined || data === null) return;
    setMovies(data);
  }, [data]);

  return (
    <ModalContextProvider>
      <div className={styles.app}>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='favorites' element={<Favorites />} />
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </ModalContextProvider>
  );
};

export default App;
