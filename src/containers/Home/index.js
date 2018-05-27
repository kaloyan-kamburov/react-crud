import React, { Component } from 'react';
import { connect } from 'react-redux';

import { shouldComponentRender } from '../../common/helpers';
import Products from '../../containers/Products';
import ButtonAdd from '../../containers/Buttons/add';
import Loader from '../../components/common/Loader';

import Grid from '@material-ui/core/Grid';

class Home extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Grid item xs={10}>				
				<Loader visible={this.props.loaders.permissions}/>
				<h1>Product manager</h1>
				{
					shouldComponentRender(
						'CREATE', 
						this.props.permissions,
						<Grid item xs={10}>
							<ButtonAdd /><br/><br/>
						</Grid>, 
						null
					)
				}
				{
					shouldComponentRender(
						'READ', 
						this.props.permissions,
						<Products />,
						<div>YOU DON'T HAVE PERMISSIONS TO VIEW PRODUCTS!</div>
					)
				}
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