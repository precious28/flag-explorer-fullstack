using Xunit;
using Moq;
using FluentAssertions;
using FlagExplorer.Application.Services;
using FlagExplorer.Application.Repositories;
using FlagExplorer.Domain.Models;

namespace FlagExplorer.Tests.Services;

public class CountryServiceTests
{
    private readonly Mock<ICountryRepository> _mockRepo;
    private readonly CountryService _service;

    public CountryServiceTests()
    {
        _mockRepo = new Mock<ICountryRepository>();
        _service = new CountryService(_mockRepo.Object);
    }

    [Fact]
    public async Task GetAllCountriesAsync_ShouldReturnMappedCountryDtos()
    {
        // Arrange
        var countries = new List<Country>
        {
            new() { Name = "South Africa", Flag = "🇿🇦" }
        };

        _mockRepo.Setup(r => r.GetAllCountriesAsync()).ReturnsAsync(countries);

        // Act
        var result = await _service.GetAllCountriesAsync();

        // Assert
        result.Should().HaveCount(1);
        result.First().Name.Should().Be("South Africa");
        result.First().Flag.Should().Be("🇿🇦");
    }

    [Fact]
    public async Task GetCountryByNameAsync_ShouldReturnCountryDetailsDto_WhenCountryExists()
    {
        // Arrange
        var country = new CountryDetails
        {
            Name = "Kenya",
            Flag = "🇰🇪",
            Capital = "Nairobi",
            Population = 50000000
        };

        _mockRepo.Setup(r => r.GetCountryByNameAsync("Kenya")).ReturnsAsync(country);

        // Act
        var result = await _service.GetCountryByNameAsync("Kenya");

        // Assert
        result.Should().NotBeNull();
        result.Name.Should().Be("Kenya");
        result.Capital.Should().Be("Nairobi");
        result.Population.Should().Be(50000000);
    }

    [Fact]
    public async Task GetCountryByNameAsync_ShouldReturnNull_WhenCountryNotFound()
    {
        // Arrange
        _mockRepo.Setup(r => r.GetCountryByNameAsync("Atlantis")).ReturnsAsync((CountryDetails)null);

        // Act
        var result = await _service.GetCountryByNameAsync("Atlantis");

        // Assert
        result.Should().BeNull();
    }
}
