import {createStore} from 'redux';

export function go(key) {
    return {
        type: 'switchView',
        payload: {viewKey: key}
    };
}

export const route = createStore((state = 'shop', action) => {
    return action.payload?.viewKey;
});

