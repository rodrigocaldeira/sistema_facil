import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import sistemaFacilApp from './reducers';
import './index.css';
import AppContainer from './containers/AppContainer';

const store = createStore(sistemaFacilApp);

ReactDOM.render(
	<Provider store={store}>
		<AppContainer />
	</Provider>,
	document.getElementById('root')
);

