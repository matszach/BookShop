import './App.sass';
import React from 'react';
import ShopView from './ShopView';
import CartView from './CartView';
import Nav from './Nav';
import {route} from '../state/route'
import FormView from './FormView';


export default class App extends React.Component {

  componentDidMount() { 
    route.subscribe(() => this.setState({}));
  }

  render() {
    return (
      <div className="App">
        <Nav></Nav>
        {this.getView()}
      </div>
    );
  }

  getView() {
    switch(route.getState()) {
      case 'cart': return <CartView></CartView>;
      case 'form': return <FormView></FormView>;
      case 'shop': default: return <ShopView></ShopView>;
    }
  }

}
