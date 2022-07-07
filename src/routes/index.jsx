import styles from './Routes.module.scss';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout/Layout';
import Home from './Home/Home';
import Favorites from '../components/Favorites/Favorites';
import NotFound from './NotFound404/NotFound';

const App = () => {
  return (
    <div className={styles.app}>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/home' element={<Home />} />
          <Route path='favorites' element={<Favorites />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
