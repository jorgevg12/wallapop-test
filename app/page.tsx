'use client';

import { useEffect } from 'react';
import CardItem from './ui/card-item';
import MessageIconScreen from './ui/message-icon-screen';
import { useFetchData } from './hooks/useFetchData';
import { MessageIconScreenValues } from './constants/constants';
import { MessageType } from './enums/enums';
import Header from './ui/header';
import { debounce } from './helpers/helpers';
import useNoScroll from "./hooks/useNoScroll";

export default function Home() {
  const { items, page, setPage, setSearch, loading, error, availablePages } = useFetchData('');
  useNoScroll(loading);

  //This useEffect handles the infinite scroll.
  useEffect(() => {
    //debounce to prevent multiple calls when scrolling.
    const handleScroll = debounce(() => {
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
        <main className='p-4'>
          {items.map((item, index) => (
            <CardItem key={index} item={item} index={index}/>
          ))}
        </main>
      }
      {loading && <MessageIconScreen message={MessageIconScreenValues[MessageType.Loading].message} img={MessageIconScreenValues[MessageType.Loading].img} />}
      {(error || (!items.length && !loading)) &&
        <MessageIconScreen
          message={error ? MessageIconScreenValues[MessageType.Error].message : MessageIconScreenValues[MessageType.NoResults].message}
          img={error ? MessageIconScreenValues[MessageType.Error].img : MessageIconScreenValues[MessageType.NoResults].img}
        />}
    </>
  );
}