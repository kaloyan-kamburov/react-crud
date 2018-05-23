import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../common/constants';
import Form from '../../components/common/Form';
import Button from '@material-ui/core/Button';
import { notEmpty, minLength, positiveNumber } from '../../common/formValidators';

class ButtonAdd extends Component {

    renderModal() {
        if (this.props.modals.add) {
            return(
                <div className='modal-mask'>
                    <div className='modal-body'>
                        <span className='modal-close' onClick={this.props.hideAddModal}></span>
                        <Form
                            onSubmit={this.props.addProduct}
                            serverError={this.props.serverMessages.productExists}
                            resetAfterSubmit={true}
                            loader={this.props.loaders.productAdd}
                            fields={[
                                {
                                    type: 'text',
                                    label: 'Name',
                                    name: 'name',
                                    validators: [
                                        {
                                            func: notEmpty,
                                            errorMsg: 'Name field is required'
                                        },
                                        {
                                            func: minLength(2),
                                            errorMsg: 'Name be at least 2 symbols long'
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
                                            errorMsg: 'Price is required'
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
                <Button variant='outlined' color='primary' onClick={this.props.showAddModal}>Add Product</Button>
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