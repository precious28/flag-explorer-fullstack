/* eslint-disable testing-library/prefer-find-by */
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '../Home';
import { fetchAllCountries } from '../../services/api';
import { MemoryRouter } from 'react-router-dom';

// Mock the API service
jest.mock('../../services/api');

const mockNavigate = jest.fn();

// Mock the entire react-router-dom module
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

describe('Home Page', () => {

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  test('displays loading spinner while fetching data', () => {
    // Mock the API call with a Promise that doesn't resolve immediately
    (fetchAllCountries as jest.Mock).mockReturnValue(
      new Promise(() => {})  // This creates a pending promise
    );

    render( 
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    
    // Check if the CircularProgress (loading spinner) is shown
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('displays a grid of country flags after data is fetched', async () => {
    // Mock successful API response
    const mockCountries = [
      { name: { common: 'Germany' }, flags: { png: 'https://link-to-german-flag.png' } },
      { name: { common: 'France' }, flags: { png: 'https://link-to-french-flag.png' } },
    ];
    (fetchAllCountries as jest.Mock).mockResolvedValue(mockCountries);

    render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );

    // Wait for the grid to be populated
    await waitFor(() => expect(screen.getByAltText('Germany')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByAltText('France')).toBeInTheDocument());
    
    // Check if the country flags are displayed
    expect(screen.getAllByRole('img')).toHaveLength(mockCountries.length);
  });

  test('navigates to the detail page when a flag is clicked', async () => {
    const user = userEvent.setup();

    const mockCountries = [
      { name: { common: 'Germany' }, flags: { png: 'https://link-to-german-flag.png' } },
    ];
    (fetchAllCountries as jest.Mock).mockResolvedValue(mockCountries);

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('flag-button-Germany')).toBeInTheDocument();
    });

    const flagButton = screen.getByTestId('flag-button-Germany');
    await user.click(flagButton);

    expect(mockNavigate).toHaveBeenCalledWith('/country/Germany');
  });
});
