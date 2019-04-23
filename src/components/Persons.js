import React, { Component } from "react";
import Person from "./Persons/Person/Person";
import ErrorBoundry from "../ErrorBoundry/ErrorBoundry";

class Persons extends Component {
  // static getDerivedStateFromProps(props, state) {
  //   console.log("[Persons]getDerivedStateFromProps");
  //   return state;
  // }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("[Persons]shouldComponentUpdate");
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("[Persons]getSnapshotBeforeUpdate");
    return { message: "snapshot" };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("[Persons]componentDidUpdate", snapshot);
  }

  render() {
    return this.props.persons.map((person, index) => (
      <ErrorBoundry key={person.id}>
        <Person
          click={() => this.props.clicked(index)}
          name={person.name}
          age={person.age}
          changed={event => this.props.changed(event, person.id)}
        />
      </ErrorBoundry>
    ));
  }
}

export default Persons;
