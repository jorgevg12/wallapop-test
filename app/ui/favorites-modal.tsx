"use client";

import Image from "next/image";
import { useFavorites } from "../providers/favorites";
import useNoScroll from "../hooks/useNoScroll";

interface FavoritesModalProps {
  closeModal: () => void;
}

export default function FavoritesModal({closeModal}: FavoritesModalProps) {
  const { favorites, removeFavorite } = useFavorites();

  useNoScroll(true);

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-20">
      <div className="bg-background-2 p-6 rounded-md w-11/12 md:w-4/6 max-w-[900px] h-11/12 md:h-4/6">
        <header className="flex justify-between items-center mb-4 h-14">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold">Favorites</h2>
            <Image
              src={"/icons/heart-filled.svg"}
              width={20}
              height={20}
              alt="heart"
              className="select-none"
            />
          </div>
          <button 
            onClick={closeModal}
            type="button"
            className="bg-white text-background-2 px-4 py-2 rounded cursor-pointer"
          >
            Close
          </button>
        </header>
        <div className="relative overflow-y-auto" style={{ height: 'calc(100% - 72px - 24px)' }}>
          {favorites.map((item, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-5 bg-background-3 items-center p-4 rounded-lg w-full mb-4">
              <div className="relative h-24 w-24">
                <Image fill={true} src={`/img/${item.image}`} alt={item.title} className="rounded-lg object-cover" />
              </div>
              <div className="flex flex-col gap-3 grow-1">
                <h3 className="text-xl">{item.title}</h3>
              </div>
              <button 
                onClick={() => removeFavorite(item)}
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
              >
                Remove
              </button>
            </div>
          ))}
          {favorites.length === 0 && 
            <div className="flex justify-center items-center h-full">
              <p className="text-center">Add some favorites! :)</p>
            </div>
          }
        </div>
      </div>
    </div>
  );
}