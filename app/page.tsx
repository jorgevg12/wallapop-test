'use client';

import { useEffect } from 'react';
import Search from './ui/search';
import CardItem from './ui/card-item';
import MessageIconScreen from './ui/message-icon-screen';
import { useFetchData } from './hooks/useFetchData';
import { MessageIconScreenValues } from './constants/constants';
import { MessageType } from './enums/enums';

export default function Home() {
  const { items, page, setPage, setSearch, loading, error, availablePages } = useFetchData('');

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) {
        return;
      }
      setPage(prevPage => prevPage + 1);
    };

    if (page < availablePages) {
      window.addEventListener('scroll', handleScroll);
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  return (
    <>
      <header className='sticky bg-[#2c2c2c] flex justify-center top-0 p-4 shadow-md z-10'>
        <Search placeholder="Search items..." onSearch={setSearch} />
      </header>
      {items.length > 0 &&
        <main className='p-4'>
          {items.map((item, index) => (
            <CardItem key={index} item={item} />
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