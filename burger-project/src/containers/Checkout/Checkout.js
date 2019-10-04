import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { purchaseInit } from '../../store/actions/index';

class Checkout extends Component {

  checkoutCancelled = () => this.props.history.goBack();

  checkoutContinue = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    let summary = <Redirect to="/" />;

    if(this.props.ings){
       const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : "";
       
       summary = (
       <div>
          { purchasedRedirect }
          <CheckoutSummary
            checkoutCancelled={this.checkoutCancelled}
            checkoutContinue={this.checkoutContinue}
            ingredients={this.props.ings}
          />
          <Route
          path={this.props.match.path + "/contact-data"}
          component={ContactData}
        />
      </div>
    );
    }

    return (
      summary 
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  }
}


export default connect(mapStateToProps)(Checkout);
