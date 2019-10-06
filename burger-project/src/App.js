import React from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import { authCheckStatus } from './store/actions'
import Layout from "./hoc/Layouts/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from './containers/Checkout/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

class App extends React.Component {
  componentDidMount(){
    this.props.onTrySignup()
  }

  render(){
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/auth" component={Auth} />
            <Route path="/logout" component={Logout} />
            <Route path="/" exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }

}


const mapDispatchToProps = dispatch => {
  return {
    onTrySignup : () => dispatch(authCheckStatus())
  }
}

export default connect(null,mapDispatchToProps)(App);
