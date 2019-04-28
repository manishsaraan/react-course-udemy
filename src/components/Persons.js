import React, { PureComponent } from "react";
import Person from "./Persons/Person/Person";
import ErrorBoundry from "../ErrorBoundry/ErrorBoundry";

class Persons extends PureComponent {
  // static getDerivedStateFromProps(props, state) {
  //   console.log("[Persons]getDerivedStateFromProps");
  //   return state;
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log("[Persons]shouldComponentUpdate");
  //   // write performance optimization code here
  //   if (nextProps.persons !== this.props.persons) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("[Persons]getSnapshotBeforeUpdate");
    return { message: "snapshot" };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("[Persons]componentDidUpdate", snapshot);
  }

  componentWillUnmount() {
    console.log("[Persons]componentWillUnmount");
  }

  render() {
    console.log("[Persons]rendering..");
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
