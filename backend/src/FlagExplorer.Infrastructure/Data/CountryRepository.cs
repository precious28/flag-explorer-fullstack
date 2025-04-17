using System.Net.Http.Json;
using FlagExplorer.Application.Repositories;
using FlagExplorer.Domain.Models;

namespace FlagExplorer.Infrastructure.Data;

public class CountryRepository : ICountryRepository
{
    private readonly HttpClient _httpClient;

    public CountryRepository(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<IEnumerable<Country>> GetAllCountriesAsync()
    {
        var response = await _httpClient.GetFromJsonAsync<List<CountryApiResponse>>("https://restcountries.com/v3.1/all");

        return response?.Select(c => new Country
        {
            Name = c.name?.common,
            Flag = c.flags?.png
        }) ?? new List<Country>();
    }

 public async Task<CountryDetails> GetCountryByNameAsync(string name)
{
    try
    {
        var response = await _httpClient.GetAsync($"https://restcountries.com/v3.1/name/{name}");

        if (!response.IsSuccessStatusCode)
        {
            return null;
        }

        var countries = await response.Content.ReadFromJsonAsync<List<CountryApiResponse>>();
        var country = countries?.FirstOrDefault();

        if (country == null) return null;

        return new CountryDetails
        {
            Name = country.name?.common,
            Flag = country.flags?.png,
            Capital = country.capital?.FirstOrDefault(),
            Population = country.population
        };
    }
    catch
    {
        return null;
    }
}
}