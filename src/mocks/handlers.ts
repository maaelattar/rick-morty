import { graphql } from "msw";

export const characters = [
  { id: "1", name: "Rick", image: "https://via.placeholder.com/151" },
  { id: "2", name: "Alex", image: "https://via.placeholder.com/152" },
  { id: "3", name: "Anna", image: "https://via.placeholder.com/153" },
  { id: "4", name: "Leo", image: "https://via.placeholder.com/154" },
  { id: "5", name: "Mo", image: "https://via.placeholder.com/155" },
  { id: "6", name: "Brice", image: "https://via.placeholder.com/156" },
];

export const character = {
  id: "18",
  name: "Antenna Morty",
  status: "Alive",
  species: "Human",
  type: "Human with antennae",
  gender: "Male",
  image: "https://rickandmortyapi.com/api/character/avatar/18.jpeg",
  episode: [
    {
      id: "10",
      name: "Close Rick-counters of the Rick Kind",
      air_date: "April 7, 2014",
      episode: "S01E10",
      created: "2017-11-10T12:56:34.747Z",
      __typename: "Episode",
    },
    {
      id: "28",
      name: "The Ricklantis Mixup",
      air_date: "September 10, 2017",
      episode: "S03E07",
      created: "2017-11-10T12:56:36.618Z",
      __typename: "Episode",
    },
  ],
  location: {
    name: "Citadel of Ricks",
    type: "Space station",
  },
  origin: {
    name: "unknown",
  },
  created: "2017-11-04T22:25:29.008Z",
};

export const handlers = [
  graphql.query("Characters", (req, res, ctx) => {
    return res(
      ctx.data({
        characters: {
          info: { pages: 1 },
          results: characters,
        },
      })
    );
  }),
  graphql.query("Character", (req, res, ctx) => {
    return res(
      ctx.data({
        character,
      })
    );
  }),
];
