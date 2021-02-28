import './Nav.sass';
import React from 'react';
import dict from '../assets/dict.json';
import {cart} from '../state/cart';
import {route, go} from '../state/route' 

export default class Nav extends React.Component {

    componentDidMount() {
        cart.subscribe(() => this.setState({})); // navbar re-renders on cart dispatch
    }

    render() {
        const quantity = cart.getState().reduce((acc, curr) => acc + curr.quantity, 0);
        return (
            <div className="Nav">
                <span className="AppTitle" onClick={() => route.dispatch(go('shop'))}>{dict.bookShop}</span>
                <button className="NavButton" onClick={() => route.dispatch(go('cart'))}>{dict.cart} {quantity > 0 ? ` (${quantity})` : ''} 🛒</button>
            </div>
        );
    }
}