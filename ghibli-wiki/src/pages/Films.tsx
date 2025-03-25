import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "../components";
import { FilmsProps } from "../types";
import { additionalFilms } from "../data";

export function Films() {
  const [films, setFilms] = useState<FilmsProps[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function getFilmsData() {
      setLoading(true);
      try {
        const filmsRes = await fetch("https://ghibliapi.vercel.app/films");
        if (!filmsRes.ok)
          throw new Error(`Error fetching films: ${filmsRes.status}`);
        const filmsData: FilmsProps[] = await filmsRes.json();

        setFilms([...filmsData, ...additionalFilms]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    getFilmsData();
  }, []);
  return (
    <>
      <Container heading="Films">
        {loading ? (
          <div className="w-full flex flex-col justify-center items-center text-lg text-red-600 animate-pulse">
            <img src="./calcifer.gif" className="w-20" alt="calcifer" />
            <span>loading...</span>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 justify-items-center gap-4 mx-10 pb-28">
            {films.map((film) => {
              return (
                <div
                  key={film.id}
                  className="cursor-pointer"
                  onClick={() => navigate(`/film/${film.id}`)}
                >
                  <img
                    src={film.image}
                    className="rounded-md hover:outline-[#FF7F50] hover:outline duration-200 ease-in-out"
                    alt={film.title}
                  />
                </div>
              );
            })}
          </div>
        )}
      </Container>
      <img
        src="https://media0.giphy.com/media/Mme4s8S3cm7fi/200w.gif"
        alt="spoot walking"
        className="relative bottom-1 h-12 animate-walk-fast sm:animate-walk-slow hover:animation-paused cursor-grabbing"
      />
    </>
  );
}
