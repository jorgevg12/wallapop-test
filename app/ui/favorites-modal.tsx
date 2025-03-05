"use client";

import Image from "next/image";
import { useFavorites } from "../providers/favorites";
import useNoScroll from "../hooks/useNoScroll";
import FavoritesModalItem from "./favorites-modal-item";

interface FavoritesModalProps {
  closeModal: () => void;
}

export default function FavoritesModal({closeModal}: FavoritesModalProps) {
  const { favorites, removeFavorite } = useFavorites();

  useNoScroll(true);

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-20">
      <div className="bg-background-2 p-6 rounded-md w-11/12 md:w-4/6 max-w-[900px] h-11/12 md:h-4/6" data-testid="favorites-modal">
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
            data-testid="modal-close"
          >
            Close
          </button>
        </header>
        <div className="relative overflow-y-auto" style={{ height: 'calc(100% - 72px - 24px)' }}>
          {favorites.map((item, index) => (
            <FavoritesModalItem key={index} item={item} removeFavorite={removeFavorite}/>
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