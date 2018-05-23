import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../common/constants';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

class ButtonDelete extends Component {	
	render() {
		return(
			<Button variant='raised' color='secondary' onClick={() => this.props.setDeleteProduct(this.props.index)}>Delete</Button>
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
	)
});

export default connect(mapStateToProps, mapDispatchToProps)(ButtonDelete);