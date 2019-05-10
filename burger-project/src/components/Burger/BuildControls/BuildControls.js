import React from "react";
import BuildControl from "./BuildControl/BuildControl";
import classes from "./BuildControls.css";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Cheese", type: "cheese" },
  { label: "Bacon", type: "bacon" },
  { label: "Meat", type: "meat" }
];

const buildControls = props => (
  <div className={classes.buildControls}>
    {controls.map(ctrl => (
      <BuildControl key={ctrl.label} label={ctrl.label} />
    ))}
  </div>
);

export default buildControls;
