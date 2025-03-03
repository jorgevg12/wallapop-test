'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import Search from './ui/search';
import { Item, ResponseData } from './types/types';

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [availablePages, setAvailablePages] = useState(1);

  const fetchData = async (page: number, search: string) => {
    setLoading(true);
    const searchParam = search ? `&search=${search}` : '';
    const response = await fetch(`/api/items/?page=${page}${searchParam}`);
    const data = await response.json() as ResponseData;
    setItems(prevItems => (page === 1 ? data.items : [...prevItems, ...data.items]));
    setAvailablePages(data.pagesAvailable);
    setLoading(false);
  };

  useEffect(() => {
    setPage(1);
    fetchData(1, search);
  }, [search]);

  useEffect(() => {
    if (page > 1) {
      fetchData(page, search);
    }
  }, [page]);

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
    <div>
      <Search placeholder="Search items..." onSearch={setSearch} />
      {items.map((item, index) => (
        <div key={index}>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
          <p>{item.price}</p>
          <Image src={`/img/${item.image}`} width={110} height={110} alt={item.title} className='rounded-lg max-w-full h-auto' />
        </div>
      ))}
      {loading && <p>Loading...</p>}
      {page < availablePages && !loading && <p>Load more</p>}
    </div>
  );
}
