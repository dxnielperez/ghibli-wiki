import { useState } from 'react';
import { IoMenu } from 'react-icons/io5';
import { MenuModalProps } from '../Types/types';
import { Link } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';

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
              src={`${import.meta.env.BASE_URL}GhibliLogo.webp`}
              className=" w-64 md:w-72 lg:w-80 hover:translate-y-[-0.2rem]		"
            />
          </Link>
          <div className="flex items-end text-4xl">
            <IoMenu onClick={handleMenuClick} className="cursor-pointer" />
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
      className={`fixed inset-0 z-50 flex items-center justify-start transition-opacity ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}></div>
      <div
        className={`bg-[white]/[0.85] px-8 py-1 w-full h-[13rem] lg:h-[13rem] fixed top-0 transform transition-transform ease-in-out duration-300 ${
          isOpen ? 'translate-y-0' : '-translate-y-full'
        }`}>
        <div className="flex justify-end text-3xl cursor-pointer">
          <IoClose
            className="absolute right-1 top-0 cursor-pointer hover:text-[#899CA9] ease-in-out delay-75"
            onClick={onClose}
          />
        </div>
        <div className="flex justify-between h-full pt-[2rem]">
          <div className="flex flex-col gap-20 max-w-[25%] ">
            <Link
              to="/AboutPage"
              className="underline text-xl hover:text-[#899CA9] ease-in-out delay-75">
              About
            </Link>
            <Link
              to="/"
              className="underline text-xl hover:text-[#899CA9] ease-in-out delay-75">
              Home
            </Link>
          </div>

          <div className="flex flex-col items-center max-w-[50%] mx-auto">
            <img src={`${import.meta.env.BASE_URL}Totoro.png`} className="max-h-[75%]" />
          </div>

          <div className="h-full flex flex-col gap-20">
            <Link
              to="/FavoritesPage"
              className="underline text-xl hover:text-[#899CA9] ease-in-out delay-75">
              Favorites
            </Link>
            <Link
              to="/WatchlistPage"
              className="underline text-xl hover:text-[#899CA9] ease-in-out delay-75">
              Watchlist
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
