import { graphql } from "../src/gql/gql";

export const GetCharacters = graphql(`
  query Characters($page: Int!, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        count
        pages
      }
      results {
        id
        name
        image
      }
    }
  }
`);

export const GetCharacterInfo = graphql(`
  query Character($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      image
      episode {
        id
        name
        episode
      }
      origin {
        id
        name
      }
      location {
        id
        name
      }
    }
  }
`);
