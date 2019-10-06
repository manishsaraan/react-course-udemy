import React from "react";
import { connect } from "react-redux";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-order";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { purchaseBurger } from '../../../store/actions/index';

class ContactData extends React.Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: "",
        validation:{
          required: true
        },
        valid: false,
        touched:false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street Name"
        },
        value: "",
        validation:{
          required: true
        },
        valid: false,
        touched:false
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Zip Code"
        },
        value: "",
        validation:{
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched:false
      },
      country:{
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        value: "",
        validation:{
          required: true
        },
        valid: false,
        touched:false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email"
        },
        value: "",
        validation:{
          required: true
        },
        valid: false,
        touched:false
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: 'fastest' , displayValue: 'Fastest'},
            { value: 'cheapest' , displayValue: 'Cheapest'}
          ]
        },
        value: "fastest"
      }
    },
    formIsValid: false
  };

  orderHandler = event => {
    event.preventDefault();
    
    const formData = {};
    for(let formElementIdentifier in this.state.orderForm){
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData : formData
    };

    this.props.onOrderBurger(order, this.props.token);
    
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    }

    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    }

    updatedFormElement.value = event.target.value;
    updatedFormElement.touched = true;
    updatedFormElement.valid = this.checkValidation(event.target.value, updatedFormElement.validation);
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    
    for(let inputIdentifier in updatedOrderForm){
      if(updatedOrderForm[inputIdentifier].rules){
      console.log(inputIdentifier,updatedOrderForm[inputIdentifier].valid)
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
      }
    }

    this.setState({orderForm: updatedOrderForm, formIsValid });
  }

  checkValidation = (value, rules) => {
     let isValid = true;
     if(!rules){
       return;
     }

     if(rules.required){
       isValid = value.trim() !== "" && isValid;
     }

     if(rules.minLength){
       isValid  = value.length >= rules.minLength && isValid;;
     }

     if(rules.maxLength){
      isValid  = value.length <= rules.maxLength && isValid;
    }

     return isValid;
  }

  render() {
    const formElementsArr = [];
    for(let key in this.state.orderForm){
      formElementsArr.push({id:key, config: this.state.orderForm[key]});
    }

    let form = (      
      <form onSubmit={this.orderHandler}>
      {
        formElementsArr.map( element => (
         <Input
          key={element.id}
          elementType={element.config.elementType}
          elementConfig={element.config.elementConfig}
          value={element.config.value}
          changed={(event) => this.inputChangedHandler(event, element.id)}
          invalid={!element.config.valid}
          shouldValidate={element.config.validation}
          touched={element.config.touched}
        /> 
        ))
      }
        
      <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token
  }
}


const mapDispatchToProps = (dispatch) => ({
  onOrderBurger : (orderData, token) => dispatch(purchaseBurger(orderData, token))
})

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));