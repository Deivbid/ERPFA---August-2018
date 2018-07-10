import { FETCH_USER} from './types';
import axios from 'axios';

const productsAPI = "https://aerolab-challenge.now.sh/user/me";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjQyNjUyOTRiYzk1YzAwNThkMWJhMjYiLCJpYXQiOjE1MzEwNzc5MzB9.973QYrXVp38QXdAjXMdxByR5JkA7cC059JchMpa9lXI";


export const fetchUser = () => dispatch => {

	axios.get(productsAPI, { headers: {"Authorization" : `Bearer ${TOKEN}`, 'Content-Type': 'application/json', 'Accept': 'application/json'}})
		.then( res => {		
			let user = res.data;

		    return dispatch({
		        type: FETCH_USER,
		        payload: user
		    });
		})
		.catch( err => {
			throw new Error('Could not fetch User. Try again later.');
		})
}