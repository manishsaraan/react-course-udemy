import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";

class BurgerBuild extends Component {
  state = {
    ingredients: {
      salad: 5,
      bacon: 1,
      cheese: 2,
      meat: 20
    }
  };
  render() {
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <div>Builder controls</div>
      </Aux>
    );
  }
}

export default BurgerBuild;
