import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import Logo from "../Images/Logo.png";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";

const searchResult = [
  { tab: "Go to: Slider UX", group: "Forecast", link: "/", value: "slider ux" },
  {
    tab: "Go to: Upload file",
    group: "Upload Files",
    link: "/files",
    value: "upload file",
  },
  {
    tab: "Go to: Statistics session",
    group: "Forecast",
    link: "/",
    value: "statistics",
  },
  { tab: "Go to: FAQ", group: "Help", link: "/help", value: "faq" },
  {
    tab: "Go to: Sign in",
    group: "Sign in",
    link: "/signin",
    value: "sign in",
  },
  {
    tab: "Go to: Sign up",
    group: "Sign in",
    link: "/signin",
    value: "sign up",
  },
  {
    tab: "Go to: Forgot password",
    group: "Sign in",
    link: "/signin",
    value: "forgot password",
  },
  {
    tab: "Outbound link to: About Kinetik",
    group: "Sign in",
    link: "/",
    value: "about kinetik",
  },
];

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [searchValue, setSearchValue] = React.useState("");

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchValue.length > 0) {
      if (
        searchResult.find((result) => result.tab.toLowerCase() === searchValue)
      ) {
        if (searchValue === "outbound link to: about kinetik") {
          window.open("https://www.kinetiksimulation.com", "_blank");
        } else {
          window.location.href = searchResult.find(
            (result) => result.tab.toLowerCase() === searchValue
          ).link;
        }
      } else if (searchResult.find((result) => result.value === searchValue)) {
        if (searchValue === "about kinetik") {
          window.open("https://www.kinetiksimulation.com", "_blank");
        } else {
          window.location.href = searchResult.find(
            (result) => result.value === searchValue
          ).link;
        }
      }
    }
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem>
        <Link to={"/signin"} style={{ textDecoration: "none", color: "white" }}>
          My account
        </Link>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="notifications" color="inherit">
          <Badge badgeContent={0} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem>
        <Link to={"/signin"} style={{ textDecoration: "none", color: "white" }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </Link>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "rgb(1, 68, 134)" }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <a href="https://www.kinetiksimulation.com" target="_blank">
              <img src={Logo} alt="logo" id="kinetik-logo" />
            </a>
          </Typography>
          <Stack sx={{ width: "50%", margin: "auto" }}>
            <Autocomplete
              id="app-features"
              freeSolo
              disableClearable
              options={searchResult.map((option) => option.tab)}
              sx={{
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  border: "1px solid rgb(27, 150, 255)",
                  borderRadius: "5px",
                },
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search..."
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon
                          style={{
                            color: "rgb(27, 150, 255)",
                            cursor: "pointer",
                          }}
                          onClick={handleSearchSubmit}
                        />
                      </InputAdornment>
                    ),
                  }}
                  size="small"
                  onChange={(event) =>
                    setSearchValue(event.target.value.toLowerCase())
                  }
                  sx={{ input: { color: "white" } }}
                  InputLabelProps={{
                    style: { color: "rgb(27, 150, 255)" },
                  }}
                />
              )}
            />
          </Stack>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton size="large" aria-label="notifications" color="inherit">
              <Badge badgeContent={0} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Link
              to={"/signin"}
              style={{ textDecoration: "none", color: "white" }}
            >
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Link>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
