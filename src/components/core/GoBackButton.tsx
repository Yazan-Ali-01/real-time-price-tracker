import { useNavigate } from "react-router-dom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Button } from "@mui/material";

export const GoBackButton = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <Button
      onClick={handleGoBack}
      variant="contained"
      sx={{
        position: "absolute",
        top: 53,
        left: 20,
        transition: "transform 0.2s",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      <ChevronLeftIcon />
      Go Back
    </Button>
  );
};
