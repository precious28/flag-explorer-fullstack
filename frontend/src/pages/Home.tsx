import { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardActionArea,
  Typography,
  CircularProgress,
  Container,
  Box,
} from "@mui/material";
import { fetchAllCountries } from "../services/api";
import { Country } from "../types/Country";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllCountries()
      .then(setCountries)
      .catch(() => setError("Failed to load countries"))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return <CircularProgress sx={{ margin: "2rem auto", display: "block" }} />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!countries.length) return <Typography>No countries found</Typography>;

  return (
    <Container sx={{ paddingY: 4 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Country Flags
      </Typography>
      <Grid container spacing={3}>
        {countries.map((country) => (
          <Grid size={{ xs: 6, sm: 4, md: 3 }} key={country.name.common}>
            <Card sx={{ height: "100%" }}>
              <CardActionArea
                onClick={() => navigate(`/country/${country.name.common}`)}
                data-testid={`flag-button-${country.name.common}`}
                aria-label={`flag-button-${country.name.common}`}

              >
                <Box
                  sx={{
                    height: 160,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#f0f0f0",
                    padding: 1,
                  }}
                >
                  <CardMedia
                    component="img"
                    image={country.flags.png}
                    alt={country.name.common}
                    sx={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Box>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
