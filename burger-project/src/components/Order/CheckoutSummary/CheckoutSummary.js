import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.css";

const checkoutSummary = props => (
  <div className={classes.checkoutSummary}>
    <h1>We hope it taste well!!</h1>
    <div
      style={{
        width: "100%",
        margin: "auto"
      }}
    >
      <Burger ingredients={props.ingredients} />
    </div>
    <Button btnType="Danger" clicked>
      Cancel
    </Button>
    <Button btnType="Success" clicked>
      Continue
    </Button>
  </div>
);

export default checkoutSummary;
