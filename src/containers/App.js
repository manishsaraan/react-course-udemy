import React, { Component } from "react";
import styles from "./App.css";
import Person from "../components/Persons/Person/Person";
import ErrorBoundry from "../ErrorBoundry/ErrorBoundry";

class App extends Component {
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
    const { showPersons } = this.state;
    let btnClass = "";

    let persons = null;
    if (showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => (
            <ErrorBoundry key={person.id}>
              <Person
                click={() => this.deletePersonHandler(index)}
                name={person.name}
                age={person.age}
                changed={event => this.nameChangedHandler(event, person.id)}
              />
            </ErrorBoundry>
          ))}
        </div>
      );

      btnClass = styles.Red;
    }

    const classes = [];
    if (this.state.persons.length <= 2) {
      classes.push(styles.red);
    }

    if (this.state.persons.length <= 1) {
      classes.push(styles.bold);
    }

    return (
      <div className={styles.App}>
        <h1>Hi, I'm a React App</h1>
        <p className={classes.join(" ")}>This is really working!</p>
        <button className={btnClass} onClick={this.toggerPersonsHandler}>
          Switch Name
        </button>
        {persons}
      </div>
    );
  }
}

export default App;
