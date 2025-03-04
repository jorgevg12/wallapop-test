import { useState, useEffect } from 'react';
import { Item, ResponseData } from '../types/types';

// Custom hook that fetches data from the server and paginates it. 
// It also handles search functionality and server errors.

//The parameter is set in case we want to read the initialsearch from the URL query params.
export const useFetchData = (initialSearch: string) => {
  const [items, setItems] = useState<Item[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(initialSearch);
  const [loading, setLoading] = useState(true);
  const [availablePages, setAvailablePages] = useState(1);
  const [error, setError] = useState(false);

  const fetchData = async (page: number, search: string) => {
    setLoading(true);
    const searchParam = search ? `&search=${search}` : '';
    const response = await fetch(`/api/items/?page=${page}${searchParam}`);
    if (!response.ok) {
      setLoading(false);
      setError(true);
      return;
    }
    setError(false);
    const data = await response.json() as ResponseData;
    setItems(prevItems => (page === 1 ? data.items : [...prevItems, ...data.items]));
    setAvailablePages(data.pagesAvailable);
    setLoading(false);
  };

  useEffect(() => {
    setItems([]);
    setPage(1);
    fetchData(1, search);
  }, [search]);

  useEffect(() => {
    if (page > 1) {
      fetchData(page, search);
    }
  }, [page]);

  return { items, page, setPage, setSearch, loading, error, availablePages };
};