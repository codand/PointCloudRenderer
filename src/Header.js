import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import React from "react";
import "./App.css";

function Header() {
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <IconButton edge="start" color="inherit" aria-label="menu">
          <Menu />
        </IconButton>
        <Typography variant="h6" color="inherit">
          Point Cloud
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
