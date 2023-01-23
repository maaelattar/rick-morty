import { Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/system";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "urql";
import { GetCharacters } from "../../../lib/queries";
import CharacterCard from "../../components/CharacterCard";
import CustomPagination from "../../components/CustomPagination";
import { Character } from "../../gql/graphql";

const styles = () => ({
  rootContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    paddingTop: 3,
    paddingBottom: 3,
  },
  title: {
    color: "#9393c6",
    fontSize: "4rem",
    textAlign: "center",
  },
  circularProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
  },
});

function HomePage() {
  let [searchParams] = useSearchParams();

  const sx = styles();

  const page = Number(searchParams.get("page")) || 1;

  const [result] = useQuery({
    query: GetCharacters,
    variables: { page },
  });

  const { fetching, data } = result;

  const renderCharacters = () =>
    data?.characters?.results?.map((character) => (
      <Grid key={character?.id} item xs={12} md={4} xl={3}>
        <CharacterCard character={character as Character} />
      </Grid>
    ));

  return (
    <Container fixed sx={sx.rootContainer}>
      <Typography variant="h1" sx={sx.title}>
        Rick and Morty Characters
      </Typography>

      {fetching && <CircularProgress sx={sx.circularProgress} />}

      {data?.characters && !fetching && (
        <>
          <Grid container spacing={2}>
            {renderCharacters()}
          </Grid>
        </>
      )}
      {data?.characters?.info?.count && (
        <CustomPagination pagesCount={data.characters.info?.pages!} />
      )}
    </Container>
  );
}

export default HomePage;
