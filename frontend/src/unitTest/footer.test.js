import React from "react";
import "@testing-library/jest-dom/extend-expect";

import { render, screen } from "@testing-library/react";

import Footer from "../components/Footer/Footer";

describe("Testing Footer Component", () => {
  test("Render Footer Componenet", () => {
    render(<Footer />);
    expect(screen.getByTestId("footer-test-id")).toBeInTheDocument();
  });
});
