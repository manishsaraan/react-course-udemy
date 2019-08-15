import React from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";

class ContactData extends React.Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    }
  };

  render() {
    return (
      <div className={classes.ContactData}>
        <h4>Enter your data</h4>
        <form>
          <input
            className={classes.Input}
            type="type"
            name="name"
            placeholder="Your Name"
          />
          <input
            className={classes.Input}
            type="email"
            name="email"
            placeholder="Your Email"
          />
          <input
            className={classes.Input}
            type="text"
            name="street"
            placeholder="Your Street"
          />
          <input
            className={classes.Input}
            type="text"
            name="postalCode"
            placeholder="Your postal code"
          />
          <Button btnType="Success">Order</Button>
        </form>
      </div>
    );
  }
}

export default ContactData;
