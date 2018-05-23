import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../common/constants';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Form from '../../components/common/Form';
import { notEmpty, minLength, positiveNumber } from '../../common/formValidators';

class ButtonEdit extends Component {
	renderModal = () => {
		if (this.props.modals.edit && this.props.products.currentEditableProduct.index === this.props.index) {
			return (
				<div className='modal-mask'>
					<div className='modal-body'>
						<span className='modal-close' onClick={this.props.unsetEditProduct}></span>
						<h3>Edit product</h3>
						<Form
							onSubmit={this.props.updateProduct}
							serverError={this.props.serverMessages.productUpdateError}
							serverSuccess={this.props.serverMessages.productUpdateSuccess}
							formData={this.props.products.currentEditableProduct}
							loader={this.props.loaders.productEdit}
							fields={[
								{
									type: 'text',
									label: 'Name',
									name: 'name',
									validators: [
                                        {
                                            func: notEmpty,
                                            errorMsg: 'Name field is required'
                                        },
                                        {
                                            func: minLength(2),
                                            errorMsg: 'Name be at least 2 symbols long'
                                        }
                                    ]
								},
								{
									type: 'number',
									label: 'Price',
									name: 'price',
									validators: [
                                        {
                                            func: notEmpty,
                                            errorMsg: 'Price is required'
                                        },
                                        {
                                            func: positiveNumber,
                                            errorMsg: 'Price must be greater than 0'
                                        }
                                    ]
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

	render() {
		return(
			<div className='button-wrapper'>
				<Button variant='raised' color='primary' onClick={() => this.props.setEditProduct(this.props.index)}>Edit</Button>
				{this.renderModal()}
			</div>
		)
	}
}

ButtonEdit.propTypes = {
	index: PropTypes.number.isRequired
}



const mapStateToProps = state => {
	return {
		...state
	}
}

const mapDispatchToProps = dispatch => ({
	setEditProduct: payload => (
		dispatch({
            type: actions.PRODUCT_SET_EDIT,
            payload
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
});

export default connect(mapStateToProps, mapDispatchToProps)(ButtonEdit);