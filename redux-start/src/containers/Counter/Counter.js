import React, { Component } from 'react';
import { connect } from 'react-redux';
import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import * as actionTypes from '../../actions/actions';

class Counter extends Component {

    render() {

        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter} />
                <CounterControl label="Add 5" clicked={this.props.onAddCounterCounter} />
                <CounterControl label="Subtract 5" clicked={this.props.onSubtractCounter} />
                <hr />
                <button onClick={() => this.props.onStoreResult(this.props.ctr)}>Store Results</button>
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
        ctr: state.counter.counter,
        results: state.results.results
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIncrementCounter: () => dispatch({ type: actionTypes.INCREMENT }),
        onDecrementCounter: () => dispatch({ type: actionTypes.DECREMENT }),
        onAddCounterCounter: (value) => dispatch({ type: actionTypes.ADD, value: 10 }),
        onSubtractCounter: () => dispatch({ type: actionTypes.SUBTRACT, value: 10 }),
        onStoreResult: (result) => dispatch({ type: actionTypes.STORE_RESULT, result }),
        onDeleteResult: (id) => dispatch({ type: actionTypes.DELETE_RESULT, id }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);