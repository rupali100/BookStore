import React from "react";
import "@testing-library/jest-dom/extend-expect";

import { render, screen } from "@testing-library/react";

import App from "../App";

describe("Testing App Component", () => {
  test("Render App Componenet", () => {
    render(<App />);
    expect(screen.getByTestId("app-test-id")).toBeInTheDocument();
  });
});
