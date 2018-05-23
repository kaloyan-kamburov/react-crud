import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';

import { withRouter } from 'react-router-dom';

import Routes from './containers/Routes';

import * as actions from './common/constants';
import Grid from '@material-ui/core/Grid';
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
			
				<Grid container justify={'center'} spacing={16} alignItems={'center'}>
					<Routes />
				</Grid>
			</Provider>
		);
	}
}

export default withRouter(App);
