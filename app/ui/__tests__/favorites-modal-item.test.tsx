import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import FavoritesModalItem from '../favorites-modal-item';
import { Item } from '../../types/types';

describe('FavoritesModalItem', () => {
  const item: Item = {
    title: 'Item 1',
    image: 'image1.jpg',
    price: '100',
    description: 'Description of Item 1'
  };

  const removeFavoriteMock = jest.fn();

  it('renders item details', () => {
    render(<FavoritesModalItem item={item} removeFavorite={removeFavoriteMock} />);
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByAltText('Item 1')).toBeInTheDocument();
  });

  it('calls removeFavorite when remove button is clicked', () => {
    render(<FavoritesModalItem item={item} removeFavorite={removeFavoriteMock} />);
    const removeButton = screen.getByTestId('remove-favorite');
    fireEvent.click(removeButton);
    expect(removeFavoriteMock).toHaveBeenCalledWith(item);
  });
});
