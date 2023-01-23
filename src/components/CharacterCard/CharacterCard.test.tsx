import { Character } from "../../gql/graphql";
import { character } from "../../mocks/handlers";
import useCharacterDrawerStore from "../../store/useCharacterDrawerStore";
import { fireEvent, render, screen } from "../../utils/test-utils";
import CharacterCard from "./CharacterCard";

const setup = () => {
  render(<CharacterCard character={character as Character} />);
};

beforeEach(() => {
  setup();
});

describe("CharacterCard component", () => {
  it("should render character name", () => {
    expect(screen.getByText(character.name!)).toBeDefined();
  });

  it("Should render character image", () => {
    const image = screen.getByAltText(character.name!) as HTMLImageElement;
    expect(image.src).toEqual(character.image);
  });

  it("Should update characterDrawerStore characterId on card click", () => {
    const characterAction = screen.getByRole("characterAction");
    fireEvent.click(
      characterAction,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
    const { characterId } = useCharacterDrawerStore.getState() as {
      characterId: string | null;
    };

    expect(character.id).toEqual(characterId);
  });
});
