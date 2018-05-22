import React, { Component } from 'react';

export default class Form extends Component {
    constructor(props) {
        super(props);

        let formData = props.formData || {};
        
        if (Object.keys(formData).length) {

        } else {
            props.fields.forEach(field => {
                formData[field.name] = '';
            });
        }

        this.state = {
            formData
        }
    }

    onChange = event => {
        event.persist();

        this.setState({
            formData: {
                ...this.state.formData,
                [event.target.name]: event.target.value
            }
        }, () => console.log(this.state))
    }

    
    renderField = field => {
        switch(field.type) {
            case 'select':
                return(
                    <select 
                        name={field.name}
                        onChange={this.onChange}
                        value={field.options[0]}
                    >
                        {field.options.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                    </select>
                )
            default:
                return(
                    <input 
                        type={field.type}
                        name={field.name}
                        onChange={this.onChange}
                        value={this.state.formData[field.name] || ''}
                    />
                )
        }
    }
    
    onSubmit = event => {
        event.preventDefault();
        this.props.onSubmit();
    }
    

    render() {
        return(
            <form onSubmit={this.onSubmit}>
                {
                    this.props.fields.map((field, index) => (
                        <div key={index}>
                            <label htmlFor={field.name}>{field.label}</label>
                            {this.renderField(field)}
                        </div>
                    ))
                }
                <button type='submit'>Submit</button>
            </form>
        )
    }
}