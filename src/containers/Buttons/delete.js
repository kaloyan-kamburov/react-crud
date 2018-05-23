import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../common/constants';
import PropTypes from 'prop-types';

class ButtonDelete extends Component {	
	render() {
		return(
			<button onClick={() => this.props.setDeleteProduct(this.props.index)}>Delete</button>
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