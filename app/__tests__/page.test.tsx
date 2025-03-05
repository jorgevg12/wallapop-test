import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '../page';
import { useFetchData } from '../hooks/useFetchData';
import { useFavorites } from '../providers/favorites';

jest.mock('../hooks/useFetchData');
jest.mock('../providers/favorites');

describe('Home', () => {
  const useFetchDataMock = useFetchData as jest.Mock;
  const useFavoritesMock = useFavorites as jest.Mock;

  beforeEach(() => {
    useFetchDataMock.mockReturnValue({
      items: [],
      page: 1,
      setPage: jest.fn(),
      setSearch: jest.fn(),
      loading: false,
      error: null,
      availablePages: 1
    });

    useFavoritesMock.mockReturnValue({
      favorites: [],
      addFavorite: jest.fn(),
      removeFavorite: jest.fn()
    });
  });

  it('renders header and main elements', () => {
    useFetchDataMock.mockReturnValueOnce({
      ...useFetchDataMock(),
      items: [{ title: 'Item 1', image: 'image1' }, { title: 'Item 2', image: 'image2' }]
    });
    render(<Home />);
    expect(screen.getByLabelText('Main header')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('displays loading message when loading', () => {
    useFetchDataMock.mockReturnValueOnce({
      ...useFetchDataMock(),
      loading: true
    });
    render(<Home />);
    expect(screen.getByAltText('loading')).toBeInTheDocument();
  });

  it('displays error message when there is an error', () => {
    useFetchDataMock.mockReturnValueOnce({
      ...useFetchDataMock(),
      error: true
    });
    render(<Home />);
    expect(screen.getByText('Ups! Something went wrong while fetching data...')).toBeInTheDocument();
  });

  it('displays no results message when there are no items', () => {
    render(<Home />);
    expect(screen.getByText('No results found')).toBeInTheDocument();
  });

  it('displays items when there are items', () => {
    useFetchDataMock.mockReturnValueOnce({
      ...useFetchDataMock(),
      items: [{ title: 'Item 1', image: 'image1' }, { title: 'Item 2', image: 'image2' }]
    });
    render(<Home />);
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('add favorite on button click', async () => {
    const addFavoriteMock = jest.fn();

    useFetchDataMock.mockReturnValueOnce({
      ...useFetchDataMock(),
      items: [{ title: 'Item 1', image: 'image1' }]
    });

    useFavoritesMock.mockReturnValueOnce({
      favorites: [],
      addFavorite: addFavoriteMock,
    });

    render(<Home />);
    const favoriteButton = screen.getByTestId('favorites-toggle');
    fireEvent.click(favoriteButton);

    expect(addFavoriteMock).toHaveBeenCalledWith({ title: 'Item 1', image: 'image1' });   
  });

  it('removes favorite on button click', async () => {
    const removeFavoriteMock = jest.fn();

    useFetchDataMock.mockReturnValueOnce({
      ...useFetchDataMock(),
      items: [{ title: 'Item 1', image: 'image1' }]
    });

    useFavoritesMock.mockReturnValueOnce({
      favorites: [{ title: 'Item 1', image: 'image1' }],
      removeFavorite: removeFavoriteMock,
    });

    render(<Home />);
    const favoriteButton = screen.getByTestId('favorites-toggle');
    fireEvent.click(favoriteButton);

    expect(removeFavoriteMock).toHaveBeenCalledWith({ title: 'Item 1', image: 'image1' });
  });

  it('handle scroll to load more items', async () => {
    const setPageMock = jest.fn();
    useFetchDataMock.mockReturnValueOnce({
      ...useFetchDataMock(),
      items: [{ title: 'Item 1', image: 'image1' }],
      setPage: setPageMock,
      availablePages: 2
    });

    render(<Home />);

    fireEvent.scroll(window, { target: { scrollingElement: { scrollTop: 1000 } } });

    await waitFor(() => expect(setPageMock).toHaveBeenCalled());
  });
});
