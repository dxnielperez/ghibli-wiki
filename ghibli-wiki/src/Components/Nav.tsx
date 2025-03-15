import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { Link } from "react-router-dom";
import { MenuModalProps } from "../types";

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  function handleMenuClick() {
    setIsOpen(!isOpen);
  }

  function handleCloseMenu() {
    setIsOpen(false);
  }

  return (
    <nav className="bg-skyblue font-montserrat font-medium border-b-2 border-[#4682B4] sticky top-0 z-40">
      <div className="mx-auto px-4">
        <div className="flex justify-between items-end py-4">
          <Link to="/">
            <img
              alt="ghibli logo"
              src={`${import.meta.env.BASE_URL}ghibli-logo.webp`}
              className="w-56 md:w-60 lg:w-64"
            />
          </Link>
          <div className="flex items-center">
            <div className="sm:hidden">
              <IoMenu
                onClick={handleMenuClick}
                className="text-4xl cursor-pointer black hover:text-darkgray transition-colors duration-200"
              />
            </div>
            <div className="hidden sm:flex items-end justify-end space-x-5">
              <Link to="/" className="text-xl black relative group py-1">
                Home
                <span className="absolute bottom-0 left-0 w-0 h-1 bg-darkgray transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link to="/about" className="text-xl black relative group py-1">
                About
                <span className="absolute bottom-0 left-0 w-0 h-1 bg-darkgray transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                to="/favorites"
                className="text-xl black relative group py-1"
              >
                Favorites
                <span className="absolute bottom-0 left-0 w-0 h-1 bg-darkgray transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                to="/watchlist"
                className="text-xl black relative group py-1"
              >
                Watchlist
                <span className="absolute bottom-0 left-0 w-0 h-1 bg-darkgray transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>
          </div>
        </div>
        <MenuModal isOpen={isOpen} onClose={handleCloseMenu} />
      </div>
    </nav>
  );
}

function MenuModal({ isOpen, onClose }: MenuModalProps) {
  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity font-montserrat font-medium ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className="absolute inset-0 bg-gray-900 opacity-40"
        onClick={onClose}
      ></div>
      <div
        className={`bg-skyblue w-full max-w-sm mx-auto border-x-2 border-b-2 border-[#4682B4] shadow-lg fixed top-0 left-1/2 transform -translate-x-1/2 transition-all duration-300 ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex flex-col py-6 px-8 space-y-5">
          <Link
            to="/"
            className="text-xl black hover:bg-[#87CEEB] hover:text-darkgray px-3 py-2 rounded-md transition-all duration-200"
            onClick={onClose}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-xl black hover:bg-[#87CEEB] hover:text-darkgray px-3 py-2 rounded-md transition-all duration-200"
            onClick={onClose}
          >
            About
          </Link>
          <Link
            to="/favorites"
            className="text-xl black hover:bg-[#87CEEB] hover:text-darkgray px-3 py-2 rounded-md transition-all duration-200"
            onClick={onClose}
          >
            Favorites
          </Link>
          <Link
            to="/watchlist"
            className="text-xl black hover:bg-[#87CEEB] hover:text-darkgray px-3 py-2 rounded-md transition-all duration-200"
            onClick={onClose}
          >
            Watchlist
          </Link>
        </div>
      </div>
    </div>
  );
}
