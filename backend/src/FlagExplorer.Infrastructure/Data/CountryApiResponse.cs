namespace FlagExplorer.Infrastructure.Data;

public class CountryApiResponse
{
    public Name name { get; set; }
    public Flags flags { get; set; }
    public string[] capital { get; set; }
    public int population { get; set; }
}

public class Name
{
    public string common { get; set; }
}

public class Flags
{
    public string png { get; set; }
}
