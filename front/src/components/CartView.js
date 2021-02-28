import './CartView.sass';
import React from 'react';
import dict from '../assets/dict.json';
import {cart, clear} from '../state/cart.js';
import {route, go} from '../state/route.js'
import CartProduct from './CartProduct';

export default class CartView extends React.Component {

    componentDidMount() {
        cart.subscribe(() => this.setState({}));
    }

    render() {
        const products = cart.getState().filter(p => p.quantity > 0);
        return (
            <div className="CartView">
                <div className='CartViewTitle'>{dict.cart}</div>
                {products.map(p => <CartProduct id={p.id} quantity={p.quantity} key={p.id}></CartProduct>)}
                {products.length === 0 ? <span>{dict.cartIsEmpty}</span>: ''}
                <div>
                    <button onClick={() => route.dispatch(go('shop'))}>{dict.return}</button>
                    <button disabled={products.length === 0} onClick={() => cart.dispatch(clear())}>{dict.clearCart}</button>
                    <button disabled={products.length === 0} onClick={() => route.dispatch(go('form'))}>{dict.proceed}</button>
                </div>
            </div>
        );
    }
}