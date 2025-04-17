export interface Country {
    name: { common: string };
    flags: { png: string };
  }
  
  export interface CountryDetails {
    name: { common: string };
    population: number;
    capital: string[];
    flags: { png: string };
  }
  