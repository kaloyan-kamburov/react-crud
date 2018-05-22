import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../common/constants';
import Form from '../../components/common/Form';

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
                        fields={[
                            {
                                type: 'text',
                                label: 'Name',
                                name: 'productName'
                            },                            
                            {
                                type: 'nunmber',
                                label: 'Price',
                                name: 'productPrice'
                            },                            
                            {
                                type: 'select',
                                label: 'Currency',
                                name: 'productCurrency',
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
	addProduct: () => (
		dispatch({
			type: actions.PRODUCT_ADD_REQUEST
		})
	)
});

export default connect(mapStateToProps, mapDispatchToProps)(ButtonAdd);