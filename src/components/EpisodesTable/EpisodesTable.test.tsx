import { character } from "../../mocks/handlers";
import { render, screen } from "../../utils/test-utils";
import EpisodesTable from "./EpisodesTable";

import { Episode } from "../../gql/graphql";

const setup = () =>
  render(<EpisodesTable episodes={character.episode as Episode[]} />);

beforeEach(() => {
  setup();
});

describe("EpisodesTable component", () => {
  it("Should have number of rows as episodes number", () => {
    expect(screen.getAllByRole("episodeRow")).toHaveLength(
      character.episode.length
    );
  });

  it("Should have next and previous button disabled if episodes length is less rows per page number", () => {
    const previousPageButton = screen.getByLabelText("Go to previous page");
    const nextPageButton = screen.getByLabelText("Go to previous page");

    const episodeRowCount = screen.getAllByRole("episodeRow").length;

    const rowsPerPage =
      screen
        .getByRole("episodesTablePagination")
        .getElementsByTagName("input")
        .item(0)?.value ?? 5;

    if (episodeRowCount < +rowsPerPage + 1) {
      expect(previousPageButton).toBeDisabled();
      expect(nextPageButton).toBeDisabled();
    }
  });
});
