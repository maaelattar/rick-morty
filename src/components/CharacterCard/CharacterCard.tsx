import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import useCharacterDrawerFacade from "../../facades/useCharacterDrawerFacade";
import { Character } from "../../gql/graphql";

const styles = () => ({
  cardRoot: { backgroundColor: "lavender" },
});

type Props = { character: Character };

const CharacterCard = (props: Props) => {
  const { character } = props;

  const { openCharacterDrawer } = useCharacterDrawerFacade();

  const sx = styles();

  return (
    <Card sx={sx.cardRoot}>
      <CardActionArea
        role="characterAction"
        onClick={() => {
          openCharacterDrawer(character.id);
        }}
      >
        <CardMedia
          component="img"
          image={character.image!}
          alt={character.name!}
        />
        <CardContent>
          <Typography gutterBottom variant="overline" component="p">
            {character.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CharacterCard;
