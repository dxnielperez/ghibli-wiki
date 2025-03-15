import { useEffect } from "react";
import { Container } from "../components";

export function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container heading="About Studio Ghibli">
      <div className="max-w-4xl mx-auto p-8 bg-[#F8ECDD] rounded-xl mb-28">
        <div className="grid gap-6 items-start">
          <div className="relative overflow-hidden rounded-lg">
            <img
              src={`${import.meta.env.BASE_URL}ghibli-about.png`}
              className="w-full h-auto"
              alt="Studio Ghibli artwork"
            />
          </div>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-skyblue">
              Introduction
            </h2>
            <p className="text-lg text-gray-800 leading-loose">
              <span className="font-semibold text-skyblue">Studio Ghibli</span>{" "}
              is a renowned Japanese animation studio based in Koganei, Tokyo.
              Founded on June 15, 1985, by directors{" "}
              <span className="font-medium">Hayao Miyazaki</span> and{" "}
              <span className="font-medium">Isao Takahata</span>, along with
              producer <span className="font-medium">Toshio Suzuki</span>, it
              emerged from the success of Miyazaki’s{" "}
              <em>Nausicaä of the Valley of the Wind</em> (1984) and the
              dissolution of Topcraft. The name "Ghibli," inspired by an Italian
              word for a hot desert wind, reflects its mission to bring a fresh
              breeze to animation.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-skyblue">
              Timeline of Studio Ghibli & Hayao Miyazaki
            </h2>
            <ul className="text-lg text-gray-800 leading-loose space-y-3">
              <li>
                <span className="font-medium">1941:</span> Hayao Miyazaki is
                born in Tokyo, sparking a lifelong passion for animation and
                flight.
              </li>
              <li>
                <span className="font-medium">1963:</span> Miyazaki joins Toei
                Animation, meeting Takahata and beginning his animation career.
              </li>
              <li>
                <span className="font-medium">1985:</span> Studio Ghibli is
                founded; its first film, <em>Castle in the Sky</em>, releases in
                1986.
              </li>
              <li>
                <span className="font-medium">1988:</span>{" "}
                <em>My Neighbor Totoro</em> introduces Totoro, Ghibli’s iconic
                mascot.
              </li>
              <li>
                <span className="font-medium">1997:</span>{" "}
                <em>Princess Mononoke</em> becomes Japan’s highest-grossing film
                at the time.
              </li>
              <li>
                <span className="font-medium">2001:</span>{" "}
                <em>Spirited Away</em> wins the Academy Award for Best Animated
                Feature; Ghibli Museum opens in Mitaka.
              </li>
              <li>
                <span className="font-medium">2013:</span> Miyazaki announces
                retirement after <em>The Wind Rises</em>, only to return later.
              </li>
              <li>
                <span className="font-medium">2023:</span>{" "}
                <em>The Boy and the Heron</em> earns Miyazaki his second Oscar.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-skyblue">Legacy</h2>
            <p className="text-lg text-gray-800 leading-loose">
              Studio Ghibli has left an indelible mark on animation with its
              hand-drawn artistry and storytelling, often exploring
              environmental themes and strong female characters. Hits like{" "}
              <em>Spirited Away</em> (2001), <em>Howl’s Moving Castle</em>{" "}
              (2004), and <em>Ponyo</em> (2008) have garnered global acclaim.
              Its influence extends to video games (e.g., <em>Ni no Kuni</em>)
              and cultural landmarks like Ghibli Park, opened in 2022. As of
              2025, Ghibli continues to inspire with its timeless legacy.
            </p>
          </section>
        </div>
      </div>
    </Container>
  );
}
