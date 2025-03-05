'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Item } from '../types/types';

interface FavoritesContextProps {
  favorites: Item[];
  addFavorite: (item: Item) => void;
  removeFavorite: (item: Item) => void;
}

const FavoritesContext = createContext<FavoritesContextProps | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Item[]>([]);

  const addFavorite = (item: Item) => {
    setFavorites(prevFavorites => [...prevFavorites, item]);
  };

  const removeFavorite = (item: Item) => {
    setFavorites(prevFavorites => prevFavorites.filter(fav => fav.title !== item.title));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
