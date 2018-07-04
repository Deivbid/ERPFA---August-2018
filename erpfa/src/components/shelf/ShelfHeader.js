import React from 'react';
import PropTypes from 'prop-types';

//
import Sort from './Sort';
import Clearfix from '../Clearfix';

const ShelfHeader = ({productsLength}) => {

	return( 
		<div className='shelf-container-header'>
			<small className="products-found">
        		<span>{productsLength} Product(s) found.</span>
      		</small>
      		
      		<Sort />
      		<Clearfix />

		</div>
	)
}

export default ShelfHeader;