import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Redux Tools
import { connect } from "react-redux";
import { updateSort } from '../../store/actions/sortActions';

//Inner Components
import Selectbox from '../SelectBox';

const sortBy = [
  { value: '',           label: 'Most Recent'  },
  { value: 'lowestprice', label: 'Lowest to highest' },
  { value: 'highestprice', label: 'Highest to lowest' },
];

class Sort extends Component{

	handleSort = (value) => {
		this.props.updateSort(value);
	}

	Sort = () => {
		return sortBy.map((item, i) => {
			return(
				<Selectbox key={i} options={item} handleOnChange={this.handleSort} />
			)
		})
	}

	render() {
	    return (
	      	<div className="sort">
	        	Sort by: {this.Sort()} {/*<Selectbox options={sortBy} handleOnChange={this.handleSort} />*/}
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


