import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
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
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/"/>
      </Switch>
    );

    if(this.props.isAuth){
      routes = ( <Switch>
        <Route path="/checkout" component={Checkout} />
        <Route path="/orders" component={Orders} />            
        <Route path="/logout" component={Logout} />     
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/"/>
      </Switch>);
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }

}

const mapStateToProps = state => ({
    isAuth: state.auth.token !== null
});

const mapDispatchToProps = dispatch => {
  return {
    onTrySignup : () => dispatch(authCheckStatus())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
