import { BUY_PRODUCT} from './types';
import axios from 'axios';

const productsAPI = "https://aerolab-challenge.now.sh/redeem";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjQyNjUyOTRiYzk1YzAwNThkMWJhMjYiLCJpYXQiOjE1MzEwNzc5MzB9.973QYrXVp38QXdAjXMdxByR5JkA7cC059JchMpa9lXI";


export const fetchUser = () => dispatch => {

	let body = { 
		"productId": "5a033eeb364bf301523e9b92",
	}

	axios.post(productsAPI, body, { headers: {"Authorization" : `Bearer ${TOKEN}`, 'Content-Type': 'application/json', 'Accept': 'application/json'}})
		.then( res => {		
			let user = res.data;

		    return dispatch({
		        type: BUY_PRODUCT,
		        payload: redeem
		    });
		})
		.catch( err => {
			throw new Error('Could not fetch User. Try again later.');
		})
}