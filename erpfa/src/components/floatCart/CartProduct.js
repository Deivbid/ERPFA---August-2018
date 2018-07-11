import React, { Component } from 'react';
import PropTypes from "prop-types";

//Inner Components
import Thumb from "./../Thumb";
import Coin from "./../../static/coin.svg";

class CartProduct extends Component{
	constructor(props){
		super(props);

		this.state = {
			isMouseOver: false
		}
	}

	handleMouseOver = () => {
	    this.setState({isMouseOver: true});
	}

	handleMouseOut = () => {
	    this.setState({isMouseOver: false});
	}

	render(){
		const {  product, removeProduct } = this.props;
		const classes = ['shelf-item'];
		if(this.state.isMouseOver){
      		classes.push('shelf-item--mouseover');
    	}

		return( 
			<div className={classes.join(" ")}>
				<div
		          	className="shelf-item__del"
		          	onMouseOver={() => this.handleMouseOver()}
		          	onMouseOut={() => this.handleMouseOut()}
		          	onClick={() => removeProduct(product)}
		        />

		        <Thumb
			        classes="shelf-item__thumb"
			        src={product.img.url}
			        alt={product.name}
			    /> 

		        <div className="shelf-item__details">
		          	<p className="title">{product.name}</p>
		          	<div className="desc">
						{product.category}
						<p>
							Quantity: {product.quantity}
						</p>
		          	</div>
		        </div>  

		        <div className="shelf-item__price">
						  <img src={Coin} alt="aerolab-logo" /> 
						  <span>{product.cost}</span>
		        </div>

	        	<div className="clearfix" />	

			</div>
		)
	}	
}

CartProduct.propTypes = {
  product: PropTypes.object.isRequired,
  removeProduct: PropTypes.func.isRequired,
};

export default CartProduct;
