import './CartProduct.sass';
import {cart, add, remove} from '../state/cart.js';
import React from 'react';
import dict from '../assets/dict.json';
import {http} from '../http.js';

export default class CartProduct extends React.Component {

    constructor(props) {
        super();
        this.state = {};
        this.props = props;
    }

    addToCart() {
        cart.dispatch(add(this.state.book.id))
    }

    removeFromCart() {
        cart.dispatch(remove(this.state.book.id));
    }
    
    componentDidMount() {
        http.get(`/book/${this.props.id}`, resp => {
            this.setState({book: resp.data});
        });
    }   

    render() {
        const book = this.state.book;
        const quantity = this.props.quantity;
        if(!!book && quantity > 0) {
            return (
                <div className="CartProduct">
                    <span className='ProductNameSpan'>"{book.title}"</span>
                    <span>{quantity} {dict.unit}</span>
                    <button className='ProductButton' onClick={() => this.removeFromCart()} disabled={quantity <= 0}>-</button>
                    <button className='ProductButton' onClick={() => this.addToCart()}>+</button>
                </div>
            );
        } else {
            return null;
        }
    }
}