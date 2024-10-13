/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Import QueryClient
import Details from "./Details";
import { BrowserRouter } from "react-router-dom";
import { vi, Mock } from "vitest"; // Import Mock type from vitest
import { useStockSubscription } from "../../hooks/useStockSubscription";
import { useParams } from "react-router-dom";
import GoBackButton from "../core/GoBackButton";
import { cryptoSymbols } from "../../configs/cryptoSymbols";

// Mock the necessary hooks and components
vi.mock("../../hooks/useStockSubscription");
vi.mock("../core/GoBackButton", () => ({
  default: () => <button>Go Back</button>,
}));

// Mock useParams to return a symbol
vi.mock("react-router-dom", async () => {
  const actual: any = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useParams: () => ({ symbol: cryptoSymbols[0] }), // Return a symbol here
  };
});

// Type-safe reference to the mock function
const mockUseStockSubscription = useStockSubscription as Mock;

const queryClient = new QueryClient(); // Create a new QueryClient instance

describe("Details Component", () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();

    // Mock the location object
    Object.defineProperty(window, "location", {
      writable: true,
      value: {
        pathname: `/details/BTC`, // Ensure the pathname matches the mocked symbol
        hash: "",
        host: "localhost",
        hostname: "localhost",
        href: `http://localhost/details/BTC`,
        origin: "http://localhost",
        port: "",
        protocol: "http:",
        search: "",
      },
    });
  });

  it("renders correct crypto data", () => {
    const mockData = {
      p: 50000,
      c: 48000,
      v: 1000,
      d: -2000,
      dp: -4,
      t: Date.now(),
    };

    // Mock the hook to return the loaded data
    mockUseStockSubscription.mockReturnValue({
      isLoading: false,
      data: mockData,
    });

    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Details />
        </QueryClientProvider>
      </BrowserRouter>
    );

    // Check if the correct data is displayed
    expect(screen.getByText("$48000.00")).toBeInTheDocument();
    expect(screen.getByText("Last Traded Price")).toBeInTheDocument();
    expect(screen.getByText("Current Price")).toBeInTheDocument();
    expect(screen.getByText("1.00000000 Bitcoin (BTC)")).toBeInTheDocument();
    expect(screen.getByText("Data Updated On")).toBeInTheDocument();
  });

  it("renders GoBackButton when crypto info is not found", () => {
    // Mock the hook to return loading state with no data
    mockUseStockSubscription.mockReturnValue({ isLoading: false, data: null });

    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Details />
        </QueryClientProvider>
      </BrowserRouter>
    );

    // Check for the Go Back button
    expect(
      screen.getByText("Crypto information not found.")
    ).toBeInTheDocument();
    expect(screen.getByText("Go Back")).toBeInTheDocument();
  });
});
