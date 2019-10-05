import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button'
import { auth } from '../../store/actions/index'
import classes from './Auth.css';

class Auth extends Component {
  state = {
    controls: {
        email: {
            elementType: "input",
            elementConfig: {
              type: "email",
              placeholder: "Email"
            },
            value: "",
            validation:{
              required: true,
              isEmail: true
            },
            valid: false,
            touched:false
          },
        password: {
            elementType: "input",
            elementConfig: {
              type: "password",
              placeholder: "Password"
            },
            value: "",
            validation:{
              required: true,
              minLength: 6
            },
            valid: false,
            touched:false
          }
    }
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

 inputChangedHandler = (event, inputIdentifier) => {
     const updatedControls = {
         ...this.state.controls,
         [inputIdentifier]: {
             ...this.state.controls[inputIdentifier],
             value: event.target.value,
             valid: this.checkValidation(event.target.value, this.state.controls[inputIdentifier].validation),
             touched: true
         }
     };

     this.setState({controls: updatedControls})


 }

 submitHandler = event => {
    event.preventDefault();

    const { controls: { email, password } } = this.state;
    this.props.onInitAuth(email.value, password.value)
 }

  render(){
    const formElementsArr = [];
    for(let key in this.state.controls){
      formElementsArr.push({id:key, config: this.state.controls[key]});
    }

    const form = formElementsArr.map( element => {
        return (
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
        )
    })
      return (
          <div className={classes.Auth}>
              <form onSubmit={this.submitHandler}>
                  {form}
               <Button btnType="Success">Submit </Button>
                
              </form>
          </div>
      );
  }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
    onInitAuth: (email, password) => dispatch(auth(email, password))
})

export default connect(mapStateToProps, mapDispatchToProps)(Auth);