import ToDoInput from "./todo-input";
import { render, screen, cleanup } from "@testing-library/react";
import {
  useComponentDispatch,
  useComponentSelector,
} from "../../tests/redux-hooks";
import { testSelector } from "../../tests/test-selector";
import "@testing-library/jest-dom/extend-expect";
import user from "@testing-library/user-event";
jest.mock("../../tests/redux-hooks");
const dispatch = jest.fn();
beforeEach(() => {
  useComponentSelector.mockImplementation(testSelector);
  useComponentDispatch.mockImplementation(() => dispatch);
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});
afterEach(cleanup);
describe("ToDo Input Component", () => {
  test("renders correctly", () => {
    render(<ToDoInput />);
    const heading = screen.getByRole("heading");
    expect(heading).toHaveTextContent("Todo App");

    const inputElement = screen.getByPlaceholderText(
      "start adding items to your list......"
    );
    expect(inputElement).toBeInTheDocument();

    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
  });
});
describe("renders correct input value", () => {
  test("input value on initial render", () => {
    render(<ToDoInput />);
    const inputElement = screen.getByPlaceholderText(
      "start adding items to your list......"
    );
    expect(inputElement).toHaveValue("");
  });
  test("input value when onchnage method called", async () => {
    user.setup();
    render(<ToDoInput />);
    const inputElement = screen.getByPlaceholderText(
      "start adding items to your list......"
    );
    await user.type(inputElement, "complete react testinglibrary");
    expect(inputElement).toHaveValue("complete react testinglibrary");
  });

  test("Input value on button click", async () => {
    user.setup();
    render(<ToDoInput />);
    const inputElement = screen.getByPlaceholderText(
      "start adding items to your list......"
    );
    await user.click(inputElement);
    expect(inputElement).toHaveValue("");
  });

  test("should call dispatch method on button click", async () => {
    user.setup();
    render(<ToDoInput />);
    const buttonElement = screen.getByRole("button");
    await user.click(buttonElement);
    expect(useComponentDispatch).toHaveBeenCalled();
  });
});
