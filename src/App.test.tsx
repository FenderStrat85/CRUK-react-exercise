import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

describe("App homepage", () => {
  test("The page should render correctly", () => {
    render(<App />);
    screen.getByText(/Keywords/);
    screen.getByText(/Media type/);
    screen.getByText(/Year start/);
  });

  // test("If the user enters fewer than two characters an error should be displayed", () => {
  //   render(<App />);
  //   const keywordInput = screen.getByPlaceholderText(
  //     /Please enter some keywords to search/
  //   );
  //   const yearStartInput = screen.getByPlaceholderText(
  //     /Please enter a year to search/
  //   );
  //   const submitButton = screen.getByRole("button", { name: "Submit" });
  //   userEvent.type(keywordInput, "a");
  //   userEvent.type(yearStartInput, "1998");
  //   userEvent.click(submitButton);
  //   screen.getByText(/Keywords must be between 2 and 50 characters/);
  // });
});
