import { createStore, compose, applyMiddleware } from 'redux'
import rootReducer from '../reducers/rootReducers'
import thunk from 'redux-thunk';

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));
export default store;