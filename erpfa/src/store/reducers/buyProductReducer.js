import { BUY_PRODUCT } from '../actions/types';

export default function(state = {}, action){
  switch(action.type){
    case BUY_PRODUCT:
      return {
        state,
        info: action.payload
      }
    default:
      return state;
  }
}