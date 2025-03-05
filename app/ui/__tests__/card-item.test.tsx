import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CardItem from '../card-item';
import { Item } from '../../types/types';

describe('CardItem', () => {
  const item: Item = {
    title: 'Item 1',
    image: 'image1.jpg',
    price: '100',
    description: 'Description of Item 1'
  };

  const onFavoriteClickMock = jest.fn();

  it('renders item details', () => {
    render(<CardItem item={item} isFavorite={false} onFavoriteClick={onFavoriteClickMock} />);
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Description of Item 1')).toBeInTheDocument();
    expect(screen.getByText('€100')).toBeInTheDocument();
    expect(screen.getByAltText('Item 1')).toBeInTheDocument();
  });

  it('calls onFavoriteClick when favorite button is clicked', async  () => {
    render(<CardItem item={item} isFavorite={false} onFavoriteClick={onFavoriteClickMock} />);
    const favoriteButton = screen.getByTestId('favorites-toggle');
    fireEvent.click(favoriteButton);
    expect(onFavoriteClickMock).toHaveBeenCalledWith(item)
  });

});
