/* eslint-disable testing-library/no-wait-for-multiple-assertions */
/* eslint-disable testing-library/prefer-find-by */
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CountryDetail from '../CountryDetail';
import { fetchCountryByName } from '../../services/api';

// Mock the API service
jest.mock('../../services/api');

describe('Country Detail Page', () => {

  beforeEach(() => {
    // Provide a default mock implementation that returns a Promise
    (fetchCountryByName as jest.Mock).mockImplementation(() => 
      Promise.resolve({})
    );
  });


  // Clear all mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('displays loading spinner while fetching data', () => {
    // Add a delayed promise to ensure the loading state is visible
    (fetchCountryByName as jest.Mock).mockImplementation(() =>
      new Promise(resolve => setTimeout(resolve, 100))
    );

    render(
      <MemoryRouter initialEntries={['/country/Germany']}>
        <Routes>
          <Route path="/country/:name" element={<CountryDetail />} />
        </Routes>
      </MemoryRouter>
    );

    // Expect the CircularProgress spinner to be displayed while loading
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('displays country details once data is fetched', async () => {
    const mockCountry = {
      name: { common: 'Germany' },
      population: 83166711,
      capital: ['Berlin'],
      flags: { png: 'https://link-to-german-flag.png' },
    };
    (fetchCountryByName as jest.Mock).mockResolvedValue(mockCountry);
  
    render(
      <MemoryRouter initialEntries={['/country/Germany']}>
        <Routes>
          <Route path="/country/:name" element={<CountryDetail />} />
        </Routes>
      </MemoryRouter>
    );
  
    await waitFor(() => expect(screen.getByText('Germany')).toBeInTheDocument());
    
    // Population check
    await waitFor(() => {
      const elements = screen.getAllByText((content, element) => {
        const hasText = element?.textContent?.includes('Population:');
        const hasNumber = element?.textContent?.includes('83,166,711') || 
                         element?.textContent?.includes('83166711');
        return Boolean(hasText && hasNumber);
      });
      expect(elements.length).toBeGreaterThan(0);
      expect(elements[0]).toHaveTextContent(/Population:.*83[,.]?166[,.]?711/);
    });
    
    // Capital check
    await waitFor(() => {
      const elements = screen.getAllByText((content: any, element: any) => {
        return element?.textContent?.includes('Capital:') && 
               element?.textContent?.includes('Berlin');
      });
      expect(elements.length).toBeGreaterThan(0);
      expect(elements[0]).toHaveTextContent(/Capital:.*Berlin/);
    });
  });  

  test('displays "Country not found" if the country data is unavailable', async () => {
    (fetchCountryByName as jest.Mock).mockResolvedValue(null);

    render(
      <MemoryRouter initialEntries={['/country/UnknownCountry']}>
        <Routes>
          <Route path="/country/:name" element={<CountryDetail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText('Country not found.')).toBeInTheDocument());
  });
});
