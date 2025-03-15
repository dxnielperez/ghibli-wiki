import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FilmsProps,
  LocationProps,
  PeopleProps,
  SpeciesProps,
  VehicleProps,
} from "../types";

export function FilmDetails() {
  const { id } = useParams();
  const [film, setFilm] = useState<FilmsProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatchlist, setIsWatchlist] = useState(false);

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
      <div className="w-full flex flex-col mt-20 items-center text-lg text-red-600 animate-pulse min-h-screen">
        <img src="./calcifer.gif" className="w-20" alt="calcifer" />
        <span>loading...</span>
      </div>
    );
  if (!film) return <p className="text-center text-red-600">Film not found.</p>;
  console.log("film", film);
  return (
    <div className="min-h-screen p-5 text-white flex flex-col font-montserrat">
      <h2 className="text-4xl font-bold">{film.title}</h2>
      <img src={film.image} alt={film.title} className="w-64 rounded-lg my-4" />
      <h3 className="text-xl mt-4">Description</h3>

      <p>{film.description}</p>

      <button
        onClick={handleFavorite}
        className="mt-2 p-2 bg-red-500 rounded w-48"
      >
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
      <button
        onClick={handleBookmark}
        className="mt-2 p-2 bg-blue-500 rounded  w-48"
      >
        {isWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
      </button>

      <h3 className="text-xl mt-4">Locations</h3>
      <ul>
        {film.locations?.map((location: LocationProps) => (
          <li key={location.id}>{location.name}</li>
        ))}
      </ul>

      <h3 className="text-xl mt-4">Characters</h3>
      <ul>
        {film.people?.map((person: PeopleProps) => (
          <li key={person.id}>
            {person.name} ({person.speciesDetails?.name || "Unknown Species"})
          </li>
        ))}
      </ul>

      <h3 className="text-xl mt-4">Vehicles</h3>
      <ul>
        {film.vehicles?.map((vehicle: VehicleProps) => (
          <li key={vehicle.id}>{vehicle.name}</li>
        ))}
      </ul>
    </div>
  );
}
