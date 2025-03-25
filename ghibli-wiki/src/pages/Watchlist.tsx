import { useEffect, useState } from "react";
import { RiBookmarkFill, RiBookmarkLine } from "react-icons/ri";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { FilmsProps } from "../types";
import { Container } from "../components";

export function Watchlist() {
  const [favorites, setFavorites] = useState<FilmsProps[]>([]);
  const [watchlist, setWatchlist] = useState<FilmsProps[]>([]);
  const [expandedFilmId, setExpandedFilmId] = useState<string | null>(null);

  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem("favorites") || "[]"));
    setWatchlist(JSON.parse(localStorage.getItem("watchlist") || "[]"));
  }, []);

  function toggleFavorite(film: FilmsProps) {
    const isFavorite = favorites.some((fav) => fav.id === film.id);
    const updatedFavorites = isFavorite
      ? favorites.filter((fav) => fav.id !== film.id)
      : [...favorites, film];

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  }

  function toggleWatchlist(film: FilmsProps) {
    const isInWatchlist = watchlist.some((item) => item.id === film.id);
    const updatedWatchlist = isInWatchlist
      ? watchlist.filter((item) => item.id !== film.id)
      : [...watchlist, film];

    setWatchlist(updatedWatchlist);
    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
  }

  function toggleExpandFilm(filmId: string) {
    setExpandedFilmId(expandedFilmId === filmId ? null : filmId);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container heading="Watchlist">
      {watchlist.length === 0 && (
        <p className="flex justify-center text-sm text-[red]">
          No films in your watchlist
        </p>
      )}
      <div className="flex flex-col gap-4 justify-center px-[1rem] md:flex-col lg:flex-row lg:flex-wrap">
        {watchlist.map((film) => {
          const isExpanded = expandedFilmId === film.id;
          return (
            <div
              className={`flex flex-col border border-black rounded-md bg-[#F8ECDD] p-4 w-full cursor-pointer hover:outline hover:outline-coral`}
              key={film.id}
              onClick={() => toggleExpandFilm(film.id)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold">{film.title}</h3>
                <div
                  className="flex text-2xl gap-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  {favorites.some((fav) => fav.id === film.id) ? (
                    <MdFavorite
                      className="cursor-pointer text-[#EB5A47]"
                      onClick={() => toggleFavorite(film)}
                    />
                  ) : (
                    <MdFavoriteBorder
                      className="cursor-pointer"
                      onClick={() => toggleFavorite(film)}
                    />
                  )}
                  {watchlist.some((watch) => watch.id === film.id) ? (
                    <RiBookmarkFill
                      className="cursor-pointer text-[#394B6A]"
                      onClick={() => toggleWatchlist(film)}
                    />
                  ) : (
                    <RiBookmarkLine
                      className="cursor-pointer"
                      onClick={() => toggleWatchlist(film)}
                    />
                  )}
                </div>
              </div>
              <p className="text-sm">
                {film.original_title} - {film.release_date}
              </p>
              {isExpanded && (
                <div className="mt-2 flex flex-col md:flex-row gap-4">
                  <img
                    src={film.image}
                    className="w-full max-w-[10rem] rounded-md mx-auto"
                    alt="film img"
                  />
                  <p className="mt-2">{film.description}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Container>
  );
}
