import { Route, Routes } from "react-router-dom";
import { Nav, Footer } from "./components";
import { About, Favorites, Films, Watchlist, FilmDetails } from "./pages";

function App() {
  return (
    <div className="bg-darkgray min-w-[330px]">
      <Nav />
      <Routes>
        <Route path="/" element={<Films />} />
        <Route path="/about" element={<About />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/film/:id" element={<FilmDetails />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
