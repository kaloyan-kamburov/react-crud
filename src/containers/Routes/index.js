import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'; 

import Home from '../../containers/Home';
import NotFound from '../../components/pages/404';

export default class Routes extends Component {
	render() {
		return(
			<Switch>
				<Route exact path='/' component={Home}/>
				<Route component={NotFound} />
			</Switch>
		)
	}
}