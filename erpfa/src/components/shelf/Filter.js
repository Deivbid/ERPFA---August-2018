import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Redux Tools
import { connect } from "react-redux";
import { updateFilters } from '../../store/actions/filterActions';
//Buttons
import Checkbox from '../CheckBox';
import StarButton from '../github/StarButton';

const availableSizes = [
  'XS',
  'S',
  'M',
  'ML',
  'L',
  'XL',
  'XXL',
];

class Filter extends Component {
	componentWillMount(){
		this.selectedCheckboxes = new Set();
	}

	toggleCheckBox = (label) => {

		if(this.selectedCheckboxes.has(label))
		{
			this.selectedCheckboxes.delete(label);
		}
		else
		{
			this.selectedCheckboxes.add(label);
		}

		this.props.updateFilters(Array.from(this.selectedCheckboxes));
	}

	createCheckBox = (label) => {
		<Checkbox 
			classes="filters-available-size"
			label={label}
			handleCheckboxChange={this.toggleCheckbox}
			key={label}
		/>
	}

	createCheckBoxes = () => {
		availableSizes.map(this.createCheckBox);
	}

	render(){
		return(
			<div className='filters'>
				<h4 className="title">Sizes:</h4>
				{this.createCheckBoxes()}
				<StarButton />
			</div>
		)
	}
}

Filter.propTypes = {
	updateFilters: PropTypes.func.isRequired,
  	filters: PropTypes.array,
}

const mapStateToProps = state => ({
  filters: state.filters.items,
})

export default connect(mapStateToProps, {updateFilters})(Filter);