import { Container } from "../components";

export function About() {
  return (
    <Container heading="About Studio Ghibli">
      <div className="max-w-4xl mx-auto p-8 bg-[#F8ECDD] rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 mb-28">
        <div className="grid gap-6 items-start">
          <div className="relative overflow-hidden rounded-lg">
            <img
              src={`${import.meta.env.BASE_URL}about.png`}
              className="w-full h-auto transform transition-transform duration-500 hover:scale-110"
              alt="Studio Ghibli artwork"
            />
            <div className="absolute inset-0 bg-[#4682B4] opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
          </div>

          <div className="space-y-5">
            <p className="text-lg text-gray-800 leading-loose">
              <span className="font-semibold text-[#4682B4]">
                Studio Ghibli
              </span>{" "}
              is a celebrated Japanese animation studio headquartered in
              Koganei, Tokyo. Established on June 15, 1985, by visionary
              directors <span className="font-medium">Hayao Miyazaki</span> and{" "}
              <span className="font-medium">Isao Takahata</span>, alongside
              producer <span className="font-medium">Toshio Suzuki</span>, it
              rose from the foundation of Topcraft's assets.
            </p>

            <p className="text-lg text-gray-800 leading-loose">
              The studio has left an indelible mark on animation, venturing into
              short films, TV commercials, and television movies. Its iconic
              mascot, <span className="font-semibold">Totoro</span>, from the
              1988 classic <em>My Neighbor Totoro</em>, embodies its whimsical
              spirit, drawing inspiration from tanuki and cats.
            </p>

            <p className="text-lg text-gray-800 leading-loose">
              With blockbuster hits like <em>Spirited Away</em> (2001),{" "}
              <em>Howl's Moving Castle</em> (2004), and <em>Ponyo</em> (2008),
              Studio Ghibli has garnered global acclaim and numerous awards. Its
              influence extends to video game visuals through notable
              collaborations.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
