import styles from './Routes.module.scss';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout/Layout';
import Home from './Home/Home';

function App() {
  return (
    <div className={styles.app}>
      <Routes>
        <Route path='/' element={<Layout />} />
        <Route path='/' element={<Home />} />
        <Route />
      </Routes>
    </div>
  );
}

export default App;
