import styles from './Routes.module.scss';
import { Route, Routes } from 'react-router-dom';

import Layout from './Layout/Layout';
import Home from '../pages/Home/Home';
import Favorites from '../pages/Favorites/Favorites';
import NotFound from '../pages/NotFound404/NotFound';

const App = () => {
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
