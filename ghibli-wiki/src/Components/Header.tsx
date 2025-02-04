import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { MenuModalProps } from "../Types/types";
import { Link } from "react-router-dom";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  function handleMenuClick() {
    setIsOpen(!isOpen);
  }

  function handleCloseMenu() {
    setIsOpen(false);
  }
  return (
    <div className="bg-[#28AEED] overflow-x-hidden ">
      <div>
        <div className="flex justify-between px-2 py-3">
          <Link to="/">
            <img
              alt="ghibli logo"
              src={`${import.meta.env.BASE_URL}GhibliLogo.webp`}
              className="w-56 md:w-60 lg:w-64 hover:scale-105 transition-all ease-in-out duration-300"
            />
          </Link>
          <div className="flex items-end text-4xl">
            <div className="sm:hidden flex">
              <IoMenu onClick={handleMenuClick} className="cursor-pointer" />
            </div>
            <div className="sm:flex hidden justify-end items-center w-full ">
              <div className="flex space-x-6">
                <Link
                  to="/"
                  className="hover:underline text-xl ease-in-out duration-300 transition-all"
                >
                  Home
                </Link>
                <Link
                  to="/AboutPage"
                  className="hover:underline text-xl ease-in-out duration-300 transition-all"
                >
                  About
                </Link>

                <Link
                  to="/FavoritesPage"
                  className="hover:underline text-xl ease-in-out duration-300 transition-all"
                >
                  Favorites
                </Link>
                <Link
                  to="/WatchlistPage"
                  className="hover:underline text-xl ease-in-out duration-300 transition-all"
                >
                  Watchlist
                </Link>
              </div>
            </div>
          </div>
        </div>
        <MenuModal isOpen={isOpen} onClose={handleCloseMenu} />
      </div>
    </div>
  );
}

function MenuModal({ isOpen, onClose }: MenuModalProps) {
  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      <div
        className="absolute inset-0 bg-black opacity-30"
        onClick={onClose}
      ></div>
      <div
        className={`bg-white bg-opacity-75 backdrop-blur-md w-[40%] h-full fixed top-0 right-0 transform transition-transform ease-in-out duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-10 h-full pt-[2rem] items-end pr-5">
          <Link
            to="/"
            className="hover:underline text-xl ease-in-out duration-300 transition-all"
          >
            Home
          </Link>
          <Link
            to="/AboutPage"
            className="hover:underline text-xl ease-in-out duration-300 transition-all"
          >
            About
          </Link>

          <Link
            to="/FavoritesPage"
            className="hover:underline text-xl ease-in-out duration-300 transition-all"
          >
            Favorites
          </Link>
          <Link
            to="/WatchlistPage"
            className="hover:underline text-xl ease-in-out duration-300 transition-all"
          >
            Watchlist
          </Link>
        </div>
      </div>
    </div>
  );
}
