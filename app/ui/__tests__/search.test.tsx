import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Search from '../search';

describe('Search', () => {
  const onSearchMock = jest.fn();

  it('renders search input and button', () => {
    render(<Search placeholder="Search items..." onSearch={onSearchMock} />);
    expect(screen.getByLabelText('Search input')).toBeInTheDocument();
    expect(screen.getByLabelText('Search button')).toBeInTheDocument();
  });

  it('calls onSearch when search button is clicked', () => {
    render(<Search placeholder="Search items..." onSearch={onSearchMock} />);
    const input = screen.getByLabelText('Search input');
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.click(screen.getByLabelText('Search button'));
    expect(onSearchMock).toHaveBeenCalledWith('test');
  });

  it('calls onSearch when Enter key is pressed', () => {
    render(<Search placeholder="Search items..." onSearch={onSearchMock} />);
    const input = screen.getByLabelText('Search input');
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(onSearchMock).toHaveBeenCalledWith('test');
  });
});
