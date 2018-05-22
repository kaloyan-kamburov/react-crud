import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../common/constants';
import { shouldComponentRender } from '../../common/helpers';
import ButtonAdd from '../../containers/Buttons/add';
import ButtonEdit from '../../containers/Buttons/edit';
import ButtonDelete from '../../containers/Buttons/delete';
import Form from '../../components/common/Form';
import { notEmpty } from '../../common/formValidators';

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
			return(
				<div className='modal-mask'>
					<div className='modal-body'>
						<span className='modal-close' onClick={this.props.unsetEditProduct}>X</span>
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
			return(
				<div className='modal-mask'>
					<div className='modal-body'>
						<span className='modal-close' onClick={this.props.unsetDeleteProduct}>X</span>
						<p>Are you sure you want to delete <b>{this.props.products.currentDeleteProduct.name}</b>?</p>
						<button onClick={() => this.props.deleteProduct(this.props.products.currentDeleteProduct.index)}>Yes</button>
						<button onClick={this.props.unsetDeleteProduct}>No</button>
					</div>
				</div>
			)
		}
		return;
	}

	render() {
		
		if (this.state.productsVisible) {
			return(
                <div>
				{shouldComponentRender('CREATE', this.props.permissions, 
					<ButtonAdd />
				, null)}
					<table>
						<thead>
							<tr>
								<td>Name</td>
								<td>Price</td>
								<td>Currency</td>
								<td>Actions</td>
							</tr>
						</thead>
						<tbody>                        
							{this.props.products.all.map((product, index) => (
								<tr key={index}>
									<td>{product.name}</td>
									<td>{product.price}</td>
									<td>{product.currency}</td>
									<td>
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
									</td>
								</tr>
							))}
						</tbody>
					</table>
					{this.renderEditModal()}
					{this.renderDeleteModal()}
                </div>
			);
		} else {
			return(<div>YOU DON'T HAVE PERMISSIONS TO VIEW PRODUCTS</div>);
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