'use client';

import Search from "./search";
import { useState } from "react";
import FavoritesModal from "./favorites-modal";
import Image from "next/image";
import { useFavorites } from "../providers/favorites";

interface HeaderProps {
  setSearch: (text: string) => void;
}

export default function Header({ setSearch }: HeaderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { favorites } = useFavorites();

  return(
    <>
    <header 
      className='sticky bg-background-3 flex flex-col md:flex-row gap-4 w-full justify-between items-center top-0 p-4 shadow-md z-10'
      aria-label="Main header"
    >
      <div className='w-full md:w-auto flex-1 flex justify-center'>
        <Search placeholder="Search items..." onSearch={setSearch} />
      </div>
      <button 
        onClick={() => setIsModalOpen(true)} 
        className={`flex gap-3 px-9 py-2 md:p-2 border border-gray-300 rounded-sm ${favorites.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-none cursor-pointer'}`}
        disabled={favorites.length === 0}
        aria-label="Favorites button"
        aria-haspopup="dialog"
        aria-expanded={isModalOpen}
        data-testid="favorites-button"
      >
        Favorites
        <Image
          src={favorites.length === 0 ? "/icons/heart-outline.svg" : "/icons/heart-filled.svg"}
          width={20}
          height={20}
          alt="heart"
          className="select-none"
          aria-hidden="true"
        />
      </button>
    </header>
    {isModalOpen && <FavoritesModal closeModal={() => setIsModalOpen(false)}/>}
    </>
  )
}