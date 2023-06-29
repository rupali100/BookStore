import React from "react";
import "@testing-library/jest-dom/extend-expect";

import { render, screen } from "@testing-library/react";

import Product from "../components/Products/Product/Product";

describe("Testing Product Component", () => {
  test("Render Product Componenet", () => {
    render(<Product />);
    expect(screen.getByTestId("product-test-id")).toBeInTheDocument();
  });
});
