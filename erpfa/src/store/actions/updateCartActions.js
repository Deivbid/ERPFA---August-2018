import { UPDATE_CART} from './types';
import persistentCart from '../../PersistentCart';


export const updateCart = (cartProducts) => dispatch => {
  let productQuantity = cartProducts.reduce( (sum, p) => {
    sum += p.quantity;
    return sum;
  }, 0);

  let totalPrice = cartProducts.reduce((sum, p) => {
    sum += p.cost * p.quantity;
    return sum;
  }, 0);

  let installments = cartProducts.reduce((greater, p) => {
    greater = p.cost > greater ? p.cost : greater;
    return greater;
  }, 0);
  

  let cartTotals = {
    productQuantity,
    installments,
    totalPrice,
    currencyId: '·',
    currencyFormat: '·',
  }

  persistentCart().persist(JSON.stringify(cartProducts));

  dispatch({
    type: UPDATE_CART,
    payload: cartTotals,
  });

}