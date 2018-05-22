import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../common/constants';

class ButtonDelete extends Component {
	constructor(props) {
		super(props)
	}
	
	render() {
		return(
			<button onClick={() => this.props.setDeleteProduct(this.props.index)}>Delete</button>
		)
	}
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