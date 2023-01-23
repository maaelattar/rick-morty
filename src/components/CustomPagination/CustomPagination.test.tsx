import { MemoryRouter } from "react-router-dom";
import { fireEvent, render, screen } from "../../utils/test-utils";
import CustomPagination from "./CustomPagination";

const setup = () =>
  render(
    <MemoryRouter>
      <CustomPagination pagesCount={6} />
    </MemoryRouter>
  );

beforeEach(() => {
  setup();
});

describe("CustomPagination component", () => {
  it("Should highlight selected page button", () => {
    const pageFiveButton = screen.getByLabelText("Go to page 5");
    fireEvent.click(pageFiveButton);
    expect(pageFiveButton.classList.contains("Mui-selected")).toBeTruthy();
    expect(pageFiveButton.getAttribute("aria-current")).toEqual("true");
  });
});
