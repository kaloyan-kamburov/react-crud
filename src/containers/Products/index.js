import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../common/constants';
import { shouldComponentRender } from '../../common/helpers';
import ButtonAdd from '../../containers/Buttons/add';
import ButtonEdit from '../../containers/Buttons/edit';
import ButtonDelete from '../../containers/Buttons/delete';
import Form from '../../components/common/Form';
import { notEmpty } from '../../common/formValidators';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

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

	renderEditModal = () => {
		if (this.props.modals.edit) {
			return (
				<div className='modal-mask'>
					<div className='modal-body'>
						<span className='modal-close' onClick={this.props.unsetEditProduct}></span>
						<Form
							onSubmit={this.props.updateProduct}
							serverError={this.props.serverMessages.productUpdateError}
							serverSuccess={this.props.serverMessages.productUpdateSuccess}
							formData={this.props.products.currentEditableProduct}
							fields={[
								{
									type: 'text',
									label: 'Name',
									name: 'name',
									validators: [{
										func: notEmpty,
										errorMsg: 'Name field is required'
									}]
								},
								{
									type: 'number',
									label: 'Price',
									name: 'price',
									validators: [{
										func: notEmpty,
										errorMsg: 'This field is required'
									}]
								},
								{
									type: 'select',
									label: 'Currency',
									name: 'currency',
									options: ['USD', 'EUR', 'BGN']
								}
							]}
						/>
					</div>
				</div>
			)
		}
		return;
	}

	renderDeleteModal = () => {

		if (this.props.modals.delete) {
			return (
				<div className='modal-mask'>
					<div className='modal-body'>
						<span className='modal-close' onClick={this.props.unsetDeleteProduct}></span>
						<p>Are you sure you want to delete <b>{this.props.products.currentDeleteProduct.name}</b>?</p>
						<div className='buttons-wrapper'>
							<Button variant='raised' color='secondary' onClick={() => this.props.deleteProduct(this.props.products.currentDeleteProduct.index)}>Yes</Button>
							<Button variant='raised' onClick={this.props.unsetDeleteProduct}>No</Button>
						</div>
					</div>
				</div>
			)
		}
		return;
	}

	render() {

		if (this.state.productsVisible) {
			return (
				<Grid>
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
											shouldComponentRender('UPDATE', this.props.permissions,
												<ButtonEdit index={index} />
												, null)
										}

										{
											shouldComponentRender('DELETE', this.props.permissions,
												<ButtonDelete index={index} />
												, null)
										}
									</TableCell>
								</tr>
							))}
						</TableBody>
					</Table>
					{this.renderEditModal()}
					{this.renderDeleteModal()}
				</Grid>
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
	unsetDeleteProduct: () => (
		dispatch({
			type: actions.PRODUCT_UNSET_DELETE
		})
	),
	unsetEditProduct: () => (
		dispatch({
			type: actions.PRODUCT_UNSET_EDIT
		})
	),
	updateProduct: payload => (
		dispatch({
			type: actions.PRODUCT_UPDATE_REQUEST,
			payload
		})
	),
	deleteProduct: payload => (
		dispatch({
			type: actions.PRODUCT_DELETE_REQUEST,
			payload
		})
	),
	getAllProducts: () => (
		dispatch({
			type: actions.PRODUCT_GET_ALL_REQUEST
		})
	)
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);