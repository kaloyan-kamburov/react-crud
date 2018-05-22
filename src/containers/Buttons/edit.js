import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../common/constants';

class ButtonEdit extends Component {
	constructor(props) {
		super(props)
	}
	
	render() {
		return(
			<button onClick={() => this.props.setEditProduct(this.props.index)}>Edit</button>
		)
	}
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