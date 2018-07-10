import { combineReducers } from 'redux';
import productReducer from './productReducer';
import floatCartReducer from './floatCartReducer';
import updateCartReducer from './updateCartReducer';
import filterReducer from './filterReducer';
import sortReducer from './sortReducer';
import userReducer from './userReducer';


export default combineReducers({
  products: productReducer,
  cartProducts: floatCartReducer,
  cartTotals: updateCartReducer,
  filters: filterReducer,
  sort: sortReducer,
  user: userReducer
});