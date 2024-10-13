import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { createRoot } from "react-dom/client";

// eslint-disable-next-line react-refresh/only-export-components
const Toast = ({
  message,
  severity,
}: {
  message: string;
  severity: "error" | "warning" | "info" | "success";
}) => {
  const [open, setOpen] = React.useState(true);

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={8000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export const showToast = (
  message: string,
  severity: "error" | "warning" | "info" | "success"
) => {
  const toastRoot = document.createElement("div");
  document.body.appendChild(toastRoot);
  const root = createRoot(toastRoot);
  root.render(<Toast message={message} severity={severity} />);
};
