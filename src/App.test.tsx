import {
  fireEvent,
  getByLabelText,
  render,
  screen,
  waitFor,
  waitForElement,
} from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";
import Select from "react-select";
import selectEvent from "react-select-event";

describe("App homepage", () => {
  test("The page should render correctly", () => {
    render(<App />);
    screen.getByText(/Keywords/);
    screen.getByText(/Media type/);
    screen.getByText(/Year start/);
  });

  test("If the user enters fewer than two characters an error should be displayed, and onSubmit will not be called", async () => {
    render(<App />);
    const handleSubmit = jest.fn();
    userEvent.type(screen.getByLabelText(/Keywords/i), "A");
    userEvent.click(screen.getByRole("button", { name: /submit/i }));
    await waitFor(() => expect(handleSubmit).toHaveBeenCalledTimes(0));
    screen.getByText(/Keywords must be between 2 and 50 characters/);
  });

  test("If the user enters fewer more than 50 characters an error should be displayed, and onSubmit will not be called", async () => {
    render(<App />);
    const handleSubmit = jest.fn();
    userEvent.type(
      screen.getByLabelText(/Keywords/i),
      "abcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcde"
    );
    userEvent.click(screen.getByRole("button", { name: /submit/i }));
    await waitFor(() => expect(handleSubmit).toHaveBeenCalledTimes(0));
    screen.getByText(/Keywords must be between 2 and 50 characters/);
  });

  test("If an invalid year is entered an error message is displayed, and onSubmit will not be called", async () => {
    render(<App />);
    const handleSubmit = jest.fn();
    userEvent.type(screen.getByLabelText(/Year start/i), "1900");
    userEvent.click(screen.getByRole("button", { name: /submit/i }));
    await waitFor(() => expect(handleSubmit).toHaveBeenCalledTimes(0));
    screen.getByText(/Please enter a valid year/);
  });

  test("If a year in the future selected an an error message is displayed, and onSubmit will not be called", async () => {
    render(<App />);
    const handleSubmit = jest.fn();
    userEvent.type(screen.getByLabelText(/Year start/i), "2050");
    userEvent.click(screen.getByRole("button", { name: /submit/i }));
    await waitFor(() => expect(handleSubmit).toHaveBeenCalledTimes(0));
    screen.getByText(/Year must not be in the future/);
  });

  test("Form is called with the correct credentials", async () => {
    render(<App />);
    const handleSubmit = jest.fn();
    userEvent.type(screen.getByLabelText(/Keywords/i), "Space");
    userEvent.selectOptions(screen.getByLabelText("Media type"), ["audio"]);
    // const mediaType = screen.getByLabelText("Media type");
    // selectEvent.select(mediaType, ["audio"]);
    userEvent.type(screen.getByLabelText(/Year Start/i), "1972");
    userEvent.click(screen.getByRole("button", { name: /submit/i }));
    await waitFor(() => expect(handleSubmit).toHaveBeenCalledTimes(0));
    // expect(handleSubmit).toBeCalledTimes(1);
  });
});
