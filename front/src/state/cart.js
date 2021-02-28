import {createStore} from 'redux';

export function add(id) {
    return {
        type: 'add',
        payload: {id}
    };
}

export function remove(id) {
    return {
        type: 'remove',
        payload: {id}
    };
}

export function clear() {
    return {
        type: 'clear'
    };
}

export const cart = createStore((state = [], action) => {
    let product; 
    switch(action.type) {
        // adding 1 product of a given id
        case 'add':
            product = state.find(product => product.id === action.payload.id);
            if(!!product) {
                product.quantity ++;
            } else {
                state.push({
                    id: action.payload.id, 
                    quantity: 1
                });
            }
            break;
        // removing 1 product of a given id
        case 'remove':
            product = state.find(product => product.id === action.payload.id);
            if(!!product) {
                product.quantity --;
            } 
            break;
        // clearing the cart
        case 'clear':
            state = [];
            break;
        // not supported action type
        default: 
            break;
    }
    return state;
});

