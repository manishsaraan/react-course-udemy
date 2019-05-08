import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";

class BurgerBuild extends Component {
  render() {
    return (
      <Aux>
        <Burger />
        <div>Builder controls</div>
      </Aux>
    );
  }
}

export default BurgerBuild;
