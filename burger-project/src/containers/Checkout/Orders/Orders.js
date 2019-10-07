import React from 'react';
import Order from '../../../components/UI/Order/Order';
import axios from '../../../axios-order';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import { fetchOrders } from '../../../store/actions/index';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';

class Orders extends React.Component {
  state = {
      ordres: [],
      loading: true
  }
  componentDidMount(){
    this.props.onFetchOrders(this.props.token, this.props.userId);
  }
  render(){
      if(this.props.loading){
          return <Spinner/>
      }

      return(
          <div>
             {
                 this.props.orders.map( order => <Order ingredients={order.ingredients} price={+order.price} key={order.id} />)
             }
          </div>
      );
  }
}

const mapStateToProps = state => ({
  orders: state.order.orders,
  loading: state.order.loading,
  token: state.auth.token,
  userId: state.auth.userId
})

const mapDispatchToProps = dispatch => ({
  onFetchOrders : (token, userId) => dispatch(fetchOrders(token, userId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));