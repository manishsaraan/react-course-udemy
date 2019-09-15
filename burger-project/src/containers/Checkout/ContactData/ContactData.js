import React from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-order";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from '../../../components/UI/Input/Input';


class ContactData extends React.Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    },
    loading: false
  };

  orderHandler = event => {
    event.preventDefault();
    console.log(this.props);
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Manish Saraan",
        address: {
          street: "Teststreet 1",
          zipCode: 123454,
          country: "India"
        },
        email: "test@test.com",
        deliveryMethod: "fastest"
      }
    };
    axios
      .post("/orders.json", order)
      .then(response => {
        console.log(response);
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false });
      });
  };

  render() {
    let form = (      
      <form onSubmit={this.orderHandler}>
        <Input
          inputtype="input"
          type="type"
          name="name"
          placeholder="Your Name"
        />
        <Input
        inputtype="input"
          type="email"
          name="email"
          placeholder="Your Email"
        />
        <Input
        inputtype="input"
          type="text"
          name="street"
          placeholder="Your Street"
        />
        <Input
        inputtype="input"
          type="text"
          name="postalCode"
          placeholder="Your postal code"
        />
        <Button btnType="Success">Order</Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
