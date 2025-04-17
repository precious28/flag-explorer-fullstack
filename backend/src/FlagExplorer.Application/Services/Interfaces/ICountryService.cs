using FlagExplorer.Application.Dtos;

namespace FlagExplorer.Application.Interfaces;

public interface ICountryService
{
    Task<IEnumerable<CountryDto>> GetAllCountriesAsync();
    Task<CountryDetailsDto> GetCountryByNameAsync(string name);
}
