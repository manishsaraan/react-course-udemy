import React, { Component } from "react";
import PropTypes from "prop-types";
import classes from "./Person.css";
import withClass from "../../../hoc/withClass";
import Aux from "../../../hoc/Aux";
import AuthContext from "../../../context/auth-context";

class Person extends Component {
  constructor(props) {
    super(props);
    this.inputElementRef = React.createRef();
  }

  // use this to get context in lifecycle methods
  static contextType = AuthContext;

  componentDidMount() {
    this.inputElementRef.current.focus();
  }

  render() {
    return (
      <Aux>
        {this.context.authenticated ? (
          <p>Authenticated</p>
        ) : (
          <p>Please log in</p>
        )}

        <p onClick={this.props.click}>
          I'm {this.props.name} and I am {this.props.age} years old!
        </p>
        <p>{this.props.children}</p>
        <input
          ref={this.inputElementRef}
          type="text"
          onChange={this.props.changed}
          value={this.props.name}
        />
      </Aux>
    );
  }
}

Person.propTypes = {
  click: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  changed: PropTypes.func.isRequired
};

export default withClass(Person, classes.Person);
