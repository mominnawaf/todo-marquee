import React, { useContext, useState } from 'react';
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { loginData } from "../../mock/mockdata"
import { Menu, MenuItem } from "@mui/material";
import UserContext from "../../context/UserContext"

const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | EventTarget & Element>(null);
    const { logout } = useContext(UserContext)


    const handleMenuOpen = (event: React.MouseEvent) => {
        setAnchorEl(event.currentTarget);
        setMenuOpen(true);
    };

    const handleLogout = () => {
        handleMenuClose()
        logout()
    }

    const MenuItems = () => {
        return (
            <Menu
                anchorEl={anchorEl}
                open={menuOpen}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleMenuClose}>{loginData.name}</MenuItem>
                <MenuItem onClick={handleMenuClose}>{loginData.email}</MenuItem>
                <MenuItem onClick={handleLogout} sx={{ color: "red" }}>
                    Logout
                </MenuItem>
            </Menu>
        );
    };

    const handleMenuClose = () => {
        setMenuOpen(false);
    };

    return (
        <React.Fragment>
            <CssBaseline />
            {menuOpen && <MenuItems />}
            <AppBar>
                <Toolbar>
                    <Typography color="inherit" sx={{ flexGrow: 1 }}>
                        {loginData.name}
                    </Typography>
                    <Avatar
                        sx={{ width: 40, height: 40 }}
                        alt={`${loginData.name} profile`}
                        src={loginData.ProfilePic}
                        onClick={handleMenuOpen}
                    />
                </Toolbar>
            </AppBar>
            <Toolbar />
        </React.Fragment>
    );
};

export default NavBar;
