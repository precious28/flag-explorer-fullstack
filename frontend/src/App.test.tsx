import { render, screen, waitFor } from '@testing-library/react';
import { fetchAllCountries } from './services/api';
import App from './App';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router, MemoryRouter } from 'react-router-dom';

// Mock API response
jest.mock('./services/api');
const mockNavigate = jest.fn();

// Mock the entire react-router-dom module
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

describe('App Navigation', () => {
  test('navigates to the detail page when a flag is clicked', async () => {
    const user = userEvent.setup();

    const mockCountries = [
      { name: { common: 'Germany' }, flags: { png: 'https://link-to-german-flag.png' } },
    ];
    (fetchAllCountries as jest.Mock).mockResolvedValue(mockCountries);

    render(
        <App />
    );

    await waitFor(() => {
      expect(screen.getByTestId('flag-button-Germany')).toBeInTheDocument();
    });

    const flagButton = screen.getByTestId('flag-button-Germany');
    await user.click(flagButton);

    expect(mockNavigate).toHaveBeenCalledWith('/country/Germany');
  });
});
