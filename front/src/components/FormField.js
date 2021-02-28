import './FormField.sass';
import React from 'react';

export default class FormField extends React.Component {

    constructor(props) {
        super();
        this.state = {
            value: undefined,
            valid: false,
            property: props.property
        };
        this.props = props;
    }

    onChange(event) {
        const {value} = event.target;
        const match = value.match(this.props.pattern);
        const valid = !!match && match.length === 1 && match[0] === value;
        const property = this.state.property;
        this.setState({value, valid});
        this.props.onChange({value, valid, property});
    }

    render() {
        return (
            <div className="FormField">
                <label className="Label">{this.props.label}:</label>
                <input className="Input" type={this.props.type} onChange={event => this.onChange(event)}></input>
                {!!this.state.value ? this.state.valid ? '✔️' : '❌' : ''}
            </div>
        );
    }
}