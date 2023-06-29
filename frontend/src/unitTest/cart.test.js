import React from "react";
import "@testing-library/jest-dom/extend-expect";

import { render, screen } from "@testing-library/react";

import Cart from "../components/Cart/Cart";

describe("Testing Cart Component", () => {
  test("Render Cart Componenet", () => {
    render(<Cart />);
    expect(screen.getByTestId("cart-test-id")).toBeInTheDocument();
  });
});
