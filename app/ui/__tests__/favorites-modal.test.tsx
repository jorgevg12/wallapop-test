import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import FavoritesModal from '../favorites-modal';
import { useFavorites } from '../../providers/favorites';

jest.mock('../../providers/favorites');

describe('FavoritesModal', () => {
  const closeModalMock = jest.fn();
  const useFavoritesMock = useFavorites as jest.Mock;

  beforeEach(() => {
    useFavoritesMock.mockReturnValue({
      favorites: [{ title: 'Item 1', image: 'image1' }, { title: 'Item 2', image: 'image2' }],
      removeFavorite: jest.fn()
    });
  });

  it('renders favorites modal with items', () => {
    render(<FavoritesModal closeModal={closeModalMock} />);
    expect(screen.getByText('Favorites')).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('calls closeModal when close button is clicked', () => {
    render(<FavoritesModal closeModal={closeModalMock} />);
    const closeButton = screen.getByTestId('modal-close');
    fireEvent.click(closeButton);
    expect(closeModalMock).toHaveBeenCalled();
  });

  it('displays message when there are no favorites', () => {
    useFavoritesMock.mockReturnValueOnce({
      favorites: [],
      removeFavorite: jest.fn()
    });
    render(<FavoritesModal closeModal={closeModalMock} />);
    expect(screen.getByText('Add some favorites! :)')).toBeInTheDocument();
  });
});
