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
import { additionalFilms } from "../data";

export function FilmDetails() {
  const { id } = useParams();
  const [film, setFilm] = useState<FilmsProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatchlist, setIsWatchlist] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFilmDetails() {
      if (!id) return;
      try {
        if (id === "1") {
          setFilm(additionalFilms.find((film) => film.id === id) || null);
          return;
        }
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
          species.films.some((filmUrl: string) => filmUrl.includes(filmData.id))
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

  const convertRunTime = (time: string | number) => {
    const minutes = typeof time === "string" ? parseInt(time, 10) : time;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

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
      <p className="text-center text-[#4682B4] font-montserrat min-h-screen py-3 max-w-7xl mx-auto">
        Film not found.
      </p>
    );
  return (
    <Container heading={film.title}>
      <div className="max-w-5xl mx-auto p-6 bg-[#F8ECDD] rounded-xl shadow-md transition-shadow duration-300 mb-28 font-montserrat text-gray-800">
        {film.movie_banner && (
          <section className="mb-6">
            <div className="w-full max-h-[300px] aspect-[16/9] overflow-hidden">
              <img
                src={film.movie_banner}
                alt={`${film.title} banner`}
                className="w-full h-full object-cover object-top rounded-xl"
              />
            </div>
          </section>
        )}

        <section className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="md:w-1/3">
            <img
              src={film.image}
              alt={`${film.title} poster`}
              className="w-full max-h-[500px] object-contain rounded-lg"
            />
          </div>
          <div className="md:w-2/3 space-y-4">
            <div>
              <p className="text-lg">
                <span className="font-semibold">Original Title:</span>{" "}
                {film.original_title} ({film.original_title_romanised})
              </p>
              <p className="text-lg">
                <span className="font-semibold">Director:</span> {film.director}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Producer:</span> {film.producer}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Release:</span>{" "}
                {film.release_date} |{" "}
                {film.running_time && convertRunTime(film.running_time)}
              </p>
              <p
                className={`text-lg font-semibold ${
                  Number(film.rt_score) >= 75
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                Rotten Tomatoes: {film.rt_score}%
              </p>
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
                {isFavorite ? "Remove" : "Add Favorite"}
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
                {isWatchlist ? "Remove" : "Add to Watchlist"}
              </button>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold text-[#4682B4] mb-2">
            Synopsis
          </h3>
          <p className="text-lg leading-loose  p-4 rounded-md shadow-sm">
            {film.description}
          </p>
        </section>

        <section className="space-y-4">
          {film.locations && film.locations.length > 0 && (
            <div className=" p-4 rounded-md shadow-sm">
              <button
                onClick={() => toggleSection("locations")}
                className="w-full text-left text-xl font-semibold text-[#4682B4] flex justify-between items-center focus:outline-none"
              >
                Locations
                <span>{expandedSection === "locations" ? "−" : "+"}</span>
              </button>
              {expandedSection === "locations" && (
                <ul className="list-disc pl-5 text-lg mt-2">
                  {film.locations.map((location: LocationProps) => (
                    <li key={location.id}>{location.name}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {film.people && film.people.length > 0 && (
            <div className=" p-4 rounded-md shadow-sm">
              <button
                onClick={() => toggleSection("characters")}
                className="w-full text-left text-xl font-semibold text-[#4682B4] flex justify-between items-center focus:outline-none"
              >
                Characters
                <span>{expandedSection === "characters" ? "−" : "+"}</span>
              </button>
              {expandedSection === "characters" && (
                <ul className="list-disc pl-5 text-lg mt-2">
                  {film.people.map((person: PeopleProps) => (
                    <li key={person.id}>
                      {person.name} ({person.speciesDetails?.name || "Unknown"})
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {film.species && film.species.length > 0 && (
            <div className=" p-4 rounded-md shadow-sm">
              <button
                onClick={() => toggleSection("species")}
                className="w-full text-left text-xl font-semibold text-[#4682B4] flex justify-between items-center focus:outline-none"
              >
                Species
                <span>{expandedSection === "species" ? "−" : "+"}</span>
              </button>
              {expandedSection === "species" && (
                <ul className="list-disc pl-5 text-lg mt-2">
                  {film.species.map((species: SpeciesProps) => (
                    <li key={species.id}>{species.name}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {film.vehicles && film.vehicles.length > 0 && (
            <div className=" p-4 rounded-md shadow-sm">
              <button
                onClick={() => toggleSection("vehicles")}
                className="w-full text-left text-xl font-semibold text-[#4682B4] flex justify-between items-center focus:outline-none"
              >
                Vehicles
                <span>{expandedSection === "vehicles" ? "−" : "+"}</span>
              </button>
              {expandedSection === "vehicles" && (
                <ul className="list-disc pl-5 text-lg mt-2">
                  {film.vehicles.map((vehicle: VehicleProps) => (
                    <li key={vehicle.id}>{vehicle.name}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </section>
      </div>
    </Container>
  );
}
