import React from 'react';
import PropTypes from'prop-types';

//Redux Tools
import { connect } from 'react-redux';
import { loadCart, removeProduct } from '../../store/actions/floatCartActions';
import { updateCart } from '../../store/actions/updateCartActions';

//Cart Components
import CartProduct from './CartProduct';
import PersistentCart from "../../PersistentCart";
import util from '../../Utils';
import Coin from './../../static/coin.svg';


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

	    const index = cartProducts.findIndex(p => p.id === product.id);
	    if (index >= 0) {
	      cartProducts.splice(index, 1);
	      updateCart(cartProducts);
	    }
	}

	proceedToCheckout = () => {
	    const { totalPrice, productQuantity, currencyFormat, currencyId } = this.props.cartTotals;

	    if (!productQuantity) {
	      alert("Add some product in the bag!");
	    }else {
	      alert(`Checkout - Subtotal: ${currencyFormat} ${util.formatPrice(totalPrice, currencyId)}`);
			}
			swal("Good job!", "You clicked the button!", "success");
	}



	render() {

		const { cartTotals, cartProducts, removeProduct } = this.props;
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
			                	<img src={Coin} alt="aerolab-logo" /> {`${cartTotals.totalPrice}`}
			              	</p>
			              	<small className="sub-price__installment">
			                	{!!cartTotals.installments && (
			                  	<span>
			                    	{`OR UP TO ${cartTotals.installments} x ${cartTotals.currencyFormat} ${util.formatPrice(cartTotals.totalPrice / cartTotals.installments, cartTotals.currencyId)}`}
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
});

export default connect(mapStateToProps, { loadCart, updateCart, removeProduct})(FloatCart);
