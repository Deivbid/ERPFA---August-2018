import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Redux Tools
import { connect } from "react-redux";
import { updateSort } from '../../store/actions/sortActions';

//Inner Components
import Selectbox from '../SelectBox';

const sortBy = [
  { value: '',           label: 'Select'  },
  { value: 'lowestprice', label: 'Lowest to highest' },
  { value: 'highestprice', label: 'Highest to lowest' },
];

class Sort extends Component{

	handleSort = (value) => {
		this.props.updateSort(value);
	}

	render() {
	    return (
	      	<div className="sort">
	        	Order by <Selectbox options={sortBy} handleOnChange={this.handleSort} />
	      	</div>
	    );
	}
}

Sort.propTypes = {
  updateSort: PropTypes.func.isRequired,
  sort: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  sort: state.sort.item,
})

export default connect(mapStateToProps, { updateSort })(Sort);


