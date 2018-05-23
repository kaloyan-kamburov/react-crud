import React, { Component } from 'react';
import { connect } from 'react-redux';
import Products from '../../../containers/Products';
import Grid from '@material-ui/core/Grid';
import ButtonAdd from '../../../containers/Buttons/add';
import { shouldComponentRender } from '../../../common/helpers';

class Home extends Component {
	constructor(props) {
		super(props);

		console.log()
	}
	render() {
		return (
			<Grid item xs={10}>
				<h1>Product manager </h1>

				{shouldComponentRender('CREATE', this.props.permissions,
					<Grid item xs={10}>
						<ButtonAdd /><br/><br/>
					</Grid>
					, null)}
				<Products />
			</Grid>
		)
	}
}



const mapStateToProps = state => {
	return {
		...state
	}
}

export default connect(mapStateToProps)(Home);