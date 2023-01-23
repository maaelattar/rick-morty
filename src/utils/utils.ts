import { Character } from "../gql/graphql";

export const formatCharacterInfo = (character: Character) => {
  const { name, gender, type, species, origin, location } = character;
  const refer = gender?.toLowerCase() === "female" ? "her" : "his";
  const typeSentence = !!type ? `, ${refer} type is ${type}` : "";
  const originSentence = !!origin?.name
    ? `${refer} origin is ${origin.name}`
    : "";
  const locationSentence = !!location?.name
    ? ` and ${refer} location is ${location.name}`
    : "";

  const info = `${name} is ${gender?.toLowerCase()} ${species?.toLocaleLowerCase()}${typeSentence}, ${originSentence}${locationSentence}`;
  return info;
};
