import React, { Component } from "react";
import styles from "./App.css";
import Persons from "../components/Persons";
import Cockpit from "../components/Cockpit/Cockpit";
import withClass from "../hoc/withClass";
import Aux from "../hoc/Aux";

class App extends Component {
  constructor(props) {
    super(props);
    console.log("[appo] constructor");
  }

  state = {
    persons: [
      { id: "sdfdf", name: "Max", age: 28 },
      { id: "sd1fdf", name: "Manu", age: 29 },
      { id: "sdf2df", name: "Stephanie", age: 26 }
    ],
    otherState: "some other value",
    showPersons: false,
    toggleCockpit: false,
    changeCounter: 0
  };

  static getDerivedStateFromProps(props, state) {
    console.log("[app.js]getDerivedStateFromProps");
    return state;
  }

  componentDidMount() {
    console.log("[app.js] componetDidMount");
  }

  componentDidUpdate() {
    console.log("[app.js] componentDidUpdate");
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("[app.js] shouldComponentUpdate");
    return true;
  }

  deletePersonHandler = personIndex => {
    const persons = [...this.state.persons];

    persons.splice(personIndex, 1);
    this.setState({ persons });
  };

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(
      person => person.id === id
    );
    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState(
      (prevState, props) => ({
        persons,
        changeCounter: prevState.changeCounter + 1
      }),
      () => {
        // callback after state update
        console.log("state successfully updted");
      }
    );
  };

  toggerPersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  };

  render() {
    console.log("[app.js] ernder");
    const { showPersons, toggleCockpit } = this.state;

    let persons = null;
    if (showPersons) {
      persons = (
        <div>
          <Persons
            persons={this.state.persons}
            clicked={this.deletePersonHandler}
            changed={this.nameChangedHandler}
          />
        </div>
      );
    }

    return (
      <Aux>
        <button
          onClick={() => this.setState({ toggleCockpit: !toggleCockpit })}
        >
          Toggle Cockpit
        </button>
        {!toggleCockpit && (
          <Cockpit
            title={this.props.appTitle}
            showPersons={this.state.showPersons}
            personsLength={this.state.persons.length}
            clicked={this.toggerPersonsHandler}
          />
        )}
        {persons}
      </Aux>
    );
  }
}

export default withClass(App, styles.App);
