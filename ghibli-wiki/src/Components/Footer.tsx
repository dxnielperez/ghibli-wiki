import { FaArrowUp } from "react-icons/fa";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#28AEED] text-white py-6 relative">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <p className="text-lg font-semibold font-montserrat">Ghibli Wiki</p>
          <p className="text-sm">
            © {currentYear} | Built by
            <a
              href="https://www.dxniel.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-[#F8ECDD] transition-colors duration-200"
            >
              {" "}
              Daniel Perez
            </a>
          </p>
        </div>

        <div className="mb-4 md:mb-0 text-center">
          <p className="text-sm">
            Powered by{" "}
            <a
              href="https://ghibliapi.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-[#F8ECDD] transition-colors duration-200"
            >
              Ghibli API
            </a>
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 bg-[#4682B4] text-white rounded-md hover:bg-opacity-90 transition-colors duration-200"
            aria-label="Scroll to top"
          >
            <FaArrowUp className="text-lg" />
            <span className="text-sm">Back to Top</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
