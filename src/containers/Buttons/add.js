import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../common/constants';
import Form from '../../components/common/Form';
import { notEmpty } from '../../common/formValidators';

class ButtonAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: true
        }
    }

    toggleModal = () => {
        this.setState({
            modalVisible: !this.state.modalVisible
        })
    }

    render() {
        return(
            <div>
                <button onClick={this.toggleModal}>Add</button>
                <div style={{display: this.state.modalVisible ? 'block': 'none'}}>
                    <Form 
                        onSubmit={this.props.addProduct}
                        serverError={this.props.serverMessages.productExists}
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
}

const mapStateToProps = state => {
	return {
		...state
	}
}

const mapDispatchToProps = dispatch => ({
	addProduct: payload => (
		dispatch({
            type: actions.PRODUCT_ADD_REQUEST,
            payload
		})
	)
});

export default connect(mapStateToProps, mapDispatchToProps)(ButtonAdd);