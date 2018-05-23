import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../common/constants';
import PropTypes from 'prop-types';

class ButtonEdit extends Component {	
	render() {
		return(
			<button onClick={() => this.props.setEditProduct(this.props.index)}>Edit</button>
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
	)
});

export default connect(mapStateToProps, mapDispatchToProps)(ButtonEdit);