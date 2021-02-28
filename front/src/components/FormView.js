import './FormView.sass';
import React from 'react';
import dict from '../assets/dict.json';
import FormField from './FormField';
import {route, go} from '../state/route.js'
import {http} from '../http';
import {cart, clear} from '../state/cart';

export default class FormView extends React.Component {

    constructor() {
        super();
        this.state = {
            firstName: {},
            lastName: {},
            city: {},
            postalCode: {},
        };
    }

    fieldChanged(fieldState) {
        const {property, value, valid} = fieldState;
        this.setState({[property]: {value, valid}});
    }

    submit() {
        http.post('/order', {
            order: cart.getState(),
            first_name: this.state.firstName.value,
            last_name: this.state.lastName.value,
            city: this.state.city.value,
            zip_code: this.state.postalCode.value
        }, response => {    
            if('error' in response) {
                alert(dict.somethingWentWrongTryAgainLater);
            } else {
                alert(dict.orderSentSuccessfully);
                route.dispatch(go('shop'));
                cart.dispatch(clear());
            }
        });
    }

    isFormValid() {
        const {firstName, lastName, city, postalCode} = this.state;
        return firstName.valid && lastName.valid && city.valid && postalCode.valid;
    }

    render() {
        return (
            <div className='FormView'>
                <div className='FormViewTitle'>{dict.orderInformation}</div>
                <FormField 
                    label={dict.firstName} property='firstName' 
                    pattern={/[a-zżźćńółęąś]{4,50}/i} type='text'
                    onChange={state => this.fieldChanged(state)}>
                </FormField> 
                <FormField 
                    label={dict.lastName} property='lastName'
                    pattern={/[a-zżźćńółęąś]{5,50}/i} type='text'
                    onChange={state => this.fieldChanged(state)}>
                </FormField>
                <FormField 
                    label={dict.city} property='city' 
                    pattern={/[a-zżźćńółęąś\s]{2,50}/i} type='text' 
                    onChange={state => this.fieldChanged(state)}>
                </FormField>
                <FormField 
                    label={dict.postalCode} property='postalCode' 
                    pattern={/\d{2}-\d{3}/} type='text' 
                    onChange={state => this.fieldChanged(state)}>
                </FormField>
                <div>
                    <button onClick={() => route.dispatch(go('cart'))}>{dict.return}</button>
                    <button disabled={!this.isFormValid()} onClick={() => this.submit()}>{dict.orderAndPay}</button>
                </div>
            </div>
        );
    }
}