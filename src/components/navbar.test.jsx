import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Navbar from "./Navbar";

describe("Navbar", () => {
  test("should render", () => {
    render(<Navbar />);

    const navHeader = screen.getByText(/chat house/i);
    expect(navHeader).toBeInTheDocument();

    const profileImage = screen.getByRole("img", {
      name: /profile/i,
    });
    expect(profileImage).toBeInTheDocument();

    const profileName = screen.getByText(/john/i);
    expect(profileName).toBeInTheDocument();

    const logoutButton = screen.getByRole("button");
    expect(logoutButton).toBeInTheDocument();
  });
});
