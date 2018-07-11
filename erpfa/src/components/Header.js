import React, {Component} from 'react';
import PropTypes from 'prop-types';

//Assets
import Brand from '../static/aerolab-logo.svg';
import Coin from '../static/coin.svg';
import FloatCart from './floatCart/floatCart';

//Redux Tools
import { connect } from 'react-redux';
import { fetchUser } from '../store/actions/userActions';

 class Header extends Component{

	 
	componentWillMount(){
		 this.props.fetchUser();
	 }

	componentWillReceiveProps(nextProps) {
		if(this.props.user){
			if(this.props.user.points != nextProps.user.points)
				console.log('entraste')
				this.props.fetchUser();
		}
	}

 	render(){
		
		 const { user } = this.props;

 		return(
 			<div className="header">
 				<div className="brand">
 					<img className="alogo" src={Brand} alt="aerolab-logo" />
 				</div>

 				<div className="user-info">
 					<h2 className="name user-item"> {user && user.name} </h2>
 					<div className="points">
 						<span className="user-points user-item"> {user && user.points} </span>
 						<img className="coin user-item" src={Coin} alt="aerolab-logo" />
 					</div>
 					<FloatCart />

 				</div>
 			</div>
 		)
 	}
 }

 Header.propTypes = {
	fetchUser: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
	user: state.user.info
 })
 export default connect(mapStateToProps, { fetchUser })(Header);