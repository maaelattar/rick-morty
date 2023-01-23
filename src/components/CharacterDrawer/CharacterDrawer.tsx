import CloseIcon from "@mui/icons-material/Close";
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useQuery } from "urql";
import { GetCharacterInfo } from "../../../lib/queries";
import useCharacterDrawerFacade from "../../facades/useCharacterDrawerFacade";
import { Character, Episode } from "../../gql/graphql";
import { formatCharacterInfo } from "../../utils/utils";
import EpisodesTable from "../EpisodesTable";
const styles = () => ({
  rootPaper: {
    top: "3%",
    right: "1%",
    borderRadius: "3%",
    height: "94%",
    width: "700px",
    backgroundColor: "snow",
    "& img.characterImage": {
      width: "100%",
      height: "400px",
      objectFit: "cover",
    },
  },
  closeButton: { position: "absolute", top: "1%", left: "1%" },
  circularProgress: { position: "absolute", top: "50%", left: "50%" },
  infoBox: {
    padding: "16px 32px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  characterName: { fontWeight: 500, fontSize: "2rem" },
  episodesTitle: { fontSize: "1.5rem" },
});

const CharacterDrawer = () => {
  const { characterId, closeCharacterDrawer } = useCharacterDrawerFacade();

  const [result] = useQuery({
    query: GetCharacterInfo,
    variables: { id: characterId },
  });

  const { fetching, data } = result;

  const sx = styles();

  return (
    <Drawer
      onClose={() => closeCharacterDrawer()}
      anchor={"right"}
      open={!!characterId}
      PaperProps={{
        sx: sx.rootPaper,
      }}
      role="characterDrawer"
    >
      <Container disableGutters maxWidth="lg">
        <IconButton
          role="closeButton"
          onClick={closeCharacterDrawer}
          sx={sx.closeButton}
        >
          <CloseIcon />
        </IconButton>
        {fetching && <CircularProgress sx={sx.circularProgress} />}

        {data?.character && !fetching && (
          <>
            <img
              src={data.character.image!}
              alt={data.character.name!}
              className="characterImage"
            />
            <Box sx={sx.infoBox}>
              <Typography variant="body1" sx={sx.characterName}>
                {data.character.name}
              </Typography>
              <Typography variant="body1" role="characterInfo">
                {formatCharacterInfo(data.character as Character)}
              </Typography>
              <Typography variant="body1" sx={sx.episodesTitle}>
                Episode appearances
              </Typography>
              <Divider />

              <EpisodesTable episodes={data.character.episode as Episode[]} />
            </Box>
          </>
        )}
      </Container>
    </Drawer>
  );
};

export default CharacterDrawer;
