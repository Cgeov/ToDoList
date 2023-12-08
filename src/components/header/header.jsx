import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Toolbar,
} from "@mui/material";
import React, { useState } from "react";
import menu from "../../assets/menu.svg";
import style from "./header.module.css";

export default function Header(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <h2 style={{ color: "#2b2768" }}>To Do List</h2>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <a href={"/task"}>Tasks</a>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <a href={"/profile"}>Profile</a>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <header>
      <AppBar component="nav" sx={{ background: "white" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}>
            <img src={menu} width={30}></img>
          </IconButton>
          <h2
            style={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              color: "#2b2768",
            }}>
            To Do List
          </h2>
          <Box sx={{ display: { xs: "none", sm: "flex" } }}>
            <div>
              <a href="/task">Task</a>
            </div>
            <div>
              <a href="/task">Profile</a>
            </div>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 240,
            },
          }}>
          {drawer}
        </Drawer>
      </nav>
    </header>
  );
}
