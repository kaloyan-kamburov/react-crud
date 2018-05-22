import React, { Component } from 'react';
import { setTimeout } from 'timers';

export default class Form extends Component {
    constructor(props) {
        super(props);

        let formData = props.formData || {},
            serverError = props.serverError || '',
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
                errors[field.name] = []
                // formData.errors[field.name] = {}
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
        
        if(typeof field.validators !== 'undefined') {
            field.validators.forEach(validator => {
                let valid = validator.func(event.target.value);
                if (!valid) {
                    fieldErrors.push(validator.errorMsg)
                }
            });
        }

        this.setState({
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
            return(<span>{this.props.serverError}</span>)
        }
    }

    renderServerSuccess = () => {
        if (this.props.serverSuccess) {
            return(<span>{this.props.serverSuccess}</span>)
        }

    }
    
    getSelectedIndex = selectField => {
        return selectField.options.indexOf(this.props.formData[selectField.name]);
    }

    renderField = field => {
        switch(field.type) {
            case 'select':
                if (!this.props.formData) {
                    return(
                        <select 
                            name={field.name}
                            onChange={e => this.onChange(e, field)}
                            defaultValue={field.options[0]}
                        >
                            {field.options.map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                            ))}
                        </select>
                    )                    
                } else {
                    return(
                        <select 
                            name={field.name}
                            onChange={e => this.onChange(e, field)}
                            defaultValue={field.options[this.getSelectedIndex(field)]}
                        >
                            {field.options.map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                            ))}
                        </select>
                    )

                }
            default:
                return(
                    <input 
                        type={field.type}
                        name={field.name}
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
        })
        this.validateForm(() => this.props.onSubmit(this.state.formData));
    }

    componentDidMount() {
        let errors = {};
        this.props.fields.forEach(field => {
            let fieldErrors = [];
            if(typeof field.validators !== 'undefined') {
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
        })
        
        if (formValid) callback();
    }    

    renderFieldErrors = field => {
        if (
            typeof this.state.errors[field.name] !== 'undefined' && 
            this.state.errors[field.name].length &&
            this.state.formSubmitted) {
            return this.state.errors[field.name].map((error, index) => (<span key={index}>{error}</span>))
        }
        return;
    }

    render() {
        return(
            <form onSubmit={this.onSubmit}>
                {this.renderServerError()}
                {this.renderServerSuccess()}
                {
                    this.props.fields.map((field, index) => (
                        <div key={index}>
                            <label htmlFor={field.name}>{field.label}</label>
                            {this.renderField(field)}
                            {this.renderFieldErrors(field)}
                        </div>
                    ))
                }
                <button type='submit'>Submit</button>
            </form>
        )
    }
}