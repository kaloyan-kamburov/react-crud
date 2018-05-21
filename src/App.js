import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';

import { withRouter } from 'react-router-dom';
import axios from 'axios';

import Routes from './containers/Routes';

import * as actions from './common/constants';
import './App.css';

class App extends Component {

	componentWillMount() {
		store.dispatch({
			type: actions.PERMISSIONS_CHECK_REQUEST
		});
	}

	render() {
		return (
			<Provider store={store}>
				<div className="App">
					<Routes />
				</div>
			</Provider>
		);
	}
}

export default withRouter(App);
