import React from "react";
import Logo from "../../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./Toolbar.css";

const toolbar = props => (
  <header className={classes.Toolbar}>
    <div>Menu</div>
    <Logo height="80%" />
    <NavigationItems />
  </header>
);

export default toolbar;
