import React, { Component } from 'react';
import PropTypes from "prop-types";

class SelectedBox extends Component{

	createOptions = (options) => options.map(o => <option value={o.value} key={o.value}>{o.label}</option>)
	onChange = (e) => {

    	this.props.handleOnChange(e.value);
  	}



	render(){
		const { classes, options } = this.props;
		return(
		    <button onClick={ (e) => this.onChange(options) }>
		        {options.label}
		    </button>
		)
	}
}

SelectedBox.propTypes = {
  options: PropTypes.object.isRequired,
  classes: PropTypes.string,
  handleOnChange: PropTypes.func.isRequired,
};

export default SelectedBox;