using System.Net;
using System.Net.Http.Json;
using FlagExplorer.Application.Dtos;
using FlagExplorer.Tests.Helpers;
using Xunit;
using FluentAssertions;

namespace FlagExplorer.Tests.Controllers;

public class CountriesControllerTests : IClassFixture<TestWebApplicationFactory>
{
    private readonly HttpClient _client;

    public CountriesControllerTests(TestWebApplicationFactory factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task GetCountries_ReturnsList()
    {
        var response = await _client.GetAsync("/api/countries");
        response.StatusCode.Should().Be(HttpStatusCode.OK);

        var countries = await response.Content.ReadFromJsonAsync<List<CountryDto>>();
        countries.Should().NotBeNull();
        countries.Should().ContainSingle(c => c.Name == "Botswana");
    }

    [Fact]
    public async Task GetCountryByName_ReturnsDetails()
    {
        var response = await _client.GetAsync("/api/countries/Namibia");
        response.StatusCode.Should().Be(HttpStatusCode.OK);

        var country = await response.Content.ReadFromJsonAsync<CountryDetailsDto>();
        country!.Name.Should().Be("Namibia");
        country.Capital.Should().Be("Windhoek");
    }

    [Fact]
    public async Task GetCountryByName_ReturnsNotFound_ForInvalidName()
    {
        var response = await _client.GetAsync("/api/countries/Unknown");
        response.StatusCode.Should().Be(HttpStatusCode.NotFound);
    }
}
