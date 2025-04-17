using Microsoft.AspNetCore.Mvc;
using FlagExplorer.Application.Services;
using FlagExplorer.Application.Dtos;
using FlagExplorer.Application.Interfaces; 



namespace FlagExplorer.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CountriesController : ControllerBase
{
    private readonly ICountryService _countryservice;

    public CountriesController(ICountryService countryservice)
    {
        _countryservice = countryservice;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CountryDto>>> GetCountries()
    {
        var countries = await _countryservice.GetAllCountriesAsync();
        return Ok(countries);
    }

    [HttpGet("{name}")]
    public async Task<ActionResult<CountryDetailsDto>> GetCountry(string name)
    {
        var country = await _countryservice.GetCountryByNameAsync(name);
        if (country == null)
            return NotFound();

        return Ok(country);
    }
}
