'use client';

import { useCallback, useEffect } from 'react';
import CardItem from './ui/card-item';
import MessageIconScreen from './ui/message-icon-screen';
import { useFetchData } from './hooks/useFetchData';
import { MessageIconScreenValues } from './constants/constants';
import { MessageType } from './enums/enums';
import Header from './ui/header';
import { debounce } from './helpers/helpers';
import useNoScroll from "./hooks/useNoScroll";
import { useFavorites } from './providers/favorites';
import { Item } from './types/types';

export default function Home() {
  const { items, page, setPage, setSearch, loading, error, availablePages } = useFetchData('');
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  useNoScroll(loading);

  const handleFavoriteClick = useCallback((item: Item) => {
    const isFavorite = favorites.some(fav => fav.title === item.title);
    if (isFavorite) {
      removeFavorite(item);
    } else {
      addFavorite(item);
    }
  }, [favorites, addFavorite, removeFavorite]);
  

  //This useEffect handles the infinite scroll.     
  //debounce to prevent multiple calls when scrolling.

  useEffect(() => {
    const handleScroll = debounce(() => {
      //buffer to add some offset and prevent not loading when reaching the bottom.
      const buffer = 5;
      if (window.innerHeight + document.documentElement.scrollTop + buffer < document.documentElement.offsetHeight || loading) {
        return;
      }
      setPage(prevPage => prevPage + 1);
    }, 200);

    if (page < availablePages) {
      window.addEventListener('scroll', handleScroll);
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, page, availablePages]);

  return (
    <>
      <Header setSearch={setSearch}/>
      {items.length > 0 &&
        <main className='p-4' aria-busy={loading}>
          {items.map((item, index) => {
            const isFavorite = favorites.some(fav => fav.title === item.title);
            return (
              <CardItem
                key={index}
                item={item}
                isFavorite={isFavorite}
                onFavoriteClick={handleFavoriteClick}
                aria-label={`Item ${index + 1}: ${item.title}`}
              />
            );
          })}
        </main>
      }
      {loading && <MessageIconScreen message={MessageIconScreenValues[MessageType.Loading].message} img={MessageIconScreenValues[MessageType.Loading].img} aria-live="assertive"/>}
      {(error || (!items.length && !loading)) &&
        <MessageIconScreen
          message={error ? MessageIconScreenValues[MessageType.Error].message : MessageIconScreenValues[MessageType.NoResults].message}
          img={error ? MessageIconScreenValues[MessageType.Error].img : MessageIconScreenValues[MessageType.NoResults].img}
          aria-live="assertive"
        />}
    </>
  );
}