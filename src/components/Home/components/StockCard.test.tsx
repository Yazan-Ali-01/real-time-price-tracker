import { render, screen } from "@testing-library/react";
import { StockCard } from "./StockCard";
import { BrowserRouter } from "react-router-dom";
import { vi, Mock } from "vitest"; // Use Vitest's Mock type
import { useStockSubscription } from "../../../hooks/useStockSubscription"; // Correct import

// Mock the useStockSubscription hook
vi.mock("../../../hooks/useStockSubscription");

// Type-safe reference to the mock function
const mockUseStockSubscription = useStockSubscription as Mock;

describe("StockCard Component", () => {
  const mockProps = {
    symbol: "BTC",
    name: "Bitcoin",
    logo: "https://crypto-logos.com/bitcoin.png",
    indicator: "+2%",
  };

  it("renders CircularProgress when loading", () => {
    mockUseStockSubscription.mockReturnValue({ isLoading: true, data: null });

    render(
      <BrowserRouter>
        <StockCard {...mockProps} />
      </BrowserRouter>
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("renders correct stock data", () => {
    mockUseStockSubscription.mockReturnValue({
      isLoading: false,
      data: { c: 42.5, d: 2.3, dp: 0.54, t: Date.now() },
    });

    render(
      <BrowserRouter>
        <StockCard {...mockProps} />
      </BrowserRouter>
    );

    expect(screen.getByText("Bitcoin")).toBeInTheDocument();
    expect(screen.getByText("$42.50")).toBeInTheDocument();
  });

  it("navigates to details page on click", () => {
    mockUseStockSubscription.mockReturnValue({
      isLoading: false,
      data: { c: 42.5 },
    });

    render(
      <BrowserRouter>
        <StockCard {...mockProps} />
      </BrowserRouter>
    );

    const detailsButton = screen.getByRole("button", { name: /details/i });
    expect(detailsButton.closest("a")).toHaveAttribute(
      "href",
      `/details/${mockProps.symbol}`
    );
  });
});
