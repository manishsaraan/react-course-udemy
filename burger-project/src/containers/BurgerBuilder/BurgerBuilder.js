import React, { Component } from "react";
import { connect } from 'react-redux';
import { addIngredient, removeIngredient, initIngredients, purchaseInit, setAuthRedirect } from '../../store/actions/index';
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-order";

class BurgerBuild extends Component {
  state = {
    totalPrice: 4,
    purchasing: false,
   
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }
  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map(key => {
        return ingredients[key];
      })
      .reduce((sum, el) => sum + el, 0);

    return sum > 0;
  };

  purchaseHandler = () => {
    if(this.props.isAuth){
      this.setState({ purchasing: true });
    }else{
      this.props.onSetRedirect("/checkout");
      this.props.history.push("/auth");
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.onInitPurchased();
    
    this.props.history.push("/checkout")
  };

  render() {
    console.log(this.props.ings,'------------',this.props.error)
    const disabledInfo = {
      ...this.props.ings
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.props.error ? (
      <p>Ingredients cant be loaded.</p>
    ) : (
      <Spinner />
    );

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientRemoved={this.props.onIngredientRemoved}
            ingredientAdded={this.props.onIngredientAdded}
            disabled={disabledInfo}
            purchaseable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
            price={this.props.totalPrice}
            isAuth={this.props.isAuth}
          />
        </Aux>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinue={this.purchaseContinueHandler}
          price={this.props.totalPrice}
        />
      );
    }

    // if (this.state.loading) {
    //   orderSummary = <Spinner />;
    // }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
 return {
   ings: state.burgerBuilder.ingredients,
   totalPrice: state.burgerBuilder.totalPrice,
   error: state.burgerBuilder.error,
   isAuth: state.auth.token !== null
 }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded : (ingredientName) => dispatch(addIngredient(ingredientName
    )),
    onIngredientRemoved : (ingredientName) => dispatch(removeIngredient(ingredientName)),
    onInitIngredients: () => dispatch(initIngredients()),
    onInitPurchased: () => dispatch(purchaseInit()),
    onSetRedirect: (path) => dispatch(setAuthRedirect(path))  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuild, axios));
