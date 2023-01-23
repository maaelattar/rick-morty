import { fireEvent, render, screen } from "../../utils/test-utils";
import CustomAutoComplete from "./CustomAutoComplete";

const name = "greeting";
const placeholder = "Greeting";
const options = [
  { title: "Hello", value: "hello" },
  { title: "Hi", value: "hi" },
];

const setup = () =>
  render(
    <CustomAutoComplete
      options={options}
      placeholder={placeholder}
      name={name}
      register={vi.fn()}
    />
  );

beforeEach(() => {
  setup();
});

describe("CustomAutoComplete component", () => {
  it("Should render ArrowDropDownIcon in case autocomplete is not expanded", () => {
    const input = screen.getByRole("combobox") as HTMLInputElement;
    expect(input.getAttribute("aria-expanded")).toEqual("false");
    expect(screen.getByTestId("ArrowDropDownIcon")).toBeInTheDocument();
    expect(screen.queryByTestId("ArrowDropUpIcon")).not.toBeInTheDocument();
  });
  it("Should render ArrowDropUpIcon in case autocomplete is expanded", () => {
    const input = screen.getByRole("combobox") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "h" } });

    expect(input.getAttribute("aria-expanded")).toEqual("true");
    expect(screen.getByTestId("ArrowDropUpIcon")).toBeInTheDocument();
    expect(screen.queryByTestId("ArrowDropDownIcon")).not.toBeInTheDocument();
  });
  it("Should update input value", () => {
    const input = screen.getByRole("combobox") as HTMLInputElement;

    fireEvent.change(input, { target: { value: options[0].value } });

    expect(input.value).toEqual(options[0].value);
  });
});
