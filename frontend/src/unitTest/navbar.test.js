import React from "react";
import "@testing-library/jest-dom/extend-expect";

import { render, screen } from "@testing-library/react";

import Navbar from "../components/Navbar/Navbar";

describe("Testing Navbar Component", () => {
  test("Render Navbar Componenet", () => {
    render(<Navbar />);
    expect(screen.getByTestId("navbar-test-id")).toBeInTheDocument();
  });
});
