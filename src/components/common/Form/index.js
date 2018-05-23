import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import Button from '@material-ui/core/Button';

export default class Form extends Component {
    constructor(props) {
        super(props);

        let formData = props.formData || {},
            errors = {};

        //perform actions whether the form has data to be prefilled
        if (Object.keys(formData).length) {
            //when the form must be prefilled with data
            props.fields.forEach(field => {
                if (field.type !== 'select') {
                    formData[field.name] = props.formData[field.name]
                } else {
                    formData[field.name] = field.options[this.getSelectedIndex(field)]
                }
            });
        } else {
            //when the form is clean
            props.fields.forEach(field => {
                if (field.type !== 'select') {
                    formData[field.name] = '';
                } else {
                    formData[field.name] = field.options[0]
                }
                errors[field.name] = [];
            });
        }

        this.state = {
            formSubmitted: false,
            formData: {
                ...props.formData,
                ...formData
            },
            errors
        }
    }

    onChange = (event, field) => {
        event.persist();

        let fieldErrors = [];

        //field validation if neccesary
        if (typeof field.validators !== 'undefined') {
            field.validators.forEach(validator => {
                let valid = validator.func(event.target.value);
                if (!valid) {
                    fieldErrors.push(validator.errorMsg)
                }
            });
        }

        this.setState({
            ...this.state,
            errors: {
                ...this.state.errors,
                [field.name]: fieldErrors
            },
            formData: {
                ...this.state.formData,
                [event.target.name]: event.target.value
            }
        })
    }

    //show server error msg
    renderServerError = () => {
        if (this.props.serverError) {
            return (<span className='server-error-msg'>{this.props.serverError}</span>)
        }
    }

    //show server success msg
    renderServerSuccess = () => {
        if (this.props.serverSuccess) {
            return (<span className='server-success-msg'>{this.props.serverSuccess}</span>)
        }
    }

    //get index for select dropdown
    getSelectedIndex = selectField => {
        return selectField.options.indexOf(this.props.formData[selectField.name]);
    }

    //render the form field (only input and select types of fields are implemented)
    renderField = field => {
        switch (field.type) {
            case 'select':
                if (!this.props.formData) {
                    //render select if there is no form data to be prefilled
                    return (
                        <NativeSelect
                            name={field.name}
                            onChange={e => this.onChange(e, field)}
                            defaultValue={field.options[0]}
                            fullWidth={true}
                        >
                            {field.options.map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                            ))}
                        </NativeSelect>
                    )
                } else {
                    //render select if there is form data to be prefilled
                    return (
                        <NativeSelect
                            name={field.name}
                            onChange={e => this.onChange(e, field)}
                            defaultValue={field.options[this.getSelectedIndex(field)]}
                            fullWidth={true}
                        >
                            {field.options.map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                            ))}
                        </NativeSelect>
                    )

                }
            default:
                //render input field
                return (
                    <Input
                        type={field.type}
                        name={field.name}
                        error={this.state.formSubmitted && this.state.errors[field.name].length > 0}
                        fullWidth={true}
                        onChange={e => this.onChange(e, field)}
                        value={this.state.formData[field.name] || ''}
                    />
                )
        }
    }

    onSubmit = event => {
        event.preventDefault();
        this.setState({
            formSubmitted: true
        });
        //perform submit as a callback function to the validate function
        this.validateForm(() => this.props.onSubmit(this.state.formData));
    }

    componentDidMount() {
        //initial validation of fields
        let errors = {};
        this.props.fields.forEach(field => {
            let fieldErrors = [];
            if (typeof field.validators !== 'undefined') {
                field.validators.forEach(validator => {
                    let valid = validator.func(this.state.formData[field.name]);
                    if (!valid) {
                        fieldErrors.push(validator.errorMsg)
                    }
                    errors[field.name] = fieldErrors
                })
            }
        });
        this.setState({
            ...this.state.errors,
            errors
        })
    }

    validateForm = callback => {
        //check if all properties in the error object have 0 length (no errors)
        let formValid = Object.keys(this.state.errors).every(key => {
            return this.state.errors[key].length === 0;
        });

        if (formValid) {
            callback();
        }
    }

    //clear form data
    resetForm = () => {
        let formData = {},
            errors = {}

        this.props.fields.forEach(field => {
            if (field.type !== 'select') {
                formData[field.name] = '';
            } else {
                formData[field.name] = field.options[0]
            }
            errors[field.name] = [];
        });

        this.setState({
            formData,
            errors
        })
    }

    //redner all errors for a field
    renderFieldErrors = field => {
        if (
            typeof this.state.errors[field.name] !== 'undefined' &&
            this.state.errors[field.name].length &&
            this.state.formSubmitted
        ) {
            return this.state.errors[field.name].map((error, index) => (<span className='field-error' key={index}>{error}</span>))
        }
        return;
    }


    render() {
        return (
            <form onSubmit={this.onSubmit}>
                {this.renderServerError()}
                {this.renderServerSuccess()}
                {
                    this.props.fields.map((field, index) => (
                        <div key={index}>
                            <InputLabel htmlFor={field.name}>{field.label}</InputLabel>
                            <br/>
                            {this.renderField(field)}
                            {this.renderFieldErrors(field)}
                            <br/><br/>
                        </div>
                    ))
                }
                <br/>
                <Button variant='raised' color='primary' type='submit'>Submit</Button>
            </form>
        )
    }
}

Form.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    fields: PropTypes.arrayOf(PropTypes.object).isRequired,
    resetAfterSubmit: PropTypes.bool,
    formData: PropTypes.object
}