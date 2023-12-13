export function About() {
  return (
    <div className="bg-[#3A3A3A] min-h-screen pt-4 lg:px-[8rem] ">
      <h3 className="flex justify-center text-2xl lg:text-4xl text-white py-4">
        About Studio Ghbili
      </h3>
      <div className="border border-white bg-white rounded-2xl p-5 ">
        <div className="lg:flex lg:justify-center">
          <img src="/About.png" className="lg:max-w-[50%] rounded-lg pb-4" />
        </div>

        <p className=" lg:text-xl">
          Studio Ghibli, Inc. (Japanese: 株式会社スタジオジブリ, Hepburn:
          Kabushiki gaisha Sutajio Jiburi) is a Japanese animation studio based
          in Koganei, Tokyo. It has a strong presence in the animation industry
          and has expanded its portfolio to include various media formats, such
          as short subjects, television commercials, and two television films.
          Their work has been well-received by audiences and recognized with
          numerous awards. Their mascot and most recognizable symbol, the
          character Totoro, is a giant spirit inspired by raccoon dogs (tanuki)
          and cats from the 1988 film My Neighbor Totoro. Among the studio's
          highest-grossing films are Spirited Away (2001), Howl's Moving Castle
          (2004), and Ponyo (2008). Studio Ghibli was founded on June 15, 1985,
          by the directors Hayao Miyazaki and Isao Takahata and producer Toshio
          Suzuki, after acquiring Topcraft's assets. The studio has also
          collaborated with video game studios on the visual development of
          several games .
        </p>
      </div>
    </div>
  );
}
