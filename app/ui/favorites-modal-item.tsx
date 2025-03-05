import Image from "next/image";
import { Item } from "../types/types";

interface FavoritesModalItemProps {
  item: Item;
  removeFavorite: (item: Item) => void;
}

export default function FavoritesModalItem({item, removeFavorite}: FavoritesModalItemProps) {
  console.log('FavoritesModalItem render');
  return(
    <div className="flex flex-col md:flex-row gap-5 bg-background-3 items-center p-4 rounded-lg w-full mb-4">
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
  )
}