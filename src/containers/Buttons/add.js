import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../common/constants';
import Form from '../../components/common/Form';
import { notEmpty, minLength, positiveNumber } from '../../common/formValidators';

class ButtonAdd extends Component {
    constructor(props) {
        super(props);
    }

    renderModal() {
        if (this.props.modals.add) {
            return(
                <div className='modal-mask'>
                    <div className='modal-body'>
                        <span className='modal-close' onClick={this.props.hideAddModal}>X</span>
                        <Form
                            onSubmit={this.props.addProduct}
                            serverError={this.props.serverMessages.productExists}
                            resetAfterSubmit={true}
                            fields={[
                                {
                                    type: 'text',
                                    label: 'Name',
                                    name: 'name',
                                    validators: [{
                                        func: notEmpty,
                                        errorMsg: 'Name field is required'
                                    },
                                    {
                                        func: minLength(3),
                                        errorMsg: 'Must be at least 3 symbols long'
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
                                            errorMsg: 'This field is required'
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
            );
        }
        return;
    }

    render() {
        return (
            <div>
                <button onClick={this.props.showAddModal}>Add</button>
                {this.renderModal()}
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
    showAddModal: () => (
        dispatch({
            type: actions.PRODUCT_ADD_MODAL_SHOW
        })
    ),
    hideAddModal: () => (
        dispatch({
            type: actions.PRODUCT_ADD_MODAL_HIDE
        })
    ),
    addProduct: payload => (
        dispatch({
            type: actions.PRODUCT_ADD_REQUEST,
            payload
        })
    )
});

export default connect(mapStateToProps, mapDispatchToProps)(ButtonAdd);