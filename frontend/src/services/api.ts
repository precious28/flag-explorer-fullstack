import axios from 'axios';
import { Country, CountryDetails } from '../types/Country';

const BASE_URL = 'https://restcountries.com/v3.1';

export const fetchAllCountries = async (): Promise<Country[]> => {
  const response = await axios.get(`${BASE_URL}/all`);
  return response.data;
};

export const fetchCountryByName = async (name: string): Promise<CountryDetails> => {
  const response = await axios.get(`${BASE_URL}/name/${name}?fullText=true`);
  return response.data[0];
};
