import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/system";
import { hexToRgba } from "../../lib/hexToRgba";
import { useNavigate } from "react-router-dom";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  width: "80%",
  left: "50%",
  transform: "translateX(-10%)",
  borderRadius: "15px",
  backgroundColor: hexToRgba(theme.palette.primary.main, 0.5),
  backdropFilter: "blur(5px)",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  top: "35px",
  zIndex: 1200,
}));

const ResponsiveNavbar: React.FC = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const menuItems: string[] = ["Home", "About", "Contact"];

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setDrawerOpen(open);
    };

  const list = () => (
    <Box
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {menuItems.map((text) => (
          <ListItem key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
        <ListItem>
          <ListItemText primary="Login" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <StyledAppBar position="sticky">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, color: "text.primary" }}
        >
          Logo
        </Typography>
        {isMobile ? (
          <>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              PaperProps={{
                sx: {
                  backgroundColor: "black",
                },
              }}
              open={drawerOpen}
              onClose={toggleDrawer(false)}
            >
              {list()}
            </Drawer>
          </>
        ) : (
          <>
            {menuItems.map((item) => (
              // <Link to={`/${item.toLowerCase()}`} key={item}>
              //   {item}
              // </Link>
              <Button
                key={item}
                sx={{ color: "text.primary" }}
                onClick={() => navigate("/")}
              >
                {item}
              </Button>
            ))}
            <Button
              variant="outlined"
              sx={{
                bgcolor: "primary.main",
                color: "text.primary",
                marginLeft: 2,
              }}
            >
              Login
            </Button>
          </>
        )}
      </Toolbar>
    </StyledAppBar>
  );
};

export default ResponsiveNavbar;
