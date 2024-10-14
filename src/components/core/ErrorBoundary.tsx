import {
  ErrorBoundary as ReactErrorBoundary,
  FallbackProps,
} from "react-error-boundary";
import { Box, Typography, Button } from "@mui/material";

const ErrorFallback: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => (
  <Box
    sx={{
      textAlign: "center",
      padding: 4,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 2,
    }}
  >
    <Typography variant="h4" color="error">
      Something went wrong: {error.message}
    </Typography>
    <Button
      variant="contained"
      color="primary"
      sx={{ width: "auto" }}
      onClick={resetErrorBoundary}
    >
      Try Again
    </Button>
  </Box>
);

// Create the ErrorBoundary component
const ErrorBoundary = ({ children }: { children: React.ReactNode }) => (
  <ReactErrorBoundary FallbackComponent={ErrorFallback}>
    {children}
  </ReactErrorBoundary>
);

export default ErrorBoundary;
