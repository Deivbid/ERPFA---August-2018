import { FETCH_PRODUCTS } from './types';
import axios from 'axios';

const productsAPI = "https://aerolab-challenge.now.sh/products";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjQyNjUyOTRiYzk1YzAwNThkMWJhMjYiLCJpYXQiOjE1MzEwNzc5MzB9.973QYrXVp38QXdAjXMdxByR5JkA7cC059JchMpa9lXI"

const compare = {

	'lowestprice': (a, b) => {
	    if (a.cost < b.cost)
	      return -1;
	    if (a.cost > b.cost)
	      return 1;
	    return 0;
	  },

	'highestprice': (a, b) => {
	    if (a.cost > b.cost)
	      return -1;
	    if (a.cost < b.cost)
	      return 1;
	    return 0;
	}
}

export const fetchProducts = (filters, sortBy) => dispatch => {

	axios.get(productsAPI, { headers: {"Authorization" : `Bearer ${TOKEN}`, 'Content-Type': 'application/json', 'Accept': 'application/json'}})

		.then( res => {
			
			let products = res.data;
			if(filters && filters.length > 0)
			{
		        products = products.filter( p => filters.find( f => p.availableSizes.find( size => size === f ) ) );
		    }

		    if(sortBy)
		    {
		        products = products.sort(compare[sortBy]);
		    }

		    return dispatch({
		        type: FETCH_PRODUCTS,
		        payload: products
		    });

		})

		.catch( err => {
			console.log('Si ves esto es que no encontraste solucion');
			throw new Error('Could not fetch products. Try again later.');
		})
}