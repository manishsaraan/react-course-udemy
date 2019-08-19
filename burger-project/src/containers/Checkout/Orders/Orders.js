import React from 'react';
import Order from '../../../components/UI/Order/Order';
import axios from '../../../axios-order';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'

class Orders extends React.Component {
  state = {
      ordres: [],
      loading: true
  }
  componentDidMount(){
    axios.get('/orders.json').then(response => {
        const fetchedOrders = [];

        for(let key in response.data){
           fetchedOrders.push({ ...response.data[key], id: key });
        }
        
        this.setState({ordres: fetchedOrders, loading: false})
    })
    .catch(error => {
        this.setState({loading: false})
    })
  }
  render(){
      return(
          <div>
             {
                 this.state.ordres.map( order => <Order ingredients={order.ingredients} price={+order.price} key={order.id} />)
             }
          </div>
      );
  }
}

export default withErrorHandler(Orders, axios);