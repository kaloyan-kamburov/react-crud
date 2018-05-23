import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../common/constants';

import { shouldComponentRender } from '../../common/helpers';
import ButtonEdit from '../../containers/Buttons/edit';
import ButtonDelete from '../../containers/Buttons/delete';

import Grid from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class Products extends Component {
	constructor(props) {
		super(props);

		this.state = {
			products: props.products,
			productsVisible: false
		}
	}

	componentDidMount() {
		this.props.getAllProducts();
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			products: nextProps.products,
			productsVisible: nextProps.permissions.indexOf('READ') > -1
		});
	}

	render() {

		if (this.state.productsVisible) {
			return (
				<div>
					<Grid style={{display: this.props.products.all.length ? 'block' : 'none'}}>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Name</TableCell>
									<TableCell numeric>Price</TableCell>
									<TableCell numeric>Currency</TableCell>
									<TableCell numeric>Actions</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{this.props.products.all.map((product, index) => (
									<tr key={index}>
										<TableCell>{product.name}</TableCell>
										<TableCell numeric>{product.price}</TableCell>
										<TableCell numeric >{product.currency}</TableCell>
										<TableCell numeric>
											{
												shouldComponentRender(
													'UPDATE', 
													this.props.permissions,
													<ButtonEdit index={index} />,
													null
												)
											}

											{
												shouldComponentRender(
													'DELETE', 
													this.props.permissions,
													<ButtonDelete index={index} />
													, null)
											}
										</TableCell>
									</tr>
								))}
							</TableBody>
						</Table>
					</Grid>
				
				<h4 style={{display: !this.props.products.all.length ? 'block' : 'none'}}>There are no products</h4>
				</div>
			);
		} else {
			return (<div>YOU DON'T HAVE PERMISSIONS TO VIEW PRODUCTS!</div>);
		}
	}
}

const mapStateToProps = state => {
	return {
		...state
	}
}

const mapDispatchToProps = dispatch => ({	
	getAllProducts: () => (
		dispatch({
			type: actions.PRODUCT_GET_ALL_REQUEST
		})
	)
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);