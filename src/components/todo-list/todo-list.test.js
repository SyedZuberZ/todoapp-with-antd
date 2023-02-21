import ToDoList from "./todo-list";
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

const list = {
  todo: [{ id: 1, state: "Learning-react-testing-library" }],
};
const list2 = {
  todo: [
    { id: 1, state: "Learning-react-testing-library" },
    { id: 2, state: "Learning-reduxlibrary" },
  ],
};

const display = true;
describe("ToDoList component", () => {
  test("component render correctly", () => {
    render(<ToDoList list={list} display={display} />);

    const paragraph = screen.getByText(list.todo[0].state);
    expect(paragraph).toHaveTextContent("Learning-react-testing-library");

    const buttonElement1 = screen.getByRole("button", { name: "Remove Item" });
    expect(buttonElement1).toBeInTheDocument();

    const buttonElement2 = screen.queryByRole("button", {
      name: "Clear Items",
    });
    expect(buttonElement2).toBeInTheDocument();
  });

  test("renders correctly on button clicks", async () => {
    user.setup();
    render(<ToDoList list={list2} display={display} />);
    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(2);

    const buttonElement1 = screen.getAllByRole("button");
    await user.click(buttonElement1[0]);
    expect(useComponentDispatch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith({
      payload: 1,
      type: "todo-list/removeItem",
    });

    const clearButton = screen.getByRole("button", {
      name: "Clear Items",
    });
    await user.click(clearButton);
    expect(dispatch).toHaveBeenCalledWith({
      type: "todo-list/clearItem",
    });
  });
});
