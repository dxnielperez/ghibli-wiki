import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FilmsProps,
  LocationProps,
  PeopleProps,
  SpeciesProps,
  VehicleProps,
} from "../types";
import { Container } from "../components";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { RiBookmarkLine, RiBookmarkFill } from "react-icons/ri";

export function FilmDetails() {
  const { id } = useParams();
  const [film, setFilm] = useState<FilmsProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatchlist, setIsWatchlist] = useState(false);
  const [showAllLocations, setShowAllLocations] = useState(false);
  const [showAllCharacters, setShowAllCharacters] = useState(false);
  const [showAllVehicles, setShowAllVehicles] = useState(false);
  const ITEMS_LIMIT = 4;

  useEffect(() => {
    async function fetchFilmDetails() {
      if (!id) return;
      try {
        const filmRes = await fetch(`https://ghibliapi.vercel.app/films/${id}`);
        if (!filmRes.ok)
          throw new Error(`Error fetching film: ${filmRes.status}`);
        const filmData: FilmsProps = await filmRes.json();

        const [locationsRes, peopleRes, speciesRes, vehiclesRes] =
          await Promise.all([
            fetch("https://ghibliapi.vercel.app/locations"),
            fetch("https://ghibliapi.vercel.app/people"),
            fetch("https://ghibliapi.vercel.app/species"),
            fetch("https://ghibliapi.vercel.app/vehicles"),
          ]);

        const [locationsData, peopleData, speciesData, vehiclesData] =
          await Promise.all([
            locationsRes.json(),
            peopleRes.json(),
            speciesRes.json(),
            vehiclesRes.json(),
          ]);

        const filmLocations = locationsData.filter((location: LocationProps) =>
          location.films.some((url: string) => url.endsWith(id))
        );

        const filmPeople = peopleData
          .filter((person: PeopleProps) =>
            person.films.some((url: string) => url.endsWith(id))
          )
          .map((person: PeopleProps) => {
            const personSpecies = speciesData.find((species: SpeciesProps) =>
              person.species.includes(species.id)
            );
            return { ...person, speciesDetails: personSpecies || null };
          });

        const filmSpecies = speciesData.filter((species: SpeciesProps) =>
          species.films.some((url: string) => url.endsWith(id))
        );

        const filmVehicles = vehiclesData.filter((vehicle: VehicleProps) =>
          vehicle.films.some((url: string) => url.endsWith(id))
        );

        setFilm({
          ...filmData,
          locations: filmLocations,
          people: filmPeople,
          species: filmSpecies,
          vehicles: filmVehicles,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchFilmDetails();
  }, [id]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");
    setIsFavorite(
      favorites.some((favFilm: FilmsProps) => favFilm.id === film?.id)
    );
    setIsWatchlist(
      watchlist.some((watchFilm: FilmsProps) => watchFilm.id === film?.id)
    );
  }, [film]);

  function handleFavorite() {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const updatedFavorites = isFavorite
      ? favorites.filter((favFilm: FilmsProps) => favFilm.id !== film?.id)
      : [...favorites, film];
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  }

  function handleBookmark() {
    const watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");
    const updatedWatchlist = isWatchlist
      ? watchlist.filter(
          (watchlistFilm: FilmsProps) => watchlistFilm.id !== film?.id
        )
      : [...watchlist, film];
    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
    setIsWatchlist(!isWatchlist);
  }

  if (loading)
    return (
      <div className="w-full flex flex-col mt-20 items-center text-lg text-[#4682B4] animate-pulse min-h-screen font-montserrat">
        <img
          src="./calcifer.gif"
          className="w-20 mb-4"
          alt="Calcifer loading"
        />
        <span>Loading...</span>
      </div>
    );
  if (!film)
    return (
      <p className="text-center text-[#4682B4] font-montserrat">
        Film not found.
      </p>
    );

  const displayedLocations = showAllLocations
    ? film.locations
    : film.locations?.slice(0, ITEMS_LIMIT);
  const displayedCharacters = showAllCharacters
    ? film.people
    : film.people?.slice(0, ITEMS_LIMIT);
  const displayedVehicles = showAllVehicles
    ? film.vehicles
    : film.vehicles?.slice(0, ITEMS_LIMIT);

  return (
    <Container heading={film.title}>
      <div className="mx-auto p-8 bg-[#F8ECDD] rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 mb-28">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="relative overflow-hidden rounded-lg">
            <img
              src={film.image}
              alt={`${film.title} poster`}
              className="max-w-1/4 max-h-[600px] object-contain rounded-lg"
            />
          </div>

          <div className="w-3/4 space-y-5 text-gray-800 font-montserrat">
            <div>
              <h3 className="text-xl font-semibold text-[#4682B4] mb-2">
                Description
              </h3>
              <p className="text-lg leading-loose">{film.description}</p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleFavorite}
                className="flex items-center gap-2 px-4 py-2 bg-[#EB5A47] text-white rounded-md hover:bg-opacity-90 transition-colors duration-200"
              >
                {isFavorite ? (
                  <MdFavorite className="text-2xl" />
                ) : (
                  <MdFavoriteBorder className="text-2xl" />
                )}
                {isFavorite ? "Remove Favorite" : "Add Favorite"}
              </button>
              <button
                onClick={handleBookmark}
                className="flex items-center gap-2 px-4 py-2 bg-[#394B6A] text-white rounded-md hover:bg-opacity-90 transition-colors duration-200"
              >
                {isWatchlist ? (
                  <RiBookmarkFill className="text-2xl" />
                ) : (
                  <RiBookmarkLine className="text-2xl" />
                )}
                {isWatchlist ? "Remove Watchlist" : "Add Watchlist"}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {film.locations && film.locations.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-[#4682B4] mb-2">
                    Locations
                  </h3>
                  <ul className="list-disc pl-5 text-lg leading-loose">
                    {displayedLocations?.map((location: LocationProps) => (
                      <li key={location.id}>{location.name}</li>
                    ))}
                  </ul>
                  {film.locations.length > ITEMS_LIMIT && (
                    <button
                      onClick={() => setShowAllLocations(!showAllLocations)}
                      className="mt-2 text-[#4682B4] hover:underline focus:outline-none"
                    >
                      {showAllLocations ? "View Less" : "View All"}
                    </button>
                  )}
                </div>
              )}

              {film.people && film.people.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-[#4682B4] mb-2">
                    Characters
                  </h3>
                  <ul className="list-disc pl-5 text-lg leading-loose">
                    {displayedCharacters?.map((person: PeopleProps) => (
                      <li key={person.id}>
                        {person.name} (
                        {person.speciesDetails?.name || "Unknown Species"})
                      </li>
                    ))}
                  </ul>
                  {film.people.length > ITEMS_LIMIT && (
                    <button
                      onClick={() => setShowAllCharacters(!showAllCharacters)}
                      className="mt-2 text-[#4682B4] hover:underline focus:outline-none"
                    >
                      {showAllCharacters ? "View Less" : "View All"}
                    </button>
                  )}
                </div>
              )}

              {film.vehicles && film.vehicles.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-[#4682B4] mb-2">
                    Vehicles
                  </h3>
                  <ul className="list-disc pl-5 text-lg leading-loose">
                    {displayedVehicles?.map((vehicle: VehicleProps) => (
                      <li key={vehicle.id}>{vehicle.name}</li>
                    ))}
                  </ul>
                  {film.vehicles.length > ITEMS_LIMIT && (
                    <button
                      onClick={() => setShowAllVehicles(!showAllVehicles)}
                      className="mt-2 text-[#4682B4] hover:underline focus:outline-none"
                    >
                      {showAllVehicles ? "View Less" : "View All"}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
