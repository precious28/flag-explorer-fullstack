using FlagExplorer.Application.Dtos;
using FlagExplorer.Application.Interfaces;
using FlagExplorer.Application.Repositories;


namespace FlagExplorer.Application.Services;

public class CountryService : ICountryService
{
    private readonly ICountryRepository _countryrepository;

    public CountryService(ICountryRepository countryrepository)
    {
        _countryrepository = countryrepository;
    }

    public async Task<IEnumerable<CountryDto>> GetAllCountriesAsync()
    {
        var countries = await _countryrepository.GetAllCountriesAsync();
        return countries.Select(c => new CountryDto
        {
            Name = c.Name,
            Flag = c.Flag
        });
    }

    public async Task<CountryDetailsDto> GetCountryByNameAsync(string name)
    {
        var country = await _countryrepository.GetCountryByNameAsync(name);
        if (country == null) return null;

        return new CountryDetailsDto
        {
            Name = country.Name,
            Flag = country.Flag,
            Population = country.Population,
            Capital = country.Capital
        };
    }
}
