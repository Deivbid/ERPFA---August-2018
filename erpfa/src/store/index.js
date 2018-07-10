import { createStore, applyMiddleware, compose } from "redux";

//Redux Thunk middleware allows you to write action creators that return a function instead of an action. 
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};
const middleware = [thunk];

const store = createStore(
		rootReducer,
		initialState,
		compose(
		applyMiddleware(...middleware),
		 window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
		)
	)

export default store;