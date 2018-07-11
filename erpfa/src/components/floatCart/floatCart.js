import React from 'react';
import PropTypes from'prop-types';

//Redux Tools
import { connect } from 'react-redux';
import { loadCart, removeProduct } from '../../store/actions/floatCartActions';
import { updateCart } from '../../store/actions/updateCartActions';
import { fetchUser } from '../../store/actions/userActions';

//Cart Components
import CartProduct from './CartProduct';
import PersistentCart from "../../PersistentCart";
import Coin from './../../static/coin.svg';

import swal from "sweetalert";
import axios from "axios";

class FloatCart extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isOpen: false
		}
	}

	componentWillMount(){
		this.props.loadCart( JSON.parse(PersistentCart().get()) || [] );
	}

	componentDidMount() {
	    setTimeout(() => { //Set time out to put in queue of events. Js
	      this.props.updateCart(this.props.cartProducts);
	    }, 0);
	}

	componentWillReceiveProps(nextProps) {
	    if (nextProps.newProduct !== this.props.newProduct) {
	      this.addProduct(nextProps.newProduct);
	    }

	    if (nextProps.productToRemove !== this.props.productToRemove) {
	      this.removeProduct(nextProps.productToRemove);
	    }
	}

	openFloatCart = () => {
	    this.setState({ isOpen: true });
	}

	closeFloatCart = () => {
	    this.setState({ isOpen: false });
	}

	addProduct = (product) => {
	    const { cartProducts, updateCart } = this.props;
	    let productAlreadyInCart = false;

	    cartProducts.forEach(cp => {
	      if (cp._id === product._id) {
	        cp.quantity += product.quantity;
	        productAlreadyInCart = true;
	      }
	    });

	    if (!productAlreadyInCart) {
	      cartProducts.push(product);
	    }

	    updateCart(cartProducts);
	    this.openFloatCart();
	}

	removeProduct = (product) => {
	    const { cartProducts, updateCart } = this.props;
	    if(!product)
	    {
	    	cartProducts.splice(0, cartProducts.length);
	    	updateCart(cartProducts)
	    }
	    else
	    {
		    const index = cartProducts.findIndex(p => p._id === product._id);
		    
		    if (index >= 0) {
		      cartProducts.splice(index, 1);

		      updateCart(cartProducts);
		    }
	    }
	}

	proceedToCheckout = () => {
			const { totalPrice, productQuantity } = this.props.cartTotals;
			const { cartProducts, user } = this.props;
		
	    const productsAPI = "https://aerolab-challenge.now.sh/redeem";
			const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjQyNjUyOTRiYzk1YzAwNThkMWJhMjYiLCJpYXQiOjE1MzEwNzc5MzB9.973QYrXVp38QXdAjXMdxByR5JkA7cC059JchMpa9lXI";

	    if (!productQuantity) {
	    	swal("Hey", "Add some product in the bag !", "info");
	    }else {
	    	
	    	if(user.points < totalPrice)
	    	{
					swal("Ups D:", "You don't have money enough", "error");
				}
				else
				{
					cartProducts.map((item, i) => {
						let body = {
							"productId": item._id
						}
						
						for(let i = 0; i < item.quantity; i++)
						{
							axios.post(productsAPI, body, { headers: {"Authorization" : `Bearer ${TOKEN}`, 'Content-Type': 'application/json', 'Accept': 'application/json'}})
							.then( res => {		
								console.log(res)								
							})
							.catch( err => {
								swal("Error", "There was a mistake :(", "error");
							})
						}
					})
					this.removeProduct('');
					this.props.fetchUser()
					swal("Good job!", "Thanks for purchase in Aerolab :D", "success");					
				}			
		}	
	}

	render() {

		const { cartTotals, cartProducts, removeProduct, user } = this.props;
		let points = user ? user.points : 10000;
		const products = cartProducts.map(p => {
		    return (
		        <CartProduct
		          product={p}
		          removeProduct={removeProduct}
		          key={p._id}
		        />
		    );
	    });

			let classes = ['float-cart'];

	    if (!!this.state.isOpen) {
	      classes.push('float-cart--open');
	    }	    

		return (
			<div className={classes.join(' ')}>
				{/* If cart is open, show close (x) button */}
		        {this.state.isOpen && (
		          <div
		            onClick={() => this.closeFloatCart()}
		            className="float-cart__close-btn"
		          >
		          X
		          </div>
		        )}

		        {/* If cart is closed, show bag with quantity of product and open cart action */}
		        {!this.state.isOpen && (
		          <span
		            onClick={() => this.openFloatCart()}
		            className="bag bag--float-cart-closed"
		          >
		          <i className="fas fa-shopping-cart"></i>
		            <span className="bag__quantity">{cartTotals.productQuantity}</span>
		          </span>
		        )}

		        <div className="float-cart__content">
			        <div className="float-cart__header">
			            <span className="bag">
			            	<i className="fas fa-shopping-cart"></i>
			              	<span className="bag__quantity">
			                	{cartTotals.productQuantity}
			              	</span>
			            </span>
			            <span className="header-title">Bag</span>
			        </div>		        		        
				    

		        <div className="float-cart__shelf-container">
		            {products}
		            {!products.length && (
		              	<p className="shelf-empty">
		                	Add some product in the bag <br />:)
		              	</p>
		            )}
		        </div>

		        <div className="float-cart__footer">
		            <div className="sub">SUBTOTAL</div>
			            <div className="sub-price">
			              	<p className="sub-price__val">
			                	<img src={Coin} alt="aerolab-logo" /> {cartTotals.totalPrice > points ? <span className="color-red">{cartTotals.totalPrice}</span> : <span> {cartTotals.totalPrice} </span>}
			              	</p>
			              	<small className="sub-price__installment">
			                	{!!cartTotals.installments && (
			                  	<span className="color-red">
			                    	{ cartTotals.totalPrice > points && "You don't have points enough"}
			                  	</span>
			                )}
			            	</small>
			        	</div>
			        	<div onClick={() => this.proceedToCheckout()} className="buy-btn">
			              	Checkout
			          </div>
		        </div>	
		      </div>
        </div>		
		);
	}
}

FloatCart.propTypes = {
  loadCart: PropTypes.func.isRequired,
  updateCart: PropTypes.func.isRequired,
  cartProducts: PropTypes.array.isRequired,
  newProduct: PropTypes.object,
  removeProduct: PropTypes.func,
  productToRemove: PropTypes.object,
};

const mapStateToProps = state => ({
  cartProducts: state.cartProducts.items,
  newProduct: state.cartProducts.item,
  productToRemove: state.cartProducts.itemToRemove,
  cartTotals: state.cartTotals.item,
  user: state.user.info
});

export default connect(mapStateToProps, { loadCart, updateCart, removeProduct, fetchUser})(FloatCart);
