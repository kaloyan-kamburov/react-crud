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


        if (Object.keys(formData).length) {
            props.fields.forEach(field => {
                if (field.type !== 'select') {
                    formData[field.name] = props.formData[field.name]
                } else {
                    formData[field.name] = field.options[this.getSelectedIndex(field)]//field.options[.indexOf(props.formData[field.name])]
                }
            });
        } else {
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

    renderServerError = () => {
        if (this.props.serverError) {
            return (<span>{this.props.serverError}</span>)
        }
    }

    renderServerSuccess = () => {
        if (this.props.serverSuccess) {
            return (<span>{this.props.serverSuccess}</span>)
        }
    }

    getSelectedIndex = selectField => {
        return selectField.options.indexOf(this.props.formData[selectField.name]);
    }

    renderField = field => {
        switch (field.type) {
            case 'select':
                if (!this.props.formData) {
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
        this.validateForm(() => this.props.onSubmit(this.state.formData));
    }

    componentDidMount() {
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
        let formValid = Object.keys(this.state.errors).every(key => {
            return this.state.errors[key].length === 0;
        });

        if (formValid) {
            callback();
        }
    }

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

    renderFieldErrors = field => {
        if (
            typeof this.state.errors[field.name] !== 'undefined' &&
            this.state.errors[field.name].length &&
            this.state.formSubmitted) {
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