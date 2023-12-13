import { Route, Routes } from 'react-router-dom';
import { AboutPage } from './Pages/AboutPage';
import { FilmsPage } from './Pages/FilmsPage';
import { FavoritesPage } from './Pages/FavoritesPage';
import { WatchlistPage } from './Pages/WatchlistPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<FilmsPage />} />
        <Route path="AboutPage" element={<AboutPage />} />
        <Route path="FavoritesPage" element={<FavoritesPage />} />
        <Route path="WatchlistPage" element={<WatchlistPage />} />
      </Routes>
    </>
  );
}

export default App;
