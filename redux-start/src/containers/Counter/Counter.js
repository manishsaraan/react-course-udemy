import React, { Component } from 'react';
import { connect } from 'react-redux';
import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component {
    state = {
        counter: 0
    }

    counterChangedHandler = (action, value) => {
        switch (action) {
            case 'inc':
                this.setState((prevState) => { return { counter: prevState.counter + 1 } })
                break;
            case 'dec':
                this.setState((prevState) => { return { counter: prevState.counter - 1 } })
                break;
            case 'add':
                this.setState((prevState) => { return { counter: prevState.counter + value } })
                break;
            case 'sub':
                this.setState((prevState) => { return { counter: prevState.counter - value } })
                break;
        }
    }

    render() {
        console.log(this.props.results)
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter} />
                <CounterControl label="Add 5" clicked={this.props.onAddCounterCounter} />
                <CounterControl label="Subtract 5" clicked={this.props.onSubtractCounter} />
                <hr />
                <button onClick={this.props.onStoreResult}>Store Results</button>
                <ul>
                    {
                        this.props.results.map((item, key) => (
                            <li key={item.id} onClick={() => this.props.onDeleteResult(item.id)}>{item.value}</li>))
                    }
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ctr: state.counter,
        results: state.results
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIncrementCounter: () => dispatch({ type: 'INCREMENT' }),
        onDecrementCounter: () => dispatch({ type: 'DECREMENT' }),
        onAddCounterCounter: (value) => dispatch({ type: 'ADD', value: 10 }),
        onSubtractCounter: () => dispatch({ type: 'SUBTRACT', value: 10 }),
        onStoreResult: () => dispatch({ type: "STORE_RESULT" }),
        onDeleteResult: (id) => dispatch({ type: "DELETE_RESULT", id }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);