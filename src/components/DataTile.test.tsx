import { render, screen } from "@testing-library/react";
import apiService from "../apiService";
import DataTile from "./DataTile";

describe("DataTile Component", () => {
  const mockImageData = {
    href: "testHref",
    data: [
      {
        title: "testImage",
        center: "JSC",
        date_created: "now",
        description: "This is test",
        keywords: ["test"],
        location: "Florida",
        media_type: "image",
        nasa_id: "123",
      },
    ],
  };

  const mockAudioData = {
    href: "testHref",
    data: [
      {
        title: "testAudio",
        center: "JSC",
        date_created: "now",
        description: "This is test",
        keywords: ["test"],
        media_type: "audio",
        nasa_id: "123",
      },
    ],
  };

  const mockVideoData = {
    href: "testHref",
    data: [
      {
        title: "testVideo",
        center: "JSC",
        date_created: "now",
        keywords: ["test"],
        media_type: "video",
        nasa_id: "123",
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
