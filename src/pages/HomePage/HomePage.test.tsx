import { characters } from "../../mocks/handlers";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "../../utils/test-utils";
import HomePage from "./HomePage";

import ThemeProvider from "@mui/styles/ThemeProvider";
import { MemoryRouter } from "react-router-dom";
import { Provider as UrGraphQlProvider } from "urql";
import theme from "../../theme";
import urqlClient from "../../UrqlClient";

const setup = () => {
  render(
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <UrGraphQlProvider value={urqlClient}>
          <HomePage />
        </UrGraphQlProvider>
      </ThemeProvider>
    </MemoryRouter>
  );
};

beforeEach(() => {
  setup();
});

describe("HomePage component", () => {
  it("should render HomePage component correctly", () => {
    const element = screen.getByRole("heading");
    expect(element).toBeDefined();
  });

  it("Should display characters when page finishes loading", async () => {
    await waitForElementToBeRemoved(() => screen.getByRole("progressbar"));

    characters.forEach((character) => {
      expect(screen.getByText(character.name)).toBeInTheDocument();

      const image = screen.getByAltText(character.name) as HTMLImageElement;
      expect(image.src).toEqual(character.image);
    });
  });
});
