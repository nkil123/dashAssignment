import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {userReducer} from './redux/reducers/userReducer';

let composeEnhancers = compose;

if (process.env.NODE_ENV !== 'production') {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ({})
    : compose;
}

const root = combineReducers ({
  user: userReducer,
});

const enhancer = composeEnhancers (applyMiddleware (thunk));

const store = createStore (root, enhancer);

export default store;

console.log (store.getState (), 'store');
