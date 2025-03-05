'use client';

import Image from "next/image";
import { Item } from "../types/types";
import PriceTag from "./price-tag";
import { useFavorites } from "../providers/favorites";
import Favorite from "./favorite";

interface CardItemProps {
  item: Item;
  index: number;
}

export default function CardItem({ item, index }: CardItemProps) {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const isFavorite = favorites.some(fav => fav.title === item.title);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFavorite(item);
    } else {
      addFavorite(item);
    }
  };

  return (
    <div className="flex flex-col-reverse  md:flex-row gap-3 bg-background-2 items-center md:items-start space-x-2 p-4 rounded-lg w-full md:h-44 mb-4">
      <div className="relative h-36 md:h-full min-w-36">
        <Image
          src={`/img/${item.image}`}
          fill={true}
          alt={item.title}
          className="rounded-lg object-cover"
        />
      </div>
      <div className="flex flex-col gap-3 grow-1">
        <div className="flex items-center gap-3">
          <h3 className="text-xl">{item.title}</h3>
          <PriceTag price={item.price} />
          <div className="ml-auto">
            <Favorite isFavorite={isFavorite} handleFavoriteClick={handleFavoriteClick}/>
          </div>
        </div>
        <p className="text-sm">{item.description}</p>
      </div>
    </div>
  );
}