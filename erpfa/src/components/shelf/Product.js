import React from 'react';
import PropTypes from "prop-types";

//iNNER coMPONENTS
import Thumb from '../Thumb';
import util from '../../Utils';
import Coin from './../../static/coin.svg';

const Product = ({product, addProduct}) => {
	
	// An input component can change the quantity in the future
  	product.quantity = 1;

  	return( 
  		<div className='shelf-item' >
  			{ product.cost >= 800 && <div className='shelf-stopper'> Need more    <i class="fas fa-circle"></i> </div> }

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
};

export default Product;