import React, { Component } from "react";
import styles from "./App.css";
import Persons from "../components/Persons";
import Cockpit from "../components/Cockpit/Cockpit";

class App extends Component {
  constructor(props) {
    super(props);
    console.log("[appo] constructor");
  }
  static getDerivedStateFromProps(props, state) {
    console.log("[app.js]getDerivedStateFromProps");
    return state;
  }

  componentDidMount() {
    console.log("[app.js] componetDidMount");
  }

  componentDidUpdate(){
    console.log("[app.js] componentDidUpdate");

  }

  shouldComponentUpdate(nextProps, nextState){
    console.log("[app.js] shouldComponentUpdate");
    return true;
  }

  state = {
    persons: [
      { id: "sdfdf", name: "Max", age: 28 },
      { id: "sd1fdf", name: "Manu", age: 29 },
      { id: "sdf2df", name: "Stephanie", age: 26 }
    ],
    otherState: "some other value",
    showPersons: false
  };

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

    this.setState({ persons });
  };

  toggerPersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  };

  render() {
    console.log("[app.js] ernder");
    const { showPersons } = this.state;

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
      <div className={styles.App}>
        <Cockpit
          title={this.props.appTitle}
          showPersons={this.state.showPersons}
          persons={this.state.persons}
          clicked={this.toggerPersonsHandler}
        />
        {persons}
      </div>
    );
  }
}

export default App;
