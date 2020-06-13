import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import sistemaFacilApp from './reducers';
import './index.css';
import App from './containers/App';

const store = createStore(sistemaFacilApp);

ReactDOM.render(
	<Provider store={store}>
		<App store={store} />
	</Provider>,
	document.getElementById('root')
);

