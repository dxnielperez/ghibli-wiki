import { useEffect, useState } from "react";
import { FilmsProps } from "../Types/types";
import { RiBookmarkFill, RiBookmarkLine } from "react-icons/ri";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

export function Favorites() {
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  const [selectedFilm, setSelectedFilm] = useState<FilmsProps | null>(null);
  const [selectedFilmIndex, setSelectedFilmIndex] = useState<number | null>(
    null
  );

  function handleFilmClick(film: FilmsProps, index: number) {
    setSelectedFilm(film);
    setSelectedFilmIndex(index);
  }

  function handleCloseModal() {
    setSelectedFilm(null);
    setSelectedFilmIndex(null);
  }
  const noFavs = favorites.length === 0;
  return (
    <div>
      <div className="bg-[#3A3A3A] min-h-screen overflow-x-hidden py-3">
        <h3 className="flex justify-center text-2xl lg:text-4xl text-white py-4">
          Favorites
        </h3>
        {noFavs && (
          <p className="flex justify-center text-sm text-[red]">No favorites</p>
        )}
        <div className="flex flex-col gap-4 justify-center px-[1rem] md:flex-col lg:flex-row lg:flex-wrap">
          {favorites.map((film: FilmsProps, index: number) => (
            <div
              className={`flex md:justify-center cursor-pointer  ${
                index === selectedFilmIndex ? "ring-4 rounded-lg" : ""
              }`}
              key={film.id}
              onClick={() => handleFilmClick(film, index)}
            >
              <div className="flex justify-between items-center px-4 rounded-md border border-black bg-white md:w-2/3 w-full lg:w-[28rem] hover:outline hover:outline-[#4A94FC] hover:translate-y-[0.1rem]">
                <div className="flex flex-col mr-4">
                  <div className="max-w-[9rem] lg:max-w-[11rem] my-2">
                    <img
                      src={film.image}
                      className="rounded-md"
                      alt="film img"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <p>{film.original_title}</p>
                  <p>{film.title}</p>
                  <p>{film.release_date}</p>
                  <div className="flex max-w-[12rem]">
                    <p>{film.description.slice(0, 98) + "..."}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {selectedFilm && (
            <FilmModal film={selectedFilm} onClose={handleCloseModal} />
          )}
        </div>
      </div>
    </div>
  );
}

function FilmModal({
  film,
  onClose,
}: {
  film: FilmsProps;
  onClose: () => void;
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatchlist, setIsWatchlist] = useState(false);

  function handleOverlayClick(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  useEffect(() => {
    // Check if the film is already in favorites or watchlist when the modal opens
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");

    setIsFavorite(
      favorites.some((favFilm: FilmsProps) => favFilm.id === film.id)
    );

    setIsWatchlist(
      watchlist.some((watchFilm: FilmsProps) => watchFilm.id === film.id)
    );
  }, [film.id]);

  function handleFavorite() {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const isFilmInFavorites = favorites.some(
      (favFilm: FilmsProps) => favFilm.id === film.id
    );

    if (isFilmInFavorites) {
      // Remove the film from favorites
      const updatedFavorites = favorites.filter(
        (favFilm: FilmsProps) => favFilm.id !== film.id
      );
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      // Add the film to favorites
      const updatedFavorites = [...favorites, film];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
    setIsFavorite(!isFilmInFavorites);
  }

  function handleBookmark() {
    const watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");
    const isFilmInWatchlist = watchlist.some(
      (watchlistFilm: FilmsProps) => watchlistFilm.id === film.id
    );

    if (isFilmInWatchlist) {
      // Remove the film from favorites
      const updatedWatchlist = watchlist.filter(
        (watchlistFilm: FilmsProps) => watchlistFilm.id !== film.id
      );
      localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
    } else {
      // Add the film to favorites
      const updatedWatchlist = [...watchlist, film];
      localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
    }
    setIsWatchlist(!isFilmInWatchlist);
  }
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white p-6 max-w-[600px] rounded-md">
        <div className="text-sm">
          <div className="flex justify-between">
            <h3 className="text-xl font-bold mb-2">{film.title}</h3>
            <div className="flex text-2xl gap-4">
              {isFavorite ? (
                <MdFavorite
                  className="cursor-pointer text-[#EB5A47]"
                  onClick={handleFavorite}
                />
              ) : (
                <MdFavoriteBorder
                  className="cursor-pointer"
                  onClick={handleFavorite}
                />
              )}
              {isWatchlist ? (
                <RiBookmarkFill
                  className="cursor-pointer text-[#394B6A]"
                  onClick={handleBookmark}
                />
              ) : (
                <RiBookmarkLine
                  className="cursor-pointer"
                  onClick={handleBookmark}
                />
              )}
            </div>
          </div>

          <p>Original Title: {film.original_title}</p>
          <img
            src={film.image}
            className="max-w-[8rem] lg:max-w-[15rem]"
            alt="film img"
          />

          <div className="flex justify-between">
            <p>Director: {film.director}</p>
            <p>Producer: {film.producer}</p>
          </div>

          <div className="flex justify-between">
            <p>Release Date: {film.release_date}</p>
            <p>Run time: {`${film.running_time} min`}</p>
          </div>

          <p>Description: {film.description}</p>

          <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ease-in-out delay-75"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
