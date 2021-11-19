import { render, screen } from "@testing-library/react";
import apiService from "../apiService";
import DataTile from "./DataTile";

describe("DataTile Component", () => {
  const mockImageData = {
    data: [
      {
        title: "testImage",
        nasa_id: "123",
        location: "Florida",
        media_type: "image",
        description: "This is test",
      },
    ],
  };

  const mockVideoData = {
    data: [
      {
        title: "testVideo",
        nasa_id: "123",
        media_type: "video",
      },
    ],
  };

  const mockAudioData = {
    data: [
      {
        title: "testAudio",
        nasa_id: "123",
        media_type: "audio",
      },
    ],
  };

  test("The page should render correctly for an image search", () => {
    render(<DataTile dataFromApi={mockImageData} />);
    screen.getByText(/Title: testImage/);
    screen.getByText(/Location: Florida/);
    screen.getByText(/This is test/);
  });

  test("The page should render correctly for an audio search", () => {
    render(<DataTile dataFromApi={mockAudioData} />);
    screen.getByText(/Title: testAudio/);
  });

  test("The page should render correctly for a video search", () => {
    render(<DataTile dataFromApi={mockVideoData} />);
    screen.getByText(/Title: testVideo/);
  });

  test("mediaApiCall is called with the correct credential", () => {
    const spyApiCall = jest.spyOn(apiService, "getAssetMedia");
    render(<DataTile dataFromApi={mockImageData} />);
    expect(spyApiCall).toHaveBeenCalledTimes(1);
    expect(spyApiCall).toHaveBeenCalledWith("123");
  });
});
