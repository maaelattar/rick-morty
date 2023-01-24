import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/styles/useTheme";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "urql";
import { GetCharacters } from "../../../lib/queries";
import CharacterCard from "../../components/CharacterCard";
import CustomPagination from "../../components/CustomPagination";
import SearchForm from "../../components/SearchForm";
import { Character } from "../../gql/graphql";

const styles = (theme: Theme) => ({
  rootContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    paddingTop: 3,
    paddingBottom: 3,
  },
  title: {
    color: theme.palette.primary.light,
    fontSize: "4rem",
    textAlign: "center",
  },
  charactersContainer: {
    minHeight: "650px",
  },
  circularProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
  },
});

function HomePage() {
  let [searchParams, setSearchParams] = useSearchParams();

  const sx = styles(useTheme());

  const [filter, setFilter] = useState({});

  const page = Number(searchParams.get("page")) || 1;

  const [result] = useQuery({
    query: GetCharacters,
    variables: { page, filter },
  });

  const { fetching, data } = result;

  const renderCharacters = () =>
    data?.characters?.results?.map((character) => (
      <Grid key={character?.id} item xs={12} md={4} xl={3}>
        <CharacterCard character={character as Character} />
      </Grid>
    ));

  const onSearchFormSubmit = (values: Record<string, any>) => {
    setSearchParams({ page: "1" });
    setFilter(values);
  };
  return (
    <Container fixed sx={sx.rootContainer}>
      <Typography variant="h1" sx={sx.title}>
        Rick and Morty Characters
      </Typography>
      <SearchForm onSubmit={onSearchFormSubmit} />

      {fetching && <CircularProgress sx={sx.circularProgress} />}

      <Box sx={sx.charactersContainer}>
        {data?.characters && !fetching && (
          <Grid container spacing={2}>
            {renderCharacters()}
          </Grid>
        )}
      </Box>
      {data?.characters?.info?.count && (
        <CustomPagination pagesCount={data.characters.info?.pages!} />
      )}
    </Container>
  );
}

export default HomePage;
