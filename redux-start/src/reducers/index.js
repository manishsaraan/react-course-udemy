import { combineReducers } from 'redux';
import resultReducer from './result';
import counterReducer from './counter';

const rootReducer = combineReducers({
    results: resultReducer,
    counter: counterReducer
});

export default rootReducer;