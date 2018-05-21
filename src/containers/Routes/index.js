import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'; 

import HomeContainer from '../Home';
import NotFound from '../../components/pages/404';

export default class Routes extends Component {
	render() {
		return(
			<Switch>
				<Route exact path='/' component={HomeContainer}/>
				{/* <Route path='/addProduct' component={}/>
				<Route path='/editProduct/:id' component={}/> */}
				<Route component={NotFound} />
			</Switch>
		)
	}
}