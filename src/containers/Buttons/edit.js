import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../common/constants';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

class ButtonEdit extends Component {	
	render() {
		return(
			<Button variant='raised' color='primary' onClick={() => this.props.setEditProduct(this.props.index)}>Edit</Button>
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