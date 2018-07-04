import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

//Redux
import { Provider } from 'react-redux';
//import store from './store'

ReactDOM.render(

		<App />

	, document.getElementById('root'));
registerServiceWorker();
