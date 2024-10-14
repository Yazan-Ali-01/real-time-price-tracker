import { createRoot } from "react-dom/client";
import "./index.css";
import {
  Box,
  Container,
  CssBaseline,
  LinearProgress,
  ThemeProvider,
} from "@mui/material";
import theme from "./theme.ts";
import { SocketProvider } from "./context/SocketContext.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import ResponsiveNavbar from "./components/core/ResponsiveNavbar.tsx";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Suspense, lazy } from "react";
import { GlobalLoadingIndicator } from "./hooks/useIsFetching.tsx";
import { showToast } from "./components/core/Toast.tsx";
import ErrorBoundary from "./components/core/ErrorBoundary.tsx";

import Home from "./components/Home/Home.tsx";
import ScrollToTop from "./components/core/ScrollToTop.tsx";

// eslint-disable-next-line react-refresh/only-export-components
const Details = lazy(() => import("./components/Details/Details.tsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <ScrollToTop />
        <ResponsiveNavbar />
        <Box
          sx={{
            padding: { xs: 2, sm: 3, md: 5 },
            width: "100%",
          }}
        >
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </Box>
      </>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "dashboard",
        element: <Home />,
      },
      {
        path: "details/:symbol",
        element: <Details />,
      },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      gcTime: 60,
      refetchOnWindowFocus: true,
      retry: 1,
    },
  },
  queryCache: new QueryCache({
    onError(error, _query) {
      showToast(`An Error Occured: ${error.message}`, "error");
    },
  }),
});

createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <QueryClientProvider client={queryClient}>
      <SocketProvider>
        <GlobalLoadingIndicator />
        <Box sx={{ position: "relative", minHeight: "100%" }}>
          <Container
            sx={{
              bgcolor: "background.default",
              minHeight: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: 5,
            }}
            maxWidth={false}
            disableGutters={true}
          >
            <Suspense fallback={<LinearProgress color="primary" />}>
              <RouterProvider router={router} />
            </Suspense>
          </Container>
        </Box>
        <ReactQueryDevtools />
      </SocketProvider>
    </QueryClientProvider>
  </ThemeProvider>
);
