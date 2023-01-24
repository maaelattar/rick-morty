import ThemeProvider from "@mui/styles/ThemeProvider";
import theme from "../../theme";
import { render, screen, within } from "../../utils/test-utils";
import SearchForm from "./SearchForm";

const setup = () =>
  render(
    <ThemeProvider theme={theme}>
      <SearchForm onSubmit={vi.fn()} />
    </ThemeProvider>
  );

beforeEach(() => {
  setup();
});

describe("SearchForm component", () => {
  it("Should render Name, Status, Species and Gender fields", () => {
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Status")).toBeInTheDocument();
    expect(screen.getByLabelText("Species")).toBeInTheDocument();
    expect(screen.getByLabelText("Gender")).toBeInTheDocument();
  });

  it("Should render submit button with search icon", () => {
    const searchButtonSubmit = screen.getByRole("searchButtonSubmit");
    expect(searchButtonSubmit).toBeInTheDocument();
    const searchIcon = within(searchButtonSubmit).getByTestId("SearchIcon");
    expect(searchIcon).toBeInTheDocument();
  });
});
