import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#6AF0B2",
    },
    background: {
      default: "#100C23",
      paper: "#1a1a1a",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#B9FFDB",
    },
    warning: {
      main: "#F7942E",
    },
    info: {
      main: "#F7942E",
    },
  },
  typography: {
    fontFamily: "Poppins, Arial, sans-serif",
    h1: {
      color: "#FFFFFF",
    },
    h2: {
      color: "#FFFFFF",
    },
    h3: {
      color: "#FFFFFF",
    },
    h4: {
      color: "#FFFFFF",
    },
    h5: {
      color: "#FFFFFF",
    },
    h6: {
      color: "#FFFFFF",
    },
    body1: {
      color: "#B9FFDB",
    },
    body2: {
      color: "#B9FFDB",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "48px",
        },
      },
    },
  },
});

export default theme;
