import { character } from "../../mocks/handlers";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "../../utils/test-utils";
import CharacterDrawer from "./CharacterDrawer";

import { Provider as UrGraphQlProvider } from "urql";
import useCharacterDrawerStore from "../../store/useCharacterDrawerStore";
import urqlClient from "../../UrqlClient";

const setup = () => {
  useCharacterDrawerStore.setState(() => ({
    characterId: character.id,
  }));

  render(
    <UrGraphQlProvider value={urqlClient}>
      <CharacterDrawer />
    </UrGraphQlProvider>
  );
};

beforeEach(() => {
  setup();
});

describe("CharacterDrawer component", () => {
  it("Should display character name and image  when data is fetched successfully", async () => {
    await waitForElementToBeRemoved(() => screen.queryByRole("progressbar"));
    expect(screen.getByText(character.name)).toBeInTheDocument();

    const image = screen.getByAltText(character.name) as HTMLImageElement;
    expect(image.src).toEqual(character.image);
  });

  it("Should display character episodes when data is fetched successfully", async () => {
    const progressBar = screen.queryByRole("progressbar");
    await waitFor(() => expect(progressBar).not.toBeInTheDocument());

    character.episode.forEach((episodeItem) => {
      expect(screen.getByText(episodeItem.name)).toBeInTheDocument();
      expect(screen.getByText(episodeItem.episode)).toBeInTheDocument();
    });
  });

  it("Should display character info when data is fetched successfully", async () => {
    const progressBar = screen.queryByRole("progressbar");
    await waitFor(() => expect(progressBar).not.toBeInTheDocument());

    const characterInfoText = screen.queryByRole("characterInfo")?.textContent;
    expect(characterInfoText).toContain(character.gender.toLowerCase());
    expect(characterInfoText).toContain(character.type);
    expect(characterInfoText).toContain(character.origin.name);
    expect(characterInfoText).toContain(character.location.name);
  });

  it("Should close drawer on close button click", () => {
    const closeButton = screen.getByRole("closeButton");
    fireEvent.click(closeButton);
    const characterDrawer = screen.queryByRole("characterDrawer");

    expect(characterDrawer).not.toBeInTheDocument();
  });
});
