import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Home from "./Home";
import { cryptoSymbols } from "../../configs/cryptoSymbols";

// Mock the StockCard component since we don't want to test its internal logic here
vi.mock("./components/StockCard", () => ({
  StockCard: () => <div data-testid="stock-card">Mock StockCard</div>,
}));

describe("Home Component", () => {
  it("renders the heading", () => {
    render(<Home />);
    expect(
      screen.getByText(/Track Real-Time Prices - Crypto Trading/i)
    ).toBeInTheDocument();
  });

  it("renders the correct number of StockCards", () => {
    render(<Home />);
    const stockCards = screen.getAllByTestId("stock-card");
    expect(stockCards.length).toBe(cryptoSymbols.length);
  });
});
