import { AuthContext } from "@/context/AuthContext";
import useAuth from "@/hooks/useAuth";
import PersonIcon from "@mui/icons-material/Person";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Icon,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";

function Navbar() {
  const router = useRouter();
  const theme = useTheme();
  const { user, isAuthenticated } = useContext(AuthContext);
  const { signOut } = useAuth();

  const settings = ["Dashboard", "Logout"];
  const [anchorElUser, setAnchorElUser] = useState(null);

  const isAuthPage =
    router.pathname.startsWith("/signup") ||
    router.pathname.startsWith("/signin");

  const navItems = [
    !isAuthenticated &&
      !isAuthPage && {
        label: "Sign in",
        href: "/signin",
      },
  ].filter(Boolean);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (setting) => {
    setAnchorElUser(null);
  };

  const handleMenuSelect = (setting) => {
    if (setting === "Logout") {
      signOut();
    } else {
      router.push(`/${setting.toLowerCase()}`);
    }
    setAnchorElUser(null);
  };
  return (
    <AppBar
      position="sticky"
      elevation={0}
      color="default"
      sx={{
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar>
        <Box sx={{ flex: isAuthenticated ? 0 : 1 }}>
          <IconButton component={Link} href="/">
            <HomeIcon />
          </IconButton>
        </Box>

        {navItems.map((item) => (
          <MenuItem key={item.href} component={Link} href={item.href}>
            <Typography>{item.label}</Typography>
          </MenuItem>
        ))}

        {isAuthenticated && (
          <Stack
            direction="row"
            sx={{
              justifyContent: "center",
              alignItems: "center",
              gap: 3,
              ml: "auto",
            }}
          >
            <Typography>{`Hi, ${user?.name}`}</Typography>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar />
              </IconButton>
            </Tooltip>
          </Stack>
        )}

        <Menu
          sx={{
            mt: "45px",
          }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map((setting) => (
            <MenuItem key={setting} onClick={() => handleMenuSelect(setting)}>
              <Typography textAlign="center">{setting}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
