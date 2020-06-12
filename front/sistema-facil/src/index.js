import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MenuService from './services/MenuService';
import SistemaFacil from './components/SistemaFacil';
import * as serviceWorker from './serviceWorker';

let menuService = new MenuService();

ReactDOM.render(
	<React.StrictMode>
		<SistemaFacil menuService={menuService}/>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
