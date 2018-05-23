import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

export default class NotFound extends Component {
	render() {
		return(
			<Grid item xs={10}>
				<h1>Page not found</h1>
			</Grid>
		)
	}
}