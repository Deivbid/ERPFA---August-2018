import React from 'react';
import PropTypes from "prop-types";

//iNNER coMPONENTS
import Thumb from '../Thumb';
import Coin from './../../static/coin.svg';

//Redux Tools
import { connect } from 'react-redux';

const Product = ({product, addProduct, user}) => {
	
	
	// An input component can change the quantity in the future
	let points 
	product.quantity = 1;
	if(user)
	{
		points = user.points
	}
	else
	{
		points = 100000;
	}

  	return( 
  		<div className='shelf-item' >
  			{ product.cost >= points && <div className='shelf-stopper'> Need more    <i className="fas fa-circle"></i> </div> }

  			<Thumb 
  				classes='shelf-item__thumb'
  				src={product.img.url}
  				alt={product.name}
  			/>

  			<p className="shelf-item__title">{product.name}</p> 
  			<div className="shelf-item__price">
  				<div className="val">
  					<small></small>
  					<b>
  						{product.cost}
  					</b>
  					<span>
  						<img className="shelf-item__coin" src={Coin} alt="aerolab-logo" />
  					</span>
  				</div>
  				{/*<p className="shelf-item__footer">
            You Can But it
          </p>*/}
  			</div>

  			<div onClick={() => addProduct(product)} className="shelf-item__buy-btn">Add to cart</div>

  		</div>
  	 )
}

Product.propTypes = {
  product: PropTypes.object.isRequired,
  addProduct: PropTypes.func.isRequired,
  user:PropTypes.object.isRequired
};

export default Product;