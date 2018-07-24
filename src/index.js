import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App/App.js';
import registerServiceWorker from './helpers/registerServiceWorker';

import './scss/main.css';

ReactDOM.render(
	<App />,
	document.getElementById('root')
);

registerServiceWorker();