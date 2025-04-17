using FlagExplorer.Domain.Models;

namespace FlagExplorer.Application.Repositories;

public interface ICountryRepository
{
    Task<IEnumerable<Country>> GetAllCountriesAsync();
    Task<CountryDetails> GetCountryByNameAsync(string name);
}
