import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../common/constants';
import PropTypes from 'prop-types';

import Loader from '../../components/common/Loader';

import Button from '@material-ui/core/Button';

class ButtonDelete extends Component {		
	renderModal = () => {
		if (this.props.modals.delete && this.props.products.currentDeleteProduct.index === this.props.index) {
			return (
				<div className='modal-mask'>
					<div className='modal-body'>
						<Loader class='loader-container' visible={this.props.loaders.productDelete}/>
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
		return(
			<div className='button-wrapper'>
				<Button variant='raised' color='secondary' onClick={() => this.props.setDeleteProduct(this.props.index)}>Delete</Button>
				{this.renderModal()}
			</div>
		)
	}
}

ButtonDelete.propTypes = {
	index: PropTypes.number.isRequired
}

const mapStateToProps = state => {
	return {
		...state
	}
}

const mapDispatchToProps = dispatch => ({
	setDeleteProduct: payload => (
		dispatch({
            type: actions.PRODUCT_SET_DELETE,
            payload
		})
	),
	unsetDeleteProduct: () => (
		dispatch({
			type: actions.PRODUCT_UNSET_DELETE
		})
	),
	deleteProduct: payload => (
		dispatch({
			type: actions.PRODUCT_DELETE_REQUEST,
			payload
		})
	),
});

export default connect(mapStateToProps, mapDispatchToProps)(ButtonDelete);