import React from 'react';
import PropTypes from 'prop-types';

//
import Sort from './Sort';
import Clearfix from '../Clearfix';

const ShelfHeader = ({productsLength}) => {

	return( 
		<div className='shelf-container-header'>      		
      		<Sort />
      		<Clearfix />
		</div>
	)
}

export default ShelfHeader;