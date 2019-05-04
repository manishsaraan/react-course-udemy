import React, { useEffect, memo, useRef, useContext } from "react";
import styles from "./Cockpit.css";
import AuthContext from "../../context/auth-context";

const Cockpit = props => {
  const toggleBtnRef = useRef(null);
  // authContext will hold react context data
  const authContext = useContext(AuthContext);

  useEffect(() => {
    console.log("Cockepit useEffect");
    const timer = setTimeout(() => console.log("Saved data to cloud"));
    // componentDidMount
    toggleBtnRef.current.click();
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

  if (props.personsLength <= 2) {
    classes.push(styles.red);
  }

  if (props.personsLength <= 1) {
    classes.push(styles.bold);
  }
  return (
    <div className={styles.Cockpit}>
      <h1>{props.title}</h1>
      <p className={classes.join(" ")}>This is really working!</p>
      <button ref={toggleBtnRef} className={btnClass} onClick={props.clicked}>
        Switch Name
      </button>
      <button onClick={authContext.login}>Login</button>
    </div>
  );
};

export default memo(Cockpit);
