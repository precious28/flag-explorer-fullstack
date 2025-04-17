import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CircularProgress,
  Box,
  Paper,
  Button,
} from "@mui/material";
import { fetchCountryByName } from "../services/api";
import { CountryDetails } from "../types/Country";
import { useParams, useNavigate } from "react-router-dom";

const CountryDetail = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState<CountryDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (name) {
      fetchCountryByName(name)
        .then(setCountry)
        .finally(() => setLoading(false));
    }
  }, [name]);

  if (loading)
    return <CircularProgress sx={{ margin: "2rem auto", display: "block" }} />;
  if (!country) return <Typography>Country not found.</Typography>;

  return (
    <Container sx={{ mt: 4 }}>
      <Box sx={{ textAlign: "center" }}>
        <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mb: 3 }}>
          ← Back
        </Button>

        <Typography variant="h3" gutterBottom>
          {country.name.common}
        </Typography>
        <Box
          sx={{
            mt: 50, // ⬅ adds more space between flag card and this info card
            p: 3,
            maxWidth: 500,
            margin: "auto",
            textAlign: "left",
            backgroundColor: "#fafafa",
          }}
        >
          <Card
            sx={{
              maxWidth: 400,
              margin: "0 auto",
              backgroundColor: "#f5f5f5",
              borderRadius: 2,
            }}
          >
            <Box
              sx={{
                height: 200,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#fff",
                padding: 2,
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
          </Card>
        </Box>
        <Box
          sx={{
            mt: 50, // ⬅ adds more space between flag card and this info card
            p: 3,
            maxWidth: 500,
            margin: "auto",
            textAlign: "left",
            backgroundColor: "#fafafa",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 3,
              maxWidth: 500,
              margin: "auto",
              textAlign: "left",
              backgroundColor: "#fafafa",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Population:
            </Typography>
            <div data-testid="population-section">

            <Typography sx={{ mb: 2 }}>
              {country.population.toLocaleString()}
            </Typography>
</div>
            <Typography variant="h6" gutterBottom>
              Capital:
            </Typography>
            <Typography>{country.capital?.[0] ?? "N/A"}</Typography>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default CountryDetail;
