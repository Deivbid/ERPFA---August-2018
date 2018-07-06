import React, { Component } from 'react';
import PropTypes from "prop-types";

class CheckBox extends Component {
	constructor(props){
		super(props)

		this.state = {
			isChecked: false
		}
	}

	toggleCheckBoxChange = () => {
		const { handleCheckboxChange, label } = this.props;

		this.setState(({ isChecked }) => (
		      {
		        isChecked: !isChecked,
		      }
		));
		console.log(label)
		handleCheckboxChange(label);
	}

	render(){

		const { label, classes } = this.props;
	  const { isChecked } = this.state;
	 
		return(
			<div className={classes}>
				<label>
				    <input
				        type="checkbox"
				        value={label}
				        checked={isChecked}
				        onChange={this.toggleCheckBoxChange}
				    />

				    <span className="checkmark">{label}</span>
			    </label>
			</div>
		)
	}
}

CheckBox.propTypes = {
  label: PropTypes.string.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
};

export default CheckBox;