import React from "react";
import burgerLogo from "../../assets/images/27.1 burger-logo.png.png";
import classes from "./Logo.css";

const logo = props => (
  <div className={classes.Logo}>
    <img src={burgerLogo} alt="logo" />
  </div>
);

export default logo;
