import './Book.sass';
import {cart, add} from '../state/cart.js';
import React from 'react';
import dict from '../assets/dict.json';

export default class Book extends React.Component {

    constructor(props) {
        super();
        this.state = {};
        this.props = props;
    }

    addToCart() {
        cart.dispatch(add(this.props.book.id))
    }

    render() {
        const book = this.props.book;
        return (
            <div className="Book">
                <img className='BookCover' src={book.cover_url} alt={book.title}></img>
                <div className='BookInfo'>
                    <div><span className='PropetyName'>{dict.title}:</span> {book.title}</div>
                    <div><span className='PropetyName'>{dict.author}:</span> {book.author}</div>
                    <div><span className='PropetyName'>{dict.nofPages}:</span> {book.pages}</div>
                    <div><span className='PropetyName'>{dict.price}:</span> {(book.price/100).toFixed(2)} {book.currency}</div>
                    <div><button className='AddToCartButton' onClick={() => this.addToCart()}>{dict.addToCart} 🛒</button></div>
                </div>
            </div>
        );
    }
}