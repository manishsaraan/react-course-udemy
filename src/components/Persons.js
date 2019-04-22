import React from "react";
import Person from "./Persons/Person/Person";
import ErrorBoundry from "../ErrorBoundry/ErrorBoundry";

const persons = props =>
  props.persons.map((person, index) => (
    <ErrorBoundry key={person.id}>
      <Person
        click={() => props.clicked(index)}
        name={person.name}
        age={person.age}
        changed={event => props.changed(event, person.id)}
      />
    </ErrorBoundry>
  ));

export default persons;
