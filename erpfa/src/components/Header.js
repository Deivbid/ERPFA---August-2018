import React, {Component} from 'react';

//Assets
import Brand from '../static/aerolab-logo.svg';
import Coin from '../static/coin.svg';
import Bag from '../static/bag-icon.png';
import FloatCart from './floatCart/floatCart';

 class Header extends Component{
 	constructor(props){
 		super(props)

 		this.state = {

 		}
 	}

 	render(){
 		return(
 			<div className="header">
 				<div className="brand">
 					<img className="alogo" src={Brand} alt="aerolab-logo" />
 				</div>

 				<div className="user-info">
 					<h2 className="name user-item"> David Aparicio </h2>
 					<div className="points">
 						<span className="user-points user-item"> 6000 </span>
 						<img className="coin user-item" src={Coin} alt="aerolab-logo" />
 					</div>
 					<FloatCart />

 				</div>
 			</div>
 		)
 	}
 }

 export default Header;