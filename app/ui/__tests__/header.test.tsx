import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Header from '../header';
import { useFavorites } from '../../providers/favorites';

jest.mock('../../providers/favorites');

describe('Header', () => {
  const setSearchMock = jest.fn();
  const useFavoritesMock = useFavorites as jest.Mock;

  beforeEach(() => {
    useFavoritesMock.mockReturnValue({
      favorites: []
    });
  });

  it('renders search input and button', () => {
    render(<Header setSearch={setSearchMock} />);
    expect(screen.getByLabelText('Search input')).toBeInTheDocument();
    expect(screen.getByLabelText('Search button')).toBeInTheDocument();
  });

  it('renders favorites button', () => {
    render(<Header setSearch={setSearchMock} />);
    expect(screen.getByLabelText('Favorites button')).toBeInTheDocument();
  });

  it('calls setSearch on search button click', () => {
    render(<Header setSearch={setSearchMock} />);
    fireEvent.change(screen.getByLabelText('Search input'), { target: { value: 'test' } });
    fireEvent.click(screen.getByLabelText('Search button'));
    expect(setSearchMock).toHaveBeenCalledWith('test');
  });


  it('opens closes favorites modal when closeModal', async () => {
    useFavoritesMock.mockReturnValue({
      favorites: [{ title: 'Item 1', image: 'image1' }, { title: 'Item 2', image: 'image2' }]
    });
    render(<Header setSearch={setSearchMock} />);
    fireEvent.click(screen.getByTestId('favorites-button'));

    await waitFor(() => expect(screen.getByTestId('favorites-modal')).toBeInTheDocument());

    const closeModalButton = screen.getByTestId('modal-close');
    fireEvent.click(closeModalButton);

    await waitFor(() => expect(screen.queryByTestId('favorites-modal')).not.toBeInTheDocument());
  });
});
