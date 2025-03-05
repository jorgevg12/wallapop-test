'use client';

import React, { memo } from 'react';
import Image from "next/image";
import { Item } from "../types/types";
import PriceTag from "./price-tag";
import Favorite from "./favorite";

interface CardItemProps {
  item: Item;
  isFavorite: boolean;
  onFavoriteClick: (item: Item) => void;
}

function CardItem({ item, isFavorite, onFavoriteClick }: CardItemProps) {

  return (
    <div className="flex flex-col-reverse md:flex-row gap-3 bg-background-2 items-center md:items-start space-x-2 p-4 rounded-lg w-full md:h-44 mb-4">
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
            <Favorite 
              isFavorite={isFavorite} 
              handleFavoriteClick={() => onFavoriteClick(item)}
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
           />
          </div>
        </div>
        <p className="text-sm">{item.description}</p>
      </div>
    </div>
  );
}

//logic added to prevent re-renders when the item is the same.
function areEqual(prevProps: CardItemProps, nextProps: CardItemProps) {
  return prevProps.item === nextProps.item && prevProps.isFavorite === nextProps.isFavorite;
}

export default memo(CardItem, areEqual);