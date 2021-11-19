import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";
import apiService from "./apiService";
import { act } from "react-dom/test-utils";

describe("App homepage", () => {
  test("The page should render correctly", () => {
    render(<App />);
    screen.getByText(/Keywords/);
    screen.getByText(/Media type/);
    screen.getByText(/Year start/);
  });

  test("If the user enters fewer than two characters an error message should be displayed", async () => {
    render(<App />);
    const handleSubmit = jest.fn();
    userEvent.type(screen.getByLabelText(/Keywords/i), "A");
    userEvent.click(screen.getByRole("button", { name: /submit/i }));
    await waitFor(() => expect(handleSubmit).toHaveBeenCalledTimes(0));
    screen.getByText(/Keywords must be between 2 and 50 characters/);
  });

  test("If the user enters fewer more than 50 characters an error message should be displayed", async () => {
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

  test("If an invalid year is entered an error message is displayed", async () => {
    render(<App />);
    const handleSubmit = jest.fn();
    userEvent.type(screen.getByLabelText(/Year start/i), "1900");
    userEvent.click(screen.getByRole("button", { name: /submit/i }));
    await waitFor(() => expect(handleSubmit).toHaveBeenCalledTimes(0));
    screen.getByText(/Please enter a valid year/);
  });

  test("If a year in the future selected an an error message is displayed", async () => {
    render(<App />);
    const handleSubmit = jest.fn();
    userEvent.type(screen.getByLabelText(/Year start/i), "2050");
    userEvent.click(screen.getByRole("button", { name: /submit/i }));
    await waitFor(() => expect(handleSubmit).toHaveBeenCalledTimes(0));
    screen.getByText(/Year must not be in the future/);
  });

  test("Api call is made with the correct credentials", async () => {
    render(<App />);
    const credentials = {
      keywords: "Space",
      mediaType: "audio",
      yearStart: "1972",
    };
    const spyApiCall = jest.spyOn(apiService, "getData");
    userEvent.type(screen.getByLabelText(/Keywords/i), "Space");
    userEvent.selectOptions(screen.getByLabelText("Media type"), ["audio"]);
    userEvent.type(screen.getByLabelText(/Year Start/i), "1972");
    await act(async () => {
      userEvent.click(screen.getByRole("button", { name: /submit/i }));
    });
    expect(spyApiCall).toHaveBeenCalledTimes(1);
    expect(spyApiCall).toHaveBeenCalledWith(credentials);
  });

  test("Api call not made if no data is passed", async () => {
    render(<App />);
    const spyApiCall = jest.spyOn(apiService, "getData");
    await act(async () => {
      userEvent.click(screen.getByRole("button", { name: /submit/i }));
    });
    expect(spyApiCall).toHaveBeenCalledTimes(0);
  });

  test("Correct error messages displayed when for fields are not filled in", async () => {
    render(<App />);
    const spyApiCall = jest.spyOn(apiService, "getData");
    await act(async () => {
      userEvent.click(screen.getByRole("button", { name: /submit/i }));
    });
    expect(spyApiCall).toHaveBeenCalledTimes(0);
    screen.getByText(/Please enter keywords to search/);
    screen.getAllByText(/Please select a media type/);
    screen.getByText(/Please enter a valid year/);
  });
});
