import React, { useEffect } from "react";
import styles from "./Cockpit.css";

const Cockpit = props => {
  useEffect(() => {
    console.log("Cockepit useEffect");
    const timer = setTimeout(() => alert("Saved data to cloud"));
    // do cleanup work here
    return () => {
      clearTimeout(timer);
      console.log("[Cockepit]cleanup work");
    };
  }, []);

  useEffect(() => {
    console.log("Cockepit useEffect 2");
    // do cleanup work here
    return () => {
      console.log("[Cockepit]cleanup work 2");
    };
  });
  const classes = [];
  let btnClass = "";

  if (props.showPersons) {
    btnClass = classes.Red;
  }

  if (props.persons.length <= 2) {
    classes.push(styles.red);
  }

  if (props.persons.length <= 1) {
    classes.push(styles.bold);
  }
  return (
    <div className={styles.Cockpit}>
      <h1>{props.title}</h1>
      <p className={classes.join(" ")}>This is really working!</p>
      <button className={btnClass} onClick={props.clicked}>
        Switch Name
      </button>
    </div>
  );
};

export default Cockpit;
